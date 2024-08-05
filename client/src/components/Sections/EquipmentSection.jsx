import './EquipmentSection.css'
import { Link, useParams  } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

export function EquipmentSection() {

    const { t } = useTranslation();
    const { lng } = useParams()

    return(
        <section className='equipment-section'>
            <h2>{t('home.equipmentSection.title1')} <span>{t('home.equipmentSection.title2')}</span></h2>
            <button>
                <Link to={`/${lng}/equipment`}>{t('home.equipmentSection.button')}</Link>
            </button>
        </section>
    )
}