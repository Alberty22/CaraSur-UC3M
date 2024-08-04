import './AsideSection.css'
import { Calendar } from './Calendar.jsx'
import { Link, useLocation } from 'react-router-dom'

export function AsideSection({ markedDates }) {
    const location = useLocation()
    
    return(
        <section className='aside-section'>
            <Calendar markedDates={markedDates} />
            <div className='activity-suggestion'>
                <h3>¿Quieres realizar alguna <span>actividad</span>?</h3>
                <button>
                    {
                       location.pathname === '/activites' 
                       ? <Link to='new'>Proponer una actividad </Link>
                       : <Link to='/activities/new'>Proponer una actividad </Link>
                    }
                    
                </button>
            </div>
        </section>
    )
}