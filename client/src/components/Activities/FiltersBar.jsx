import './FiltersBar.css'
import search_icon from '../../assets/images/icons/Search.webp'
import { useId } from 'react'
import { useActivityFilters } from '../../hooks/useActivityFilters'
import { useState } from 'react'
import { Searchbar } from '../others/Searchbar'


export function FiltersBar() {

    const { setFilters } = useActivityFilters()
    const [searchQuery, setSearchQuery] = useState('');

    const difficultyFilterId = useId()
    const dateFilterId = useId()

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFilters(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSearchChange = (event) => {
        const newSearch = event.target.value === undefined ? '' : event.target.value
        setSearchQuery(newSearch);
        console.log(newSearch)

        setFilters(prevState => ({
            ...prevState,
            search: newSearch
        }));
    };

    const handleSearchClick = () => {
        setFilters(prevState => ({
            ...prevState,
            search: searchQuery
        }));
    }

    return (
        <div className='filters-bar'>
            <Searchbar handleSearchChange={handleSearchChange} handleSearchClick={handleSearchClick} 
                searchQuery={searchQuery} placeholder='Introduzca una actividad' className='search-bar-activities'/>
            <div className='other-filters'>
                <div>
                    <div>
                        <label htmlFor={dateFilterId}>A partir de:</label>
                        <input htmlFor={dateFilterId} name='date' type='date' onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor={difficultyFilterId}>Dificultad:</label>
                        <select name='difficulty' id={difficultyFilterId} onChange={handleChange}>
                            <option value='all'>Todas</option>
                            <option value='1'>Principiante</option>
                            <option value='2'>Intermedio</option>
                            <option value='3'>Experto</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}