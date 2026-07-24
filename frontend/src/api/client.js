import axios from 'axios'

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

/**
 * The backend issues an httpOnly JWT cookie on login/register, so the browser
 * attaches credentials automatically and JS never touches the token.
 * `withCredentials` is therefore required on every request.
 *
 * The auth middleware also accepts `Authorization: Bearer <token>`, so if a
 * token is ever surfaced to the client we forward it too.
 */
const client = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 120000, // AI report generation is slow — allow up to 2 minutes
})

export const TOKEN_STORAGE_KEY = 'jobprep.token'

client.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

/** Broadcast so AuthContext can react to session loss without a circular import. */
export const SESSION_EXPIRED_EVENT = 'auth:session-expired'

/**
 * Turn any axios failure into a predictable `{ message, status, code }`.
 * The API is inconsistent — some handlers return `{ message }`, others `{ error }`.
 */
export function normalizeError(error) {
  if (axios.isCancel?.(error) || error?.code === 'ERR_CANCELED') {
    return { message: 'Request cancelled', status: 0, code: 'CANCELLED' }
  }

  if (error?.code === 'ECONNABORTED') {
    return {
      message: 'The request timed out. Please try again.',
      status: 0,
      code: 'TIMEOUT',
      retryable: true,
    }
  }

  if (!error?.response) {
    return {
      message: 'Cannot reach the server. Check that the API is running.',
      status: 0,
      code: 'NETWORK',
      retryable: true,
    }
  }

  const { status, data } = error.response
  const message =
    data?.message ||
    data?.error ||
    (status === 404 ? 'Not found' : 'Something went wrong. Please try again.')

  return {
    message,
    status,
    code: data?.code || `HTTP_${status}`,
    // the API flags transient upstream failures (e.g. an overloaded AI service)
    retryable: Boolean(data?.retryable) || status === 503 || status === 429,
  }
}

client.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status

    // 401 on anything other than the session probe means the session died.
    const isSessionProbe = error?.config?.url?.includes('/auth/get-me')
    if (status === 401 && !isSessionProbe) {
      localStorage.removeItem(TOKEN_STORAGE_KEY)
      window.dispatchEvent(new CustomEvent(SESSION_EXPIRED_EVENT))
    }

    return Promise.reject(error)
  },
)

export default client
