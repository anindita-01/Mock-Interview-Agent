import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import InterviewPage from './pages/InterviewPage'
import InterviewHistory from './pages/InterviewHistory'
import Pricing from './pages/Pricing'
import InterviewReport from './pages/InterviewReport'
import AuthSync from './components/AuthSync'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <>
      <AuthSync />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/register' element={<Auth initialMode="register" />} />
        <Route path='/interview' element={<ProtectedRoute><InterviewPage /></ProtectedRoute>} />
        <Route path='/history' element={<ProtectedRoute><InterviewHistory /></ProtectedRoute>} />
        <Route path='/pricing' element={<ProtectedRoute><Pricing /></ProtectedRoute>} />
        <Route path='/report/:id' element={<ProtectedRoute><InterviewReport /></ProtectedRoute>} />
      </Routes>
    </>
  )
}

export default App
