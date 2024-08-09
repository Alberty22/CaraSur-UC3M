import { useTranslation } from "react-i18next"

export function Checkbox({ inputKey1, inputKey2, register, placeholder1, placeholder2, errors, error}) {

    const { t } = useTranslation()

    return (
        <div key={inputKey1} style={{display:'flex', flexDirection:'column', marginTop: '15px' }}>
            <div className="remember-me">
                <input className="remember-me-check"
                    type="checkbox"
                    id={inputKey1}
                    {...register(inputKey1, 
                        { required: error }
                    )}
                />
                <label htmlFor="privacy"><a href='/privacy.pdf' target="_blank" download>{placeholder1}</a></label>
                {errors[inputKey1] && <p style={{padding:'0'}} className="errors">{errors[inputKey1].message}</p>}
            </div>
            
            <div className="remember-me">
                <input className="remember-me-check"
                    type="checkbox"
                    id={inputKey2}
                    {...register(inputKey2, 
                        { required: error }
                    )}
                />
                <label htmlFor="regulations"><a href='/regulations.pdf' target="_blank" download>{placeholder2}</a></label>
                {errors[inputKey2] && <p style={{padding:'0'}} className="errors">{errors[inputKey2].message}</p>}
            </div>
            
        </div>
    )
}