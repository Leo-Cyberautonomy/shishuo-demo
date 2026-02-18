import type { Course, CourseCategory } from '../types'
import { teachers } from './teachers'

export const categories: CourseCategory[] = [
  '战略管理',
  '金融投资',
  '领导力',
  '国学智慧',
  '数字化转型',
  '品牌营销',
  '组织管理',
  '创新创业',
]

const courseTitles: Record<CourseCategory, string[]> = {
  战略管理: [
    '企业战略定位与核心竞争力构建',
    '全球化背景下的中国企业战略',
    '商业模式创新与价值重构',
    '战略思维与决策艺术',
  ],
  金融投资: [
    '资本运作与企业并购实务',
    '私募股权投资实战进阶',
    '企业上市路径规划与实操',
    '宏观经济形势与投资策略',
  ],
  领导力: [
    '卓越领导力修炼之道',
    '变革时代的组织领导力',
    '高管情商与影响力塑造',
    '危机领导力与韧性管理',
  ],
  国学智慧: [
    '《孙子兵法》与商战谋略',
    '儒家管理哲学与企业治理',
    '道家思想与企业家心性修养',
    '中国传统文化与商道智慧',
  ],
  数字化转型: [
    'AI 驱动的企业数字化转型',
    '数据资产化与商业智能',
    '产业互联网与平台战略',
    '数字化组织变革实践',
  ],
  品牌营销: [
    '新消费时代的品牌方法论',
    '社交媒体营销与私域增长',
    '高端品牌塑造与价值传播',
    'Z 世代消费洞察与营销创新',
  ],
  组织管理: [
    '高绩效组织设计与人才战略',
    '企业文化建设与组织凝聚力',
    '薪酬激励体系与股权设计',
    '组织敏捷转型与流程优化',
  ],
  创新创业: [
    '从 0 到 1：创业方法论',
    '颠覆式创新与蓝海战略',
    '融资谈判与投资人关系',
    '科技创新与产业升级路径',
  ],
}

export const courses: Course[] = categories.flatMap((category, cIdx) =>
  courseTitles[category].map((title, tIdx) => {
    const teacherIdx = (cIdx * 4 + tIdx) % teachers.length
    const teacher = teachers[teacherIdx]
    return {
      id: `CRS-${String(cIdx * 4 + tIdx + 1).padStart(3, '0')}`,
      title,
      category,
      description: `由${teacher.university}${teacher.name}教授主讲，结合前沿理论与丰富实战案例，助力企业家学员深度成长。`,
      teacherId: teacher.id,
      teacherName: teacher.name,
      teacherAvatar: teacher.avatar,
      university: teacher.university,
      price: [2000, 2500, 3000, 3500, 4000][tIdx % 5],
      rating: +(4.5 + Math.random() * 0.5).toFixed(1),
      studentCount: 50 + Math.floor(Math.random() * 300),
      coverImage: `https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&q=80`,
    }
  })
)

export function getCoursesByCategory(category: CourseCategory): Course[] {
  return courses.filter((c) => c.category === category)
}
