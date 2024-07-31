import { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css'

import { HomePage } from './views/Home/HomePage.jsx';
import { LoginPage } from './views/Login/LoginPage.jsx';
import { SingupPage } from './views/Singup/SingupPage.jsx';
import { ProfilePage } from './views/Profile/ProfilePage.jsx';
import { LoansPage } from './views/Loans/LoansPage.jsx';
import { EquipmentPage } from './views/Equipment/EquipmentPage.jsx';

import { Footer } from './components/Footer/Footer.jsx'
import { Header } from './components/Header/Header.jsx'

import { useAuth } from './hooks/useAuth.js';
import { NotificationsProvider } from './context/notifications.jsx';


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
      <NotificationsProvider>
        <Header />
      </NotificationsProvider>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/singup' element={<SingupPage />} />
        <Route path='/singup/next-step' element={<SingupPage />} />
        <Route path='/' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path='/activities' element={<ProtectedRoute><></></ProtectedRoute>} />
        <Route path='/activities/new' element={<ProtectedRoute><></></ProtectedRoute>} />
        <Route path='/activities/:activityId' element={<></>} />
        <Route path='/equipment' element={<ProtectedRoute><EquipmentPage /></ProtectedRoute>} />
        <Route path='/equipment/:productId' element={<></>}>
          <Route path='details' element={<></>} />
        </Route>
        <Route path='/profile' element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path='/profile/prueba' element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path='/loans' element={<ProtectedRoute><LoansPage /></ProtectedRoute>} />
        <Route path='/admin' element={<ProtectedRoute><></></ProtectedRoute>} />
        <Route path='*' element={<h1>404 - Ruta inexistente</h1>} />
      </Routes>
      <Footer />
    </>
    

  )
}

export default App
