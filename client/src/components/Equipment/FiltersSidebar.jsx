import './FiltersSidebar.css'
import { useId, useState } from 'react'
import { useFilters } from '../../hooks/useFilters'
import search_icon from '../../assets/images/icons/Search.webp'

export function FiltersSidebar({ children, invetory_unique }) {

    const { setFilters } = useFilters()
    const [searchQuery, setSearchQuery] = useState('');

    const typeFilterId = useId()
    const sizeFilterId = useId()
    const conditionFilterId = useId()
    const categoryFilterId = useId()


    const handleChangeType = (event) => {
        
        setFilters(prevState => ({
            ...prevState,
            object: event.target.value
        }))
    }

    const handleChangeSize = (event) => {
        setFilters(prevState => ({
            ...prevState,
            size: event.target.value
        }))
    }

    const handleChangeCondition = (event) => {
        
        setFilters(prevState => ({
            ...prevState,
            condition: event.target.value
        }))
    }

    const handleChangeCategory = (event) => {
        setFilters(prevState => ({
            ...prevState,
            category: event.target.value
        }))
    }

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

                <div className='search-bar'>
                    <div>
                        <input name='query' placeholder='Introduzca un producto' value={searchQuery} onChange={handleSearchChange}/>
                        <button onClick={handleSearchClick}>
                            <img src={search_icon} alt='buscar'/>
                        </button>
                    </div> 
                </div>
                <div>
                    <label htmlFor={typeFilterId}>Tipo de producto:</label>
                    <select id={typeFilterId} onChange={handleChangeType}>
                        <option value='all'>Todas</option>
                        {invetory_unique.object.map((object,index) => {
                            return object === null ? <></>
                            : <option key={`t${index}`} value={object}>{object}</option>
                        })}
                    </select>
                </div>
                <div>
                    <label htmlFor={sizeFilterId}>Talla:</label>
                    <select id={sizeFilterId} onChange={handleChangeSize}>
                        <option value='all'>Todas</option>
                        {invetory_unique.size.map((object,index) => {
                            return object === null ? <></>
                            : <option key={`s${index}`} value={object}>{object}</option>
                        })}
                    </select>
                </div>
                <div>
                    <label htmlFor={conditionFilterId}>Estado del producto:</label>
                    <select id={conditionFilterId} onChange={handleChangeCondition}>
                        <option value='all'>Todas</option>
                        {invetory_unique.condition.map((object,index) => {
                            return object === null ? <></>
                            : <option key={`c${index}`} value={object}>{object}</option>
                        })}
                    </select>
                </div>
                <div>
                    <label htmlFor={categoryFilterId}>Categoria:</label>
                    <select id={categoryFilterId} onChange={handleChangeCategory}>
                        <option value='all'>Todas</option>
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