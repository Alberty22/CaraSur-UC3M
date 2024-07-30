import notifications_off_icon from "../../../assets/images/icons/Notifications_off.webp"
import notifications_on_icon from "../../../assets/images/icons/Notifications_on.webp"
import menu_icon from "../../../assets/images/icons/Menu.webp"
import { useAuth } from "../../../hooks/useAuth"
import { useNotifications } from "../../../hooks/useNotifications"
import { useRef } from "react"
import { usePopup } from "../../../hooks/usePopup"

export function MenuMobile() {
    const { isAuthenticated } = useAuth()
    const { notifications } = useNotifications()

    const refNotifications = useRef(null);
    const refMenu = useRef(null);
    
    usePopup({ id:'notifications', maxHeight:'400', toggleRefs:[refNotifications]})

    usePopup({ id:'menu', maxHeight:'500', toggleRefs:[refMenu]})


    return (
        <>
        { isAuthenticated &&
        <div>
            <button className="notifications" ref={refNotifications}>
            { Object.keys(notifications).length === 0 
                ? <img src={notifications_off_icon} alt='Notificaciones'></img>
                : <img src={notifications_on_icon} alt='Notificaciones'></img>
            }
            </button>
        </div>
            
        }
        <button>
            <img src={menu_icon} alt="Menú" ref={refMenu}/>
        </button>
        </>
    )
}