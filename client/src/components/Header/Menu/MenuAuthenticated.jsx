import notifications_off_icon from "../../../assets/images/icons/Notifications_off.webp"
import notifications_on_icon from "../../../assets/images/icons/Notifications_on.webp"
import user_icon from "../../../assets/images/icons/User_white.webp"
import { useRef } from "react"
import { useNotifications } from "../../../hooks/useNotifications"
import { usePopup } from "../../../hooks/usePopup"

export function MenuAuthenticated() {
    const { notifications } = useNotifications()

    const refNotifications = useRef(null);
    const refUser = useRef(null);
    
    usePopup({ id:'notifications', maxHeight:'400', toggleRefs:[refNotifications]})

    usePopup({ id:'user', maxHeight:'400', toggleRefs:[refUser]})

    return (
        <>
            <button className="notifications"  ref={refNotifications}>
            { Object.keys(notifications).length === 0 
                ? <img src={notifications_off_icon} alt='Notificaciones'></img>
                : <img src={notifications_on_icon} alt='Notificaciones'></img>
            }
            </button>
            <button className="profile" ref={refUser}>
                <img src={user_icon} alt='Usuario'></img>
            </button>
        </>
        
    )
}