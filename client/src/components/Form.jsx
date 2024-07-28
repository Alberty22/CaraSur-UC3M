import { useForm } from "react-hook-form";
import { useState } from "react";
import './Form.css'
import hide_icon from '../assets/images/icons/View_hide.webp'
import show_icon from '../assets/images/icons/View_show.webp'


export const Form = ({ inputs, onSubmit, type }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [showPassword, setShowPassword] = useState(false);
    const [passIcon, setPassIcon] = useState(show_icon)

    const handleClick = () => {
        setPassIcon(showPassword ? show_icon : hide_icon)
        setShowPassword(!showPassword)
        
    }


    return(
    <form className= 'login-form' onSubmit={handleSubmit(onSubmit)}>
        {
            inputs.map((input) => {
                const { inputKey, inputType, placeholder, error } = input
                if (inputType === 'email') {
                    return (
                        <div key={inputKey} style={{display:'flex', flexDirection:'column' }}>
                            <input type="email" placeholder={placeholder}
                            {...register(inputType, { required: error })}/>
                            {errors[inputType] && <p>{errors[inputType].message}</p>}
                        </div>   
                    )}
                else if (inputType === 'password') {
                    return (
                        <div key={inputKey} style={{display:'flex', flexDirection:'column' }}>
                            <div className='pass-container'>
                                <input
                                type={showPassword ? "text" :"password"}
                                placeholder={placeholder}
                                {...register(inputType, { required: error })}
                                />
                                <button type="button" onClick={handleClick} className='show-pass'><img src={passIcon} alt="Mostrar contraseña" /></button>
                             </div>
                            {errors[inputType] && <p>{errors[inputType].message}</p>}
                        </div>
                        
                    )}

                else if (inputType === 'password-repeat') {
                    return (
                        <div key={inputKey} style={{display:'flex', flexDirection:'column' }}>
                            <div className='pass-container'>
                                <input
                                type={showPassword ? "text" :"password"}
                                placeholder={placeholder}
                                {...register(inputType, { required: error })}
                                />
                                <button type="button" onClick={handleClick} className='show-pass'><img src={passIcon} alt="Mostrar contraseña" /></button>
                                </div>
                            {errors[inputType] && <p>{errors[inputType].message}</p>}
                        </div>
                        
                    )}
                else if (inputType === 'checkbox') {
                    return (
                        <div className="login-extra" key={inputKey}>
                            <div className="remember-me">
                                <input
                                    type="checkbox"
                                    id="rememberMe"
                                    {...register('rememberMe')}
                                />
                                <label htmlFor="rememberMe">{placeholder}</label>
                            </div>
                            <a href="/" className="forgot-password">¿Has olvidado tu contraseña?</a>
                        </div>
                    )}

                else if (inputType === 'text') {
                    return (
                        <div key={inputKey} style={{display:'flex', flexDirection:'column' }}>
                            <input type="email" placeholder={placeholder}
                            {...register(inputType, { required: error })}/>
                            {errors[inputType] && <p>{errors[inputType].message}</p>}
                        </div>   
                    )}
            })
        }
        <button type="submit">{type}</button>
    </form>
    )

}