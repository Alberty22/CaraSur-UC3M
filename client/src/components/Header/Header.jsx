import { useEffect, useState } from "react";
import carasur_logo from "../../assets/images/logos/carasur.webp"
import { Menu } from './Menu/Menu.jsx'

import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import './Header.css'
import { DropdownMenu } from './Dropdowns/DropdownMenu.jsx'
import { DropdownNotifications } from "./Dropdowns/DropdownNotifications.jsx";
import useMobileQuery from "../../hooks/useMobileQuery.js";
import { DropdownUser } from "./Dropdowns/DropdowUser.jsx";

export function Header() {
    
    const [isMenu, setIsMenu] = useState(true)

    const { isAuthenticated } = useAuth()

    const isMobile = useMobileQuery('(max-width: 1024px)')
    

    const location = useLocation();

    useEffect(() => {
        const path = location.pathname
    
        if (path === '/login' || path === '/singup') {
            setIsMenu(false)
        }
        else {
            setIsMenu(true)
        }
      }, [location.pathname]);

  
    return (
        <>
        <header>
            { !(isAuthenticated && isMobile) &&
            <div>
                <Link to="/"><img src={carasur_logo} alt="CaraSur UC3M" /></Link>
            </div>
            }
            <Menu isMenu={isMenu} />
        </header>
        <DropdownMenu />
        {
            isAuthenticated &&
            <>
            <DropdownUser />
            <DropdownNotifications />
            </>
        }
        </>
    )
}