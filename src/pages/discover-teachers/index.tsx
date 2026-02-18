import { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SlidersHorizontal } from 'lucide-react'
import SearchInput from '../../components/ui/SearchInput'
import Badge from '../../components/ui/Badge'
import StarRating from '../../components/ui/StarRating'
import PageTransition from '../../components/ui/PageTransition'
import { teachers } from '../../data/teachers'

const universities = ['全部', '北京大学', '清华大学', '香港大学', '复旦大学', '长江商学院', '中欧国际工商学院']
const domains = ['全部', '战略管理', '金融投资', '领导力', '国学智慧', '数字化转型', '品牌营销', '组织管理', '创新创业']

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function DiscoverTeachers() {
  const [searchParams] = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('q') || '')
  const [uniFilter, setUniFilter] = useState('全部')
  const [domainFilter, setDomainFilter] = useState('全部')
  const [showFilters, setShowFilters] = useState(true)

  const filtered = useMemo(() => {
    return teachers.filter((t) => {
      if (search && !t.name.includes(search) && !t.domain.some((d) => d.includes(search)) && !t.university.includes(search)) return false
      if (uniFilter !== '全部' && !t.university.includes(uniFilter)) return false
      if (domainFilter !== '全部' && !t.domain.includes(domainFilter)) return false
      return true
    })
  }, [search, uniFilter, domainFilter])

  return (
    <PageTransition>
      <div className="py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[28px] font-bold tracking-[-0.3px] text-apple-text">名师发现</h1>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-[14px] text-apple-secondary hover:bg-white transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" />
            筛选
          </button>
        </div>

        <SearchInput
          placeholder="搜索名师姓名、院校或领域..."
          className="mb-6"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-6 space-y-4"
          >
            <div>
              <span className="text-[12px] font-medium text-apple-secondary uppercase tracking-[0.3px] mb-2 block">院校</span>
              <div className="flex flex-wrap gap-2">
                {universities.map((u) => (
                  <button
                    key={u}
                    onClick={() => setUniFilter(u)}
                    className={`px-3 py-1.5 rounded-lg text-[13px] transition-all duration-200 cursor-pointer ${
                      uniFilter === u
                        ? 'bg-brand-primary text-white'
                        : 'bg-white text-apple-secondary hover:text-apple-text'
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className="text-[12px] font-medium text-apple-secondary uppercase tracking-[0.3px] mb-2 block">领域</span>
              <div className="flex flex-wrap gap-2">
                {domains.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDomainFilter(d)}
                    className={`px-3 py-1.5 rounded-lg text-[13px] transition-all duration-200 cursor-pointer ${
                      domainFilter === d
                        ? 'bg-brand-primary text-white'
                        : 'bg-white text-apple-secondary hover:text-apple-text'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        <p className="text-[13px] text-apple-secondary mb-5">
          共找到 <span className="text-apple-text font-medium">{filtered.length}</span> 位名师
        </p>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="grid grid-cols-3 gap-5"
        >
          {filtered.map((teacher) => (
            <motion.div key={teacher.id} variants={fadeUp}>
              <Link to={`/teacher/${teacher.id}`}>
                <div className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 transition-all duration-200 overflow-hidden">
                  <div className="flex items-center gap-4 mb-4">
                    <img src={teacher.avatar} alt={teacher.name} className="w-14 h-14 rounded-full bg-apple-bg flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-[17px] font-semibold text-apple-text truncate">{teacher.name}</h3>
                        {teacher.verified && <Badge variant="gold">认证</Badge>}
                      </div>
                      <p className="text-[13px] text-apple-secondary truncate">{teacher.academicTitle}</p>
                    </div>
                  </div>
                  <p className="text-[13px] text-apple-secondary mb-3 truncate">{teacher.university}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4 overflow-hidden max-h-[56px]">
                    {teacher.domain.map((d) => (
                      <Badge key={d} variant="blue">{d}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-black/[0.06]">
                    <div className="flex items-center gap-2">
                      <StarRating rating={Math.round(teacher.rating)} size={14} />
                      <span className="text-[13px] text-apple-secondary">{teacher.rating}</span>
                    </div>
                    <span className="text-[17px] font-semibold text-brand-gold whitespace-nowrap">
                      ¥{teacher.price}<span className="text-[12px] text-apple-secondary font-normal">/时</span>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PageTransition>
  )
}
