import type { DragonProps } from '@/@types/dragon'
import { api } from '@/lib/axios'

export async function deleteDragon(dragonId: string) {
  return await api.delete<DragonProps>(`/dragon/${dragonId}`)
}
