import './ProfilePage.css';

import { Breadcrumbs } from '../../components/others/Breadcrumbs.jsx';
import { Form } from '../../components/Form/Form';
import { UserInformation } from '../../components/others/UserInformation.jsx';
import Popup from '../../components/others/Popup.jsx';
import { FailedSection } from '../../components/others/FailedSection.jsx';
import { OkSection } from '../../components/others/OkSection.jsx';

import { usePopup } from '../../hooks/usePopups.js';
import { useTranslation } from 'react-i18next';
import { useProfile } from '../../hooks/useProfile.js';
import { useEffect } from 'react';

import { ROUTES } from '../../config/apiRoutes.js';
import { getCookie, updateCookie } from '../../utils/cookies.js';
import { updateData, sendData } from '../../utils/communications.js';
import { toBase64, changeFileName } from '../../utils/photo.js';
import { checkRenewDate, newRenewDate, getActualDate } from '../../utils/date.js';

import user_img from '../../assets/images/icons/User_primary.webp';
import inputs_profile from '../../assets/others/inputs-profile.json';


function ProfilePage () {

    const { userDetails, setfetchData} = useProfile()
    const { t } = useTranslation()

    useEffect(() => {
        const hash = location.hash;
        if (hash) {
          if (hash.substring(1) === 'success') {
            handleOpen(<OkSection className='white' message={t('profile.ok')} />)
            setfetchData(true)
          }
          else if(hash.substring(1) === 'failed')
            handleOpen(<FailedSection className='white' message={t('profile.failed')} />)
        }
        else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, [location]);

    const userInformation = () => {
        const {UC3MStudent, ...others} = userDetails?.userDetails || {}
        return { name:others.name, surname:others.surname, id:others.id ,postal:others.postal, telephone:others.telephone, UC3MStudent: t(`form.uc3m-student.${UC3MStudent}`)}
    }

    const optionalInformation = () => {
        const data =  Object.fromEntries(
            Object.entries(userDetails?.userOptionalDetails || {}).map(
                ([key, value]) => [key, value === '' || ((key === 'country' || key ==='birthdate') ? `${value}` : t(`form.${key}.${value}`))]
            )
        )
        return {gender:data.gender, birthdate:data.birthdate, country:data.country, student:data.student, sports:data.sports}
    }
    const information = [
        {
            "id":"accountDetails",
            "titleSection": t('profile.title1'),
            "information": userDetails.accountDetails
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
            "information": {"language": userDetails?.preferences?.language, "theme": t(`form.theme.${userDetails?.preferences?.theme}`)}
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
            
            handleOpen(<OkSection className='white' message={t('profile.ok')} />)
            if(id === 'accountDetails') {
                await updateCookie("email", data?.email)
            }

            if (id === 'userDetails'){
                await updateCookie("name",data?.name)
            }
            setfetchData(true)
            
            
        }
        else {
            handleOpen(<FailedSection className='white' message={t('profile.failed')} />)
        }
    }

    const handleRenew = async () => {
        const payload = {
            email: getCookie('email'),
            pay: getActualDate(),
            expirationDate: newRenewDate(userDetails?.payDetails?.expirationDate),
        }
        const res = await sendData(payload, ROUTES.RENEW)
        if(res.code) {
            window.location = res.result
            
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
                <section>
                    <div className='user-image'>
                        <img src={user_img} alt='Imagen de usuario'></img>
                    </div>
                    { checkRenewDate(userDetails?.payDetails?.expirationDate) &&
                        <button className='renew' onClick={handleRenew}>{t('profile.renew')}</button>
                    }
                    
                </section>
                
                <section className='user-info'>
                    { Object.keys(userDetails).length !== 0 &&
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