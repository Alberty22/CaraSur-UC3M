import './SingupPage.css'
import google_logo from '../../assets/images/logos/google.webp'
import mountain_path from '../../assets/images/visuals/mountain-path.png'
import useMobileQuery from '../../hooks/useMobileQuery.js';
import { FormSection } from '../../components/Sections/FormSection.jsx';
import { Form } from '../../components/others/Form.jsx';

import inputSingup1 from '../../assets/others/inputs-singup1.json'
import inputSingup2 from '../../assets/others/inputs-singup2.json'

import { Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import { useState } from 'react';

export function SingupPage() {

    const isMobile = useMobileQuery('(max-width: 1024px)')

    const [inputsSingup, setInputsSingup] = useState(inputSingup2)
    const [stepSingup, setStepSingup] = useState(true)

    const onSubmit = data => {
        console.log(data);
        // Handle login logic here
        setInputsSingup(inputSingup2)
        setStepSingup(true)
    };


    

    
    return (
        <>
        <div className='background-img'></div>
        <main className='login-main'>
            <FormSection divideBy={(group) => group === 'left'}>
                <div className='title' group='right'>
                    <h2>SING UP</h2>
                    {isMobile && <p>Ya tienes cuenta. <Link to='/login' className="register-link">Inicia Sesión</Link></p>}
                </div>
                
                <Form inputs={inputsSingup} onSubmit={onSubmit} type={'Sing Up'} group='right' />
                
                { !stepSingup &&
                <>
                <div className='separator' group='right'>
                    <span>o</span>
                </div>
                <div className='other-login' group='right'>
                    <button>
                        <img src={google_logo} alt='Google logo'></img>
                        Sing Up with Google
                    </button>
                </div>
                </>
                }
                <p className='switch-form' group='left'>Ya tienes cuenta. <Link to='/login' className="register-link">Inicia Sesión</Link></p>
                <img className='mountain-path' src={mountain_path} alt="Mountain" group='left'/>
            </FormSection>  
        </main>
        </>
        
    )
}   