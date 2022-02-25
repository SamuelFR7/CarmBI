import React from 'react'
import type { AppProps } from 'next/app'

import { GlobalStyle } from '../styles/Global'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '../services/queryClient'

const MyApp: React.FC<AppProps> = ({Component, pageProps}) => {
    return (
        <>
            <QueryClientProvider client={queryClient} >
            <Component {...pageProps} />
            </QueryClientProvider>
            <GlobalStyle />
        </>
    )
}

export default MyApp