import './ActivitiesPage.css'
import { Breadcrumbs } from '../../components/others/Breadcrumbs.jsx'
import { FiltersBar } from '../../components/Activities/FiltersBar'
import { useFetch } from '../../hooks/useFetch'
import { Activities } from '../../components/Activities/Activities.jsx'
import { useActivityFilters } from '../../hooks/useActivityFilters.js'
import { AsideSection } from '../../components/Activities/AsideSection.jsx'
import { useTranslation } from 'react-i18next'

export function ActivitiesPage() {

    const { data } = useFetch({ url:'/activities.json' })
    const activities = data ? data : []
    
    const { filterActivities, sortActivities } = useActivityFilters()
    const filteredActivities = sortActivities(filterActivities(activities ? activities : []))

    const markedDates = activities 
        ? activities.map(activity => ({
        date: new Date(activity.date),
        text: activity.title
        })) 
        : []

    const { t } = useTranslation();
        
    return (
        <main className='activities-page'>
            <Breadcrumbs />
            <header>
                <h2>{t('activities.title')}</h2>
            </header>
            <main>
                <FiltersBar />
                <Activities activities={filteredActivities} />
                <AsideSection markedDates={markedDates} />
            </main>
            
            
        </main>


    )
}