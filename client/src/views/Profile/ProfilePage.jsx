import './ProfilePage.css'
import { Breadcrumbs } from '../../components/others/Breadcrumbs.jsx'
import user_img from '../../assets/images/icons/User_primary.webp'
import { UserInformation } from '../../components/others/UserInformation.jsx'
import Popup from '../../components/others/Popup.jsx'
import inputs_profile from '../../assets/others/inputs-profile.json';
import { Form } from '../../components/Form/Form'
import { useFetch } from '../../hooks/useFetch.js'
import { usePopup } from '../../hooks/usePopups.js'
import { useTranslation } from 'react-i18next'

export function ProfilePage () {

    const { data } = useFetch({ url:'/user-data.json' })
    const userData = data ? data : []

    const { t } = useTranslation()

    const information = [
        {
            "id":"profile-account-popup",
            "titleSection": t('profile.title1'),
            "information": userData?.account_details
        },
        {
            "id":"profile-user-popup",
            "titleSection": t('profile.title2'),
            "information": userData?.user_details
        },
        {
            "id":"profile-optional-popup",
            "titleSection": t('profile.title3'),
            "information": userData?.user_optional_details
        },
        {
            "id":"profile-preferences-popup",
            "titleSection": t('profile.title4'),
            "information": userData?.preferences
        }
    ]

    const { popupContent, handleClose } = usePopup();

    return(
        <>
        <main className='profile-page'>
            <Breadcrumbs />
            <section>
                <div className='user-image'>
                    <img src={user_img} alt='Imagen de usuario'></img>
                </div>
                <section className='user-info'>
                    { userData.length !== 0 &&
                        information.map((section) => {
                            return <UserInformation key={section.titleSection} information={section.information} sectionTitle={section.titleSection} 
                                popupContent={<Form inputs={inputs_profile[section.id]} onSubmit={(data) => {console.log(data); handleClose()}} type={t('profile.action')} />}
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