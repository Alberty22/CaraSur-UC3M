import { PasswordInput } from './PasswordInput';
import { CheckboxRemember } from './CheckboxRemember';
import { TextInput } from './TextInput';
import { ImageInput } from './ImageInput';
import { SelectInput } from './SelectInput';


import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

export function Inputs({inputs , register, errors , setValue, control, watch}) {

    const { t } = useTranslation();
    const { lng } = useParams()

    const options = {
        "uc3m-student": [
            {"value": "yes", "text": t('form.uc3m-student.yes')},
            {"value": "no", "text": t('form.uc3m-student.no')}
        ],
        "gender": [
            {"value": "man", "text": t('form.gender.man')},
            {"value": "woman", "text": t('form.gender.woman')},
            {"value": "other", "text": t('form.gender.other')},
            {"value": "", "text": t('form.gender.notAnswer')},
        ],
        "student": [
            {"value": "yes", "text": t('form.student.yes')},
            {"value": "no", "text": t('form.student.no')},
            {"value": "", "text": t('form.student.notAnswer')}
        ],
        "country": [],
        "language": [
            {"value": "es", "text": 'ES'},
            {"value": "en", "text": 'EN'},
        ],
        "theme": [
            {"value": "light", "text": t('form.theme.light')},
        ]
    }

    return(
        inputs.map((input) => {
            const { inputKey, inputType, placeholder, error } = input
            
            if (inputType === 'password') {
                return <PasswordInput key={inputKey} inputKey={inputKey} placeholder={placeholder[lng]} error={error[lng]} errors={errors} register={register}/>
                }

            else if (inputType === 'checkbox') {
                return <CheckboxRemember key={input} inputKey={inputKey} placeholder={placeholder[lng]} register={register} />
                }
            
            else if (inputType === 'uc3m-student' || inputType === 'gender' || inputType === 'country' || inputType === 'student' || inputType === 'language' || inputType === 'theme') {
                {
                    return inputType === 'uc3m-student'
                    ?  <SelectInput key={inputKey} inputKey={inputKey} inputType={inputType} placeholder={placeholder[lng]} error={error[lng]} errors={errors} register={register} 
                    options={options[inputType]} control={control} watch={watch}/>
                    : <SelectInput key={inputKey} inputKey={inputKey} inputType={inputType} placeholder={placeholder[lng]} error={error} errors={errors} register={register} 
                    options={options[inputType]} control={control} watch={watch} optional={true}/>
                }
                
            }   

            else if (inputType === 'image') {
                return <ImageInput key={inputKey} inputKey={inputKey} placeholder={placeholder[lng]} control={control} setValue={setValue}/>
            }
            
            else {
                return <TextInput key={inputKey} inputKey={inputKey} inputType={inputType} placeholder={placeholder[lng]} error={error[lng]} errors={errors} register={register} />
            }
                        
        })
    )
}