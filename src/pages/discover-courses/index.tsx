import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import StarRating from '../../components/ui/StarRating'
import Badge from '../../components/ui/Badge'
import PageTransition from '../../components/ui/PageTransition'
import { courses, categories } from '../../data/courses'
import type { CourseCategory } from '../../types'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function DiscoverCourses() {
  const [activeCategory, setActiveCategory] = useState<CourseCategory | '全部'>('全部')
  const filtered = activeCategory === '全部' ? courses : courses.filter((c) => c.category === activeCategory)

  return (
    <PageTransition>
      <div className="py-6">
        <h1 className="text-[28px] font-bold tracking-[-0.3px] text-apple-text mb-6">课程发现</h1>

        <div className="flex gap-6">
          {/* Sidebar categories */}
          <div className="w-52 flex-shrink-0">
            <div className="bg-white rounded-2xl p-3 shadow-[0_2px_12px_rgba(0,0,0,0.08)] sticky top-20">
              <span className="block px-3 py-2 text-[11px] font-medium text-apple-secondary uppercase tracking-[0.3px]">课程分类</span>
              <button
                onClick={() => setActiveCategory('全部')}
                className={`w-full text-left px-3 py-2 rounded-lg text-[14px] transition-all duration-200 cursor-pointer ${
                  activeCategory === '全部' ? 'bg-brand-primary/6 text-brand-primary font-semibold' : 'text-apple-secondary hover:text-apple-text hover:bg-apple-bg'
                }`}
              >
                全部课程
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-[14px] transition-all duration-200 cursor-pointer ${
                    activeCategory === cat ? 'bg-brand-primary/6 text-brand-primary font-semibold' : 'text-apple-secondary hover:text-apple-text hover:bg-apple-bg'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Course grid */}
          <div className="flex-1">
            <p className="text-[13px] text-apple-secondary mb-5">
              共 <span className="text-apple-text font-medium">{filtered.length}</span> 门课程
            </p>
            <motion.div
              key={activeCategory}
              variants={stagger}
              initial="hidden"
              animate="show"
              className="space-y-4"
            >
              {filtered.map((course) => (
                <motion.div key={course.id} variants={fadeUp}>
                  <Link to={`/teacher/${course.teacherId}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 transition-all duration-200 overflow-hidden">
                      <div className="flex gap-6">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="blue">{course.category}</Badge>
                          </div>
                          <h3 className="text-[17px] font-semibold text-apple-text mb-2 line-clamp-1">{course.title}</h3>
                          <p className="text-[14px] text-apple-secondary mb-4 leading-relaxed line-clamp-2">{course.description}</p>
                          <div className="flex items-center gap-3 min-w-0">
                            <img src={course.teacherAvatar} alt="" className="w-8 h-8 rounded-full bg-apple-bg flex-shrink-0" />
                            <div className="min-w-0">
                              <span className="text-[14px] text-apple-text font-medium">{course.teacherName}</span>
                              <span className="text-[13px] text-apple-secondary ml-2 truncate">{course.university}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end justify-between flex-shrink-0">
                          <div className="flex items-center gap-2">
                            <StarRating rating={Math.round(course.rating)} size={14} />
                            <span className="text-[13px] text-apple-secondary">{course.rating}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-[22px] font-bold text-brand-gold">¥{course.price}</span>
                            <p className="text-[12px] text-apple-secondary mt-1 whitespace-nowrap">{course.studentCount} 人学过</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
