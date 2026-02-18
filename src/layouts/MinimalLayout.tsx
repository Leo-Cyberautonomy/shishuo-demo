import { Outlet, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function MinimalLayout() {
  return (
    <div className="min-h-screen bg-apple-bg">
      <header className="glass-nav sticky top-0 z-40">
        <div className="max-w-[800px] mx-auto px-6 h-12 flex items-center">
          <Link
            to="/"
            className="flex items-center gap-2 text-[14px] text-apple-secondary hover:text-brand-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>
          <span className="ml-auto text-[17px] font-semibold text-brand-primary tracking-[-0.2px]">
            师说
          </span>
        </div>
      </header>
      <main className="max-w-[800px] mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  )
}
