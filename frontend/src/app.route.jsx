import { createBrowserRouter } from 'react-router'

import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '*',
    element: <h1 style={{ padding: 20 }}>404 - Page Not Found</h1>
  }
])

