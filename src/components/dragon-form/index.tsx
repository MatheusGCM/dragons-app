import { Input } from '@/components/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useLocation } from 'react-router-dom'
import { z } from 'zod'
import styles from './styles.module.scss'
import type { DragonProps } from '@/@types/dragon'
import { Loader2 } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { createDragon } from '@/services/create-dragon'
import { updateDragon } from '@/services/update-dragon'
import { queryClient } from '@/lib/react-query'

const formSchema = z.object({
  name: z.string().min(1, 'Nome do dragão é obrigatório'),
  type: z.string().min(1, 'Tipo do dragão é obrigatório'),
})

type FormData = z.infer<typeof formSchema>

export function DragonForm() {
  const navigate = useNavigate()
  const { pathname, state } = useLocation()
  const dragon = state as DragonProps
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      type: '',
    },
  })
  const isRegisterPage = pathname === '/register'

  const { mutateAsync: createDragonFn } = useMutation({
    mutationFn: (dragon: Pick<DragonProps, 'name' | 'type'>) =>
      createDragon(dragon),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dragons'] })
    },
  })

  const { mutateAsync: updateDragonFn } = useMutation({
    mutationFn: ({
      id,
      name,
      type,
    }: Pick<DragonProps, 'id' | 'name' | 'type'>) =>
      updateDragon({ dragonId: id, name, type }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dragons'] })
    },
  })

  async function onSubmit(data: FormData) {
    const { name, type } = data

    if (isRegisterPage) {
      await createDragonFn({ name, type })
    } else {
      await updateDragonFn({ id: dragon.id, name, type })
    }
    navigate('/')
  }

  useEffect(() => {
    if (dragon) {
      reset({
        name: dragon.name,
        type: dragon.type,
      })
    }
  }, [dragon, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Nome do Dragão</label>
        <Input
          id="name"
          placeholder="Ex: Smaug"
          error={errors.name?.message}
          {...register('name')}
        />
      </div>

      <div>
        <label htmlFor="type">Tipo do Dragão</label>
        <Input
          id="type"
          placeholder="Ex: Fogo"
          error={errors.type?.message}
          {...register('type')}
        />
      </div>

      {!isRegisterPage && (
        <div>
          <label htmlFor="createdAt">Data de criação</label>
          <Input
            id="createdAt"
            readOnly
            value={
              dragon?.createdAt
                ? new Date(dragon.createdAt).toLocaleDateString('pt-BR')
                : ''
            }
          />
        </div>
      )}

      <div className={styles.formCardFormButtons}>
        <button
          type="button"
          onClick={() => navigate('/')}
          className={styles.formCardFormCancelButton}
        >
          Cancelar
        </button>
        <button
          className={styles.formCardFormSubmitButton}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 size={22} className={styles.spin} />
          ) : isRegisterPage ? (
            'Invocar'
          ) : (
            'Atualizar'
          )}
        </button>
      </div>
    </form>
  )
}
