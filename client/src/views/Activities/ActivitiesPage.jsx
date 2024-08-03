import './ActivitiesPage.css'
import { Breadcrumbs } from '../../components/Breadcrumbs'
import { FiltersBar } from '../../components/Activities/FiltersBar'
import { Calendar } from '../../components/Activities/Calendar'
import { Link } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'

export function ActivitiesPage() {

    const { data } = useFetch({ url:'/activities.json' })
    const activities = data?.activities
    
    const markedDates = activities 
        ? Object.values(activities).map(activity => ({
            date: new Date(activity.date),
            text: activity.title
        }))
        : []

    return (
        <main className='activities-page'>
            <Breadcrumbs />
            <header>
                <h2>ACTIVIDADES</h2>
            </header>
            <main>
                <FiltersBar />
                <section>
                    <Calendar markedDates={markedDates} />
                    <div className='activity-suggestion'>
                        <h3>¿Quieres realizar alguna <span>actividad</span>?</h3>
                        <button>
                            <Link to='/new'>Proponer una actividad </Link>
                        </button>
                    </div>
                </section>
            </main>
            
            
        </main>


    )
}