import './ActivityPage.css'

import { Breadcrumbs } from '../../components/others/Breadcrumbs'
import { AsideSection } from '../../components/Activities/AsideSection'

import { useFetch } from '../../hooks/useFetch'
import { useActivity } from '../../hooks/useActivity'
import useMobileQuery from '../../hooks/useMobileQuery';
import { useTranslation } from 'react-i18next';
import { useParams, useLocation } from 'react-router-dom'

import { ROUTES } from '../../config/apiRoutes'

import whatsapp_logo from '../../assets/images/logos/whatsapp.webp'
import drive_logo from '../../assets/images/logos/drive.webp'
import star_icon from '../../assets/images/icons/Star.webp'

const formattedDate = (date, monthsList) => {

    const months = monthsList.reduce((acc, abbreviation, index) => {
        const monthNumber = String(index + 1).padStart(2, '0');
        acc[monthNumber] = abbreviation;
        return acc;
    }, {});

      const day = date.getDate();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();

      return `${day} ${months[month]} ${year}`;
}

export function ActivityPage() {
    const location = useLocation();
    const { activityId } = useParams()
    
    const { registeredActivities, toggleRegistration } = useActivity();

    const { data } = useFetch({ url: ROUTES.ACTIVITIES })
    const activities = data?.activities

    const {id, title, description, date, time, difficulty, chat, drive } = location?.state 
                                                                            ? location.state
                                                                            : ( activities ? activities[activityId.split('-')[0]] : {})

    const markedDates = activities 
        ? Object.values(activities).map(activity => ({
        date: new Date(activity.date),
        text: activity.title
        })) 
        : []
    
    const difficultyArray = Array.from({ length: difficulty }, (_, index) => index);


    const isMobile = useMobileQuery('(max-width: 1024px)')

    const { t } = useTranslation();

    return (

        <main className='activity-page'>
            <Breadcrumbs />
            <section>
                <div className='activity-info'>
                    <div>
                        <h2>{title}</h2>
                        <div>
                            <div>{formattedDate(new Date(date), t('activities.activities.months').split(','))}</div>
                            <div>{time}</div>
                        </div>
                        
                    </div>
                    <div>
                        <h3>{t('activity.difficulty')}:</h3>
                        {difficultyArray.map((index) => {
                            return <img key={index} className='star' src={star_icon} alt='dificultad' />
                        })}
                    </div>
                    <div>
                        <h3>{t('activity.description')}:</h3>
                        <p>{description}</p>
                    </div>
                    <div>
                        <p><img src={whatsapp_logo} alt='whatsapp'/>{t('activity.whats1')} <a href={chat}>{t('activity.whats2')}</a> {t('activity.whats3')}</p>
                        <p><img src={drive_logo} alt='drive'/>{t('activity.drive1')} <a href={drive}>{t('activity.drive2')}</a> {t('activity.drive3')}</p>
                    </div>
                    { new Date(date) > new Date() &&
                    <button onClick={() => toggleRegistration(id)} className={registeredActivities.includes(id) ? 'unsuscribe': 'suscribe'}>
                        {registeredActivities.includes(id) ? t('activity.unsuscribe') : t('activity.suscribe')}
                    </button>
                    }
                </div>
                { !isMobile &&
                    <AsideSection markedDates={markedDates}></AsideSection>}
            </section>
            
        </main>
            
    )
}