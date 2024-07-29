import './DropdownMenu.css'
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth.js";
import { usePopup } from "../../../hooks/usePopup.js";

export function DropdownMenu() {
    
    const { isAuthenticated, logout } = useAuth()

    const { popupRef, handleClose } = usePopup({ id:'menu', maxHeight:'500'});

    return (
        <nav className="dropdown-navigation" ref={popupRef} id="menu">
        <ul>
            <li className="link"><Link to="/" onClick={handleClose}>INICIO</Link></li>
            <li className="link"><Link to="/activities" onClick={handleClose}>ACTIVIDADES</Link></li>
            <li className="link"><Link to="/equipment" onClick={handleClose}>MATERIAL</Link></li>
            <li className="link"><Link to="/#contact" onClick={handleClose}>CONTACTO</Link></li>
            
            { isAuthenticated 
                ? <>
                <li className="link"><Link to="/profile" onClick={handleClose}>PERFIL</Link></li>
                <li className="link"><Link to="/loans" onClick={handleClose}>PRÉSTAMOS</Link></li>
                <li className="link"><Link to="/" onClick={() => {handleClose(); logout();}}>CERRAR SESIÓN</Link></li>
                </>
                : <li className="link"><Link to="/login" onClick={handleClose}>ÁREA DE SOCIOS</Link></li>
            }
        </ul>
        
        </nav>   
    )
  }