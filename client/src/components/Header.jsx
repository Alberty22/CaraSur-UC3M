import { useState } from "react";
import carasur_logo from "../assets/images/logos/carasur.webp"
import { Menu } from './Menu.jsx'
import { DropdownMenu } from './DropdownMenu.jsx'
import './Header.css'

export function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
  
    return (
        <>
        <header>
            <div>
                <img src={carasur_logo} alt="CaraSur UC3M" />
            </div>
            <Menu toggleMenu={toggleMenu}/>
            </header>
        <DropdownMenu isOpen={isOpen}/>
        </>
    )
}