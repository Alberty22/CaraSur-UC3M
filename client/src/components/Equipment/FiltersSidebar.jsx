import './FiltersSidebar.css'
import { useId, useState } from 'react'
import { useEquipmentFilters } from '../../hooks/useEquipmentFilters'
import search_icon from '../../assets/images/icons/Search.webp'
import { Searchbar } from '../others/Searchbar'
import { useTranslation } from 'react-i18next'

export function FiltersSidebar({ children, invetory_unique }) {

    const { setFilters } = useEquipmentFilters()
    const [searchQuery, setSearchQuery] = useState('');

    const typeFilterId = useId()
    const sizeFilterId = useId()
    const conditionFilterId = useId()
    const categoryFilterId = useId()

    const { t } = useTranslation()

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

    return (
        <aside className="filters-sidebar">
            <div>
                {children}
                <Searchbar handleSearchChange={handleSearchChange} handleSearchClick={handleSearchClick} searchQuery={searchQuery} placeholder={t('equipment.filtersSidebar.search')}/>
                <div>
                    <label htmlFor={typeFilterId}>{t('equipment.filtersSidebar.type')}:</label>
                    <select name='object' id={typeFilterId} onChange={handleChange}>
                        <option value='all'>{t('equipment.filtersSidebar.all')}</option>
                        {invetory_unique.object.map((object,index) => {
                            return object === null ? <></>
                            : <option key={`t${index}`} value={object}>{object}</option>
                        })}
                    </select>
                </div>
                <div>
                    <label htmlFor={sizeFilterId}>{t('equipment.filtersSidebar.size')}:</label>
                    <select name='size' id={sizeFilterId} onChange={handleChange}>
                        <option value='all'>{t('equipment.filtersSidebar.all')}</option>
                        {invetory_unique.size.map((object,index) => {
                            return object === null ? <></>
                            : <option key={`s${index}`} value={object}>{object}</option>
                        })}
                    </select>
                </div>
                <div>
                    <label htmlFor={conditionFilterId}>{t('equipment.filtersSidebar.state')}:</label>
                    <select name='condition' id={conditionFilterId} onChange={handleChange}>
                        <option value='all'>{t('equipment.filtersSidebar.all')}</option>
                        {invetory_unique.condition.map((object,index) => {
                            return object === null ? <></>
                            : <option key={`c${index}`} value={object}>{object}</option>
                        })}
                    </select>
                </div>
                <div>
                    <label htmlFor={categoryFilterId}>{t('equipment.filtersSidebar.category')}:</label>
                    <select name='category' id={categoryFilterId} onChange={handleChange}>
                        <option value='all'>{t('equipment.filtersSidebar.all')}</option>
                        {invetory_unique.category.map((object,index) => {
                            return object === null ? <></>
                            : <option key={`ct${index}`} value={object}>{object}</option>
                        })}
                    </select>
                </div>

                
            </div>
        </aside>
    )
}