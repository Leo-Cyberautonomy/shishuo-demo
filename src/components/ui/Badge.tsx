import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'gold' | 'blue' | 'green' | 'red'
  className?: string
}

const colorMap: Record<string, string> = {
  default: 'bg-apple-bg text-apple-secondary',
  gold: 'bg-brand-gold/10 text-brand-gold',
  blue: 'bg-brand-primary/10 text-brand-primary',
  green: 'bg-apple-green/10 text-apple-green',
  red: 'bg-apple-red/10 text-apple-red',
}

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[12px] font-medium leading-none whitespace-nowrap ${colorMap[variant]} ${className}`}>
      {children}
    </span>
  )
}
