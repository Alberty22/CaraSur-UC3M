import notifications_off_icon from "../../../assets/images/icons/Notifications_off.webp"
import notifications_on_icon from "../../../assets/images/icons/Notifications_on.webp"
import menu_icon from "../../../assets/images/icons/Menu.webp"
import { useAuth } from "../../../hooks/useAuth"
import { useNotifications } from "../../../hooks/useNotifications"
import { LanguageSelector } from "../LanguageSelector"

export const MenuMobile = ({ refList }) => {
    const { isAuthenticated } = useAuth()
    const { notifications } = useNotifications()

    const refNotifications = refList.notifications;
    const refMenu = refList.menu;
    
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
        <div className="menu-container">
            <LanguageSelector />  
            <button ref={refMenu} className="burger-menu">
                <img src={menu_icon} alt="Menú" />
            </button>
        </div>
        
        </>
    )
}

