import type { DragonProps } from '@/@types/dragon'
import { api } from '@/lib/axios'

interface UpdateDragonProps {
  dragonId: string
  name: string
  type: string
}

export async function updateDragon({
  dragonId,
  name,
  type,
}: UpdateDragonProps) {
  return await api.put<DragonProps>(`/dragon/${dragonId}`, {
    name,
    type,
  })
}
