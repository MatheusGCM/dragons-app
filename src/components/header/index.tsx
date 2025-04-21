import { LogOut, Swords } from 'lucide-react'
import styles from './styles.module.scss'
import { useLocation } from 'react-router-dom'

interface HeaderProps {
  onLogout?: () => void
}

export function Header({ onLogout }: HeaderProps) {
  const location = useLocation()

  const currentPath = location.pathname
  const isHomePage = currentPath === '/'

  return (
    <header data-justify={!isHomePage} className={styles.headerContainer}>
      <div className={styles.headerTitleContainer}>
        <Swords size={32} color="#D4AF37" />
        <h1 className={styles.headerTitle}>Covil dos dragões</h1>
        {!isHomePage && (
          <Swords size={32} color="#D4AF37" className={styles.iconSwords} />
        )}
      </div>

      {isHomePage && (
        <>
          <button
            className={styles.headerButton}
            type="button"
            onClick={onLogout}
          >
            <LogOut size={16} />
            Sair
          </button>
          <button
            className={styles.headerButtonIcon}
            type="button"
            onClick={onLogout}
          >
            <LogOut size={16} />
          </button>
        </>
      )}
    </header>
  )
}
