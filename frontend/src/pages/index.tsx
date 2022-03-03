import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import React from 'react'
import { Header } from '../components/Header'
import { Table } from '../components/Table'
import { Container } from '../styles/pages/Home'

export default function Home() {
    return (
        <>
            <Head>
                <title>Carm</title>
            </Head>
            <Container>
                <Header />
                <Table />
            </Container>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { token } = parseCookies(ctx)

    if (!token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }

    return {
        props: {},
    }
}
