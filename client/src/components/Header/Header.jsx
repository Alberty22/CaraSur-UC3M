import { useEffect, useState } from "react";
import carasur_logo from "../../assets/images/logos/carasur.webp"
import { Menu } from './Menu.jsx'
import { DropdownMenu } from './DropdownMenu.jsx'
import { useLocation } from "react-router-dom";
import './Header.css'

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMenu, setIsMenu] = useState(true)

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

    const toggleMenu = () => setIsOpen(!isOpen);
  
    return (
        <>
        <header>
            <div>
                <a href="/"><img src={carasur_logo} alt="CaraSur UC3M" /></a>
            </div>
            <Menu toggleMenu={toggleMenu} isMenu={isMenu}/>
        </header>
        <DropdownMenu isOpen={isOpen}/>
        </>
    )
}