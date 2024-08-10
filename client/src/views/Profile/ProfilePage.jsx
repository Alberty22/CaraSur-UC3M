import './ProfilePage.css'

import { Breadcrumbs } from '../../components/others/Breadcrumbs.jsx'
import { Form } from '../../components/Form/Form'
import { UserInformation } from '../../components/others/UserInformation.jsx'
import Popup from '../../components/others/Popup.jsx'

import { useFetch } from '../../hooks/useFetch.js'
import { usePopup } from '../../hooks/usePopups.js'
import { useTranslation } from 'react-i18next'

import { ROUTES } from '../../config/apiRoutes.js'
import { getCookie } from '../../utils/cookies.js'

import user_img from '../../assets/images/icons/User_primary.webp'
import inputs_profile from '../../assets/others/inputs-profile.json';

export function ProfilePage () {

    const { data } = useFetch({ url: `${ROUTES.PROFILE}/${encodeURIComponent(getCookie('email'))}` })
    const userData = data ? data : []

    const { t } = useTranslation()

    const userInformation = () => {
        const {UC3MStudent, ...others} = userData?.userDetails || {}
        return { ...others, UC3MStudent: t(`form.uc3m-student.${UC3MStudent}`)}
    }

    const optionalInformation = () => {
        return Object.fromEntries(
            Object.entries(userData?.userOptionalDetails || {}).map(
                ([key, value]) => [key, value === '' || t(`form.${key}.${value}`)]
            )
        )
    }
    const information = [
        {
            "id":"profile-account-popup",
            "titleSection": t('profile.title1'),
            "information": userData?.accountDetails
        },
        {
            "id":"profile-user-popup",
            "titleSection": t('profile.title2'),
            "information": userInformation()
        },
        {
            "id":"profile-optional-popup",
            "titleSection": t('profile.title3'),
            "information": optionalInformation()
        },
        {
            "id":"profile-preferences-popup",
            "titleSection": t('profile.title4'),
            "information": {"language": userData?.preferences?.language, "theme": t(`form.theme.${userData?.preferences?.theme}`)}
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