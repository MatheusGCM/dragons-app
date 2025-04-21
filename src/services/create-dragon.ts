import type { DragonProps } from '@/@types/dragon'
import { api } from '@/lib/axios'

interface DragonBody {
  name: string
  type: string
}

export async function createDragon({ name, type }: DragonBody) {
  return await api.post<DragonProps>('/dragon', {
    name,
    type,
  })
}
