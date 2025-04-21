import type { DragonProps } from '@/@types/dragon'
import { api } from '@/lib/axios'

interface DragonResponse extends DragonProps {}

export async function getDragons(dragonId?: string) {
  const url = dragonId ? `/dragon/${dragonId}` : '/dragon'
  const { data } = await api.get<DragonResponse[]>(url)

  return data
}
