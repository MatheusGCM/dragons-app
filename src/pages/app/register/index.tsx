import styles from './styles.module.scss'
import { DragonForm } from '@/components/dragon-form'

export function Register() {
  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerCard}>
        <div className={styles.registerCardHeaderContainer}>
          <h1 className={styles.registerCardTitle}>Invocar Dragão</h1>
          <span className={styles.registerCardSubtitle}>
            Preencha os dados para invocar um novo dragão
          </span>
        </div>
        <DragonForm />
      </div>
    </div>
  )
}
