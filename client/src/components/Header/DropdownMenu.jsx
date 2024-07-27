import { useRef, useEffect } from "react";
import './DropdownMenu.css'

export function DropdownMenu({ isOpen }) {
    const menuRef = useRef(null);

    useEffect (() =>{
        if (menuRef.current) {
            // Cambia la altura máxima para animar el menú
            menuRef.current.style.maxHeight = isOpen ? '350px' : '0';
          }
        }, [isOpen]
    )

    return (
        <nav className="dropdown-navigation" ref={menuRef}>
        <ul>
            <li className="link"><a href="#inicio">INICIO</a></li>
            <li className="link"><a href="#actividades">ACTIVIDADES</a></li>
            <li className="link"><a href="#material">MATERIAL</a></li>
            <li className="link"><a href="#contacto">CONTACTO</a></li>
            <li className="link"><a href="#area-de-socios">ÁREA DE SOCIOS</a></li>
        </ul>
        
        </nav>   
    )
  }