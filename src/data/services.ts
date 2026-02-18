import type { Service } from '../types'
import { teachers } from './teachers'

const serviceTemplates: Omit<Service, 'id' | 'teacherId'>[] = [
  {
    type: '1on1_class',
    title: '1 对 1 深度辅导',
    description: '针对企业实际问题，进行战略层面的深度分析和指导，量身定制解决方案',
    duration: 60,
    price: 3000,
    maxStudents: 1,
  },
  {
    type: 'consulting',
    title: '专家咨询对话',
    description: '围绕特定议题进行专业咨询，快速获得专家洞见与建议',
    duration: 45,
    price: 2000,
    maxStudents: 1,
  },
  {
    type: 'small_class',
    title: '精品小班研讨',
    description: '5-8 人小班深度研讨，学员互动交流，激发思维碰撞',
    duration: 90,
    price: 1500,
    maxStudents: 8,
  },
]

export const services: Service[] = teachers.flatMap((teacher, tIdx) =>
  serviceTemplates.map((tmpl, sIdx) => ({
    ...tmpl,
    id: `SVC-${String(tIdx * 3 + sIdx + 1).padStart(3, '0')}`,
    teacherId: teacher.id,
    price: tmpl.price + (tIdx % 4) * 500,
  }))
)

export function getServicesByTeacherId(teacherId: string): Service[] {
  return services.filter((s) => s.teacherId === teacherId)
}

export function getServiceById(id: string): Service | undefined {
  return services.find((s) => s.id === id)
}

export const serviceTypeLabel: Record<Service['type'], string> = {
  '1on1_class': '1 对 1 授课',
  consulting: '咨询对话',
  small_class: '小班研讨',
}
