import './AdminUsersPage.css'

import { Breadcrumbs } from '../../../components/others/Breadcrumbs'
import { UserInformation } from '../../../components/others/UserInformation'
import { Searchbar } from '../../../components/others/Searchbar'

import { useTranslation } from 'react-i18next'
import { useState } from 'react'

import { ROUTES } from '../../../config/apiRoutes'
import { requestData } from '../../../utils/communications'
import { getCookie } from '../../../utils/cookies'

import user_img from '../../../assets/images/icons/User_primary.webp'

export function AdminUsersPage() {

    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])

    const { t } = useTranslation()

    const handleSearchClick = async () => {
        const data = await requestData(ROUTES.PROFILE, getCookie('email'))
        console.log(data)
        const user = data ? data : {}
        setResults(user)
    }
    
    const handleSearchChange = (event) => {
        const newSearch = event.target.value === undefined ? '' : event.target.value
        setQuery(newSearch)
    }

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
                    <UserInformation editable={false} information={results.account_details} sectionTitle={t('adminUsers.title1')}/>
                    <UserInformation editable={false} information={results.user_details} sectionTitle={t('adminUsers.title2')}/>
                    <UserInformation editable={false} information={results.user_optional_details} sectionTitle={t('adminUsers.title3')}/>
                    <UserInformation editable={false} information={results.pay_details} sectionTitle={t('adminUsers.title4')}/>
                </div>
                
            </section>
            }
            
        </main>
    )
}