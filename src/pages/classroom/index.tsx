import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mic, MicOff, Camera, CameraOff, MonitorUp, Hand, MessageSquare,
  ChevronLeft, ChevronRight, Phone, Send, FileText
} from 'lucide-react'
import Modal from '../../components/ui/Modal'
import Button from '../../components/ui/Button'
import StarRating from '../../components/ui/StarRating'
import { teachers } from '../../data/teachers'
import { chatMessages as initialMessages } from '../../data/chat'
import type { ChatMessage } from '../../types'

export default function Classroom() {
  const navigate = useNavigate()
  const teacher = teachers[0]

  const [micOn, setMicOn] = useState(true)
  const [camOn, setCamOn] = useState(true)
  const [sharing, setSharing] = useState(false)
  const [handRaised, setHandRaised] = useState(false)
  const [rightPanel, setRightPanel] = useState<'chat' | 'slides'>('slides')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showEndModal, setShowEndModal] = useState(false)
  const [showReview, setShowReview] = useState(false)
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewText, setReviewText] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [newMsg, setNewMsg] = useState('')

  const slides = [
    { title: '企业海外扩张战略框架', content: '全球化战略 · 市场进入模式 · 本土化适应' },
    { title: '东南亚市场分析', content: 'PEST 分析 · 竞争格局 · 增长机会' },
    { title: '市场进入策略对比', content: '直接投资 vs 合资 vs 并购 · 风险评估矩阵' },
    { title: '案例研究', content: '华为国际化路径 · 字节跳动东南亚布局' },
    { title: '行动计划与建议', content: '分阶段实施路线图 · 资源配置 · 风险对冲' },
  ]

  const sendMessage = () => {
    if (!newMsg.trim()) return
    setMessages((prev) => [
      ...prev,
      { id: String(Date.now()), sender: 'student', name: '张明远', content: newMsg, time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }) },
    ])
    setNewMsg('')
  }

  const handleEndClass = () => {
    setShowEndModal(false)
    setShowReview(true)
  }

  const submitReview = () => {
    setShowReview(false)
    navigate('/')
  }

  return (
    <div className="h-full flex flex-col">
      {/* Top Bar */}
      <div className="h-12 bg-[#2C2C2E] flex items-center justify-between px-5 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-apple-green animate-pulse" />
          <span className="text-[14px] text-white/80 font-medium">课堂进行中</span>
          <span className="text-[13px] text-white/40">· 已持续 23:45</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[13px] text-white/60">与 {teacher.name} 的 1 对 1 授课</span>
          <button
            onClick={() => setShowEndModal(true)}
            className="px-3 py-1.5 rounded-lg bg-apple-red/90 text-white text-[13px] font-medium hover:bg-apple-red transition-colors cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5 inline mr-1 rotate-[135deg]" /> 结束课程
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video Area */}
        <div className="flex-1 flex flex-col p-4 gap-4">
          {/* Teacher Video (main) */}
          <div className="flex-1 bg-[#2C2C2E] rounded-2xl relative overflow-hidden flex items-center justify-center">
            <div className="text-center">
              <img src={teacher.avatar} alt="" className="w-24 h-24 rounded-full mx-auto mb-4 bg-[#3C3C3E]" />
              <p className="text-white/80 text-[17px] font-semibold">{teacher.name}</p>
              <p className="text-white/40 text-[13px]">{teacher.university}</p>
            </div>
            <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/50 rounded-lg text-white/80 text-[12px]">
              {teacher.name}
            </div>
          </div>

          {/* Student Video (PiP) */}
          <div className="h-32 w-44 bg-[#2C2C2E] rounded-xl absolute bottom-20 left-4 border border-white/10 flex items-center justify-center z-10">
            {camOn ? (
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-brand-primary mx-auto mb-2 flex items-center justify-center text-white text-[17px] font-semibold">张</div>
                <p className="text-white/60 text-[12px]">张明远（我）</p>
              </div>
            ) : (
              <CameraOff className="w-8 h-8 text-white/30" />
            )}
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-[380px] bg-[#2C2C2E] border-l border-white/[0.08] flex flex-col flex-shrink-0">
          {/* Panel Tabs */}
          <div className="flex border-b border-white/[0.08]">
            <button
              onClick={() => setRightPanel('slides')}
              className={`flex-1 py-3 text-[14px] font-medium text-center transition-colors cursor-pointer ${
                rightPanel === 'slides' ? 'text-white border-b-2 border-brand-gold' : 'text-white/40 hover:text-white/60'
              }`}
            >
              <FileText className="w-4 h-4 inline mr-1.5" /> 课件
            </button>
            <button
              onClick={() => setRightPanel('chat')}
              className={`flex-1 py-3 text-[14px] font-medium text-center transition-colors cursor-pointer ${
                rightPanel === 'chat' ? 'text-white border-b-2 border-brand-gold' : 'text-white/40 hover:text-white/60'
              }`}
            >
              <MessageSquare className="w-4 h-4 inline mr-1.5" /> 聊天
            </button>
          </div>

          <AnimatePresence mode="wait">
            {rightPanel === 'slides' ? (
              <motion.div
                key="slides"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col p-4"
              >
                <div className="flex-1 bg-[#3C3C3E] rounded-xl p-8 flex flex-col items-center justify-center text-center">
                  <p className="text-[11px] text-white/30 uppercase tracking-[0.3px] mb-6">
                    {currentSlide + 1} / {slides.length}
                  </p>
                  <h3 className="text-[22px] font-semibold text-white mb-3">{slides[currentSlide].title}</h3>
                  <p className="text-[15px] text-white/50">{slides[currentSlide].content}</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <button
                    disabled={currentSlide === 0}
                    onClick={() => setCurrentSlide((p) => p - 1)}
                    className="p-2 rounded-lg hover:bg-white/10 disabled:opacity-30 text-white/60 transition-colors cursor-pointer disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-[13px] text-white/40">{currentSlide + 1} / {slides.length}</span>
                  <button
                    disabled={currentSlide === slides.length - 1}
                    onClick={() => setCurrentSlide((p) => p + 1)}
                    className="p-2 rounded-lg hover:bg-white/10 disabled:opacity-30 text-white/60 transition-colors cursor-pointer disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col"
              >
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex gap-2 ${msg.sender === 'system' ? 'justify-center' : ''}`}>
                      {msg.sender === 'system' ? (
                        <span className="text-[12px] text-white/30 bg-white/5 px-3 py-1 rounded-full">{msg.content}</span>
                      ) : (
                        <>
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-medium flex-shrink-0 ${
                            msg.sender === 'teacher' ? 'bg-brand-gold/20 text-brand-gold' : 'bg-brand-primary/30 text-blue-300'
                          }`}>
                            {msg.name[0]}
                          </div>
                          <div>
                            <div className="flex items-baseline gap-2">
                              <span className="text-[12px] text-white/50 font-medium">{msg.name}</span>
                              <span className="text-[11px] text-white/20">{msg.time}</span>
                            </div>
                            <p className="text-[14px] text-white/80 mt-0.5 leading-relaxed">{msg.content}</p>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-white/[0.08]">
                  <div className="flex gap-2">
                    <input
                      className="flex-1 h-9 px-3 bg-[#3C3C3E] rounded-lg text-[14px] text-white placeholder:text-white/30 outline-none border border-transparent focus:border-brand-gold/50 transition-colors"
                      placeholder="输入消息..."
                      value={newMsg}
                      onChange={(e) => setNewMsg(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <button onClick={sendMessage} className="p-2 rounded-lg bg-brand-gold text-white hover:bg-brand-gold-light transition-colors cursor-pointer">
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Toolbar */}
      <div className="h-16 bg-[#2C2C2E] border-t border-white/[0.08] flex items-center justify-center gap-2 flex-shrink-0 px-4">
        {[
          { icon: micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />, label: micOn ? '静音' : '取消静音', active: micOn, onClick: () => setMicOn(!micOn), danger: !micOn },
          { icon: camOn ? <Camera className="w-5 h-5" /> : <CameraOff className="w-5 h-5" />, label: camOn ? '关闭摄像头' : '开启摄像头', active: camOn, onClick: () => setCamOn(!camOn), danger: !camOn },
          { icon: <MonitorUp className="w-5 h-5" />, label: sharing ? '停止共享' : '屏幕共享', active: sharing, onClick: () => setSharing(!sharing) },
          { icon: <Hand className="w-5 h-5" />, label: '举手提问', active: handRaised, onClick: () => setHandRaised(!handRaised) },
        ].map((btn, i) => (
          <button
            key={i}
            onClick={btn.onClick}
            className={`flex flex-col items-center gap-1 px-5 py-1.5 rounded-xl transition-all duration-200 cursor-pointer whitespace-nowrap ${
              btn.danger ? 'bg-apple-red/20 text-apple-red' :
              btn.active ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white/80 hover:bg-white/5'
            }`}
          >
            {btn.icon}
            <span className="text-[11px]">{btn.label}</span>
          </button>
        ))}
      </div>

      {/* End Class Modal */}
      <Modal open={showEndModal} onClose={() => setShowEndModal(false)} title="结束课程">
        <p className="text-[15px] text-apple-secondary mb-6">确定要结束本次课程吗？结束后将进入课后评价。</p>
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={() => setShowEndModal(false)}>继续上课</Button>
          <Button variant="danger" onClick={handleEndClass}>结束课程</Button>
        </div>
      </Modal>

      {/* Review Modal */}
      <Modal open={showReview} onClose={() => { setShowReview(false); navigate('/') }} title="课后评价">
        <div className="text-center mb-6">
          <img src={teacher.avatar} alt="" className="w-16 h-16 rounded-full mx-auto mb-3 bg-apple-bg" />
          <p className="text-[17px] font-semibold text-apple-text">{teacher.name}</p>
          <p className="text-[13px] text-apple-secondary">1 对 1 深度辅导 · 60 分钟</p>
        </div>
        <div className="flex justify-center mb-6">
          <StarRating rating={reviewRating} size={32} interactive onChange={setReviewRating} />
        </div>
        <textarea
          className="w-full h-24 px-4 py-3 bg-apple-bg rounded-[10px] text-apple-text text-[15px] placeholder:text-apple-secondary outline-none border-2 border-transparent focus:border-brand-primary transition-[border-color] duration-200 resize-none mb-6"
          placeholder="分享您的课程体验..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
        <Button variant="gold" size="lg" className="w-full" onClick={submitReview}>
          提交评价
        </Button>
      </Modal>
    </div>
  )
}
