import type { Booking } from '../types'
import { teachers } from './teachers'
import { services } from './services'

export const bookings: Booking[] = Array.from({ length: 10 }, (_, i) => {
  const teacher = teachers[i % teachers.length]
  const service = services[i * 3]
  const futureDate = new Date()
  futureDate.setDate(futureDate.getDate() + i + 1)
  futureDate.setHours(14 + (i % 4), 0, 0, 0)

  return {
    id: `BKG-${new Date().getFullYear()}${String(i + 1).padStart(6, '0')}`,
    studentId: 'USR-00000001',
    teacherId: teacher.id,
    serviceId: service.id,
    scheduledAt: futureDate.toISOString(),
    duration: service.duration,
    status: (['confirmed', 'pending', 'completed'] as const)[i % 3],
    price: service.price,
    topic: [
      '公司海外扩张战略规划',
      '融资方案评估与优化',
      '团队管理与领导力提升',
      '数字化转型路径咨询',
      '品牌升级策略研讨',
    ][i % 5],
    paymentStatus: 'paid',
    teacherName: teacher.name,
    teacherAvatar: teacher.avatar,
    serviceName: service.title,
  }
})

export function getBookingById(id: string): Booking | undefined {
  return bookings.find((b) => b.id === id)
}
