import './AdminUsersPage.css'
import { Breadcrumbs } from '../../../components/others/Breadcrumbs'
import { UserInformation } from '../../../components/others/UserInformation'
import { Searchbar } from '../../../components/others/Searchbar'

import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useFetch } from '../../../hooks/useFetch'

import user_img from '../../../assets/images/icons/User_primary.webp'

export function AdminUsersPage() {

    const { data } = useFetch({ url:'/user-data.json' })
    const user = data?.user

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const { t } = useTranslation();

    const handleSearchClick = () => {
        
        setResults(user);
      };
    
      const handleSearchChange = (event) => {
        const newSearch = event.target.value === undefined ? '' : event.target.value
        setQuery(newSearch);
      };

    return (
        <main className='users-page'>
            <Breadcrumbs />
            <div className='search-container'>
                    <Searchbar handleSearchChange={handleSearchChange} handleSearchClick={handleSearchClick} searchQuery={query} placeholder={t('adminUsers.search')} />     
            </div>
            { results.length !== 0 &&
                <section>
                
                <div className='user-image'>
                    <img src={user_img} alt='Imagen de usuario'></img>
                </div>
                <div className='user-info'>
                    <UserInformation editable={false} information={[results.account_details[0]]} sectionTitle={t('adminUsers.title1')}/>
                    <UserInformation editable={false} information={results.user_details} sectionTitle={t('adminUsers.title2')}/>
                    <UserInformation editable={false} information={results.user_optional_details} sectionTitle={t('adminUsers.title3')}/>
                    <UserInformation editable={false} information={results.pay_details} sectionTitle={t('adminUsers.title4')}/>
                </div>
                
            </section>
            }
            
        </main>
    )
}