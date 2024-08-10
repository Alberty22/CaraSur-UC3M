import { useRef, useEffect } from "react";
import './DropdownNotifications.css'
import check_icon from "../../../assets/images/icons/Check.webp"
import { useNotifications }  from "../../../hooks/useNotifications.js";
import { forwardRef } from 'react';
import { useDropdown } from "../../../hooks/useDropdown.js";
import { useTranslation } from "react-i18next";

export const DropdownNotifications = forwardRef((props, ref) => {

    const {notifications, setNotifications} = useNotifications()
    const { dropdownRef, handleClose } = useDropdown({ id:'notifications', maxHeight:'500', toggleRefs:[ref]});

    const handleClick = () => {
        handleClose();
        setNotifications([])
        //TODO Llamada al servidor de borrar
    }

    const { t } = useTranslation();

    return (
        <ul className="dropdown-notifications" ref={dropdownRef} id="notifications">
            <li>
                <div>
                    {t('notifications.title')}
                    <button onClick={handleClick}>
                        <img src={check_icon} alt="tick"></img>
                    </button>
                </div>
            </li>
            { notifications.length === 0 &&
            <li>
                {t('notifications.text')}
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
