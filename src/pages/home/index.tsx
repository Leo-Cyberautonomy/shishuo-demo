import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users, GraduationCap, BookOpen, Award, ArrowRight, ChevronRight } from 'lucide-react'
import SearchInput from '../../components/ui/SearchInput'
import StatCard from '../../components/ui/StatCard'
import StarRating from '../../components/ui/StarRating'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import PageTransition from '../../components/ui/PageTransition'
import { teachers } from '../../data/teachers'
import { courses, categories } from '../../data/courses'
import type { CourseCategory } from '../../types'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function Home() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState<CourseCategory>('战略管理')
  const [searchQuery, setSearchQuery] = useState('')
  const featuredTeachers = teachers.slice(0, 8)
  const filteredCourses = courses.filter((c) => c.category === activeCategory)

  const handleSearch = () => {
    if (searchQuery.trim()) navigate(`/discover/teachers?q=${encodeURIComponent(searchQuery)}`)
  }

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-primary via-brand-primary-light to-brand-primary rounded-b-[32px]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,168,83,0.15),transparent_60%)]" />
        <div className="max-w-[1200px] mx-auto px-6 pt-24 pb-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-2xl"
          >
            <h1 className="text-[48px] font-bold tracking-[-0.5px] text-white leading-[1.15] mb-4">
              与名师对话
              <br />
              <span className="text-brand-gold">让知识创造价值</span>
            </h1>
            <p className="text-[17px] text-white/70 mb-8 leading-relaxed">
              连接北大、清华、港大等顶级学府教授与企业家，<br />
              一对一深度授课，让每一次学习都有收获。
            </p>
            <div className="flex gap-3 max-w-lg">
              <SearchInput
                placeholder="搜索名师、课程或领域..."
                className="flex-1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button variant="gold" onClick={handleSearch}>搜索</Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex items-center gap-6 mt-10 text-white/60 text-[13px]"
          >
            <span>热门搜索：</span>
            {['战略管理', '金融投资', '领导力', '数字化转型'].map((tag) => (
              <Link
                key={tag}
                to={`/discover/teachers?q=${tag}`}
                className="px-3 py-1 rounded-full border border-white/20 hover:border-white/40 hover:text-white/80 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6">
        {/* Stats */}
        <section className="py-12 -mt-12 relative z-10">
          <div className="grid grid-cols-4 gap-5">
            <StatCard label="服务企业家" value={2860} suffix="位" icon={<Users className="w-5 h-5" />} delay={0} />
            <StatCard label="入驻名师" value={128} suffix="位" icon={<GraduationCap className="w-5 h-5" />} delay={100} />
            <StatCard label="累计课程" value={5620} suffix="节" icon={<BookOpen className="w-5 h-5" />} delay={200} />
            <StatCard label="学员满意度" value={98} suffix="%" icon={<Award className="w-5 h-5" />} delay={300} />
          </div>
        </section>

        {/* Featured Teachers */}
        <section className="py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[28px] font-bold tracking-[-0.3px] text-apple-text">精选名师</h2>
            <Link
              to="/discover/teachers"
              className="flex items-center gap-1 text-[14px] text-brand-primary hover:underline"
            >
              查看全部 <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex gap-5 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
            {featuredTeachers.map((teacher, i) => (
              <motion.div
                key={teacher.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="min-w-[270px] flex-shrink-0"
              >
                <Link to={`/teacher/${teacher.id}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 transition-all duration-200">
                    <div className="flex items-center gap-3 mb-4">
                      <img src={teacher.avatar} alt={teacher.name} className="w-12 h-12 rounded-full bg-apple-bg flex-shrink-0" />
                      <div className="min-w-0">
                        <h3 className="text-[15px] font-semibold text-apple-text truncate">{teacher.name}</h3>
                        <p className="text-[12px] text-apple-secondary truncate">{teacher.academicTitle}</p>
                      </div>
                    </div>
                    <p className="text-[13px] text-apple-secondary mb-3 truncate">{teacher.university}</p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {teacher.domain.slice(0, 2).map((d) => (
                        <Badge key={d} variant="blue">{d}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <StarRating rating={Math.round(teacher.rating)} size={14} />
                      <span className="text-[15px] font-semibold text-brand-gold">¥{teacher.price}<span className="text-[12px] text-apple-secondary font-normal">/时</span></span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Course Categories */}
        <section className="py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[28px] font-bold tracking-[-0.3px] text-apple-text">热门课程</h2>
            <Link
              to="/discover/courses"
              className="flex items-center gap-1 text-[14px] text-brand-primary hover:underline"
            >
              查看全部 <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-[14px] whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-brand-primary text-white font-medium'
                    : 'bg-white text-apple-secondary hover:text-apple-text hover:bg-apple-bg'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <motion.div
            key={activeCategory}
            variants={stagger}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 gap-5"
          >
            {filteredCourses.map((course) => (
              <motion.div key={course.id} variants={fadeUp}>
                <Link to={`/teacher/${course.teacherId}`}>
                  <div className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 transition-all duration-200 overflow-hidden">
                    <div className="flex gap-5">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[17px] font-semibold text-apple-text mb-2 truncate">{course.title}</h3>
                        <p className="text-[13px] text-apple-secondary mb-3 line-clamp-2">{course.description}</p>
                        <div className="flex items-center gap-3 min-w-0">
                          <img src={course.teacherAvatar} alt="" className="w-7 h-7 rounded-full bg-apple-bg flex-shrink-0" />
                          <span className="text-[13px] text-apple-text font-medium flex-shrink-0">{course.teacherName}</span>
                          <span className="text-[12px] text-apple-secondary truncate">{course.university}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between flex-shrink-0">
                        <StarRating rating={Math.round(course.rating)} size={13} />
                        <div className="text-right">
                          <span className="text-[17px] font-bold text-brand-gold">¥{course.price}</span>
                          <p className="text-[12px] text-apple-secondary whitespace-nowrap">{course.studentCount} 人学过</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="bg-gradient-to-r from-brand-primary to-brand-primary-light rounded-3xl p-12 text-center">
            <h2 className="text-[28px] font-bold text-white tracking-[-0.3px] mb-3">开启您的知识之旅</h2>
            <p className="text-[15px] text-white/70 mb-8">与顶尖名师一对一交流，获取专属于您的商业智慧</p>
            <div className="flex items-center justify-center gap-4">
              <Button variant="gold" size="lg" onClick={() => navigate('/discover/teachers')}>
                浏览名师 <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="secondary" size="lg" className="!border-white/30 !text-white hover:!bg-white/10">
                了解更多
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 border-t border-black/[0.06]">
          <div className="flex items-center justify-between text-[13px] text-apple-secondary">
            <span>© 2026 师说 · Adatwin. All rights reserved.</span>
            <span>Crafted by Wenxuan Huang</span>
          </div>
        </footer>
      </div>
    </PageTransition>
  )
}
