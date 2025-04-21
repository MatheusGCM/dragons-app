import { useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'
import { Plus, Frown } from 'lucide-react'
import { DragonCard } from '@/components/dragon-card'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getDragons } from '@/services/get-dragon'
import type { DragonProps } from '@/@types/dragon'
import { deleteDragon } from '@/services/delete-dragon'
import { queryClient } from '@/lib/react-query'

export function Home() {
  const navigate = useNavigate()
  const { data: dragons } = useQuery({
    queryKey: ['dragons'],
    queryFn: () => getDragons(),
    staleTime: 1000 * 60 * 5,
  })
  const { mutateAsync: deleteDragonFn } = useMutation({
    mutationFn: (dragonId: string) => deleteDragon(dragonId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dragons'] })
    },
  })

  const sortedDragons = dragons?.sort((a, b) =>
    a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' })
  )

  function handleCreateDragon() {
    navigate('/register')
  }
  function handleClickDragonCard(dragon: DragonProps) {
    navigate(`/details/${dragon.id}`, {
      state: dragon,
    })
  }
  async function handleDeleteDragon(dragonId: string) {
    await deleteDragonFn(dragonId)
  }
  return (
    <main className={styles.homeContainer}>
      <div className={styles.homeHeaderContainer}>
        <p>
          "Um chamado para despertá-los, Um rugido para guiá-los, <br /> Um fogo
          para uni-los e nas chamas libertá-los."
        </p>
        <button
          className={styles.createDragonButton}
          type="button"
          onClick={handleCreateDragon}
        >
          <Plus size={16} />
          Invocar dragão
        </button>
      </div>
      <h2>Coleção de dragões</h2>
      <div className={styles.dragonCardContainer}>
        {sortedDragons && sortedDragons.length > 0 ? (
          sortedDragons.map(dragon => {
            return (
              <DragonCard
                key={dragon.id}
                dragon={dragon}
                onDelete={() => handleDeleteDragon(dragon.id)}
                onClick={() => handleClickDragonCard(dragon)}
              />
            )
          })
        ) : (
          <div className={styles.emptyDragonsContainer}>
            <Frown size={48} color="#D4AF37" />
            <p>Nenhum dragão encontrado no covil</p>
            <p className={styles.emptyDragonsSubtext}>
              Clique em "Invocar dragão" para adicionar um novo dragão à sua
              coleção
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
