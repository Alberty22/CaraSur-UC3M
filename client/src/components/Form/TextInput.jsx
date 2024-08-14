import { useTranslation } from "react-i18next";

import { ROUTES } from "../../config/apiRoutes";
import { useFetch } from "../../hooks/useFetch";
import { useUsers } from "../../hooks/useUsers";

export function TextInput({inputKey, inputType, placeholder, error, errors, register, isLogin}) {

    const { t } = useTranslation()

    const {users} = useUsers()

    const validateEmail = async (email) => {
        if (users.some(user => user.email === email)) {
          return t('formErrors.email');
        }
        return true;
      }

    return (
        <>
        <div key={inputKey} style={{display:'flex', flexDirection:'column' }}>
            <input type={inputType} placeholder={placeholder}
            {...register(inputKey, { 
                required: error,
                ...inputKey === 'id' && {
                    pattern: { value: /(([x-z]|[X-Z]{1})([-]?)(\d{7})([-]?)([a-z]|[A-Z]{1}))|((\d{8})([-]?)([a-z]|[A-Z]{1}))/g, 
                        message: t('formErrors.id')},
                },
                ...inputKey === 'postal' && {
                    pattern: { value: /^((((01)|([1-4]{1}[0-9]{1})|(5[0-2]{1}))([0-9]{2})[1-9]{1})|(((0[2-9]{1})|([1-4]{1}[0-9]{1})|(5[0-2]{1}))([0-9]{3})))$/, 
                        message: t('formErrors.postal')},
                },
                ...inputKey === 'phone' && {
                    pattern: { value: /^(?:\+34|0034)?[ -]?(\d{9}|\d{3}[ -]?\d{3}[ -]?\d{3})$/, 
                        message: t('formErrors.telephone')},
                },
                ...inputKey === 'billing-account' && {
                    pattern: { value: /^ES\d{22}$/, 
                        message: t('formErrors.billing')},
                },
                ...(!isLogin &&  inputKey === 'email') && {
                    validate: async (value) => await validateEmail(value)
                }
                
                })}/>
        </div>   
        {errors[inputKey] && <p className="errors">{errors[inputKey].message}</p>}
        </>
    )
}