import { PasswordInput } from './PasswordInput';
import { CheckboxRemember } from './CheckboxRemember';
import { TextInput } from './TextInput';
import { ImageInput } from './ImageInput';
import { SelectInput } from './SelectInput';
import { Checkbox } from './Checkbox';


import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

export function Inputs({inputs , register, errors , setValue, getValues, control, watch, isLogin=false, className='form'}) {

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
        "sports": [
            {"value": "climbing", "text": t('form.sports.climbing')},
            {"value": "hiking", "text": t('form.sports.hiking')},
            {"value": "alpinism", "text": t('form.sports.alpinism')},
            {"value": "ski", "text": t('form.sports.ski')},
            {"value": "cannoying", "text": t('form.sports.cannoying')},
            {"value": "cycling", "text": t('form.sports.cycling')},
            {"value": "", "text": t('form.sports.notAnswer')},
        ],
        "country": [],
        "language": [
            {"value": "es", "text": 'ES'},
            {"value": "en", "text": 'EN'},
        ],
        "theme": [
            {"value": "light", "text": t('form.theme.light')},
        ],
        "activity-difficulty":[
            {"value": "1", "text": "1"},
            {"value": "2", "text": "2"},
            {"value": "3", "text": "3"}
        ]
    }

    return(
        inputs.map((input) => {
            const { inputKey, inputType, placeholder, error } = input
            
            if (inputType === 'password') {
                return <PasswordInput key={inputKey} inputKey={inputKey} placeholder={placeholder[lng]} error={error[lng]} errors={errors} register={register} isLogin={isLogin} getValues={getValues}/>
                }

            else if (inputType === 'checkbox') {
                return <CheckboxRemember key={inputKey} inputKey={inputKey} placeholder={placeholder[lng]} register={register} />
                }

            else if (inputType === 'policy') {
                return <Checkbox key={inputKey.inputKey1} inputKey1={inputKey.inputKey1} inputKey2={inputKey.inputKey2} 
                        placeholder1={placeholder.placeholder1[lng]} placeholder2={placeholder.placeholder2[lng]} register={register} error={error[lng]} errors={errors} />
            }
            
            else if (inputType === 'uc3m-student' || inputType === 'gender' || inputType === 'country' || inputType === 'student' || inputType === 'sports'
                || inputType === 'language' || inputType === 'theme' || inputType === 'activity-difficulty') {
                {
                    return (inputType === 'uc3m-student' || inputType === 'language' || inputType === 'theme')
                    ?  <SelectInput key={inputKey} inputKey={inputKey} inputType={inputType} placeholder={placeholder[lng]} error={error[lng]} errors={errors} register={register} 
                    options={options[inputType]} control={control} watch={watch} setValue={setValue} className={className}/>
                    : <SelectInput key={inputKey} inputKey={inputKey} inputType={inputType} placeholder={placeholder[lng]} errors={errors} register={register} 
                    options={options[inputType]} control={control} watch={watch} setValue={setValue} optional={true} className={className}/>
                }
                
            }   

            else if (inputType === 'image') {
                return <ImageInput key={inputKey} inputKey={inputKey} placeholder={placeholder[lng]} control={control} setValue={setValue} error={error[lng]} errors={errors}/>
            }
            
            else {
                return <TextInput key={inputKey} inputKey={inputKey} inputType={inputType} placeholder={placeholder[lng]} error={error[lng]} errors={errors} register={register} />
            }
                        
        })
    )
}