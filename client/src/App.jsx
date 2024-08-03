import { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css'

import { Footer } from './components/Footer/Footer.jsx'
import { Header } from './components/Header/Header.jsx'

import { HomePage } from './views/Home/HomePage.jsx';
import { LoginPage } from './views/Login/LoginPage.jsx';
import { SingupPage } from './views/Singup/SingupPage.jsx';
import { ProfilePage } from './views/Profile/ProfilePage.jsx';
import { LoansPage } from './views/Loans/LoansPage.jsx';
import { EquipmentPage } from './views/Equipment/EquipmentPage.jsx';
import { ActivitiesPage } from './views/Activities/ActivitiesPage.jsx';
import { ActivityPage } from './views/Activities/ActivityPage.jsx';



import { useAuth } from './hooks/useAuth.js';
import { NotificationsProvider } from './context/notifications.jsx';
import { EquipmentFiltersProvider } from './context/equipmentFilters.jsx';
import { ActivityFiltersProvider } from './context/activityFilters.jsx';
import { ActivityProvider } from './context/activity.jsx';
import { CartProvider } from './context/cart.jsx';


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
        <Route path='/activities' element={<ProtectedRoute><ActivityFiltersProvider>
                                            <ActivitiesPage />
                                          </ActivityFiltersProvider></ProtectedRoute>} />
        <Route path='/activities/new' element={<ProtectedRoute><></></ProtectedRoute>} />
        <Route path='/activities/:activityId' element={<ProtectedRoute><ActivityProvider><ActivityPage /></ActivityProvider></ProtectedRoute>} />
        <Route path='/equipment' element={<ProtectedRoute><EquipmentFiltersProvider><CartProvider>
                                            <EquipmentPage />
                                          </CartProvider></EquipmentFiltersProvider></ProtectedRoute>} />
        <Route path='/profile' element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path='/loans' element={<ProtectedRoute><LoansPage /></ProtectedRoute>} />
        <Route path='/admin' element={<ProtectedRoute><></></ProtectedRoute>} />
        <Route path='*' element={<h1>404 - Ruta inexistente</h1>} />
      </Routes>
      <Footer />
    </>
    

  )
}

export default App
