import './AdminPage.css'
import { Breadcrumbs } from '../../components/others/Breadcrumbs'
import { Link } from 'react-router-dom'
import admin_icon from '../../assets/images/icons/Setting.webp'
import users_icon from '../../assets/images/icons/User_white.webp'
import material_icon from '../../assets/images/icons/Materials.webp'
import loans_icon from '../../assets/images/icons/Loans.webp'
import activities_icon from '../../assets/images/icons/Activities.webp'
import notifications_icon from '../../assets/images/icons/Notifications.webp'

const AdminCapability = ({ title, logo , route}) => {
    return(
        <div className='admin-capability'>
            <Link to={route}>
                <img src={logo} alt={title} />
                <h3>{title}</h3>
            </Link>
        </div>
    )
}

export function AdminPage() {
    const capabilities = [
        {
            "title":"Ajustes de administrador",
            "logo":admin_icon,
            "route":"settings"
        },
        {
            "title":"Gestión de usuarios",
            "logo":users_icon,
            "route":"users"
        },
        {
            "title":"Gestion de material",
            "logo":material_icon,
            "route":"equipment"
        },
        {
            "title":"Gestión de préstamos",
            "logo":loans_icon,
            "route":"loans"
        },
        {
            "title":"Gestión de actividades",
            "logo":activities_icon,
            "route":"activities"
        },
        {
            "title":"Gestion de notificaciones",
            "logo":notifications_icon,
            "route":"notifications"
        },
    ]

    return(
        <main className='admin-page'>
            <Breadcrumbs />
            <header>
                <h2>ADMINISTRADOR</h2>
                <div></div>
            </header>
            <section>
                {
                    capabilities.map((capability) =>{
                        return <AdminCapability key={capability.title} title={capability.title} logo={capability.logo} route={capability.route} />
                    })
                }
                
            </section>
        </main>
    )
}