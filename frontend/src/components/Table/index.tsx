import React, { useEffect, useState } from 'react'
import { CheckButton, Container, Content, Filters, Header, Heading, WeighingTable } from './styles'
import { useQuery } from 'react-query'
import axios from 'axios'
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
    updated_at: Date
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

    const { data: allLots } = useQuery('lots', async () => {
        const response = await api.get<ILots[]>('/weighings/lots')

        return response.data
    }, {
        staleTime: 1000 * 30 // 30 Seconds
    })

    async function handleRequest() {
            setTotalInput(0)
            setTotalOutput(0)
            const { data } = await api.get<IWeighing[]>(`/weighings/${producerType}/${lot}`,)

            setWeighings(data)
    }

    useEffect(() => {
        weighings.map(weighing => {
            setTotalInput(totalInput + weighing.input)
            setTotalOutput(totalOutput + weighing.output)
        })
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
                                        <td>{weighing.input}</td>
                                        <td>{weighing.output}</td>
                                        <td>{weighing.input - weighing.output}</td>
                                    </tr>
                                )
                            })}
                            <tr>
                                <td>TOTAL</td>
                                <td>TODOS</td>
                                <td>{totalInput}</td>
                                <td>{totalOutput}</td>
                                <td>{totalInput - totalOutput}</td>
                            </tr>
                        </tbody>
                    </WeighingTable>
            </Content>
        </Container>
    )
}

export { Table }