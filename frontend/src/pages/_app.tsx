import React from 'react'
import type { AppProps } from 'next/app'

import { GlobalStyle } from '../styles/Global'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '../services/queryClient'
import { AuthProvider } from '../context/AuthContext'

const MyApp: React.FC<AppProps> = ({Component, pageProps}) => {
    return (
        <>
            <AuthProvider>
                <QueryClientProvider client={queryClient} >
                    <Component {...pageProps} />
                    <GlobalStyle />
                </QueryClientProvider>
            </AuthProvider>
        </>
    )
}

export default MyApp