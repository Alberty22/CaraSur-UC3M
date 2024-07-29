import { useRef, useEffect } from "react";
import './DropdownMenu.css'
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function DropdownMenu({ closeMenu, isOpen }) {
    const menuRef = useRef(null);
    const { isAuthenticated, logout } = useAuth()

    useEffect (() =>{
        if (menuRef.current) {
            menuRef.current.style.maxHeight = isOpen ? '500px' : '0';
          }
        }, [isOpen]
    )

    return (
        <nav className="dropdown-navigation" ref={menuRef}>
        <ul>
            <li className="link"><Link to="/" onClick={closeMenu}>INICIO</Link></li>
            <li className="link"><Link to="/activities" onClick={closeMenu}>ACTIVIDADES</Link></li>
            <li className="link"><Link to="/equipment" onClick={closeMenu}>MATERIAL</Link></li>
            <li className="link"><Link to="/#contact" onClick={closeMenu}>CONTACTO</Link></li>
            
            { isAuthenticated 
                ? <>
                <li className="link"><Link to="/profile" onClick={closeMenu}>PERFIL</Link></li>
                <li className="link"><Link to="/loans" onClick={closeMenu}>PRÉSTAMOS</Link></li>
                <li className="link"><Link to="/" onClick={() => {closeMenu(); logout();}}>CERRAR SESIÓN</Link></li>
                </>
                : <li className="link"><Link to="/login" onClick={closeMenu}>ÁREA DE SOCIOS</Link></li>
            }
        </ul>
        
        </nav>   
    )
  }