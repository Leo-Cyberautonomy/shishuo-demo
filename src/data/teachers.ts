import type { Teacher } from '../types'

const universities = [
  '北京大学光华管理学院',
  '清华大学经济管理学院',
  '香港大学商学院',
  '复旦大学管理学院',
  '上海交通大学安泰经济管理学院',
  '中国人民大学商学院',
  '浙江大学管理学院',
  '南京大学商学院',
  '武汉大学经济管理学院',
  '中山大学岭南学院',
  '厦门大学管理学院',
  '北京大学国家发展研究院',
  '长江商学院',
  '中欧国际工商学院',
  '香港中文大学商学院',
]

const domains: string[][] = [
  ['战略管理', '企业创新', '商业模式'],
  ['金融投资', '资本运作', '并购重组'],
  ['领导力', '组织行为学', '团队管理'],
  ['国学智慧', '儒商精神', '传统文化与商道'],
  ['数字化转型', '人工智能', '数据战略'],
  ['品牌营销', '消费者行为', '新零售'],
  ['组织管理', '人力资源', '企业文化'],
  ['创新创业', '风险投资', '新经济'],
  ['宏观经济', '政策解读', '国际贸易'],
  ['财务管理', '税务筹划', '企业上市'],
]

const names = [
  '王建国', '李明远', '陈志华', '张伟东', '刘启明',
  '赵天宇', '孙博文', '周敬之', '吴瑞林', '郑学礼',
  '马骏达', '林清涵', '黄正阳', '杨思远', '胡德望',
  '何镇东', '罗文昭', '谢明辉', '唐国强', '韩志远',
  '曹立鹏', '沈望舒', '彭知行', '萧逸凡',
]

const titles = [
  '教授、博士生导师',
  '讲席教授、院长',
  '副教授、MBA 导师',
  '特聘教授、学术委员会主任',
  '教授、EMBA 项目主任',
  '副院长、教授',
  '杰出教授、终身教职',
  '教授、研究中心主任',
]

const bios = [
  '深耕企业战略管理领域 20 余年，曾为超过 200 家企业提供战略咨询服务，著有多部畅销管理学著作。',
  '金融投资领域权威专家，前华尔街投行高管，精通跨境并购与资本市场运作，培养企业家学员超 500 人。',
  '组织行为学与领导力研究先驱，哈佛商学院访问学者，擅长将前沿理论转化为实用管理工具。',
  '国学智慧与现代管理融合的开创者，国务院特殊津贴专家，以儒家思想赋能企业经营管理。',
  '人工智能与数字化转型领域顶尖学者，多家头部科技企业首席顾问，帮助传统企业完成数字蝶变。',
  '品牌营销领域知名教授，曾主导多个国际品牌在华落地策略，著有《新消费时代的品牌密码》。',
  '人力资源管理专家，中国企业组织变革研究中心主任，服务过数十家世界 500 强企业。',
  '创新创业领域实战派教授，天使投资人，成功孵化超过 30 家高科技企业。',
]

export const teachers: Teacher[] = names.map((name, i) => ({
  id: `TCH-${String(i + 1).padStart(3, '0')}`,
  userId: `USR-${String(i + 100).padStart(8, '0')}`,
  name,
  university: universities[i % universities.length],
  academicTitle: titles[i % titles.length],
  domain: domains[i % domains.length],
  bio: bios[i % bios.length],
  rating: +(4.5 + Math.random() * 0.5).toFixed(1),
  totalStudents: 100 + Math.floor(Math.random() * 400),
  totalCourses: 200 + Math.floor(Math.random() * 600),
  verified: true,
  avatar: `https://api.dicebear.com/9.x/notionists/svg?seed=${name}`,
  coverImage: `https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80`,
  price: [2000, 2500, 3000, 3500, 4000, 5000, 6000, 8000][i % 8],
}))

export function getTeacherById(id: string): Teacher | undefined {
  return teachers.find((t) => t.id === id)
}
