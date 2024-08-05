import secondary_visual from '../../assets/images/visuals/secondary.jpg'
import './DescriptionSection.css'
import { useTranslation } from 'react-i18next';

export function DescriptionSection() {

    const { t } = useTranslation();

    return(
        <section className='description-section' style={{ backgroundImage: `url(${secondary_visual})` }}>
            <h1>{t('home.descriptionSection.title')}</h1>
            <p>{t('home.descriptionSection.text1')} <br /> {t('home.descriptionSection.text2')}</p>
        </section>
    )
}