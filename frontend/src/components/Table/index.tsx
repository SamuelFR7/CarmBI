import React, { useEffect, useState } from 'react'
import { CheckButton, Container, Content, Filters, Header, Heading, WeighingTable } from './styles'

interface IWeighing {
    id: string
    code: string
    depositor: string
    product: string
    producer_type: string
    input: number
    output: number
    sync: string
}

interface ILots {
    lot: string
    product: string
}

function Table() {
    const [producerType, setProducerType] = useState('')
    const [lot, setLot] = useState('')
    const [allLots, setAllLots] = useState<ILots[]>([])
    const [weighings, setWeighings] = useState<IWeighing[]>([])

    useEffect(() => {
        fetch('http://localhost:3333/weighings/lots', {
            headers: new Headers({
                'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDU4MTY3NzksImV4cCI6MTY0NTkwMzE3OSwic3ViIjoiNWM3MWUyYmYtYzdlNi00OTVhLTlkZDctMzkwZTcwOGY5MjcwIn0.0Cm7g1zI1qJCvfzWTvmcKRz_IpypbmUBKG8A2bStBNw"
            })
        })
        .then(response => response.json())
        .then(data => {
            setAllLots(data)
            setLot(data[0].lot)
        })
    }, [])

    function handleRequest() {
        fetch(`http://localhost:3333/weighings/${producerType}/${lot}`, {
            headers: new Headers({
                'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDU4MTY2OTksImV4cCI6MTY0NTkwMzA5OSwic3ViIjoiNWM3MWUyYmYtYzdlNi00OTVhLTlkZDctMzkwZTcwOGY5MjcwIn0.z0sAGetUVpQW7pT2U1gG3-g8r8p1z0f0A4DeuvLxAwI"
            })
        })
        .then(response => response.json())
        .then(data => {
            setWeighings(data)
        })
    }

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
                            {allLots.map(lots => {
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
                        </tbody>
                    </WeighingTable>
            </Content>
        </Container>
    )
}

export { Table }