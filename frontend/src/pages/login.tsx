import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import React, { FormEvent, useContext, useState } from 'react'
import { Container, Content } from '../styles/pages/Login'
import { toast, Toaster } from 'react-hot-toast'
import { AuthContext } from '../context/AuthContext'

interface ISignInData {
    username: string,
    password: string
    e: FormEvent
}

export default function Login() {
    const { SignIn } = useContext(AuthContext)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    async function handleSignIn({username, password, e}: ISignInData) {
        e.preventDefault()
        toast.promise(SignIn(username.toLowerCase(), password), {
            loading: 'Entrando...',
            success: <b>Sucesso</b>,
            error: <b>Usuário ou senha incorretos</b>
        })
    }

    return (
        <Container>
            <Toaster position='top-left' reverseOrder={false} />
            <Content onSubmit={(e) => handleSignIn({username, password, e})}>
                <label>Usuário</label>
                <input name='username' value={username} onChange={e => setUsername(e.target.value)} />
                <label>Senha</label>
                <input name='password' type='password' value={password} onChange={e => setPassword(e.target.value)} />
                <button type='submit'>Entrar</button>
            </Content>
        </Container>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { token } = parseCookies(ctx)

    if (token) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}