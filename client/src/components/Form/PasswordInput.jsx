import { useState } from "react";

import hide_icon from '../../assets/images/icons/View_hide.webp'
import show_icon from '../../assets/images/icons/View_show.webp'

export function PasswordInput({inputKey, placeholder, error, errors, register}) {


    const [showPassword, setShowPassword] = useState(false);
    const [passIcon, setPassIcon] = useState(show_icon)

    const handleClick = () => {
        setPassIcon(showPassword ? show_icon : hide_icon)
        setShowPassword(!showPassword)
        
    }

    return (
        <>
        <div className='pass-container' style={{display:'flex', flexDirection:'column' }}>
            <input
            type={showPassword ? "text" :"password"}
            placeholder={placeholder}
            {...register(inputKey, { required: error })}
            />
            <button type="button" onClick={handleClick} className='show-pass'><img src={passIcon} alt="Mostrar contraseña" /></button>
        </div>
        {errors[inputKey] && <p className="errors">{errors[inputKey].message}</p>}
        </>
    )
}