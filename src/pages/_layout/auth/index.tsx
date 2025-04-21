import { Outlet } from 'react-router-dom'
import styles from './styles.module.scss'

export function AuthLayout() {
  return (
    <div className={styles.authContainer}>
      <Outlet />
    </div>
  )
}
