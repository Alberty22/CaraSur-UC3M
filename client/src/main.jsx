import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/auth.jsx';
import { DropdownProvider } from './context/dropdown.jsx';
import { PopupProvider } from './context/popup.jsx';
import { UsersProvider } from './context/users.jsx';
import './i18n/config'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <UsersProvider>
    <AuthProvider>
      <PopupProvider>
        <DropdownProvider>
          <App />
        </DropdownProvider>
      </PopupProvider>
    </AuthProvider>
    </UsersProvider>
  </BrowserRouter>
)
