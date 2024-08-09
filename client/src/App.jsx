import { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './App.css'

import { Footer } from './components/Footer/Footer.jsx';
import { Header } from './components/Header/Header.jsx';
import { ScrollToTop } from './components/others/ScrollToTop.jsx';

import { HomePage } from './views/Home/HomePage.jsx';
import { LoginPage } from './views/Login/LoginPage.jsx';
import { SingupPage } from './views/Singup/SingupPage.jsx';
import { ProfilePage } from './views/Profile/ProfilePage.jsx';
import { LoansPage } from './views/Loans/LoansPage.jsx';
import { EquipmentPage } from './views/Equipment/EquipmentPage.jsx';
import { ActivitiesPage } from './views/Activities/ActivitiesPage.jsx';
import { ActivityPage } from './views/Activities/ActivityPage.jsx';
import { NewActivity } from './views/Activities/NewActivity.jsx';
import { AdminPage } from './views/Admin/AdminPage.jsx';
import { AdminSettingsPage } from './views/Admin/Settings/AdminSettingsPage.jsx';
import { AdminUsersPage } from './views/Admin/Users/AdminUsersPage.jsx';
import { AdminEquipmentPage } from './views/Admin/Equipment/AdminEquipmentPage.jsx';
import { AdminLoansPage } from './views/Admin/Loans/AdminLoansPage.jsx';
import { AdminActivitiesPage } from './views/Admin/Activities/AdminActivitiesPage.jsx';
import { AdminNotificationsPage } from './views/Admin/Notifications/AdminNotificationsPage.jsx';

import { NotificationsProvider } from './context/notifications.jsx';
import { EquipmentFiltersProvider } from './context/equipmentFilters.jsx';
import { ActivityFiltersProvider } from './context/activityFilters.jsx';
import { ActivityProvider } from './context/activity.jsx';
import { CartProvider } from './context/cart.jsx';

import { ProtectedRoute } from './components/Routes/ProtectedRoute.jsx';
import { AdminRoute } from './components/Routes/AdminRoute.jsx';

import { useLanguageFromURL } from './hooks/useLanguageURL.js';

function App() {
  
  useLanguageFromURL()

  return (
    <>
      <NotificationsProvider>
        <Header />
      </NotificationsProvider>
      <ScrollToTop />
      <Routes>
        <Route path='/:lng' element={<HomePage />} />
        <Route path='/:lng/login' element={<LoginPage />} />
        <Route path='/:lng/singup' element={<SingupPage />} />
        <Route path='/:lng/singup/next-step' element={<SingupPage />} />
        <Route path='/:lng/activities' element={<ProtectedRoute><ActivityFiltersProvider>
                                            <ActivitiesPage />
                                          </ActivityFiltersProvider></ProtectedRoute>} />
        <Route path='/:lng/activities/new' element={<ProtectedRoute><NewActivity /></ProtectedRoute>} />
        <Route path='/:lng/activities/:activityId' element={<ProtectedRoute><ActivityProvider><ActivityPage /></ActivityProvider></ProtectedRoute>} />
        <Route path='/:lng/equipment' element={<ProtectedRoute><EquipmentFiltersProvider><CartProvider>
                                            <EquipmentPage />
                                          </CartProvider></EquipmentFiltersProvider></ProtectedRoute>} />
        <Route path='/:lng/profile' element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path='/:lng/loans' element={<ProtectedRoute><LoansPage /></ProtectedRoute>} />
        <Route path='/:lng/admin' element={<AdminRoute><AdminPage /></AdminRoute>} />
        <Route path='/:lng/admin/settings' element={<AdminRoute><AdminSettingsPage /></AdminRoute>} />
        <Route path='/:lng/admin/users' element={<AdminRoute><AdminUsersPage /></AdminRoute>} />
        <Route path='/:lng/admin/equipment' element={<AdminRoute><AdminEquipmentPage /></AdminRoute>} />
        <Route path='/:lng/admin/loans' element={<AdminRoute><AdminLoansPage /></AdminRoute>} />
        <Route path='/:lng/admin/activities' element={<AdminRoute><AdminActivitiesPage /></AdminRoute>} />
        <Route path='/:lng/admin/notifications' element={<AdminRoute><AdminNotificationsPage /></AdminRoute>} />
        <Route path="/" element={<Navigate to="/es/" />} />
        <Route path='*' element={<h1>404 - Ruta inexistente</h1>} />
      </Routes>
      <Footer />
    </>
    

  )
}

export default App
