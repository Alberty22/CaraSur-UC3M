import './ProfilePage.css';

import { Breadcrumbs } from '../../components/others/Breadcrumbs.jsx';
import { Form } from '../../components/Form/Form';
import { UserInformation } from '../../components/others/UserInformation.jsx';
import Popup from '../../components/others/Popup.jsx';
import { FailedSection } from '../../components/others/FailedSection.jsx';
import { OkSection } from '../../components/others/OkSection.jsx';

import { useFetch } from '../../hooks/useFetch.js';
import { usePopup } from '../../hooks/usePopups.js';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

import { ROUTES } from '../../config/apiRoutes.js';
import { getCookie, updateCookie } from '../../utils/cookies.js';
import { updateData } from '../../utils/communications.js';
import { toBase64, changeFileName } from '../../utils/photo.js';

import user_img from '../../assets/images/icons/User_primary.webp';
import inputs_profile from '../../assets/others/inputs-profile.json';


function ProfilePage () {

    const { data, refetch } = useFetch({ url: `${ROUTES.PROFILE}/${encodeURIComponent(getCookie('email'))}`})
    const userData = data ? data : []

    const { t } = useTranslation()

    const userInformation = () => {
        const {UC3MStudent, ...others} = userData?.userDetails || {}
        return { ...others, UC3MStudent: t(`form.uc3m-student.${UC3MStudent}`)}
    }

    const optionalInformation = () => {
        return Object.fromEntries(
            Object.entries(userData?.userOptionalDetails || {}).map(
                ([key, value]) => [key, value === '' || ((key === 'country' || key ==='birthdate') ? `${value}` : t(`form.${key}.${value}`))]
            )
        )
    }
    const information = [
        {
            "id":"accountDetails",
            "titleSection": t('profile.title1'),
            "information": userData?.accountDetails
        },
        {
            "id":"userDetails",
            "titleSection": t('profile.title2'),
            "information": userInformation()
        },
        {
            "id":"userOptionalDetails",
            "titleSection": t('profile.title3'),
            "information": optionalInformation()
        },
        {
            "id":"preferences",
            "titleSection": t('profile.title4'),
            "information": {"language": userData?.preferences?.language, "theme": t(`form.theme.${userData?.preferences?.theme}`)}
        }
    ]
    
    const { popupContent, handleOpen } = usePopup();

    const handleSubmit = async (data, id) => {
        const {idPhoto, ...others} = data
        const payload = {
            email: getCookie('email'),
            [id] : {...others},
        }
        if(idPhoto) {
            payload.idPhoto = {
                "base64": await toBase64(idPhoto),
                "name": changeFileName(idPhoto.name, getCookie('email')),
                "type": idPhoto.type,
                "size": idPhoto.size
            }
        }
        
        const res = await updateData(payload, ROUTES.PROFILE)
        
        if(res.code) {
            refetch()
            handleOpen(<OkSection className='white' message={t('profile.ok')} />)
            if(id === 'accountDetails') {
                updateCookie("email", data?.email)
            }

            if (id === 'userDetails'){
                updateCookie("name",data?.name)
            }
            
        }
        else {
            handleOpen(<FailedSection className='white' message={t('profile.failed')} />)
        }
    }

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
                                popupContent={<Form inputs={inputs_profile[section.id]} onSubmit={(data) => handleSubmit(data, section.id)} type={t('profile.action')} />}
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

export default ProfilePage;