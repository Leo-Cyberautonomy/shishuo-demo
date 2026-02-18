import { motion } from 'framer-motion'
import type { ReactNode, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text' | 'danger' | 'gold'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

const base = 'inline-flex items-center justify-center font-medium rounded-[10px] transition-colors duration-200 cursor-pointer select-none'

const variants: Record<string, string> = {
  primary: 'bg-brand-primary text-white hover:bg-brand-primary-light',
  secondary: 'bg-transparent border-[1.5px] border-apple-disabled text-apple-text hover:border-apple-secondary',
  text: 'bg-transparent text-brand-primary hover:underline',
  danger: 'bg-apple-red text-white hover:opacity-90',
  gold: 'bg-brand-gold text-white hover:bg-brand-gold-light',
}

const sizes: Record<string, string> = {
  sm: 'h-9 px-4 text-[13px]',
  md: 'h-11 px-5 text-[15px]',
  lg: 'h-[50px] px-7 text-[17px]',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97, opacity: 0.9 }}
      className={`${base} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 pointer-events-none' : ''} ${className}`}
      disabled={disabled}
      {...(props as any)}
    >
      {children}
    </motion.button>
  )
}
