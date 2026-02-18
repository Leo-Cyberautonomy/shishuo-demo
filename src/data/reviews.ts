import type { Review } from '../types'
import { teachers } from './teachers'

const reviewContents = [
  '非常专业，一针见血地指出了我们战略上的盲区，收获巨大。',
  '教授的课程深入浅出，把复杂的金融理论讲得非常透彻，受益匪浅。',
  '终于找到一位真正理解企业家痛点的名师，每次交流都有醍醐灌顶的感觉。',
  '课后还主动分享了很多实用资料，这种服务态度让人感动。',
  '理论功底深厚，又有丰富的实战经验，是难得的好老师。',
  '小班研讨的氛围特别好，同学之间的交流也很有价值。',
  '教授对数字化转型的见解非常前瞻，帮助我们公司少走了很多弯路。',
  '国学视角看企业管理，打开了我的认知边界，强烈推荐。',
  '一对一辅导的效率极高，60 分钟解决了困扰我半年的问题。',
  '品牌营销的课程非常实用，回去就能落地执行。',
  '教授不仅学术水平高，而且非常平易近人，沟通毫无压力。',
  '系统性地梳理了组织管理的核心框架，对公司升级非常有帮助。',
  '投资视角非常独到，帮助我重新审视了公司的估值逻辑。',
  '创新创业的案例分析特别精彩，每个案例都有深度剖析。',
  '领导力提升课让我重新认识了自己的管理风格，触动很大。',
]

const studentNames = [
  '张明远', '李思齐', '王浩然', '刘雨桐', '陈星辰',
  '赵鹏程', '孙悦来', '周子涵', '吴昊天', '郑凯文',
  '马一鸣', '林书豪', '黄海涛', '杨子墨', '胡晓光',
  '何文杰', '罗天翔', '谢伟民', '唐振华', '韩晓东',
]

const companies = [
  '远景资本', '盛达科技', '华信集团', '嘉和实业', '中启控股',
  '博远投资', '鼎新科技', '恒通商贸', '安泰集团', '瑞丰控股',
  '锦辉地产', '明德教育', '创领科技', '汇智咨询', '融通资管',
  '启迪环保', '宏图电子', '新锐传媒', '康健医疗', '通达物流',
]

const titles = [
  '创始人兼 CEO', '董事长', '总裁', '联合创始人', 'COO',
  '执行董事', '合伙人', 'CFO', '副总裁', '总经理',
]

export const reviews: Review[] = Array.from({ length: 60 }, (_, i) => {
  const teacher = teachers[i % teachers.length]
  const daysAgo = Math.floor(Math.random() * 60)
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)

  return {
    id: `REV-${String(i + 1).padStart(3, '0')}`,
    bookingId: `BKG-${String(i + 1).padStart(8, '0')}`,
    studentId: `USR-${String(i + 1000).padStart(8, '0')}`,
    teacherId: teacher.id,
    studentName: studentNames[i % studentNames.length],
    studentAvatar: `https://api.dicebear.com/9.x/notionists/svg?seed=student${i}`,
    studentCompany: companies[i % companies.length],
    studentTitle: titles[i % titles.length],
    rating: [5, 5, 5, 5, 4, 5, 5, 4, 5, 5][i % 10],
    content: reviewContents[i % reviewContents.length],
    createdAt: date.toISOString(),
  }
})

export function getReviewsByTeacherId(teacherId: string): Review[] {
  return reviews.filter((r) => r.teacherId === teacherId)
}
