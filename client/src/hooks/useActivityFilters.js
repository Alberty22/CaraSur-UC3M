import { useContext } from "react"
import { ActivityFiltersContext } from "../context/activityFilters"

export function useActivityFilters () {
    
    const {filters, setFilters} = useContext(ActivityFiltersContext)

    const filterActivities = (activities) => {
        return activities.filter(activity => {
            const matchesSearch = filters.search === '' || activity.title.toLowerCase().includes(filters.search.toLowerCase());
            return(
                matchesSearch &&
                (
                filters.difficulty === 'all' ||
                activity.difficulty === filters.difficulty
                ) &&
                (
                activity.date >= filters.date
                ) 
            )
        })}

    const sortActivities = (activities) => {
        return activities.sort((a, b) => {
            const dateA = new Date(a.date)
            const dateB = new Date(b.date)

            return dateB - dateA;
        });
    }
    return { filters, filterActivities, sortActivities, setFilters }
}
  