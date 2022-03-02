import React from 'react'
import { theme } from '../../styles/Theme'
import { Text } from './styles'

function HeaderLogo() {
    return (
        <Text>
            carm
            <Text color={theme.colors.green}>.</Text>
            BI
        </Text>
    )
}

export { HeaderLogo }
