export interface User {
  id: string
  name: string
  phone: string
  avatar: string
  role: 'student' | 'teacher' | 'org' | 'admin'
  company?: string
  title?: string
  createdAt: string
}

export interface Teacher {
  id: string
  userId: string
  name: string
  university: string
  academicTitle: string
  domain: string[]
  bio: string
  rating: number
  totalStudents: number
  totalCourses: number
  verified: boolean
  avatar: string
  coverImage: string
  price: number
}

export interface Service {
  id: string
  teacherId: string
  type: '1on1_class' | 'consulting' | 'small_class'
  title: string
  description: string
  duration: number
  price: number
  maxStudents: number
}

export interface Booking {
  id: string
  studentId: string
  teacherId: string
  serviceId: string
  scheduledAt: string
  duration: number
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
  price: number
  topic: string
  paymentStatus: 'paid' | 'refunding' | 'refunded'
  teacherName: string
  teacherAvatar: string
  serviceName: string
}

export interface Review {
  id: string
  bookingId: string
  studentId: string
  teacherId: string
  studentName: string
  studentAvatar: string
  studentCompany: string
  studentTitle: string
  rating: number
  content: string
  createdAt: string
}

export interface Course {
  id: string
  title: string
  category: string
  description: string
  teacherId: string
  teacherName: string
  teacherAvatar: string
  university: string
  price: number
  rating: number
  studentCount: number
  coverImage: string
}

export type CourseCategory =
  | '战略管理'
  | '金融投资'
  | '领导力'
  | '国学智慧'
  | '数字化转型'
  | '品牌营销'
  | '组织管理'
  | '创新创业'

export interface ChatMessage {
  id: string
  sender: 'student' | 'teacher' | 'system'
  name: string
  content: string
  time: string
}
