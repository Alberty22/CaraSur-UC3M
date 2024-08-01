import './ProfilePage.css'
import { Breadcrumbs } from '../../components/Breadcrumbs.jsx'
import user_img from '../../assets/images/icons/User_primary.webp'
import { UserInformation } from '../../components/UserInformation.jsx'
import Popup from '../../components/Popup.jsx'
import inputs_profile from '../../assets/others/inputs-profile.json'
import { Form } from '../../components/Form.jsx'
import { useFetch } from '../../hooks/useFetch.js'
import { usePopup } from '../../hooks/usePopups.js'

export function ProfilePage () {

    const { data } = useFetch({ url:'/user-data.json' })
    const userData = data?.user

    const information = [
        {
            "id":"profile-account-popup",
            "titleSection": "Detalles de cuenta",
            "information": userData?.account_details
        },
        {
            "id":"profile-user-popup",
            "titleSection": "Detalles del usuario",
            "information": userData?.user_details
        },
        {
            "id":"profile-optional-popup",
            "titleSection": "Detalles opcionales",
            "information": userData?.user_optional_details
        },
        {
            "id":"profile-preferences-popup",
            "titleSection": "Preferencias",
            "information": userData?.preferences
        }
        
        

    ]

    const { popupContent } = usePopup();

    return(
        <>
        <main className='profile-page'>
            <Breadcrumbs />
            <section>
                <div className='user-image'>
                    <img src={user_img} alt='Imagen de usuario'></img>
                </div>
                <section className='user-info'>
                    { userData !== undefined &&
                        information.map((section) => {
                            return <UserInformation key={section.titleSection} information={section.information} sectionTitle={section.titleSection} 
                                popupContent={<Form inputs={inputs_profile[section.id]} onSubmit={(data) => {console.log(data)}} type={'Cambiar'} />}
                            />
                        })
                    } 
                </section>
            </section>
        </main>
        { popupContent &&
            <Popup>
                {popupContent}
            </Popup>
        }
        </>
    )
}