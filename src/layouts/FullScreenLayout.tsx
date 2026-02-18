import { Outlet } from 'react-router-dom'

export default function FullScreenLayout() {
  return (
    <div className="h-screen bg-[#1C1C1E] text-white overflow-hidden">
      <Outlet />
    </div>
  )
}
