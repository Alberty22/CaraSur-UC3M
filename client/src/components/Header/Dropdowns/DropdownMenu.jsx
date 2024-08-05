import './DropdownMenu.css'
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth.js";
import { useDropdown } from '../../../hooks/useDropdown.js';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

export const DropdownMenu = forwardRef((props, ref) => {
    
    const { isAuthenticated, isAdmin, logout } = useAuth()

    const { dropdownRef, handleClose } = useDropdown({ id:'menu', maxHeight:'600', toggleRefs:[ref]});

    const { t } = useTranslation();

    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const lng = pathSegments[1];

    return (
        <nav className="dropdown-navigation" ref={dropdownRef} id="menu">
        <ul>
            <li className='link'> <Link to={`/${lng}/`} onClick={handleClose}>{t('menu.home')}</Link> </li>
            <li className='link'> <Link to={`/${lng}/activities`} onClick={handleClose}>{t('menu.activities')}</Link> </li>
            <li className='link'> <Link to={`/${lng}/equipment`} onClick={handleClose}>{t('menu.equipment')}</Link> </li>
            <li className='link'> <Link to={`/${lng}/#contact`} onClick={handleClose}>{t('menu.contact')}</Link> </li>
            
            { isAuthenticated 
                ? <>
                <li className="link"><Link to={`/${lng}/profile`} onClick={handleClose}>{t('menuLogged.profile')}</Link></li>
                <li className="link"><Link to={`/${lng}/loans`} onClick={handleClose}>{t('menuLogged.loans')}</Link></li>
                {isAdmin &&
                    <li className="link"><Link to={`/${lng}/admin`} onClick={handleClose}>{t('menuLogged.admin')}</Link></li>
                }
                <li className="link"><Link to={`/${lng}/`} onClick={() => {handleClose(); logout();}}>{t('menuLogged.logout')}</Link></li>
                </>
                : <li className='link-area'> <Link to={`/${lng}/login`} onClick={handleClose}><p>{t('menu.loginArea')}</p></Link> </li>
            }
        </ul>
        
        </nav>   
    )
  })

DropdownMenu.displayName = 'DropdownMenu';
