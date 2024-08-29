import './Header.css';

import { Link, useLocation } from "react-router-dom";
import { DropdownMenu } from './Dropdowns/DropdownMenu.jsx';
import { DropdownNotifications } from "./Dropdowns/DropdownNotifications.jsx";
import { DropdownUser } from "./Dropdowns/DropdownUser.jsx";
import { Menu } from './Menu/Menu.jsx';

import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth.js";
import useMobileQuery from "../../hooks/useMobileQuery.js";
import { useRef } from "react";

import carasur_logo from "../../assets/images/logos/carasur.webp";

export function Header() {
    
    const [isMenu, setIsMenu] = useState(true);

    const { isAuthenticated } = useAuth();

    const isMobile = useMobileQuery('(max-width: 1024px)');
    

    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const lng = pathSegments[1];

    useEffect(() => {
        const route = location.pathname.split('/');
    
        if (route[route.length - 1] === 'login' || route[route.length - 1] === 'signup') {
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
            <div className={`header-container-${isMenu}`}>
                { !(isAuthenticated && isMobile) &&
                <div>
                    <Link to={`/${lng}/`}><img src={carasur_logo} alt="CaraSur UC3M" /></Link>
                </div>
                }
                <Menu isMenu={isMenu} refList={{menu:menuRef, notifications:notificationsRef, user:userRef}}/>
            </div>
            
        </header>
        <div className="space"></div>
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