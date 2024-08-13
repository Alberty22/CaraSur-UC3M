import './Form.css'

import { Inputs } from './Inputs';

import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useState } from "react";



export const Form = ({ inputs, onSubmit, type, className='form', optionalInputs=[], isLogin=false }) => {

    const [optional, setOptional] = useState(false)

    const { t } = useTranslation()

    const { register, handleSubmit, formState: { errors }, setValue, control, watch, getValues, reset } = useForm()

    const handleClick = () => {
        setOptional(!optional)
    }

    const handleFormSubmit = (data) => {
        onSubmit(data)
        reset()
      }

    return(
        <div className='form-container'>
            <form className={className} onSubmit={handleSubmit(handleFormSubmit)}>
                {
                    <Inputs inputs={inputs} register={register} errors={errors} setValue={setValue} getValues={getValues} control={control} watch={watch} isLogin={isLogin} className={className}/>
                }
                { optionalInputs.length > 0 &&
                <>
                <div className='optional-title'>
                    <button type='button' onClick={handleClick}><h2>{t('form.optional')} &#9660;</h2></button>
                </div>
                
                { optional && 
                <div className='optional-part'>
                    <Inputs inputs={optionalInputs} register={register} errors={errors} setValue={setValue} control={control} watch={watch}/>
                 </div>
                 }
                </>
                
                 

                }
                <button type="submit">{type}</button>
            </form>    
        </div>
    
    )

}