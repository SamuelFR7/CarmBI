import styled from 'styled-components'
import { theme } from '../../styles/Theme'

interface IText {
    color?: string
}

export const Text = styled.h1<IText>`
    font-size: 2rem;
    font-weight: bold;
    width: 5rem;
    color: ${(p) => p.color};

    p {
        display: inline;
        color: ${theme.colors.green};
    }
`
