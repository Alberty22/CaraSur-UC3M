import { useRef, useEffect } from "react";
import './DropdownMenu.css'
import { Link } from "react-router-dom";

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
            <li className="link"><Link to="/">INICIO</Link></li>
            <li className="link"><Link to="/activities">ACTIVIDADES</Link></li>
            <li className="link"><Link to="/equipment">MATERIAL</Link></li>
            <li className="link"><Link to="/#contact">CONTACTO</Link></li>
            <li className="link"><Link to="/home">ÁREA DE SOCIOS</Link></li>
        </ul>
        
        </nav>   
    )
  }