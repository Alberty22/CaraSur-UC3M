import { useRef, useEffect } from "react";
import './DropdownNotifications.css'
import check_icon from "../../../assets/images/icons/Check.webp"
import { useNotifications }  from "../../../hooks/useNotifications.js";
import { forwardRef } from 'react';
import { useDropdown } from "../../../hooks/useDropdown.js";

export const DropdownNotifications = forwardRef((props, ref) => {

    const {notifications, setNotifications} = useNotifications()

    const { popupRef, handleClose } = useDropdown({ id:'notifications', maxHeight:'500', toggleRefs:[ref]});

    const handleClick = () => {
        handleClose();
        setNotifications({})
        //TODO Llamada al servidor de borrar
    }

    return (
        <ul className="dropdown-notifications" ref={popupRef} id="notifications">
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
  })

DropdownNotifications.displayName = 'DropdownNotifications';
