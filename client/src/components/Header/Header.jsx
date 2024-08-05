import { useEffect, useState } from "react";
import carasur_logo from "../../assets/images/logos/carasur.webp"
import { Menu } from './Menu/Menu.jsx'

import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import './Header.css'
import { DropdownMenu } from './Dropdowns/DropdownMenu.jsx'
import { DropdownNotifications } from "./Dropdowns/DropdownNotifications.jsx";
import useMobileQuery from "../../hooks/useMobileQuery.js";
import { DropdownUser } from "./Dropdowns/DropdownUser.jsx";
import { useRef } from "react";

export function Header() {
    
    const [isMenu, setIsMenu] = useState(true)

    const { isAuthenticated } = useAuth()

    const isMobile = useMobileQuery('(max-width: 1024px)')
    

    const location = useLocation();

    useEffect(() => {
        const route = location.pathname.split('/');
    
        if (route[route.length - 1] === 'login' || route[route.length - 1] === 'singup') {
            setIsMenu(false)
        }
        else {
            setIsMenu(true)
        }
      }, [location.pathname]);

    
    const menuRef = useRef(null)
    const notificationsRef = useRef(null)
    const userRef = useRef(null)

    return (
        <>
        <header>
            { !(isAuthenticated && isMobile) &&
            <div>
                <Link to="/"><img src={carasur_logo} alt="CaraSur UC3M" /></Link>
            </div>
            }
            <Menu isMenu={isMenu} refList={{menu:menuRef, notifications:notificationsRef, user:userRef}}/>
        </header>
        <DropdownMenu ref={menuRef}/>
        {
            isAuthenticated &&
            <>
            <DropdownUser ref={userRef}/>
            <DropdownNotifications ref={notificationsRef}/>
            </>
        }
        </>
    )
}