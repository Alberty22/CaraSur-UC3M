import './Activities.css'
import { Link } from 'react-router-dom';

export function Activities({ activities }) {

    // const textMonths = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    const textMonths = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];

    return (
        <main className='activities'>
            <ul>
                {
                    activities.map((activity) => {
                        const [year, month, day] = activity.date.split('-')
                        return(
                            <li key={activity.id} >
                                <div className="date">
                                    <div className="month">{textMonths[parseInt(month, 10) - 1]}</div>
                                    <div className="day">{day}</div>
                                    <div className="year">{year}</div>
                                </div>
                                <div className="event">{activity.title}</div>
                                <button>
                                    <Link to={`/activities/${activity.id}-${activity.title}`} state={activity}>Inscripción</Link>
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
        </main>
    )
}