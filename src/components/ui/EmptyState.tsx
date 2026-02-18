import { Inbox } from 'lucide-react'
import Button from './Button'
import type { ReactNode } from 'react'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: { label: string; onClick: () => void }
}

export default function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-apple-bg flex items-center justify-center text-apple-disabled mb-5">
        {icon || <Inbox className="w-8 h-8" />}
      </div>
      <h3 className="text-[17px] font-semibold text-apple-text mb-2">{title}</h3>
      {description && <p className="text-[15px] text-apple-secondary max-w-sm">{description}</p>}
      {action && (
        <Button variant="secondary" size="sm" className="mt-5" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  )
}
