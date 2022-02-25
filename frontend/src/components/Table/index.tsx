import React, { useState } from 'react'
import { CheckButton, Container, Content, Filters, Header, Heading, WeighingTable } from './styles'

interface IWeighing {
    id: string
    code: string
    depositor: string
    product: string
    productor_type: string
    input: number
    output: number
    sync: string
}

function Table() {
    const [producerButton, setProducerButton] = useState(false)
    const [buyerButton, setBuyerButton] = useState(false)
    const [lot, setLot] = useState('')
    const [weighings, setWeighings] = useState<IWeighing[]>([])

    function handleRequest() {
        fetch(`http://localhost:3333/weighings/${buyerButton ? '2' : '1'}/${lot}`, {
            headers: new Headers({
                'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDU4MTMwNTcsImV4cCI6MTY0NTg5OTQ1Nywic3ViIjoiZTFlMjE3N2MtMjFhNC00ZmRlLWFiZjAtMmMxODNjYjE3YWY2In0.odtRnI2yP3K_PYkT5PlER0oxDKVsKLNrxP44QmAH4-Y'
            })
        })
        .then(response => response.json())
        .then(data => {
            setWeighings(data)
        })

        console.log(weighings)
    } 

    function handleEnableButtonAndDisableOther(whichActive: 'producer' | 'buyer') {
        if (whichActive === 'buyer') {
            if (buyerButton) {
                setBuyerButton(false)
            } else {
                setProducerButton(false)
                setBuyerButton(true)
            }
        } else {
            if (producerButton) {
                setProducerButton(false)
            } else {
                setBuyerButton(false)
                setProducerButton(true)
            }
        }
    }

    return (
        <Container>
            <Content>
                <Header>
                    <Heading>
                        Pesagens
                    </Heading>

                    <Filters>
                        <CheckButton enabled={producerButton} onClick={() => handleEnableButtonAndDisableOther('producer')}>
                            <button type='button' ></button>
                            <p>Produtor</p>
                        </CheckButton>
                        <CheckButton enabled={buyerButton} onClick={() => handleEnableButtonAndDisableOther('buyer')} >
                            <button type='button'></button>
                            <p>Comprador</p>
                        </CheckButton>

                        <input type="text" value={lot} onChange={e => setLot(e.target.value)} />
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