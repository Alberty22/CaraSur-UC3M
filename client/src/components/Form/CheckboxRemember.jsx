import { useTranslation } from "react-i18next"

export function CheckboxRemember({ inputKey, register, placeholder}) {

    const { t } = useTranslation()

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
            <a href="/" className="forgot-password">{t('login.forgot')}</a>
        </div>
    )
}