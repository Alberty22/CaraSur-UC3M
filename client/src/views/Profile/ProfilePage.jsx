import './ProfilePage.css'
import { Breadcrumbs } from '../../components/Breadcrumbs.jsx'
import user_img from '../../assets/images/icons/User_primary.webp'
import { UserInformation } from '../../components/UserInformation.jsx'
import Popup from '../../components/Popup.jsx'
import inputs_profile from '../../assets/others/inputs-profile.json'
import { Form } from '../../components/Form.jsx'
import ErrorBoundary from '../../ErrorBoundary.jsx'

export function ProfilePage () {

    const information = [
        {
            "id":"profile-account-popup",
            "titleSection": "Detalles de cuenta",
            "information": [{"title": "Dirección de correo", "text": "a@a.com"}, {"title": "Contraseña","text": "********"}]
        },
        {
            "id":"profile-user-popup",
            "titleSection": "Detalles del usuario",
            "information": [{"title": "Nombre", "text": "a@a.com"}, {"title": "Apellidos","text": "********"},
                            {"title": "DNI/NIE", "text": "a@a.com"}, {"title": "Teléfono","text": "********"},
                            {"title": "Dirección postal", "text": "a@a.com"}, {"title": "Estudiante UC3M","text": "********"}
                            ]
        },
        {
            "id":"profile-optional-popup",
            "titleSection": "Detalles opcionales",
            "information": [{"title": "Sexo", "text": "a@a.com"}, {"title": "Fecha de nacimiento","text": "********"},
                            {"title": "País de origen", "text": "a@a.com"}, {"title": "Estudiante","text": "********"},
                            {"title": "Deportes que te interesan", "text": "a@a.com"}
                            ]
        },
        {
            "id":"profile-preferences-popup",
            "titleSection": "Preferencias",
            "information": [{"title": "Idioma", "text": "ES"}, {"title": "Tema","text": "Claro"}]
        }
        
        

    ]

    
    const onSubmit = data => {
        
    };

    return(
        <>
        <main className='profile-page'>
            <Breadcrumbs />
            <section>
                <div className='user-image'>
                    <img src={user_img} alt='Imagen de usuario'></img>
                </div>
                <section className='user-info'>
                    {
                        information.map((section) => {
                            return <UserInformation key={section.titleSection} information={section.information} sectionTitle={section.titleSection} id={section.id}/>
                        })
                    } 
                </section>
            </section>
        </main>
        {
            information.map((section) => {
                return (
                    <Popup key={section.id} id={section.id}>
                        <Form inputs={inputs_profile[section.id]} onSubmit={(data) => {console.log(data)}} type={'Change'} />
                    </Popup>
                )
                
            })
        }
        </>
    )
}