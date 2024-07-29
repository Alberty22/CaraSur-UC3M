import { useRef, useEffect } from "react";
import './DropdownNotifications.css'
import check_icon from "../../assets/images/icons/Check.webp"
import useNotifications  from "../../hooks/useNotifications.js";

export function DropdownNotifications({ closeMenu, isOpen }) {
    const notificationsRef = useRef(null);

    const {notifications, setNotifications} = useNotifications()

    useEffect (() =>{
        if (notificationsRef.current) {
            notificationsRef.current.style.maxHeight = isOpen ? '400px' : '0';

          }
        }, [isOpen]
    )

    const handleClick = () => {
        closeMenu();
        setNotifications({})
        //TODO Llamada al servidor de borrar
    }

    return (
        <ul className="dropdown-notifications" ref={notificationsRef}>
            <li>
                <div>
                    Notificaciones
                    <button onClick={handleClick}>
                        <img src={check_icon} alt="tick"></img>
                    </button>
                </div>
            </li>
            { Object.keys(notifications).length === 0 &&
            <li>
                No hay ninguna notificación
            </li>

            }
            {
                Object.values(notifications).map((notification) => {
                    return(
                        <li key={notification.id}>
                            {notification.text}
                        </li>
                    )
                    
                })
            }
            
        
        </ul>   
    )
  }