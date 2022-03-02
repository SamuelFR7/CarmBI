import styled from 'styled-components'

interface IText {
    color?: string
}

export const Text = styled.text<IText>`
    font-size: 2rem;
    font-weight: bold;
    width: 5rem;
    color: ${(p) => p.color};
`
