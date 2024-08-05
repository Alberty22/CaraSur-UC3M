import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/auth.jsx'
import { DropdownProvider } from './context/dropdown.jsx'
import { PopupProvider } from './context/popup.jsx'
import './i18n/config'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PopupProvider>
          <DropdownProvider>
            <App />
          </DropdownProvider>
        </PopupProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
  
    
)
