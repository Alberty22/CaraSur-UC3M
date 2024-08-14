import './AsideSection.css'
import { Calendar } from './Calendar.jsx'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function AsideSection({ markedDates }) {
    const location = useLocation()

    const { t } = useTranslation();
    const { lng } = useParams()
    
    return(
        <section className='aside-section'>
            <Calendar markedDates={markedDates} />
            <div className='activity-suggestion'>
                <h3>{t('activities.asideSection.title1')} <span>{t('activities.asideSection.title2')}</span></h3>
                <button>
                    {
                       location.pathname === `/${lng}/activities`
                       ? <Link to='new'>{t('activities.asideSection.button')}</Link>
                       : <Link to={`/${lng}/activities/new`}>{t('activities.asideSection.button')} </Link>
                    }
                    
                </button>
            </div>
        </section>
    )
}