import './LoginPage.css'

import { LoginMain } from './Main/LoginMain.jsx';
import useMobileQuery from "../../hooks/useMobileQuery.js";
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';


export function LoginPage() {

    const { isAuthenticated, login, logout } = useAuth()
    const navigate = useNavigate()
    const { state } = useLocation()
    


    const handleClick = () => {
        console.log(isAuthenticated)
        if (isAuthenticated) {
        logout()
        navigate('/')
        }
        else {
        login()
        navigate(state?.location?.pathname ?? '/home')
        
        }
        

    }
    
    return (
        <>
        <LoginMain />
        </>
    )
}
