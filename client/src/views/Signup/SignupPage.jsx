import './SignupPage.css'

import { FormSection } from '../../components/Sections/FormSection.jsx';
import { Form } from '../../components/Form/Form.jsx';
import Popup from '../../components/others/Popup.jsx';
import { FailedSection } from '../../components/others/FailedSection.jsx';

import inputSignup1 from '../../assets/others/inputs-signup1.json'
import inputSignup2 from '../../assets/others/inputs-signup2.json'

import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth.js';
import { useEffect, useState } from 'react';
import { usePopup } from '../../hooks/usePopups.js';
import useMobileQuery from '../../hooks/useMobileQuery.js';

import { toBase64, changeFileName } from '../../utils/photo.js';
import { sendData } from '../../utils/communications.js';

import { ROUTES } from '../../config/apiRoutes.js';
import { getActualDate, newRenewDate } from '../../utils/date.js';

import google_logo from '../../assets/images/logos/google.webp'
import mountain_path from '../../assets/images/visuals/mountain-path.png'

function SignupPage() {

    const isMobile = useMobileQuery('(max-width: 1024px)')

    const { t } = useTranslation()
    const { lng } = useParams()

    const navigate = useNavigate()
    const { state } = useLocation()

    const [stepSignup, setStepSignup] = useState(false)
    const [formData, setFormData] = useState(null)

    const { popupContent, handleOpen } = usePopup();

    const onSubmit1 = (data) => {
        setFormData(data)
        setStepSignup(true)
        
    };

    const onSubmit2 = async (data) => {

        let base64Photo = ''
        const file = data['id-photo']
        if (file) {
            base64Photo = await toBase64(file);
        }
        const dataToSend = {
            "email": formData.email,
            "password": formData.password,
            "role": 'user',
            "details": {
                "userDetails": {
                    "name": data.name,
                    "surname": data.surname,
                    "id": data.id,
                    "telephone": data.phone,
                    "postal": data.postal,
                    "UC3MStudent": data['uc3m-student']
                },
                "userOptionalDetails": {
                    "gender": data.gender || "",
                    "birthdate": data.birthdate || "",
                    "country": data.country || "",
                    "student": data.student || "",
                    "sports": data.sports || ""
                },
                "idPhoto": {
                    "base64": base64Photo,
                    "name": changeFileName(file.name, formData.email),
                    "type": file.type,
                    "size": file.size
                },
                "preferences": {
                    "language": lng,
                    "theme": "light"
                },
                "payDetails": {"pay": getActualDate(), "expirationDate": newRenewDate(getActualDate())}
            }
        }
        const res = await sendData(dataToSend, ROUTES.SIGNUP)

        if(res.code) {
            window.location = res.result
        }
        else {
            setFormData(false)
            setStepSignup(false)
            handleOpen(<FailedSection message={t('signup.failed')} />)
        }
        
    }
    
    return (
        <>
        <div className='background-img'></div>
        <main className='login-main'>
            <FormSection divideBy={(group) => group === 'left'}>
                <div className='title' group='right'>
                    <h2>{t('signup.title')}</h2>
                    {isMobile && <p>{t('signup.login1')}<Link to={`/${lng}/login`} className="register-link">{t('signup.login2')}</Link></p>}
                </div>
                
                { !stepSignup
                    ? <Form inputs={inputSignup1} onSubmit={onSubmit1} type={t('signup.action')} group='right' />
                    : <Form inputs={inputSignup2.required} optionalInputs={inputSignup2.optional} onSubmit={onSubmit2} type={t('signup.action')} group='right' />
                }
                
                { !stepSignup &&
                <>
                {/* <div className='separator' group='right'>
                    <span>{t('signup.separator')}</span>
                </div>
                <div className='other-login' group='right'>
                    <button>
                        <img src={google_logo} alt='Google logo'></img>
                        {t('signup.google')}
                    </button>
                </div> */}
                </>
                }
                <p className='switch-form' group='left'>{t('signup.login1')} <Link to={`/${lng}/login`} className="register-link">{t('signup.login2')}</Link></p>
                <img className='mountain-path' src={mountain_path} alt="Mountain" group='left'/>
            </FormSection>  
        </main>

        { popupContent &&
            <Popup className='popup-product'>
                {popupContent}
            </Popup>
        }
        </>
        
    )
} 

export default SignupPage;