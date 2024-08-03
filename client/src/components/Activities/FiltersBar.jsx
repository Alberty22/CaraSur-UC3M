import './FiltersBar.css'
import search_icon from '../../assets/images/icons/Search.webp'
import { useId } from 'react'


export function FiltersBar() {

    const difficultyFilterId = useId()
    const dateFilterId = useId()

    return (
        <div className='filters-bar'>
            <div className='search-bar'>
                <div>
                    <input name='query' placeholder='Introduzca una actividad'/>
                    <button>
                        <img src={search_icon} alt='buscar'/>
                    </button>
                </div> 
            </div>
            <div className='other-filters'>
                <div>
                    <div>
                        <label htmlFor={dateFilterId}>Fecha:</label>
                        <input htmlFor={dateFilterId} name='date' type='date'/>
                    </div>
                    <div>
                        <label htmlFor={difficultyFilterId}>Dificultad:</label>
                        <select name='difficulty' id={difficultyFilterId}>
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