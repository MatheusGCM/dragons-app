import styles from './styles.module.scss'
import { DragonForm } from '@/components/dragon-form'

export function Details() {
  return (
    <div className={styles.detailsContainer}>
      <div className={styles.detailsCard}>
        <div className={styles.detailsCardHeaderContainer}>
          <h1 className={styles.detailsCardTitle}>Detalhes do Dragão</h1>
          <span className={styles.detailsCardSubtitle}>
            Confira e atualize as infromações do seu dragão
          </span>
        </div>
        <DragonForm />
      </div>
    </div>
  )
}
