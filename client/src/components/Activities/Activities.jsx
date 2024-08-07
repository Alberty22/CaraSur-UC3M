import './Activities.css'
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function Activities({ activities, admin=false, handleClick}) {

    const { t } = useTranslation();
    const { lng } = useParams()


    return (
        <main className='activities'>
            <ul>
                {
                    activities.map((activity) => {
                        const [year, month, day] = activity.date.split('-')
                        return(
                            <li key={activity.id} >
                                <div className="date">
                                    <div className="month">{t('activities.activities.months').split(',')[parseInt(month, 10) - 1]}</div>
                                    <div className="day">{day}</div>
                                    <div className="year">{year}</div>
                                </div>
                                <div className="event">{activity.title}</div>
                                { !admin 
                                ? <button>
                                    <Link to={`${activity.id}-${activity.title}`} state={activity}>{t('activities.activities.button')}</Link>
                                </button>

                                : <>
                                <button>
                                    <Link to={`/${lng}/activities/${activity.id}-${activity.title}`} state={activity}>{t('adminActivities.seeMore')}</Link>
                                </button>
                                <button onClick={() => handleClick(activity.id)}>
                                    {t('adminActivities.aprove')}
                                </button>
                                
                                </>

                                }
                                
                            </li>
                        )
                    })
                }
            </ul>
        </main>
    )
}