import { useEffect, useState } from 'react'
import { apiFetch } from '@/lib/api'

interface HealthCheckResult {
  /** Whether the backend is reachable and returning ok. */
  connected: boolean
}

/**
 * Fetches the backend health endpoint and returns connection status.
 *
 * @returns An object with `connected` — true if backend is reachable.
 */
export function useHealthCheck(): HealthCheckResult {
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    apiFetch('/health')
      .then((res) => setConnected(res.ok))
      .catch(() => setConnected(false))
  }, [])

  return { connected }
}
