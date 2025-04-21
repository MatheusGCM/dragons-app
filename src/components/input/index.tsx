import React, { type InputHTMLAttributes, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import styles from './styles.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, error, ...props }, ref) => {
    const [isShowingPassword, setIsShowingPassword] = useState(false)
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className={styles.inputContainer}>
          <input
            type={isShowingPassword ? 'text' : type}
            ref={ref}
            {...props}
          />
          {type === 'password' && (
            <button
              type="button"
              onClick={() => setIsShowingPassword(prevState => !prevState)}
            >
              {isShowingPassword ? (
                <Eye size={20} color="#D4AF37" />
              ) : (
                <EyeOff size={20} color="#D4AF37" />
              )}
            </button>
          )}
        </div>
        <span className={styles.errorMessage}>{error ? error : ''}</span>
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
