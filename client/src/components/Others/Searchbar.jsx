import './Searchbar.css'
import search_icon from '../../assets/images/icons/Search.webp'

export function Searchbar({ handleSearchChange, handleSearchClick, searchQuery, placeholder, className='search-bar'}) {
    return (
        <div className={className}>
            <div>
                <input name='query' placeholder={placeholder} value={searchQuery} onChange={handleSearchChange}/>
                <button className='search-button' onClick={handleSearchClick}>
                    <img src={search_icon} alt='buscar'/>
                </button>
            </div> 
        </div>
    )
}