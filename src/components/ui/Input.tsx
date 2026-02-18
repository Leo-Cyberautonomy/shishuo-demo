import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export default function Input({ label, className = '', ...props }: InputProps) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-[13px] font-medium text-apple-secondary mb-1.5">
          {label}
        </label>
      )}
      <input
        className="w-full h-11 px-4 bg-apple-bg rounded-[10px] text-apple-text text-[15px] placeholder:text-apple-secondary outline-none border-2 border-transparent focus:border-brand-primary transition-[border-color] duration-200"
        {...props}
      />
    </div>
  )
}
