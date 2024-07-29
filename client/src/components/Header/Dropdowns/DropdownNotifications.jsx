import { useRef, useEffect } from "react";
import './DropdownNotifications.css'
import check_icon from "../../../assets/images/icons/Check.webp"
import { useNotifications }  from "../../../hooks/useNotifications.js";
import { usePopup } from "../../../hooks/usePopup.js";

export function DropdownNotifications() {

    const {notifications, setNotifications} = useNotifications()

    const { popupRef, handleClose } = usePopup({ id:'notifications', maxHeight:'500'});

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
  }