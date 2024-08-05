import './Activities.css'
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function Activities({ activities }) {

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
                                <button>
                                    <Link to={`${activity.id}-${activity.title}`} state={activity}>{t('activities.activities.button')}</Link>
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
        </main>
    )
}