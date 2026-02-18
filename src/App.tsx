import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import TopNavLayout from './layouts/TopNavLayout'
import MinimalLayout from './layouts/MinimalLayout'
import FullScreenLayout from './layouts/FullScreenLayout'
import Home from './pages/home'
import DiscoverTeachers from './pages/discover-teachers'
import DiscoverCourses from './pages/discover-courses'
import TeacherProfile from './pages/teacher-profile'
import Booking from './pages/booking'
import Payment from './pages/payment'
import ClassroomPrepare from './pages/classroom-prepare'
import Classroom from './pages/classroom'

export default function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<TopNavLayout />}>
          <Route path="/discover/teachers" element={<DiscoverTeachers />} />
          <Route path="/discover/courses" element={<DiscoverCourses />} />
          <Route path="/teacher/:id" element={<TeacherProfile />} />
          <Route path="/booking/:teacherId" element={<Booking />} />
        </Route>

        <Route element={<MinimalLayout />}>
          <Route path="/payment/:bookingId" element={<Payment />} />
          <Route path="/classroom/prepare/:bookingId" element={<ClassroomPrepare />} />
        </Route>

        <Route element={<FullScreenLayout />}>
          <Route path="/classroom/:bookingId" element={<Classroom />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}
