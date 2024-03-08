import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'

import Home from '../../src/app/[locale]/page'

describe('It should be shown the home page', () => {
  it('renders a home page', () => {
    render(<Home />)
    // check if all components are rendered
    expect(screen.getByTestId('test-home')).toBeInTheDocument()
  })
})
