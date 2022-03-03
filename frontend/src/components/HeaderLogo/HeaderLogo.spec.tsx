import React from 'react'
import { render } from '@testing-library/react'
import { HeaderLogo } from '.'

describe('Header logo component', () => {
    it('should render correctly', () => {
        const { getByText } = render(<HeaderLogo />)

        expect(getByText('carmBI')).toBeInTheDocument()
        expect(getByText('.')).toBeInTheDocument()
    })
})
