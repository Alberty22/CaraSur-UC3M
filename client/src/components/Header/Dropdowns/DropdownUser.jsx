import './DropdownUser.css'
import { Link } from "react-router-dom";
import { usePopup } from "../../../hooks/usePopup.js";
import { useAuth } from '../../../hooks/useAuth.js';
import { forwardRef } from 'react';

export const DropdownUser = forwardRef((props, ref) => {

    const { logout } = useAuth()
    
    const { popupRef, handleClose } = usePopup({ id:'user', maxHeight:'500', toggleRefs:[ref]});

    return (
        <nav className="dropdown-user" ref={popupRef} id="user">
        <ul>
            <li className="link"><Link to="/profile" onClick={handleClose}>Perfil</Link></li>
            <li className="link"><Link to="/loans" onClick={handleClose}>Préstamo</Link></li>
            <li className="link"><Link to="/" onClick={() => {handleClose(), logout();}}>Cerrar sesión</Link></li>
            
        </ul>
        
        </nav>   
    )
  })

  DropdownUser.displayName = 'DropdownUser';
