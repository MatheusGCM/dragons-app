import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { useState } from 'react'
import { Login } from './pages/auth/login'
import { Home } from './pages/app/home'
import { Register } from './pages/app/register'
import { Details } from './pages/app/details'
import { AppLayout } from './pages/_layout/app'
import { AuthLayout } from './pages/_layout/auth'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const auth = localStorage.getItem('isAuthenticated')
    return auth === 'true'
  })

  function handleLogin() {
    setIsAuthenticated(true)
    localStorage.setItem('isAuthenticated', 'true')
  }

  function handleLogout() {
    setIsAuthenticated(false)
    localStorage.removeItem('isAuthenticated')
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Auth routes */}
          <Route path="/" element={<AuthLayout />}>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
          </Route>

          {/* App routes */}
          <Route
            path="/"
            element={
              <AppLayout
                isAuthenticated={isAuthenticated}
                onLogout={handleLogout}
              />
            }
          >
            <Route index element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="details/:id" element={<Details />} />
          </Route>

          {/* Redirect any unknown routes to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}
