import { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css'

import { HomePage } from './views/Home/HomePage.jsx';
import { LoginPage } from './views/Login/LoginPage.jsx';
import { SingupPage } from './views/Singup/SingupPage.jsx';

import { Footer } from './components/Footer/Footer.jsx'
import { Header } from './components/Header/Header.jsx'

import { useAuth } from './hooks/useAuth.js';


function App() {
  const [user, setUser] = useState(null)
  const location = useLocation()

  const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth()
  
    if(!isAuthenticated) {
      return <Navigate to='/login' state={{ location }}/>
    }
  
    return children
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/singup' element={<SingupPage />} />
        <Route path='/singup/next-step' element={<SingupPage />} />
        <Route path='/home' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path='/activities' element={<ProtectedRoute><></></ProtectedRoute>} />
        <Route path='/activities/new' element={<ProtectedRoute><></></ProtectedRoute>} />
        <Route path='/activities/:activityId' element={<></>} />
        <Route path='/equipment' element={<ProtectedRoute><></></ProtectedRoute>} />
        <Route path='/equipment/:productId' element={<></>}>
          <Route path='details' element={<></>} />
        </Route>
        <Route path='/profile' element={<ProtectedRoute><></></ProtectedRoute>} />
        <Route path='/admin' element={<ProtectedRoute><></></ProtectedRoute>} />
        <Route path='*' element={<h1>404 - Ruta inexistente</h1>} />
      </Routes>
      <Footer />
    </>
    

  )
}

export default App
