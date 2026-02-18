import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Camera, Mic, CheckCircle, FileText, Clock, User } from 'lucide-react'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import PageTransition from '../../components/ui/PageTransition'
import { teachers } from '../../data/teachers'

interface DeviceCheck {
  name: string
  icon: React.ReactNode
  status: 'checking' | 'passed' | 'idle'
  progress: number
}

export default function ClassroomPrepare() {
  const navigate = useNavigate()
  const teacher = teachers[0]
  const [devices, setDevices] = useState<DeviceCheck[]>([
    { name: '摄像头', icon: <Camera className="w-5 h-5" />, status: 'idle', progress: 0 },
    { name: '麦克风', icon: <Mic className="w-5 h-5" />, status: 'idle', progress: 0 },
  ])
  const [allPassed, setAllPassed] = useState(false)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    devices.forEach((_, idx) => {
      const startDelay = idx * 1500
      timers.push(setTimeout(() => {
        setDevices((prev) => prev.map((d, i) => i === idx ? { ...d, status: 'checking' } : d))

        let progress = 0
        const interval = setInterval(() => {
          progress += Math.random() * 15 + 5
          if (progress >= 100) {
            progress = 100
            clearInterval(interval)
            setDevices((prev) => prev.map((d, i) => i === idx ? { ...d, status: 'passed', progress: 100 } : d))
            if (idx === devices.length - 1) {
              setTimeout(() => setAllPassed(true), 300)
            }
          }
          setDevices((prev) => prev.map((d, i) => i === idx ? { ...d, progress: Math.min(progress, 100) } : d))
        }, 200)
        timers.push(interval as ReturnType<typeof setTimeout>)
      }, startDelay))
    })

    return () => timers.forEach(clearTimeout)
  }, [])

  const scheduledTime = new Date()
  scheduledTime.setHours(14, 0, 0, 0)

  return (
    <PageTransition>
      <div className="max-w-lg mx-auto py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <h1 className="text-[28px] font-bold tracking-[-0.3px] text-apple-text mb-2">课前准备</h1>
          <p className="text-[15px] text-apple-secondary">请确保设备正常后进入课堂</p>
        </motion.div>

        {/* Course Info */}
        <Card hover={false} className="mb-5">
          <div className="flex items-center gap-4">
            <img src={teacher.avatar} alt="" className="w-14 h-14 rounded-xl bg-apple-bg" />
            <div className="flex-1">
              <h3 className="text-[17px] font-semibold text-apple-text">{teacher.name}</h3>
              <p className="text-[13px] text-apple-secondary">{teacher.university}</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-black/[0.06] grid grid-cols-2 gap-4 text-[14px]">
            <div className="flex items-center gap-2 text-apple-secondary">
              <User className="w-4 h-4" />
              <span>1 对 1 深度辅导</span>
            </div>
            <div className="flex items-center gap-2 text-apple-secondary">
              <Clock className="w-4 h-4" />
              <span>60 分钟</span>
            </div>
          </div>
        </Card>

        {/* Device Checks */}
        <Card hover={false} className="mb-5">
          <h3 className="text-[17px] font-semibold text-apple-text mb-5">设备检测</h3>
          <div className="space-y-4">
            {devices.map((device) => (
              <div key={device.name}>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    device.status === 'passed' ? 'bg-apple-green/10 text-apple-green' :
                    device.status === 'checking' ? 'bg-brand-primary/8 text-brand-primary' :
                    'bg-apple-bg text-apple-secondary'
                  }`}>
                    {device.status === 'passed' ? <CheckCircle className="w-5 h-5" /> : device.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[15px] text-apple-text font-medium">{device.name}</span>
                      <span className={`text-[13px] font-medium ${
                        device.status === 'passed' ? 'text-apple-green' :
                        device.status === 'checking' ? 'text-brand-primary' :
                        'text-apple-secondary'
                      }`}>
                        {device.status === 'passed' ? '已通过' : device.status === 'checking' ? '检测中...' : '等待检测'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="h-1.5 bg-apple-bg rounded-full overflow-hidden ml-[52px]">
                  <motion.div
                    className={`h-full rounded-full ${device.status === 'passed' ? 'bg-apple-green' : 'bg-brand-primary'}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${device.progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Pre-class Materials */}
        <Card hover={false} className="mb-8">
          <h3 className="text-[17px] font-semibold text-apple-text mb-4">课前资料</h3>
          <div className="space-y-3">
            {['企业战略分析框架.pdf', '案例研究：东南亚市场进入策略.pdf'].map((file) => (
              <div key={file} className="flex items-center gap-3 p-3 bg-apple-bg rounded-xl">
                <FileText className="w-5 h-5 text-brand-primary" />
                <span className="text-[14px] text-apple-text flex-1">{file}</span>
                <button className="text-[13px] text-brand-primary hover:underline cursor-pointer">查看</button>
              </div>
            ))}
          </div>
        </Card>

        <Button
          variant="gold"
          size="lg"
          className="w-full"
          disabled={!allPassed}
          onClick={() => navigate(`/classroom/BKG-${Date.now()}`)}
        >
          {allPassed ? '进入课堂' : '设备检测中...'}
        </Button>
      </div>
    </PageTransition>
  )
}
