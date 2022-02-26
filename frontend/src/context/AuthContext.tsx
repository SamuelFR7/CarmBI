import React, { createContext, ReactNode, useState } from 'react'
import { api } from '../services/api'
import { setCookie } from 'nookies'
import Router from 'next/router'

interface IAuthProviderProps {
    children: ReactNode
}

interface IAuthContext {
    isAuthenticated: boolean
    SignIn: (username: string, password: string) => Promise<void>
}

interface ISessionRequest {
    token: string
    user: {
        username: string
    }
}

const AuthContext = createContext({} as IAuthContext)

function AuthProvider({ children }: IAuthProviderProps) {
    const [token, setToken] = useState('')

    const isAuthenticated = !!token

    async function SignIn(username: string, password: string) {
        const { data } = await api.post<ISessionRequest>('/users/session', {
            username,
            password
        })

        setCookie(undefined, 'token', data.token, {
            maxAge: 86400, // 1 Day
        })

        api.defaults.headers.common.authorization = `Bearer ${data.token}`

        setToken(data.token)

        Router.push('/')
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, SignIn }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, AuthContext }