import './Separator.css'
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import { getCookie } from '../../utils/cookies';

export function Separator() {

    const { t } = useTranslation();

    const { isAuthenticated } = useAuth()

    return(
        <section className='separator-section'>
            { isAuthenticated 
            ? <p>{t('home.separator.text3')} <span>{getCookie('name')}</span></p>
            : <p>{t('home.separator.text1')} <span>{t('home.separator.text2')}</span></p>

            }
            
        </section>
    )
}