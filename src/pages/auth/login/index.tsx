import { useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'
import { LogIn, Swords } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/input'

const loginSchema = z.object({
  username: z.string().min(1, 'Usuário é obrigatório. Dica: admin'),
  password: z
    .string()
    .min(3, 'Senha deve ter pelo menos 3 caracteres. Dica: admin'),
})

type LoginFormData = z.infer<typeof loginSchema>

interface LoginProps {
  onLogin: () => void
}

export function Login({ onLogin }: LoginProps) {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  function onSubmit(data: LoginFormData) {
    console.log(data)
    const user = { id: 1, username: 'admin', password: 'admin' }
    const { username, password } = data

    const isValidUser = username === user.username && password === user.password

    if (isValidUser) {
      onLogin()
      navigate('/')
      return
    }

    setError('username', { message: 'Usuário inválido. Dica: admin' })
    setError('password', { message: 'Senha inválida. Dica: admin' })
  }

  return (
    <div className={styles.loginCard}>
      <div className={styles.loginCardHeaderContainer}>
        <Swords size={60} color="#D4AF37" />
        <h1 className={styles.loginCardTitle}>Covil dos dragões</h1>
        <span className={styles.loginCardSubtitle}>
          Entre com suas credenciais para acessar o covil
        </span>
      </div>

      <form className={styles.loginCardForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.loginCardFormField}>
          <label htmlFor="username">Usuário (admin)</label>
          <Input
            placeholder="admin"
            error={errors.username?.message}
            {...register('username')}
          />
        </div>
        <div className={styles.loginCardFormField}>
          <label htmlFor="password">Senha (admin)</label>
          <Input
            placeholder="**********"
            type="password"
            error={errors.password?.message}
            {...register('password')}
          />
        </div>
        <button className={styles.loginCardFormButton} type="submit">
          <LogIn size={16} />
          ENTRAR
        </button>
      </form>
    </div>
  )
}
