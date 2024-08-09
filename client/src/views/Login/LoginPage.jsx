import './LoginPage.css'
import google_logo from '../../assets/images/logos/google.webp'
import mountain_path from '../../assets/images/visuals/mountain-path.png'
import useMobileQuery from '../../hooks/useMobileQuery.js';
import { FormSection } from '../../components/Sections/FormSection.jsx';
import { Form } from '../../components/Form/Form.jsx';
import inputsLogin from '../../assets/others/inputs-login.json'

import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';

import { useTranslation } from 'react-i18next';

export function LoginPage() {

    const { isAuthenticated, login } = useAuth()
    const navigate = useNavigate()
    const { state } = useLocation()

    const { t } = useTranslation()
    const { lng } = useParams()

    const isMobile = useMobileQuery('(max-width: 1024px)')

    const onSubmit = data => {
        login(data)
        navigate(state?.location?.pathname ? `/${lng}/${state?.location?.pathname}` : `/${lng}/`)
    };

    

    return (
        <>
        <div className='background-img'></div>
        <main className='login-main'>
            <FormSection divideBy={(group) => group === 'left'}>
                <div className='title' group='left'>
                    <h2>{t('login.title')}</h2>
                    {isMobile && <p>{t('login.signup1')} <Link to={`/${lng}/singup`} className="register-link">{t('login.signup2')}</Link></p>}
                </div>

                <Form inputs={inputsLogin} onSubmit={onSubmit} type={t('login.action')} group='left' />
                
                <div className='separator' group='left'>
                    <span>{t('login.separator')}</span>
                </div>
                <div className='other-login' group='left'>
                    <button>
                        <img src={google_logo} alt='Google logo'></img>
                        {t('login.google')}
                    </button>
                </div>
                <p className='switch-form' group='right'>{t('login.signup1')} <Link to={`/${lng}/singup`} className="register-link">{t('login.signup2')}</Link></p>
                <img className='mountain-path' src={mountain_path} alt="Mountain" group='right'/>
            </FormSection>  
        </main>
        </>
        
    )
}   