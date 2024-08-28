import { createContext, useState } from "react";

export const ActivityFiltersContext = createContext();

export function ActivityFiltersProvider ( { children }) {

    
    const[filters, setFilters] = useState({
        search: '',
        date: '',
        difficulty: 'all'
    });

    return (
        <ActivityFiltersContext.Provider value={{
            filters,
            setFilters

        }}>
            {children}
        </ActivityFiltersContext.Provider>
    )
}