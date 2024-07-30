import './Menu.css'
import useMobileQuery from "../../../hooks/useMobileQuery";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { MenuMobile } from "./MenuMobile";
import { MenuAuthenticated } from "./MenuAuthenticated";
import { forwardRef } from 'react';


export const Menu = ({ isMenu, refList }) => {

    const isMobile = useMobileQuery('(max-width: 1024px)')
    const { isAuthenticated } = useAuth()
    
    return(
      <nav className='navigation'>
        {
          isMobile 
          ?  <MenuMobile refList={refList} />
          : ( isMenu &&
            <>
            <ul>
              <li className='link'> <Link to="/">INICIO</Link> </li>
              <li className='link'> <Link to="/activities">ACTIVIDADES</Link> </li>
              <li className='link'> <Link to="/equipment">MATERIAL</Link> </li>
              <li className='link'> <Link to="/#contact">CONTACTO</Link> </li>
              { !isAuthenticated &&
                <li className='link-area'> <Link to="/login"><p>ÁREA DE <br /> SOCIOS</p></Link> </li>
              }
            </ul>
            { isAuthenticated && <MenuAuthenticated refList={refList}/> }
            </>
            
          )
        }
      </nav>
    )
  }
