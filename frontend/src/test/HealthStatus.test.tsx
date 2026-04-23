import { render, screen } from '@testing-library/react'
import { vi, beforeEach } from 'vitest'
import HealthStatus from '../components/HealthStatus'

beforeEach(() => {
  vi.restoreAllMocks()
})

it('shows connected when API returns ok', async () => {
  vi.spyOn(global, 'fetch').mockResolvedValueOnce(
    new Response(JSON.stringify({ status: 'ok' }), { status: 200 })
  )
  render(<HealthStatus />)
  expect(await screen.findByText(/connected/i)).toBeInTheDocument()
})

it('shows disconnected when API call fails', async () => {
  vi.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Network error'))
  render(<HealthStatus />)
  expect(await screen.findByText(/disconnected/i)).toBeInTheDocument()
})
