import './AsideSection.css'
import { Calendar } from './Calendar.jsx'
import { Link } from 'react-router-dom'

export function AsideSection({ markedDates }) {
    return(
        <section className='aside-section'>
            <Calendar markedDates={markedDates} />
            <div className='activity-suggestion'>
                <h3>¿Quieres realizar alguna <span>actividad</span>?</h3>
                <button>
                    <Link to='/new'>Proponer una actividad </Link>
                </button>
            </div>
        </section>
    )
}