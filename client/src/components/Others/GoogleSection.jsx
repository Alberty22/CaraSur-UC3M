import google_logo from '../../assets/images/logos/google.webp';
import { useTranslation } from 'react-i18next';

export function GoogleSection ({ group, type='login' }) {

    const { t } = useTranslation()

    return (
        <>
        <div className='separator' group={group}>
            <span>{t(`${type}.separator`)}</span>
        </div>
        <div className='other-login' group={group}>
            <button>
                <img src={google_logo} alt='Google logo'></img>
                {t(`${type}.google`)}
            </button>
        </div>
        </>
    )
}