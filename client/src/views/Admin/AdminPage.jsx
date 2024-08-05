import './AdminPage.css'
import { Breadcrumbs } from '../../components/others/Breadcrumbs'
import { Link } from 'react-router-dom'
import admin_icon from '../../assets/images/icons/Setting.webp'
import users_icon from '../../assets/images/icons/User_white.webp'
import material_icon from '../../assets/images/icons/Materials.webp'
import loans_icon from '../../assets/images/icons/Loans.webp'
import activities_icon from '../../assets/images/icons/Activities.webp'
import notifications_icon from '../../assets/images/icons/Notifications.webp'
import { useTranslation } from 'react-i18next'

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

    const { t } = useTranslation();

    const capabilities = [
        {
            "title":t('admin.capability1'),
            "logo":admin_icon,
            "route":"settings"
        },
        {
            "title":t('admin.capability2'),
            "logo":users_icon,
            "route":"users"
        },
        {
            "title":t('admin.capability3'),
            "logo":material_icon,
            "route":"equipment"
        },
        {
            "title":t('admin.capability4'),
            "logo":loans_icon,
            "route":"loans"
        },
        {
            "title":t('admin.capability5'),
            "logo":activities_icon,
            "route":"activities"
        },
        {
            "title":t('admin.capability6'),
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