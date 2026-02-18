import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import type { ReactNode } from 'react'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-black/40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="glass-card relative rounded-2xl p-8 shadow-[0_8px_40px_rgba(0,0,0,0.16)] w-full max-w-lg mx-4 z-10"
          >
            {title && (
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[22px] font-semibold tracking-[-0.2px] text-apple-text">{title}</h3>
                <button onClick={onClose} className="p-1.5 rounded-full hover:bg-apple-bg transition-colors cursor-pointer">
                  <X className="w-5 h-5 text-apple-secondary" />
                </button>
              </div>
            )}
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
