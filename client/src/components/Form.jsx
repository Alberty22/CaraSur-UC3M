import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { useDropzone } from 'react-dropzone';
import './Form.css'
import hide_icon from '../assets/images/icons/View_hide.webp'
import show_icon from '../assets/images/icons/View_show.webp'
import countryList from 'react-select-country-list'


export const Form = ({ inputs, onSubmit, type }) => {
    const { register, handleSubmit, formState: { errors }, setValue, control } = useForm({
        defaultValues: {
          image: null 
        }
      });

    const [showPassword, setShowPassword] = useState(false);
    const [passIcon, setPassIcon] = useState(show_icon)
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
        console.log(event.target.value)
        setSelectedValue(event.target.value);
    };


    const handleClick = () => {
        setPassIcon(showPassword ? show_icon : hide_icon)
        setShowPassword(!showPassword)
        
    }

    // const [fileName, setFileName] = useState('');

    // const onDrop = (acceptedFiles) => {
    //     if (acceptedFiles && acceptedFiles.length > 0) {
    //         const file = acceptedFiles[0];
    //         if (file.type.startsWith('image/')) {
    //             setValue('image', file);
    //             setFileName(file.name);
    //         } else {
    //             console.error(`Skipped '${file.type}' because it is not a valid MIME type.`);
    //         }
    //     }
    // };
      
    // const { getRootProps, getInputProps } = useDropzone({
    //     onDrop,
    //     accept: 'image/*',
    //   });

    console.log(countryList().getData())
    return(
        <div className='form-container'>
            <form className= 'login-form' onSubmit={handleSubmit(onSubmit)}>
                {
                    inputs.map((input) => {
                        const { inputKey, inputType, placeholder, error } = input
                        if (inputType === 'email') {
                            return (
                                <div key={inputKey} style={{display:'flex', flexDirection:'column' }}>
                                    <input type="email" placeholder={placeholder}
                                    {...register(inputKey, { required: error })}/>
                                    {errors[inputKey] && <p>{errors[inputKey].message}</p>}
                                </div>   
                            )}
                        else if (inputType === 'password') {
                            return (
                                <div key={inputKey} className='pass-container' style={{display:'flex', flexDirection:'column' }}>
                                    <input
                                    type={showPassword ? "text" :"password"}
                                    placeholder={placeholder}
                                    {...register(inputKey, { required: error })}
                                    />
                                    <button type="button" onClick={handleClick} className='show-pass'><img src={passIcon} alt="Mostrar contraseña" /></button>
                                    {errors[inputKey] && <p>{errors[inputKey].message}</p>}
                                </div>
                                
                            )}

                        else if (inputType === 'password-repeat') {
                            return (
                                <div key={inputKey} className='pass-container' style={{display:'flex', flexDirection:'column' }}>
                                    <input
                                    type={showPassword ? "text" :"password"}
                                    placeholder={placeholder}
                                    {...register(inputKey, { required: error })}
                                    />
                                    <button type="button" onClick={handleClick} className='show-pass'><img src={passIcon} alt="Mostrar contraseña" /></button>
                                    {errors[inputKey] && <p>{errors[inputKey].message}</p>}
                                </div>
                                
                            )}
                        else if (inputType === 'checkbox') {
                            return (
                                <div className="login-extra" key={inputKey}>
                                    <div className="remember-me">
                                        <input className="remember-me-check"
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
                                    <input type='text' placeholder={placeholder}
                                    {...register(inputKey, { required: error })}/>
                                    {errors[inputKey] && <p>{errors[inputKey].message}</p>}
                                </div>   
                            )}

                        else if (inputType === 'number') {
                            return (
                                <div key={inputKey} style={{display:'flex', flexDirection:'column' }}>
                                    <input type='number' placeholder={placeholder}
                                    {...register(inputKey, { required: error })}/>
                                    {errors[inputKey] && <p>{errors[inputKey].message}</p>}
                                </div>   
                            )}

                        else if (inputType === 'tel') {
                            return (
                                <div key={inputKey} style={{display:'flex', flexDirection:'column' }}>
                                    <input onChange={handleChange} type='tel' placeholder={placeholder}
                                    {...register(inputKey, { required: error })}/>
                                    {errors[inputKey] && <p>{errors[inputKey].message}</p>}
                                </div>   
                            )}
                        
                        else if (inputType === 'uc3m-student') {
                            return (
                                <div key={inputKey} style={{display:'flex', flexDirection:'column' }}>
                                    <select onChange={handleChange} value={selectedValue} className={selectedValue ? 'selected' : ''}
                                    id="isUc3mStudent"
                                    {...register(inputKey, { required: 'Este campo es obligatorio' })}>
                                        <option value="" disabled>{placeholder}</option>
                                        <option value="si">Sí</option>
                                        <option value="no">No</option>
                                    </select>
                                    {errors[inputKey] && <p>{errors[inputKey].message}</p>}
                                </div>   
                            )}

                            else if (inputType === 'gender') {
                                return (
                                    <div key={inputKey} style={{display:'flex', flexDirection:'column' }}>
                                        <select onChange={handleChange} value={selectedValue} className={selectedValue ? 'selected' : ''} id="isUc3mStudent"
                                        {...register(inputKey, { required: 'Este campo es obligatorio' })}>
                                            <option value="" disabled>{placeholder}</option>
                                            <option value="hombre">Hombre</option>
                                            <option value="mujer">Mujer</option>
                                            <option value="otro">Otro</option>
                                            <option value="">Prefiero no contestar</option>
                                        </select>
                                        {errors[inputKey] && <p>{errors[inputKey].message}</p>}
                                    </div>   
                                )}

                            else if (inputType === 'date') {
                                return (
                                    <div key={inputKey} style={{display:'flex', flexDirection:'column' }}>
                                        <input type='date' placeholder={placeholder}
                                        {...register(inputKey, { required: error })}/>
                                        {errors[inputKey] && <p>{errors[inputKey].message}</p>}
                                    </div>   
                                )}

                            else if (inputType === 'country') {
                                return (
                                    <div key={inputKey} style={{display:'flex', flexDirection:'column' }}>
                                        <select onChange={handleChange} value={selectedValue} className={selectedValue ? 'selected' : ''} id="isUc3mStudent"
                                        {...register(inputKey, { required: 'Este campo es obligatorio' })}>
                                            <option value="" disabled>{placeholder}</option>
                                            {countryList().getData().map((country) => {
                                                return (
                                                    <option key={country.value} value={country.label}>{country.label}</option>
                                                )
                                            })
                                            }
                                        </select>
                                        {errors[inputKey] && <p>{errors[inputKey].message}</p>}
                                    </div>   
                                )}

                            else if (inputType === 'student') {
                                return (
                                    <div key={inputKey} style={{display:'flex', flexDirection:'column' }}>
                                        <select onChange={handleChange} value={selectedValue} className={selectedValue ? 'selected' : ''} id="isUc3mStudent"
                                        {...register(inputKey, { required: 'Este campo es obligatorio' })}>
                                            <option value="" disabled>{placeholder}</option>
                                            <option value="si">Sí</option>
                                            <option value="no">No</option>
                                            <option value="">Prefiero no contestar</option>
                                        </select>
                                        {errors[inputKey] && <p>{errors[inputKey].message}</p>}
                                    </div>   
                                )}
                            // else if (inputType === 'image') {
                            //     return (
                            //         <>
                            //         <div key={inputKey} className="dropzone" {...getRootProps()} style={{display:'flex', flexDirection:'column' }}>
                            //             <input {...getInputProps()} name="image" />
                            //             <p>{fileName || placeholder}</p>
                            //         </div>   
                            //         <Controller
                            //         name="image"
                            //         control={control}
                            //         defaultValue={ null }
                            //         render={({ field }) => (
                            //         <input
                            //             type="hidden"
                            //             {...field}
                            //         />
                            //         )}
                            //     />
                            //         </>
                                    
                            //     )}
                    })
                }
                <button type="submit">{type}</button>
            </form>    
        </div>
    
    )

}