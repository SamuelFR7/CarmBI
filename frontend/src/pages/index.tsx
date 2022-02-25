import React from 'react'
import { Header } from '../components/Header'
import { Table } from '../components/Table'
import { Container } from '../styles/pages/Home'

export default function() {
    return(
        <Container>   
            <Header />
            <Table />
        </Container>
    )
}