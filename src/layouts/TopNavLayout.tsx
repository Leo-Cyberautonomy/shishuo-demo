import { Outlet, Link, useLocation } from 'react-router-dom'
import { Search, Bell, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: '首页', path: '/' },
  { label: '名师发现', path: '/discover/teachers' },
  { label: '课程发现', path: '/discover/courses' },
]

const notifications = [
  { id: 1, text: '您预约的王建国教授课程将在明天 14:00 开始', time: '5 分钟前' },
  { id: 2, text: '李明远教授已确认您的预约', time: '1 小时前' },
  { id: 3, text: '新课程上线：《AI 驱动的企业数字化转型》', time: '3 小时前' },
]

function getBreadcrumbs(pathname: string) {
  const crumbs: { label: string; path?: string }[] = [{ label: '首页', path: '/' }]
  if (pathname.startsWith('/discover/teachers')) crumbs.push({ label: '名师发现' })
  else if (pathname.startsWith('/discover/courses')) crumbs.push({ label: '课程发现' })
  else if (pathname.startsWith('/teacher/')) crumbs.push({ label: '名师发现', path: '/discover/teachers' }, { label: '名师主页' })
  else if (pathname.startsWith('/booking/')) crumbs.push({ label: '名师发现', path: '/discover/teachers' }, { label: '预约课程' })
  return crumbs
}

export default function TopNavLayout() {
  const location = useLocation()
  const [showNotif, setShowNotif] = useState(false)
  const breadcrumbs = getBreadcrumbs(location.pathname)

  return (
    <div className="min-h-screen bg-apple-bg">
      <header className="glass-nav sticky top-0 z-40">
        <div className="max-w-[1200px] mx-auto px-6 h-12 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-[17px] font-semibold text-brand-primary tracking-[-0.2px]">
              师说
            </Link>
            <nav className="flex items-center gap-1">
              {navLinks.map((link) => {
                const active = location.pathname === link.path
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-1.5 rounded-lg text-[14px] transition-colors duration-200 ${
                      active
                        ? 'text-brand-primary font-semibold bg-brand-primary/6'
                        : 'text-apple-secondary hover:text-apple-text hover:bg-black/[0.03]'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg hover:bg-black/[0.03] transition-colors cursor-pointer">
              <Search className="w-[18px] h-[18px] text-apple-secondary" />
            </button>
            <div className="relative">
              <button
                onClick={() => setShowNotif(!showNotif)}
                className="p-2 rounded-lg hover:bg-black/[0.03] transition-colors relative cursor-pointer"
              >
                <Bell className="w-[18px] h-[18px] text-apple-secondary" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-apple-red" />
              </button>
              <AnimatePresence>
                {showNotif && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.16)] p-2 z-50"
                  >
                    <div className="px-3 py-2 text-[13px] font-semibold text-apple-text">通知</div>
                    {notifications.map((n) => (
                      <div key={n.id} className="px-3 py-2.5 rounded-xl hover:bg-apple-bg transition-colors cursor-pointer">
                        <p className="text-[14px] text-apple-text leading-snug">{n.text}</p>
                        <p className="text-[12px] text-apple-secondary mt-1">{n.time}</p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center">
              <span className="text-white text-[13px] font-medium">张</span>
            </div>
          </div>
        </div>
      </header>

      {breadcrumbs.length > 1 && (
        <div className="max-w-[1200px] mx-auto px-6 py-3">
          <div className="flex items-center gap-1 text-[13px]">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-apple-disabled" />}
                {crumb.path && i < breadcrumbs.length - 1 ? (
                  <Link to={crumb.path} className="text-apple-secondary hover:text-brand-primary transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-apple-text font-medium">{crumb.label}</span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}

      <main className="max-w-[1200px] mx-auto px-6 pb-16">
        <Outlet />
      </main>
    </div>
  )
}
