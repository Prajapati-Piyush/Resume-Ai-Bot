import client, { normalizeError, TOKEN_STORAGE_KEY } from './client'

/**
 * Backend returns different user shapes per endpoint:
 *   login/register -> { id, username, email }
 *   get-me         -> { id, name, email }
 * Normalize both into one shape so the UI never has to care.
 */
function normalizeUser(raw) {
  if (!raw) return null
  return {
    id: raw.id || raw._id || null,
    name: raw.username || raw.name || '',
    email: raw.email || '',
  }
}

async function request(fn) {
  try {
    return await fn()
  } catch (error) {
    throw normalizeError(error)
  }
}

export function register({ name, email, password }) {
  return request(async () => {
    // the API field is `username`, not `name`
    const { data } = await client.post('/auth/register', {
      username: name,
      email,
      password,
    })
    if (data?.token) localStorage.setItem(TOKEN_STORAGE_KEY, data.token)
    return normalizeUser(data?.user)
  })
}

export function login({ email, password, rememberMe }) {
  return request(async () => {
    const { data } = await client.post('/auth/login', {
      email,
      password,
      rememberMe,
    })
    if (data?.token) localStorage.setItem(TOKEN_STORAGE_KEY, data.token)
    return normalizeUser(data?.user)
  })
}

export function logout() {
  return request(async () => {
    try {
      await client.get('/auth/logout')
    } finally {
      // clear locally even if the server call fails
      localStorage.removeItem(TOKEN_STORAGE_KEY)
    }
    return true
  })
}

export function getMe() {
  return request(async () => {
    const { data } = await client.get('/auth/get-me')
    return normalizeUser(data?.user)
  })
}

export function forgotPassword(email) {
  return request(async () => {
    const { data } = await client.post('/auth/forgot-password', { email })
    return data
  })
}

export function resetPassword({ token, password }) {
  return request(async () => {
    const { data } = await client.post('/auth/reset-password', { token, password })
    return data
  })
}
