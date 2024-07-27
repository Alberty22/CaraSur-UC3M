import './LoginMain.css'
import { useForm } from 'react-hook-form';
import mountain_path from '../../../assets/images/visuals/mountain-path.png'

export function LoginMain() {
    
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data);
        // Handle login logic here
    };
    return (
        <div className="login-box">
            <div className="left">
            <h2>LOGIN</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                type="email"
                placeholder="Introduce tu email"
                {...register('email', { required: 'Email is required' })}
                />
                {errors.email && <p>{errors.email.message}</p>}
                
                <input
                type="password"
                placeholder="Introduce tu contraseña"
                {...register('password', { required: 'Password is required' })}
                />
                {errors.password && <p>{errors.password.message}</p>}
                
                <div className="remember-me">
                <input
                    type="checkbox"
                    id="rememberMe"
                    {...register('rememberMe')}
                />
                <label htmlFor="rememberMe">Recuérdame</label>
                </div>
                
                <button type="submit" className="login-button">Log In</button>
            </form>
            <button className="google-login-button">Log In with Google</button>
            <a href="/" className="forgot-password">¿Has olvidado tu contraseña?</a>
            </div>
            <div className="right">
            <p>No tienes cuenta todavía. <a href="/" className="register-link">Regístrate ahora</a></p>
            <img src={mountain_path} alt="Mountain" />
            </div>
        </div>
    )
}