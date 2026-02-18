import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, CreditCard, Smartphone, Tag } from 'lucide-react'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import PageTransition from '../../components/ui/PageTransition'
import { teachers } from '../../data/teachers'

const paymentMethods = [
  { id: 'wechat', label: '微信支付', icon: <Smartphone className="w-5 h-5" /> },
  { id: 'alipay', label: '支付宝', icon: <CreditCard className="w-5 h-5" /> },
]

export default function Payment() {
  const navigate = useNavigate()
  const [selectedPayment, setSelectedPayment] = useState('wechat')
  const [coupon, setCoupon] = useState('')
  const [paid, setPaid] = useState(false)

  const teacher = teachers[0]
  const price = 3000
  const discount = coupon === 'SHISHUO' ? 300 : 0
  const finalPrice = price - discount

  if (paid) {
    return (
      <PageTransition>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <div className="w-20 h-20 rounded-full bg-apple-green/10 flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10 text-apple-green" />
          </div>
          <h1 className="text-[28px] font-bold tracking-[-0.3px] text-apple-text mb-2">预约成功！</h1>
          <p className="text-[15px] text-apple-secondary mb-2">
            您已成功预约 {teacher.name} 的 1 对 1 深度辅导
          </p>
          <p className="text-[14px] text-apple-secondary mb-8">
            课程将于预约时间前 15 分钟推送提醒
          </p>
          <div className="flex gap-4">
            <Button onClick={() => navigate(`/classroom/prepare/BKG-${Date.now()}`)}>
              进入课前准备
            </Button>
            <Button variant="secondary" onClick={() => navigate('/')}>
              返回首页
            </Button>
          </div>
        </motion.div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="py-6">
        <h1 className="text-[28px] font-bold tracking-[-0.3px] text-apple-text mb-8">确认支付</h1>

        <div className="space-y-5">
          {/* Order Summary */}
          <Card hover={false}>
            <h3 className="text-[17px] font-semibold text-apple-text mb-4">订单详情</h3>
            <div className="flex items-center gap-4 p-4 bg-apple-bg rounded-xl">
              <img src={teacher.avatar} alt="" className="w-14 h-14 rounded-xl bg-white flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h4 className="text-[15px] font-semibold text-apple-text truncate">{teacher.name}</h4>
                <p className="text-[13px] text-apple-secondary truncate">{teacher.university}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-[13px] text-apple-secondary whitespace-nowrap">1 对 1 深度辅导</p>
                <p className="text-[13px] text-apple-secondary whitespace-nowrap">60 分钟</p>
              </div>
            </div>
          </Card>

          {/* Payment Method */}
          <Card hover={false}>
            <h3 className="text-[17px] font-semibold text-apple-text mb-4">支付方式</h3>
            <div className="space-y-3">
              {paymentMethods.map((pm) => (
                <button
                  key={pm.id}
                  onClick={() => setSelectedPayment(pm.id)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                    selectedPayment === pm.id ? 'border-brand-primary bg-brand-primary/4' : 'border-transparent bg-apple-bg'
                  }`}
                >
                  <div className="text-brand-primary">{pm.icon}</div>
                  <span className="text-[15px] text-apple-text font-medium">{pm.label}</span>
                  {selectedPayment === pm.id && (
                    <div className="ml-auto w-5 h-5 rounded-full bg-brand-primary flex items-center justify-center">
                      <CheckCircle className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </Card>

          {/* Coupon */}
          <Card hover={false}>
            <h3 className="text-[17px] font-semibold text-apple-text mb-4">优惠券</h3>
            <div className="flex gap-3">
              <Input
                placeholder="输入优惠券码（试试 SHISHUO）"
                className="flex-1"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value.toUpperCase())}
              />
              <Button variant="secondary" size="sm">
                <Tag className="w-4 h-4 mr-1" /> 使用
              </Button>
            </div>
            <AnimatePresence>
              {discount > 0 && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="text-[14px] text-apple-green mt-3 font-medium"
                >
                  已优惠 ¥{discount}
                </motion.p>
              )}
            </AnimatePresence>
          </Card>

          {/* Price Summary */}
          <Card hover={false}>
            <div className="space-y-3 text-[15px]">
              <div className="flex justify-between">
                <span className="text-apple-secondary">课程费用</span>
                <span className="text-apple-text">¥{price.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between">
                  <span className="text-apple-secondary">优惠减免</span>
                  <span className="text-apple-green">-¥{discount}</span>
                </div>
              )}
              <div className="flex justify-between pt-4 border-t border-black/[0.06]">
                <span className="text-apple-text font-semibold text-[17px]">实付金额</span>
                <span className="text-[28px] font-bold text-brand-gold tracking-[-0.3px]">¥{finalPrice.toLocaleString()}</span>
              </div>
            </div>
          </Card>

          <Button variant="gold" size="lg" className="w-full" onClick={() => setPaid(true)}>
            确认支付 ¥{finalPrice.toLocaleString()}
          </Button>
        </div>
      </div>
    </PageTransition>
  )
}
