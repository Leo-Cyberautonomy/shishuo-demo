import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface StatCardProps {
  label: string
  value: number
  suffix?: string
  icon: ReactNode
  delay?: number
}

function useAnimatedNumber(target: number, duration = 1500, delay = 0) {
  const [current, setCurrent] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (started.current) return
      started.current = true
      const startTime = Date.now()
      const tick = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCurrent(Math.round(eased * target))
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, delay)
    return () => clearTimeout(timeout)
  }, [target, duration, delay])

  return current
}

export default function StatCard({ label, value, suffix = '', icon, delay = 0 }: StatCardProps) {
  const animated = useAnimatedNumber(value, 1500, delay)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay / 1000, ease: [0.25, 0.1, 0.25, 1] }}
      className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)]"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-brand-primary/8 flex items-center justify-center text-brand-primary">
          {icon}
        </div>
        <span className="text-[13px] text-apple-secondary font-medium">{label}</span>
      </div>
      <div className="text-[34px] font-bold tracking-[-0.4px] text-apple-text">
        {animated.toLocaleString()}
        {suffix && <span className="text-[17px] font-semibold text-apple-secondary ml-1">{suffix}</span>}
      </div>
    </motion.div>
  )
}
