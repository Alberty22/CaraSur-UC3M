import { useContext, useState } from "react"
import { FiltersContext } from "../context/filters"

export function useFilters () {
    
    const {filters, setFilters} = useContext(FiltersContext)

    const filterProducts = (products) => {
        return products.filter(product => {
            const matchesSearch = filters.search === '' || product.object.toLowerCase().includes(filters.search.toLowerCase());
            return(
                matchesSearch &&
                (
                filters.object === 'all' ||
                product.object === filters.object
                ) &&
                (
                filters.size === 'all' ||
                product.size === filters.size
                ) &&
                (
                filters.condition === 'all' ||
                product.condition === filters.condition
                ) &&
                (
                filters.category === 'all' ||
                product.category === filters.category
                )
            )
        })}

    const sortProducts = (products) => {
        return products.sort((a, b) => {
            if (a.available > 0 && b.available <= 0) {
                return -1; 
            }
            if (a.available <= 0 && b.available > 0) {
                return 1; 
            }
            return 0;
        });
    }
    return { filters, filterProducts, sortProducts, setFilters }
}
  