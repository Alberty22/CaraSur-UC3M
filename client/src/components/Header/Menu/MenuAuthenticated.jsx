import notifications_off_icon from "../../../assets/images/icons/Notifications_off.webp"
import notifications_on_icon from "../../../assets/images/icons/Notifications_on.webp"
import user_icon from "../../../assets/images/icons/User_white.webp"
import { useAuth } from "../../../hooks/useAuth"
import { useNotifications } from "../../../hooks/useNotifications"
import { usePopup } from "../../../hooks/usePopup"

export function MenuAuthenticated() {
    const { logout } = useAuth()
    const { notifications } = useNotifications()
    
    const { togglePopup:toggleNotificationsPopup } = usePopup('notifications', '400px')


    return (
        <>
            <button className="notifications" onClick={toggleNotificationsPopup}>
            { Object.keys(notifications).length === 0 
                ? <img src={notifications_off_icon} alt='Notificaciones'></img>
                : <img src={notifications_on_icon} alt='Notificaciones'></img>
            }
            </button>
            <button className="profile" onClick={logout}>
                <img src={user_icon} alt='Usuario'></img>
            </button>
        </>
        
    )
}