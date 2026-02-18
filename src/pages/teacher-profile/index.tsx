import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShieldCheck, Users, BookOpen, Clock, MessageSquare, GraduationCap } from 'lucide-react'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import StarRating from '../../components/ui/StarRating'
import Card from '../../components/ui/Card'
import PageTransition from '../../components/ui/PageTransition'
import { getTeacherById } from '../../data/teachers'
import { getServicesByTeacherId, serviceTypeLabel } from '../../data/services'
import { getReviewsByTeacherId } from '../../data/reviews'

const tabs = ['简介', '服务列表', '学员评价'] as const

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function TeacherProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('简介')

  const teacher = getTeacherById(id || '')
  if (!teacher) return <div className="py-20 text-center text-apple-secondary">未找到名师信息</div>

  const services = getServicesByTeacherId(teacher.id)
  const reviews = getReviewsByTeacherId(teacher.id)

  const serviceIcons: Record<string, React.ReactNode> = {
    '1on1_class': <GraduationCap className="w-5 h-5" />,
    consulting: <MessageSquare className="w-5 h-5" />,
    small_class: <Users className="w-5 h-5" />,
  }

  return (
    <PageTransition>
      <div className="py-6">
        {/* Header */}
        <div className="bg-white rounded-3xl p-8 shadow-[0_2px_12px_rgba(0,0,0,0.08)] mb-6 overflow-hidden">
          <div className="flex gap-8">
            <img
              src={teacher.avatar}
              alt={teacher.name}
              className="w-28 h-28 rounded-2xl bg-apple-bg flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-[28px] font-bold tracking-[-0.3px] text-apple-text truncate">{teacher.name}</h1>
                {teacher.verified && (
                  <span className="flex items-center gap-1 text-[13px] text-brand-gold font-medium">
                    <ShieldCheck className="w-4 h-4" /> 已认证
                  </span>
                )}
              </div>
              <p className="text-[15px] text-apple-secondary mb-1">{teacher.academicTitle}</p>
              <p className="text-[15px] text-apple-secondary mb-4">{teacher.university}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {teacher.domain.map((d) => (
                  <Badge key={d} variant="blue">{d}</Badge>
                ))}
              </div>
              <div className="flex items-center gap-6 text-[14px]">
                <div className="flex items-center gap-2 text-apple-secondary">
                  <StarRating rating={Math.round(teacher.rating)} size={16} />
                  <span className="font-semibold text-apple-text">{teacher.rating}</span>
                </div>
                <span className="flex items-center gap-1.5 text-apple-secondary">
                  <Users className="w-4 h-4" /> {teacher.totalStudents} 位学员
                </span>
                <span className="flex items-center gap-1.5 text-apple-secondary">
                  <BookOpen className="w-4 h-4" /> {teacher.totalCourses} 次授课
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end justify-between">
              <div className="text-right">
                <span className="text-[13px] text-apple-secondary">课程价格起</span>
                <div className="text-[28px] font-bold text-brand-gold tracking-[-0.3px]">¥{teacher.price}</div>
              </div>
              <Button size="lg" onClick={() => navigate(`/booking/${teacher.id}`)}>
                立即预约
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-white rounded-xl p-1 shadow-[0_2px_12px_rgba(0,0,0,0.08)] w-fit">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-[14px] font-medium transition-all duration-200 cursor-pointer ${
                activeTab === tab
                  ? 'bg-brand-primary text-white'
                  : 'text-apple-secondary hover:text-apple-text'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === '简介' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <Card hover={false}>
              <h3 className="text-[17px] font-semibold text-apple-text mb-4">个人简介</h3>
              <p className="text-[15px] text-apple-secondary leading-relaxed">{teacher.bio}</p>
              <div className="mt-6 pt-6 border-t border-black/[0.06]">
                <h4 className="text-[15px] font-semibold text-apple-text mb-3">学术背景</h4>
                <div className="space-y-2 text-[14px] text-apple-secondary">
                  <p>• {teacher.university} {teacher.academicTitle}</p>
                  <p>• 研究方向：{teacher.domain.join('、')}</p>
                  <p>• 累计服务企业家学员 {teacher.totalStudents} 位</p>
                  <p>• 累计完成授课 {teacher.totalCourses} 次</p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {activeTab === '服务列表' && (
          <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-4">
            {services.map((service) => (
              <motion.div key={service.id} variants={fadeUp}>
                <Card>
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-brand-primary/8 flex items-center justify-center text-brand-primary flex-shrink-0">
                      {serviceIcons[service.type]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-[17px] font-semibold text-apple-text truncate">{service.title}</h3>
                        <Badge variant="default">{serviceTypeLabel[service.type]}</Badge>
                      </div>
                      <p className="text-[14px] text-apple-secondary mb-3 line-clamp-2">{service.description}</p>
                      <div className="flex items-center gap-4 text-[13px] text-apple-secondary">
                        <span className="flex items-center gap-1 whitespace-nowrap"><Clock className="w-3.5 h-3.5" /> {service.duration} 分钟</span>
                        <span className="flex items-center gap-1 whitespace-nowrap"><Users className="w-3.5 h-3.5" /> 最多 {service.maxStudents} 人</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3 flex-shrink-0">
                      <span className="text-[22px] font-bold text-brand-gold">¥{service.price}</span>
                      <Button size="sm" onClick={() => navigate(`/booking/${teacher.id}`)}>预约</Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === '学员评价' && (
          <div>
            <Card hover={false} className="mb-6">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-[40px] font-bold text-brand-gold tracking-[-0.5px]">{teacher.rating}</div>
                  <StarRating rating={Math.round(teacher.rating)} size={18} />
                  <p className="text-[13px] text-apple-secondary mt-1">{reviews.length} 条评价</p>
                </div>
                <div className="flex-1 space-y-1.5">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = reviews.filter((r) => r.rating === star).length
                    const pct = reviews.length ? (count / reviews.length) * 100 : 0
                    return (
                      <div key={star} className="flex items-center gap-2 text-[13px]">
                        <span className="text-apple-secondary w-6 text-right">{star}星</span>
                        <div className="flex-1 h-2 bg-apple-bg rounded-full overflow-hidden">
                          <div className="h-full bg-brand-gold rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-apple-secondary w-8">{count}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </Card>
            <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-4">
              {reviews.map((review) => (
                <motion.div key={review.id} variants={fadeUp}>
                  <Card>
                    <div className="flex items-start gap-3">
                      <img src={review.studentAvatar} alt="" className="w-10 h-10 rounded-full bg-apple-bg flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1 gap-3">
                          <div className="min-w-0">
                            <span className="text-[15px] font-semibold text-apple-text">{review.studentName}</span>
                            <span className="text-[13px] text-apple-secondary ml-2 truncate">{review.studentCompany} · {review.studentTitle}</span>
                          </div>
                          <span className="text-[12px] text-apple-secondary whitespace-nowrap flex-shrink-0">
                            {new Date(review.createdAt).toLocaleDateString('zh-CN')}
                          </span>
                        </div>
                        <StarRating rating={review.rating} size={13} />
                        <p className="text-[14px] text-apple-text mt-2 leading-relaxed">{review.content}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </PageTransition>
  )
}
