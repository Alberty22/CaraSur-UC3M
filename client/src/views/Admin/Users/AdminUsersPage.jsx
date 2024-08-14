import './AdminUsersPage.css';

import { Breadcrumbs } from '../../../components/others/Breadcrumbs';
import { UserInformation } from '../../../components/others/UserInformation';
import { Searchbar } from '../../../components/others/Searchbar';

import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import { ROUTES } from '../../../config/apiRoutes';
import { requestData } from '../../../utils/communications';

import user_img from '../../../assets/images/icons/User_primary.webp';

function AdminUsersPage() {

    const [query, setQuery] = useState('')
    const [error, setError] = useState('')
    const [results, setResults] = useState({})

    const { t } = useTranslation()

    const handleSearchClick = async () => {
        if(query !== ''){
            const data = await requestData(`${ROUTES.PROFILE}/${encodeURIComponent(query)}`)
            const user = data ? data : {}
            
            if(Object.keys(user).length === 0) {
                setError(t('adminUsers.error'))
            }
            else {
                setError('')
            }
            setResults(user)
        }
        
    }
    
    const handleSearchChange = (event) => {
        const newSearch = event.target.value === undefined ? '' : event.target.value
        setQuery(newSearch)
        setError('')
    }

    const userInformation = () => {
        const {UC3MStudent, ...others} = results?.userDetails || {}
        return { name:others.name, surname:others.surname, id:others.id ,postal:others.postal, telephone:others.telephone, UC3MStudent: t(`form.uc3m-student.${UC3MStudent}`)}
    }

    const optionalInformation = () => {
        const data =  Object.fromEntries(
            Object.entries(results?.userOptionalDetails || {}).map(
                ([key, value]) => [key, value === '' || t(`form.${key}.${value}`)]
            )
        )
        return {gender:data.gender, birthdate:data.birthdate, country:data.country, student:data.student, sports:data.sports}
    }

    return (
        <main className='users-page'>
            <Breadcrumbs />
            <div className='search-container'>
                    <Searchbar handleSearchChange={handleSearchChange} handleSearchClick={handleSearchClick} searchQuery={query} placeholder={t('adminUsers.search')} />     
            </div>
            { Object.keys(results).length !== 0 
            ?<section>
                
                <div className='user-image'>
                    <img src={user_img} alt='Imagen de usuario'></img>
                </div>
                <div className='user-info'>
                    <UserInformation editable={false} information={results?.accountDetails} sectionTitle={t('adminUsers.title1')}/>
                    <UserInformation editable={false} information={userInformation()} sectionTitle={t('adminUsers.title2')}/>
                    <UserInformation editable={false} information={optionalInformation()} sectionTitle={t('adminUsers.title3')}/>
                    <UserInformation editable={false} information={results?.payDetails} sectionTitle={t('adminUsers.title4')}/>
                </div>
                
            </section>
            : query !== '' && <h3 style={{marginLeft:'10vw'}}>{error}</h3>
            }
            
        </main>
    )
}

export default AdminUsersPage;