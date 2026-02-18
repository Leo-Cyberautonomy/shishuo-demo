import { Search } from 'lucide-react'
import type { InputHTMLAttributes } from 'react'

export default function SearchInput({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-apple-secondary" />
      <input
        className="w-full h-11 pl-10 pr-4 bg-apple-bg rounded-[10px] text-apple-text text-[15px] placeholder:text-apple-secondary outline-none border-2 border-transparent focus:border-brand-primary transition-[border-color] duration-200"
        {...props}
      />
    </div>
  )
}
