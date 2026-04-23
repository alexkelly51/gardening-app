/** Central API client for all backend requests. */

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

/**
 * Fetch a resource from the backend API.
 *
 * @param path - The API path to fetch (e.g. "/health")
 * @param options - Optional fetch options
 * @returns The fetch Response
 */
export async function apiFetch(path: string, options?: RequestInit): Promise<Response> {
  return fetch(`${BASE_URL}${path}`, options)
}
