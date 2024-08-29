import { useState } from "react";
import { useTranslation } from "react-i18next";

import hide_icon from '../../assets/images/icons/View_hide.webp';
import show_icon from '../../assets/images/icons/View_show.webp';

export function PasswordInput({inputKey, placeholder, error, errors, register, isLogin=false, getValues}) {


    const [showPassword, setShowPassword] = useState(false);
    const [passIcon, setPassIcon] = useState(show_icon);

    const { t } = useTranslation();

    const handleClick = () => {
        setPassIcon(showPassword ? show_icon : hide_icon);
        setShowPassword(!showPassword);
        
    }

    return (
        <>
        <div className='pass-container' style={{display:'flex', flexDirection:'column' }}>
            <input
            type={showPassword ? "text" :"password"}
            placeholder={placeholder}
            {...register(inputKey, { 
                required: error,
                ...(!isLogin && {
                minLength: { value: 8, message: t('formErrors.password.minLength') },
                pattern: { value: /(?=.*[a-zA-Z]).*/, message: t('formErrors.password.letters')},
                validate: {
                    numbersAndSpecialChars: value => /(?=.*\d)(?=.*[\W]).*/.test(value) || t('formErrors.password.special'),
                    ...inputKey === 'password-repeat' && {
                        matches: (value) => value === getValues('password') || t('formErrors.password.repeat')
                    }
                }})
            })}
            />
            <button type="button" onClick={handleClick} className='show-pass'><img src={passIcon} alt="Mostrar contraseña" /></button>
        </div>
        {errors[inputKey] && <p className="errors">{errors[inputKey].message}</p>}
        </>
    )
}