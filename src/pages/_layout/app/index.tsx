import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Header } from '@/components/header'
import styles from './styles.module.scss'

interface AppLayoutProps {
  isAuthenticated: boolean
  onLogout?: () => void
}

export function AppLayout({ isAuthenticated, onLogout }: AppLayoutProps) {
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true })
    }
  }, [navigate, isAuthenticated])
  return (
    <div className={styles.appContainer}>
      <Header onLogout={onLogout} />
      <Outlet />
    </div>
  )
}
