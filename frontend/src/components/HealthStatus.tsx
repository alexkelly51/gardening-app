import { useHealthCheck } from '@/hooks/useHealthCheck'

/** Displays the current backend connection status. */
function HealthStatus() {
  const { connected } = useHealthCheck()

  return (
    <p>{connected ? 'Connected' : 'Disconnected'}</p>
  )
}

export default HealthStatus
