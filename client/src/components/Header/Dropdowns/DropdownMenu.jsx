import './DropdownMenu.css'
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth.js";
import { useDropdown } from '../../../hooks/useDropdown.js';
import { forwardRef } from 'react';

export const DropdownMenu = forwardRef((props, ref) => {
    
    const { isAuthenticated, isAdmin, logout } = useAuth()

    const { dropdownRef, handleClose } = useDropdown({ id:'menu', maxHeight:'600', toggleRefs:[ref]});

    return (
        <nav className="dropdown-navigation" ref={dropdownRef} id="menu">
        <ul>
            <li className="link"><Link to="/" onClick={handleClose}>INICIO</Link></li>
            <li className="link"><Link to="/activities" onClick={handleClose}>ACTIVIDADES</Link></li>
            <li className="link"><Link to="/equipment" onClick={handleClose}>MATERIAL</Link></li>
            <li className="link"><Link to="/#contact" onClick={handleClose}>CONTACTO</Link></li>
            
            { isAuthenticated 
                ? <>
                <li className="link"><Link to="/profile" onClick={handleClose}>PERFIL</Link></li>
                <li className="link"><Link to="/loans" onClick={handleClose}>PRÉSTAMOS</Link></li>
                {isAdmin &&
                    <li className="link"><Link to="/admin" onClick={handleClose}>ADMINISTRADOR</Link></li>
                }
                <li className="link"><Link to="/" onClick={() => {handleClose(); logout();}}>CERRAR SESIÓN</Link></li>
                </>
                : <li className="link"><Link to="/login" onClick={handleClose}>ÁREA DE SOCIOS</Link></li>
            }
        </ul>
        
        </nav>   
    )
  })

DropdownMenu.displayName = 'DropdownMenu';
