import './LoginPage.css'
import google_logo from '../../assets/images/logos/google.webp'
import mountain_path from '../../assets/images/visuals/mountain-path.png'
import useMobileQuery from '../../hooks/useMobileQuery.js';
import { FormSection } from '../../components/Sections/FormSection.jsx';
import { Form } from '../../components/others/Form.jsx';
import inputsLogin from '../../assets/others/inputs-login.json'

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';

export function LoginPage() {

    const { isAuthenticated, login } = useAuth()
    const navigate = useNavigate()
    const { state } = useLocation()

    const isMobile = useMobileQuery('(max-width: 1024px)')

    const onSubmit = data => {
        login()
        navigate(state?.location?.pathname ?? '/')
    };

    return (
        <>
        <div className='background-img'></div>
        <main className='login-main'>
            <FormSection divideBy={(group) => group === 'left'}>
                <div className='title' group='left'>
                    <h2>LOGIN</h2>
                    {isMobile && <p>No tienes cuenta todavía. <Link to='/singup' className="register-link">Regístrate ahora</Link></p>}
                </div>

                <Form inputs={inputsLogin} onSubmit={onSubmit} type={'Log In'} group='left' />
                
                <div className='separator' group='left'>
                    <span>o</span>
                </div>
                <div className='other-login' group='left'>
                    <button>
                        <img src={google_logo} alt='Google logo'></img>
                        Log In with Google
                    </button>
                </div>
                <p className='switch-form' group='right'>No tienes cuenta todavía. <Link to='/singup' className="register-link">Regístrate ahora</Link></p>
                <img className='mountain-path' src={mountain_path} alt="Mountain" group='right'/>
            </FormSection>  
        </main>
        </>
        
    )
}   