import './ProfilePage.css'
import { Breadcrumbs } from '../../components/Breadcrumbs.jsx'
import user_img from '../../assets/images/icons/User_primary.webp'
import { UserInformation } from '../../components/UserInformation.jsx'

export function ProfilePage () {

    const information = [
        {
            "titleSection": "Detalles de cuenta",
            "information": [{"title": "Dirección de correo", "text": "a@a.com"}, {"title": "Contraseña","text": "********"}]
        },
        {
            "titleSection": "Detalles del usuario",
            "information": [{"title": "Nombre", "text": "a@a.com"}, {"title": "Apellidos","text": "********"},
                            {"title": "DNI/NIE", "text": "a@a.com"}, {"title": "Teléfono","text": "********"},
                            {"title": "Dirección postal", "text": "a@a.com"}, {"title": "Estudiante UC3M","text": "********"}
                            ]
        },
        {
            "titleSection": "Detalles opcionales",
            "information": [{"title": "Sexo", "text": "a@a.com"}, {"title": "Fecha de nacimiento","text": "********"},
                            {"title": "País de origen", "text": "a@a.com"}, {"title": "Estudiante","text": "********"},
                            {"title": "Deportes que te interesan", "text": "a@a.com"}
                            ]
        },
        {
            "titleSection": "Preferencias",
            "information": [{"title": "Idioma", "text": "ES"}, {"title": "Tema","text": "Claro"}]
        }
        
        

    ]

    return(
        <main className='profile-page'>
            <Breadcrumbs />
            <section>
                <div className='user-image'>
                    <img src={user_img} alt='Imagen de usuario'></img>
                </div>
                <section className='user-info'>
                    {
                        information.map((section) => {
                            return <UserInformation key={section.titleSection} information={section.information} sectionTitle={section.titleSection} />
                        })
                    } 
                </section>
            </section>
        </main>
    )
}