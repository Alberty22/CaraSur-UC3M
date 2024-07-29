import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/auth.jsx'
import { PopupProvider } from './context/popup.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <PopupProvider>
        <App />
      </PopupProvider>
    </AuthProvider>
  </BrowserRouter>
    
)
