import './FiltersBar.css'
import search_icon from '../../assets/images/icons/Search.webp'
import { useId } from 'react'
import { useActivityFilters } from '../../hooks/useActivityFilters'
import { useState } from 'react'
import { Searchbar } from '../others/Searchbar'
import { useTranslation } from 'react-i18next'


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

    const { t } = useTranslation()

    return (
        <div className='filters-bar'>
            <Searchbar handleSearchChange={handleSearchChange} handleSearchClick={handleSearchClick} 
                searchQuery={searchQuery} placeholder={t('activities.filtersBar.search')} className='search-bar-activities'/>
            <div className='other-filters'>
                <div>
                    <div>
                        <label htmlFor={dateFilterId}>{t('activities.filtersBar.date')}:</label>
                        <input htmlFor={dateFilterId} name='date' type='date' onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor={difficultyFilterId}>{t('activities.filtersBar.difficulty')}:</label>
                        <select name='difficulty' id={difficultyFilterId} onChange={handleChange}>
                            <option value='all'>{t('activities.filtersBar.option1')}</option>
                            <option value='1'>{t('activities.filtersBar.option2')}</option>
                            <option value='2'>{t('activities.filtersBar.option3')}</option>
                            <option value='3'>{t('activities.filtersBar.option4')}</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}