import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronLeft, ChevronRight, GraduationCap, MessageSquare, Users } from 'lucide-react'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import PageTransition from '../../components/ui/PageTransition'
import { getTeacherById } from '../../data/teachers'
import { getServicesByTeacherId, serviceTypeLabel } from '../../data/services'
import type { Service } from '../../types'

const steps = ['选择服务', '选择时间', '填写需求']

function generateCalendarDays() {
  const today = new Date()
  const days: { date: number; day: string; available: boolean; full: Date }[] = []
  const dayNames = ['日', '一', '二', '三', '四', '五', '六']
  for (let i = 1; i <= 14; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    days.push({
      date: d.getDate(),
      day: dayNames[d.getDay()],
      available: Math.random() > 0.3,
      full: d,
    })
  }
  return days
}

const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '19:00', '20:00']

export default function Booking() {
  const { teacherId } = useParams()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [topic, setTopic] = useState('')
  const [description, setDescription] = useState('')

  const teacher = getTeacherById(teacherId || '')
  if (!teacher) return <div className="py-20 text-center text-apple-secondary">未找到名师信息</div>

  const services = getServicesByTeacherId(teacher.id)
  const calendarDays = generateCalendarDays()

  const serviceIcons: Record<string, React.ReactNode> = {
    '1on1_class': <GraduationCap className="w-5 h-5" />,
    consulting: <MessageSquare className="w-5 h-5" />,
    small_class: <Users className="w-5 h-5" />,
  }

  const canNext = step === 0 ? !!selectedService : step === 1 ? !!selectedDate && !!selectedTime : !!topic

  const handleSubmit = () => {
    navigate(`/payment/BKG-${Date.now()}`)
  }

  return (
    <PageTransition>
      <div className="py-6">
        <h1 className="text-[28px] font-bold tracking-[-0.3px] text-apple-text mb-2">预约课程</h1>
        <p className="text-[15px] text-apple-secondary mb-8">
          预约 <span className="text-apple-text font-medium">{teacher.name}</span> 的课程服务
        </p>

        {/* Steps */}
        <div className="flex items-center gap-3 mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-[14px] font-medium transition-all duration-200 ${
                i === step ? 'bg-brand-primary text-white' :
                i < step ? 'bg-apple-green/10 text-apple-green' : 'bg-apple-bg text-apple-secondary'
              }`}>
                {i < step ? <Check className="w-4 h-4" /> : <span className="w-5 text-center">{i + 1}</span>}
                {s}
              </div>
              {i < steps.length - 1 && <ChevronRight className="w-4 h-4 text-apple-disabled" />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Select Service */}
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              {services.map((service) => (
                <Card
                  key={service.id}
                  className={`cursor-pointer border-2 transition-all duration-200 ${
                    selectedService?.id === service.id ? '!border-brand-primary' : 'border-transparent'
                  }`}
                  onClick={() => setSelectedService(service)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-primary/8 flex items-center justify-center text-brand-primary flex-shrink-0">
                      {serviceIcons[service.type]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[17px] font-semibold text-apple-text truncate">{service.title}</h3>
                      <p className="text-[13px] text-apple-secondary truncate">{serviceTypeLabel[service.type]} · {service.duration} 分钟 · 最多 {service.maxStudents} 人</p>
                    </div>
                    <span className="text-[22px] font-bold text-brand-gold flex-shrink-0">¥{service.price}</span>
                    {selectedService?.id === service.id && (
                      <div className="w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </motion.div>
          )}

          {/* Step 2: Select Time */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <Card hover={false}>
                <h3 className="text-[17px] font-semibold text-apple-text mb-5">选择日期</h3>
                <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
                  {calendarDays.map((day) => (
                    <button
                      key={day.date}
                      disabled={!day.available}
                      onClick={() => setSelectedDate(day.full)}
                      className={`flex flex-col items-center min-w-[56px] py-3 px-2 rounded-xl text-[14px] transition-all duration-200 cursor-pointer ${
                        selectedDate?.getDate() === day.date
                          ? 'bg-brand-primary text-white'
                          : day.available
                          ? 'bg-apple-bg text-apple-text hover:bg-brand-primary/10'
                          : 'bg-apple-bg text-apple-disabled cursor-not-allowed'
                      }`}
                    >
                      <span className="text-[12px] mb-1 opacity-70">周{day.day}</span>
                      <span className="font-semibold">{day.date}</span>
                    </button>
                  ))}
                </div>

                <h3 className="text-[17px] font-semibold text-apple-text mb-4">选择时间段</h3>
                <div className="grid grid-cols-4 gap-3">
                  {timeSlots.map((time) => {
                    const avail = Math.random() > 0.2
                    return (
                      <button
                        key={time}
                        disabled={!avail}
                        onClick={() => setSelectedTime(time)}
                        className={`py-3 rounded-xl text-[15px] font-medium transition-all duration-200 cursor-pointer ${
                          selectedTime === time
                            ? 'bg-brand-primary text-white'
                            : avail
                            ? 'bg-apple-bg text-apple-text hover:bg-brand-primary/10'
                            : 'bg-apple-bg text-apple-disabled cursor-not-allowed line-through'
                        }`}
                      >
                        {time}
                      </button>
                    )
                  })}
                </div>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Fill Details */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <Card hover={false}>
                <h3 className="text-[17px] font-semibold text-apple-text mb-5">填写需求信息</h3>
                <div className="space-y-5">
                  <Input
                    label="咨询主题"
                    placeholder="例如：公司海外扩张战略规划"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                  <div>
                    <label className="block text-[13px] font-medium text-apple-secondary mb-1.5">
                      需求描述（选填）
                    </label>
                    <textarea
                      className="w-full h-32 px-4 py-3 bg-apple-bg rounded-[10px] text-apple-text text-[15px] placeholder:text-apple-secondary outline-none border-2 border-transparent focus:border-brand-primary transition-[border-color] duration-200 resize-none"
                      placeholder="请简要描述您希望在课程中讨论的具体问题..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>

                {/* Order Summary */}
                <div className="mt-8 pt-6 border-t border-black/[0.06]">
                  <h4 className="text-[15px] font-semibold text-apple-text mb-3">订单摘要</h4>
                  <div className="space-y-2 text-[14px]">
                    <div className="flex justify-between">
                      <span className="text-apple-secondary">名师</span>
                      <span className="text-apple-text">{teacher.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-apple-secondary">服务</span>
                      <span className="text-apple-text">{selectedService?.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-apple-secondary">时间</span>
                      <span className="text-apple-text">
                        {selectedDate?.toLocaleDateString('zh-CN')} {selectedTime}
                      </span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-black/[0.06] mt-3">
                      <span className="text-apple-text font-semibold">应付金额</span>
                      <span className="text-[22px] font-bold text-brand-gold">¥{selectedService?.price}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="secondary"
            onClick={() => step > 0 ? setStep(step - 1) : navigate(`/teacher/${teacher.id}`)}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            {step === 0 ? '返回名师主页' : '上一步'}
          </Button>
          {step < 2 ? (
            <Button disabled={!canNext} onClick={() => setStep(step + 1)}>
              下一步 <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button variant="gold" disabled={!canNext} onClick={handleSubmit}>
              提交预约
            </Button>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
