import React from 'react'
import { render, screen } from '@testing-library/react'
import { Table } from '.'

describe('Table component', () => {
    it('should render correctly', async () => {
        render(<Table />)

        expect(screen.getByText('Pesagens')).toBeInTheDocument()
    })
})
