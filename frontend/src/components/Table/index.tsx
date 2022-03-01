import React, { useEffect, useState } from 'react'
import { CheckButton, Container, Content, Filters, Header, Heading, InfoSummary, WeighingTable } from './styles'
import { useQuery } from 'react-query'
import { api } from '../../services/api'

interface IWeighing {
    id: string
    code: string
    depositor: string
    product: string
    producer_type: string
    input: number
    output: number
    sync: string
    updated_at: string
}

interface ILots {
    lot: string
    product: string
}

function Table() {
    const [producerType, setProducerType] = useState('0')
    const [lot, setLot] = useState('0')
    const [weighings, setWeighings] = useState<IWeighing[]>([])
    const [totalInput, setTotalInput] = useState(0)
    const [totalOutput, setTotalOutput] = useState(0)
    const [lastUpdate, setLastUpdate] = useState<string | null>(null)

    const { data: allLots } = useQuery('lots', async () => {
        const response = await api.get<ILots[]>('/weighings/lots')

        const lotsArray = response.data.reverse()

        return lotsArray
    }, {
        staleTime: 1000 * 30 // 30 Seconds
    })

    async function handleRequest() {
            setTotalInput(0)
            setTotalOutput(0)
            const { data } = await api.get<IWeighing[]>(`/weighings/${producerType}/${lot}`,)

            // sort array by depositor alphabetically
            const weighingArray = data.sort((a, b) => {
                if (a.depositor < b.depositor) {
                    return -1
                }
                if (a.depositor > b.depositor) {
                    return 1
                }
                return 0
            })

            setWeighings(weighingArray)
    }

    useEffect(() => {
        async function getLastUpdateTime() {
            const response = await api.get<string>('/weighings/time')
            setLastUpdate(response.data)
        }

        function updateWeighingsInfo() {
            weighings.map(weighing => {
                setTotalInput(totalInput + weighing.input)
                setTotalOutput(totalOutput + weighing.output)
            })
        }

        weighings[0] ? setLastUpdate(weighings[0].updated_at) : getLastUpdateTime()
        updateWeighingsInfo()
    }, [weighings])

    return (
        <Container>
            <Content>
                <Header>
                    <Heading>
                        Pesagens
                    </Heading>

                    <Filters>
                        <CheckButton enabled={producerType === '1' ? true : false} onClick={() => setProducerType('1')}>
                            <button type='button' ></button>
                            <p>Produtor</p>
                        </CheckButton>
                        <CheckButton enabled={producerType === '2' ? true : false} onClick={() => setProducerType('2')} >
                            <button type='button'></button>
                            <p>Comprador</p>
                        </CheckButton>

                        <select onChange={e => setLot(e.target.value)}>
                            <option value='' disabled selected>Selecione</option>
                            {allLots?.map(lots => {
                                return (
                                    <option value={lots.lot} key={lots.lot}>{`${lots.lot} - ${lots.product}`}</option>
                                )
                            })}
                        </select>
                        <button className='confirmFilters' onClick={handleRequest} >Confirmar</button>
                    </Filters>
                </Header>

                <WeighingTable>
                        <thead>
                            <tr>
                                <th>Depositante</th>
                                <th>Produto</th>
                                <th>Entrada</th>
                                <th>Saida</th>
                                <th>Saldo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {weighings.map(weighing => {
                                return (
                                    <tr key={weighing.id}>
                                        <td>{weighing.depositor}</td>
                                        <td>{weighing.product}</td>
                                        <td>{new Intl.NumberFormat('pt-BR').format(weighing.input)}</td>
                                        <td>{new Intl.NumberFormat('pt-BR').format(weighing.output)}</td>
                                        <td>{new Intl.NumberFormat('pt-BR').format(weighing.input - weighing.output)}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </WeighingTable>
                    <InfoSummary>
                        <div>
                            <h1>Total de Entradas</h1>
                            <p>{new Intl.NumberFormat('pt-BR').format(totalInput)}</p>
                        </div>
                        <div>
                            <h1>Total de Saídas</h1>
                            <p>{new Intl.NumberFormat('pt-BR').format(totalOutput)}</p>
                        </div>
                        <div>
                            <h1>Saldo Total</h1>
                            <p>{new Intl.NumberFormat('pt-BR').format(totalInput - totalOutput)}</p>
                        </div>
                        <div>
                            <h1>Ultima alteração</h1>
                            <p>{lastUpdate ? new Intl.DateTimeFormat('pt-BR', {dateStyle: 'short',timeStyle: 'short'}).format(Date.parse(lastUpdate)) : 'Carregando...'}</p>
                        </div>
                    </InfoSummary>
            </Content>
        </Container>
    )
}

export { Table }