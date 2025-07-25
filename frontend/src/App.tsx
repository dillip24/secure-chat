
import './App.css'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoutes'
import ChatBox from './components/ChatBox'



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatBox />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
