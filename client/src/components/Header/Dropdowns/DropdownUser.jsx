import './DropdownUser.css'
import { Link, useLocation } from "react-router-dom";
import { useDropdown } from '../../../hooks/useDropdown.js';
import { useAuth } from '../../../hooks/useAuth.js';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';

export const DropdownUser = forwardRef((props, ref) => {

    const { logout, isAdmin } = useAuth()
    
    const { dropdownRef, handleClose } = useDropdown({ id:'user', maxHeight:'500', toggleRefs:[ref]});

    const { t } = useTranslation();

    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const lng = pathSegments[1];

    return (
        <nav className="dropdown-user" ref={dropdownRef} id="user">
        <ul>
        <li className="link"><Link to={`/${lng}/profile`} onClick={handleClose}>{t('menuLogged.profile')}</Link></li>
                <li className="link"><Link to={`/${lng}/loans`} onClick={handleClose}>{t('menuLogged.loans')}</Link></li>
                {isAdmin &&
                    <li className="link"><Link to={`/${lng}/admin`} onClick={handleClose}>{t('menuLogged.admin')}</Link></li>
                }
                <li className="link"><Link to={`/${lng}/`} onClick={() => {handleClose(); logout();}}>{t('menuLogged.logout')}</Link></li>
            
        </ul>
        
        </nav>   
    )
  })

  DropdownUser.displayName = 'DropdownUser';
