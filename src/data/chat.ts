import type { ChatMessage } from '../types'

export const chatMessages: ChatMessage[] = [
  { id: '1', sender: 'system', name: '系统', content: '课堂已开始，祝学习愉快！', time: '14:00' },
  { id: '2', sender: 'teacher', name: '王建国教授', content: '张总您好，我们今天主要讨论海外扩张的战略框架。', time: '14:01' },
  { id: '3', sender: 'student', name: '张明远', content: '好的教授，我已经准备好了上次您提到的市场调研材料。', time: '14:02' },
  { id: '4', sender: 'teacher', name: '王建国教授', content: '很好，我们先从东南亚市场切入点开始分析。', time: '14:03' },
  { id: '5', sender: 'student', name: '张明远', content: '我对越南和印尼市场比较感兴趣，但不确定优先级。', time: '14:05' },
  { id: '6', sender: 'teacher', name: '王建国教授', content: '这两个市场各有优劣，我们可以用PEST模型来做对比分析。', time: '14:06' },
  { id: '7', sender: 'student', name: '张明远', content: '好的，我先做笔记。', time: '14:07' },
]
