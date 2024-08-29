import './LoginPage.css';

import { FormSection } from '../../components/Sections/FormSection.jsx';
import { Form } from '../../components/Form/Form.jsx';
import Popup from '../../components/others/Popup.jsx';
import { FailedSection } from '../../components/others/FailedSection.jsx';

import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import { useTranslation } from 'react-i18next';
import useMobileQuery from '../../hooks/useMobileQuery.js';
import { usePopup } from '../../hooks/usePopups.js';

import { ROUTES } from '../../config/apiRoutes.js';
import { sendData } from '../../utils/communications.js';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig.js';

import inputsLogin from '../../assets/others/inputs-login.json';
import google_logo from '../../assets/images/logos/google.webp';
import mountain_path from '../../assets/images/visuals/mountain-path.png';

function LoginPage() {

    const { login } = useAuth()
    const navigate = useNavigate()
    const { state } = useLocation()

    const { t } = useTranslation()
    const { lng } = useParams()

    const { popupContent, handleOpen } = usePopup();

    const isMobile = useMobileQuery('(max-width: 1024px)')

    const onSubmit = async (data) => {

        try {
            const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password)
            const user = userCredential.user
      
            const idToken = await user.getIdToken()

            const payload = {email: user.email, token: idToken}
            const res = await sendData(payload, ROUTES.LOGIN)
            if(res.code) {
                login({name: res.result.name, email:data.email, role:res.result.role, rememberMe:data.rememberMe})
                navigate(state?.location?.pathname ? `/${lng}/${state?.location?.pathname}` : `/${lng}/`)
            }
            else {
                handleOpen(<FailedSection message={t('login.failed2')} />)
            }

            
        }
        catch {
            handleOpen(<FailedSection message={t('login.failed1')} />)
        }
    
    }

    return (
        <>
        <div className='background-img'></div>
        <main className='login-main'>
            <FormSection divideBy={(group) => group === 'left'}>
                <div className='title' group='left'>
                    <h2>{t('login.title')}</h2>
                    {isMobile && <p>{t('login.signup1')} <Link to={`/${lng}/signup`} className="register-link">{t('login.signup2')}</Link></p>}
                </div>

                <Form inputs={inputsLogin} onSubmit={onSubmit} type={t('login.action')} group='left' isLogin={true}/>
                
                {/* <div className='separator' group='left'>
                    <span>{t('login.separator')}</span>
                </div>
                <div className='other-login' group='left'>
                    <button>
                        <img src={google_logo} alt='Google logo'></img>
                        {t('login.google')}
                    </button>
                </div> */}
                <p className='switch-form' group='right'>{t('login.signup1')} <Link to={`/${lng}/signup`} className="register-link">{t('login.signup2')}</Link></p>
                <img className='mountain-path' src={mountain_path} alt="Mountain" group='right'/>
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

export default LoginPage;