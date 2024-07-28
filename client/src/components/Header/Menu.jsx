import { useState, useEffect } from "react";
import './Menu.css'
import menu_icon from "../../assets/images/icons/Menu.webp"
import useMobileQuery from "../../hooks/useMobileQuery";
import { NavLink, Link } from "react-router-dom";

export function Menu({ toggleMenu, isMenu }) {

    const isMobile = useMobileQuery('(max-width: 1024px)')

    return(
      <nav className='navigation'>
        {
          isMobile ? (
            <button>
              <img src={menu_icon} alt="Menú" onClick={toggleMenu}/>
            </button>
          )
          : ( isMenu &&
            <>
            <ul>
              <li className='link'> <Link to="/">INICIO</Link> </li>
              <li className='link'> <Link to="/activities">ACTIVIDADES</Link> </li>
              <li className='link'> <Link to="/equipment">MATERIAL</Link> </li>
              <li className='link'> <Link to="/#contact">CONTACTO</Link> </li>
              <li className='link'> <Link to="/login"><p>ÁREA DE <br /> SOCIOS</p></Link> </li>
            </ul>
            </>
            
          )
        }
      </nav>
    )
  }