import notifications_off_icon from "../../../assets/images/icons/Notifications_off.webp"
import notifications_on_icon from "../../../assets/images/icons/Notifications_on.webp"
import user_icon from "../../../assets/images/icons/User_white.webp"
import { useRef } from "react"
import { useNotifications } from "../../../hooks/useNotifications"
import { usePopup } from "../../../hooks/usePopup"

export function MenuAuthenticated() {
    const { notifications } = useNotifications()

    const excludeRef1 = useRef(null);
    const excludeRef2 = useRef(null);
    
    const { togglePopup:toggleNotificationsPopup } = usePopup({ id:'notifications', maxHeight:'400', toggleRefs:[excludeRef1]})

    const { togglePopup:toggleUserPopup } = usePopup({ id:'user', maxHeight:'400', toggleRefs:[excludeRef2]})

    

    return (
        <>
            <button className="notifications"  ref={excludeRef1} onClick={toggleNotificationsPopup}>
            { Object.keys(notifications).length === 0 
                ? <img src={notifications_off_icon} alt='Notificaciones'></img>
                : <img src={notifications_on_icon} alt='Notificaciones'></img>
            }
            </button>
            <button className="profile" ref={excludeRef2} onClick={toggleUserPopup}>
                <img src={user_icon} alt='Usuario'></img>
            </button>
        </>
        
    )
}