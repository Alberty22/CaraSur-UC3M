import './LoginMain.css'
import { useForm } from 'react-hook-form';
import google_logo from '../../../assets/images/logos/google.webp'
import show_icon from '../../../assets/images/icons/View_hide.webp'
import { useState } from 'react';
import useMobileQuery from '../../../hooks/useMobileQuery';

export function LoginMain() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);

    const isMobile = useMobileQuery('(max-width: 1024px)')

    const onSubmit = data => {
        console.log(data);
        // Handle login logic here
    };

    const handleClick = () => {
        setShowPassword(!showPassword)
    }

    return (
        <main className='login-main'>
            <section>
                <div>
                    <h2>LOGIN</h2>
                    <form className= 'login-form' onSubmit={handleSubmit(onSubmit)}>
                        <input
                        type="email"
                        placeholder="Introduce tu email"
                        {...register('email', { required: 'Email is required' })}
                        />
                        {errors.email && <p>{errors.email.message}</p>}
                        <div className='pass-container'>
                            <input
                            type={showPassword ? "text" :"password"}
                            placeholder="Introduce tu contraseña"
                            {...register('password', { required: 'Password is required' })}
                            />
                            <button type="other" onClick={handleClick} className='show-pass'><img src={show_icon} alt="Mostrar contraseña" /></button>
                        </div>
                        
                        {errors.password && <p>{errors.password.message}</p>}
                        
                        <div>
                            <div className="remember-me">
                                <input
                                    type="checkbox"
                                    id="rememberMe"
                                    {...register('rememberMe')}
                                />
                                <label htmlFor="rememberMe">Recuérdame</label>
                            </div>
                            <a href="/" className="forgot-password">¿Has olvidado tu contraseña?</a>
                        </div>
                        
                        <button type="submit">Log In</button>
                    </form>

                    <div className='other-login'>
                        <div>
                            <span>o</span>
                        </div>
                        <button>
                            <img src={google_logo} alt='Google logo'></img>
                            Log In with Google
                        </button>
                    </div>
                    
                    
                </div>
                { !isMobile && <div className="right">
                    {/* <p>No tienes cuenta todavía. <a href="/" className="register-link">Regístrate ahora</a></p>
                    <img src={mountain_path} alt="Mountain" /> */}
                </div>}
            </section>
            
        </main>
    )
}   