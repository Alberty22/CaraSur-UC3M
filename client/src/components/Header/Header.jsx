import { useEffect, useState } from "react";
import carasur_logo from "../../assets/images/logos/carasur.webp"
import { Menu } from './Menu.jsx'
import { DropdownMenu } from './DropdownMenu.jsx'
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import './Header.css'
import { DropdownNotifications } from "./DropdownNotifications.jsx";
import useMobileQuery from "../../hooks/useMobileQuery.js";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
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

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    const toggleNotifications = () => setIsNotificationsOpen(!isNotificationsOpen)

    const closeMenu = () => {setIsMenuOpen(false); setIsNotificationsOpen(false)}
  
    return (
        <>
        <header>
            { !(isAuthenticated && isMobile) &&
            <div>
                <Link to="/"><img src={carasur_logo} alt="CaraSur UC3M" /></Link>
            </div>
            }
            <Menu toggleMenu={toggleMenu} isMenu={isMenu} toggleNotifications={toggleNotifications}/>
        </header>
        <DropdownMenu closeMenu={closeMenu} isOpen={isMenuOpen}/>
        {
            isAuthenticated &&
            <>
            <DropdownNotifications closeMenu={closeMenu} isOpen={isNotificationsOpen}/>
            </>
        }
        </>
    )
}