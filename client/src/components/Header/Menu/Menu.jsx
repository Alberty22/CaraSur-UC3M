import './Menu.css';

import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { MenuMobile } from "./MenuMobile";
import { MenuAuthenticated } from "./MenuAuthenticated";
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from '../LanguageSelector';

import useMobileQuery from "../../../hooks/useMobileQuery";


export const Menu = ({ isMenu, refList }) => {

    const { t } = useTranslation();
    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const lng = pathSegments[1];

    const isMobile = useMobileQuery('(max-width: 1024px)');
    const { isAuthenticated } = useAuth();
    
    return(
      <nav className='navigation' style={isAuthenticated && isMobile ? { justifyContent: 'space-between' } : {}}>
        {
          isMobile 
          ?  <MenuMobile refList={refList} />
          : ( isMenu &&
            <>
            <ul>
              <li className='link'> <Link to={`/${lng}/`}>{t('menu.home')}</Link> </li>
              <li className='link'> <Link to={`/${lng}/activities`}>{t('menu.activities')}</Link> </li>
              <li className='link'> <Link to={`/${lng}/equipment`}>{t('menu.equipment')}</Link> </li>
              <li className='link'> <Link to={`/${lng}/#contact`}>{t('menu.contact')}</Link> </li>
              { !isAuthenticated &&
                <li className='link-area'> <Link to={`/${lng}/login`}><p>{t('menu.loginArea1')}<br />{t('menu.loginArea2')}</p></Link> </li>
              }
            </ul>
            { isAuthenticated && <MenuAuthenticated refList={refList}/> }
            <LanguageSelector />
            </>
            
          )
        }
      </nav>
    )
  }
