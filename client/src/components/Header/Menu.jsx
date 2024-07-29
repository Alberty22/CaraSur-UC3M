import { useState, useEffect } from "react";
import './Menu.css'
import menu_icon from "../../assets/images/icons/Menu.webp"
import notifications_off_icon from "../../assets/images/icons/Notifications_off.webp"
import notifications_on_icon from "../../assets/images/icons/Notifications_on.webp"
import user_icon from "../../assets/images/icons/User_white.webp"
import useMobileQuery from "../../hooks/useMobileQuery";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import useNotifications from "../../hooks/useNotifications";

export function Menu({ toggleMenu, isMenu, toggleNotifications }) {

    const isMobile = useMobileQuery('(max-width: 1024px)')
    const { isAuthenticated, logout } = useAuth()
    const { notifications } = useNotifications()

    return(
      <nav className='navigation'>
        {
          isMobile ? (
            <>
            { isAuthenticated &&
            <div>
              <button className="notifications" onClick={toggleNotifications}>
                { Object.keys(notifications).length === 0 
                  ? <img src={notifications_off_icon} alt='Notificaciones'></img>
                  : <img src={notifications_on_icon} alt='Notificaciones'></img>
                }
              </button>
            </div>
              
            }
            <button>
              <img src={menu_icon} alt="Menú" onClick={toggleMenu}/>
            </button>
            </>
            
          )
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
            {
              isAuthenticated &&
              <>
              <button className="notifications" onClick={toggleNotifications}>
                { Object.keys(notifications).length === 0 
                  ? <img src={notifications_off_icon} alt='Notificaciones'></img>
                  : <img src={notifications_on_icon} alt='Notificaciones'></img>
                }
              </button>
              <button className="profile" onClick={logout}>
                <img src={user_icon} alt='Usuario'></img>
              </button>
              </>
              
            }
            </>
            
          )
        }
      </nav>
    )
  }