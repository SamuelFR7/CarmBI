import React, { useEffect, useState } from 'react'
import {
    CheckButton,
    Container,
    Content,
    Filters,
    Header,
    Heading,
    InfoSummary,
    WeighingTable,
} from './styles'
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
    const [producerType, setProducerType] = useState('1')
    const [lot, setLot] = useState('0')
    const [weighings, setWeighings] = useState<IWeighing[]>([])
    const [totalInput, setTotalInput] = useState(0)
    const [totalOutput, setTotalOutput] = useState(0)
    const [lastUpdate, setLastUpdate] = useState<string | null>(null)
    const [allLots, setAllLots] = useState<ILots[]>([])

    async function handleRequest() {
        const { data } = await api.get<IWeighing[]>(
            `/weighings/${producerType}/${lot}`
        )

        setWeighings(data)
    }

    useEffect(() => {
        async function getLastUpdateTime() {
            const response = await api.get<string>('/weighings/time')
            setLastUpdate(response.data)
        }

        function updateWeighingsInfo() {
            let newTotalInput = 0
            let newTotalOutput = 0
            weighings.map((weighing) => {
                newTotalInput = newTotalInput + weighing.input
                newTotalOutput = newTotalOutput + weighing.output
            })
            setTotalInput(newTotalInput)
            setTotalOutput(newTotalOutput)
        }

        if (weighings[0]) {
            setLastUpdate(weighings[0].updated_at)
        } else {
            getLastUpdateTime()
        }

        updateWeighingsInfo()
    }, [weighings])

    useEffect(() => {
        async function getAllLotsAndSearchWeighings() {
            const { data: allLots } = await api.get<ILots[]>('/weighings/lots')
            setAllLots(allLots)
            setLot(allLots[0].lot)

            const { data: newWeighings } = await api.get<IWeighing[]>(
                `/weighings/${producerType}/${allLots[0].lot}`
            )
            setWeighings(newWeighings)
        }
        getAllLotsAndSearchWeighings()
    }, [])

    return (
        <Container>
            <Content>
                <Header>
                    <Heading>Pesagens</Heading>

                    <Filters>
                        <CheckButton
                            enabled={producerType === '1'}
                            onClick={() => setProducerType('1')}
                        >
                            <button type="button"></button>
                            <p>Produtor</p>
                        </CheckButton>
                        <CheckButton
                            enabled={producerType === '2'}
                            onClick={() => setProducerType('2')}
                        >
                            <button type="button"></button>
                            <p>Comprador</p>
                        </CheckButton>

                        <select onChange={(e) => setLot(e.target.value)}>
                            {allLots?.map((lots) => {
                                return (
                                    <option
                                        value={lots.lot}
                                        key={lots.lot}
                                    >{`${lots.lot} - ${lots.product}`}</option>
                                )
                            })}
                        </select>
                        <button
                            className="confirmFilters"
                            onClick={handleRequest}
                        >
                            Confirmar
                        </button>
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
                        {weighings.map((weighing) => {
                            return (
                                <tr key={weighing.id}>
                                    <td>{weighing.depositor}</td>
                                    <td>{weighing.product}</td>
                                    <td>
                                        {new Intl.NumberFormat('pt-BR').format(
                                            weighing.input
                                        )}
                                    </td>
                                    <td>
                                        {new Intl.NumberFormat('pt-BR').format(
                                            weighing.output
                                        )}
                                    </td>
                                    <td>
                                        {new Intl.NumberFormat('pt-BR').format(
                                            weighing.input - weighing.output
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </WeighingTable>
                <InfoSummary>
                    <div>
                        <h1>Total de Entradas</h1>
                        <p>
                            {new Intl.NumberFormat('pt-BR').format(totalInput)}
                        </p>
                        <p>{`(${new Intl.NumberFormat('pt-BR', {
                            maximumFractionDigits: 0,
                        }).format(totalInput / 60)} sc)`}</p>
                    </div>
                    <div>
                        <h1>Total de Saídas</h1>
                        <p>
                            {new Intl.NumberFormat('pt-BR').format(totalOutput)}
                        </p>
                        <p>{`(${new Intl.NumberFormat('pt-BR', {
                            maximumFractionDigits: 0,
                        }).format(totalOutput / 60)} sc)`}</p>
                    </div>
                    <div>
                        <h1>Saldo</h1>
                        <p>
                            {new Intl.NumberFormat('pt-BR').format(
                                totalInput - totalOutput
                            )}
                        </p>
                        <p>
                            {`(${new Intl.NumberFormat('pt-BR', {
                                maximumFractionDigits: 0,
                            }).format((totalInput - totalOutput) / 60)} sc)`}
                        </p>
                    </div>
                    <div>
                        <h1>Última atualização</h1>
                        <p>
                            {lastUpdate
                                ? new Intl.DateTimeFormat('pt-BR', {
                                      dateStyle: 'short',
                                      timeStyle: 'short',
                                  }).format(Date.parse(lastUpdate))
                                : 'Carregando...'}
                        </p>
                    </div>
                </InfoSummary>
            </Content>
        </Container>
    )
}

export { Table }
