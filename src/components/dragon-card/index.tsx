import { useState } from 'react'
import type { DragonProps } from '@/@types/dragon'
import styles from './styles.module.scss'
import { Trash2, X, Check } from 'lucide-react'

interface DragonCardProps {
  dragon: DragonProps
  onClick: () => void
  onDelete: () => void
}

export function DragonCard({ dragon, onClick, onDelete }: DragonCardProps) {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsConfirmingDelete(true)
  }

  const handleCancelDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsConfirmingDelete(false)
  }

  const handleConfirmDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete()
    setIsConfirmingDelete(false)
  }

  return (
    <div className={styles.container}>
      <button
        className={styles.dragonCardContainer}
        type="button"
        onClick={onClick}
      >
        <div className={styles.dragonCartHeader}>
          <h3>{dragon.name}</h3>
          <img src="fireDragon.png" alt="dragon" />
        </div>

        {isConfirmingDelete ? (
          <div className={styles.confirmDeleteContainer}>
            <button
              type="button"
              onClick={handleConfirmDelete}
              className={styles.confirmButton}
            >
              <Check size={15} />
            </button>
            <button
              type="button"
              onClick={handleCancelDelete}
              className={styles.cancelButton}
            >
              <X size={15} />
            </button>
          </div>
        ) : (
          <button type="button" onClick={handleDeleteClick}>
            <Trash2 size={15} className={styles.trashContainer} />
          </button>
        )}
      </button>
    </div>
  )
}
