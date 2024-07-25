import { useState, useEffect } from "react";
import './Menu.css'
import menu_icon from "../assets/images/icons/Menu.webp"


export function Menu({ toggleMenu }) {

    const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 1000px)').matches);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.matchMedia('(max-width: 1000px)').matches);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    return(
      <nav className='navigation'>
        {
          isMobile ? (
            <button>
              <img src={menu_icon} alt="Menú" onClick={toggleMenu}/>
            </button>
          )
          : (
            <>
            <ul>
              <li className='link'> <a href="#inicio">INICIO</a> </li>
              <li className='link'> <a href="#actividades">ACTIVIDADES</a> </li>
              <li className='link'> <a href="#material">MATERIAL</a> </li>
              <li className='link'> <a href="#contacto">CONTACTO</a> </li>
            </ul>
            <div>
              <a href="#area-de-socios"><p>ÁREA DE <br /> SOCIOS</p></a>
            </div>
            </>
            
          )
        }
      </nav>
    )
  }