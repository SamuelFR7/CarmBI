import styled from 'styled-components'
import { theme } from '../../styles/Theme'

interface ICheckButtonProps {
    enabled: boolean
}

export const Container = styled.div`
    display: flex;
    width: 100%;
    max-width: 1480px;
    margin: 0 auto;
    padding: 0 1.5rem;
`

export const Content = styled.div`
    flex: 1;
    border-radius: 0.5rem;
    background: ${theme.colors.gray[800]};
    padding: 2rem;
`

export const Header = styled.div`
    display: flex;
    margin-bottom: 2rem;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`

export const Heading = styled.h2`
    font-size: 1.5rem;
    font-weight: normal;
`

export const Filters = styled.div`
    display: flex;
    align-items: center;

    select {
        padding: 0.5rem;
        width: 8rem;
        border-radius: 2rem;
        color: black;
    }

    .confirmFilters {
        background: ${theme.colors.green};
        color: ${theme.colors.text};
        margin-left: 1.5rem;
        padding: 0.5rem;
        border: 1px solid black;
        border-radius: 0.5rem;
    }
`

export const CheckButton = styled.div<ICheckButtonProps>`
    display: flex;

    button {
        height: 1rem;
        width: 1rem;
        border: 2px gray solid;
        border-radius: 50%;
        margin-right: 0.5rem;
        background: ${(p) => (p.enabled ? 'black' : 'white')};
    }

    p {
        margin-right: 1rem;
    }

    :hover {
        cursor: pointer;
    }
`

export const WeighingTable = styled.table`
    width: 100%;
    border-collapse: collapse;

    thead {
        tr {
            th {
                padding: 1rem 1rem;
                text-align: left;
                color: ${theme.colors.gray[300]};
            }
        }
    }

    tbody {
        tr {
            border: solid;
            border-color: ${theme.colors.gray[700]};
            border-width: 1px 0;
            td {
                padding: 1rem 1rem;
                line-height: 1rem;

                @media (min-width: 769px) {
                    :nth-last-child(1),
                    :nth-last-child(2),
                    :nth-last-child(3) {
                        text-align: right;
                    }
                }
            }
        }
    }

    @media (max-width: 768px) {
        display: block;
        width: 100%;

        thead {
            display: none;
        }

        td,
        th {
            border: 1px solid ${theme.colors.gray[600]};
        }

        tbody,
        tr,
        td {
            display: block;
            width: 100%;
        }

        tr {
            margin-bottom: 1.5rem;
        }

        td {
            text-align: right;
            padding-left: 50%;

            :nth-child(1)::before {
                content: 'Depositante';
            }

            :nth-child(2)::before {
                content: 'Produto';
            }

            :nth-child(3)::before {
                content: 'Entrada';
            }

            :nth-child(4)::before {
                content: 'Saida';
            }

            :nth-child(5)::before {
                content: 'Saldo';
            }

            ::before {
                float: left;
                font-weight: bold;
                font-size: 22px;
            }
        }
    }
`

export const InfoSummary = styled.div`
    padding: 1rem;
    margin: 1rem 1rem 0 1rem;
    display: flex;
    justify-content: space-between;

    div {
        background: ${theme.colors.bg};
        padding: 2rem;
        border-radius: 1rem;

        p {
            margin-top: 1.5rem;
            font-size: 1.5rem;
        }

        :nth-child(2) {
            p {
                color: red;
            }
        }

        :nth-child(1) {
            p {
                color: green;
            }
        }
    }

    @media (max-width: 768px) {
        flex-direction: column;

        div {
            margin-bottom: 1.5rem;
        }
    }
`
