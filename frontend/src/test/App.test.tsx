import { render, screen } from '@testing-library/react'
import App from '../App'

it('renders without crashing', () => {
  render(<App />)
  expect(screen.getByRole('main')).toBeInTheDocument()
})

it('renders app heading with Tailwind class', () => {
  render(<App />)
  const heading = screen.getByRole('heading', { level: 1 })
  expect(heading).toHaveClass('text-green-800')
})
