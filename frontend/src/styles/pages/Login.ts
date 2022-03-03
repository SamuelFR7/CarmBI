import styled from 'styled-components'
import { theme } from '../Theme'

export const Container = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
`

export const Content = styled.form`
    display: flex;
    width: 100%;
    max-width: 22.5rem;
    background: ${theme.colors.gray[800]};
    padding: 2rem;
    border-radius: 2rem;
    flex-direction: column;

    label {
        color: ${theme.colors.text};
        margin-bottom: 0.25rem;

        :nth-child(3) {
            margin-top: 1.25rem;
        }
    }

    input {
        padding: 0.5rem;
        border: 0;
        border-radius: 0.5rem;
    }

    button {
        margin-top: 1.5rem;
        background: ${theme.colors.green};
        padding: 0.5rem;
        border: 0;
        border-radius: 0.5rem;
        color: ${theme.colors.text};

        :hover {
            filter: brightness(0.9);
        }
    }
`
