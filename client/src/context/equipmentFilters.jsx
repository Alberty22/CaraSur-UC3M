import { createContext, useState } from "react";

export const EquipmentFiltersContext = createContext()

export function EquipmentFiltersProvider ( { children }) {

    const[filters, setFilters] = useState({
        search: '',
        object: 'all',
        size: 'all',
        condition: 'all',
        category: 'all'
    })

    return (
        <EquipmentFiltersContext.Provider value={{
            filters,
            setFilters

        }}>
            {children}
        </EquipmentFiltersContext.Provider>
    )
}