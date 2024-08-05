import './Separator.css'
import { useTranslation } from 'react-i18next';

export function Separator() {

    const { t } = useTranslation();

    return(
        <section className='separator-section'>
            <p>{t('home.separator.text1')} <span>{t('home.separator.text2')}</span></p>
        </section>
    )
}