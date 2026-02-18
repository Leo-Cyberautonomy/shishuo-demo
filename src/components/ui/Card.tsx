import { motion } from 'framer-motion'
import type { ReactNode, HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  hover?: boolean
}

export default function Card({ children, hover = true, className = '', ...props }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -2, boxShadow: '0 4px 20px rgba(0,0,0,0.12)' } : undefined}
      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      className={`bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)] ${className}`}
      {...(props as any)}
    >
      {children}
    </motion.div>
  )
}
