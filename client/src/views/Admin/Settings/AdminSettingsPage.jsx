import './AdminSettingsPage.css';

import { Breadcrumbs } from '../../../components/others/Breadcrumbs';
import { UserInformation } from '../../../components/others/UserInformation';
import { Form } from '../../../components/Form/Form';
import { ResultList } from '../../../components/others/ResultList';
import Popup from '../../../components/others/Popup';
import { OkSection } from '../../../components/others/OkSection';
import { FailedSection } from '../../../components/others/FailedSection';

import { usePopup } from '../../../hooks/usePopups';
import { Searchbar } from '../../../components/others/Searchbar';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFetch } from '../../../hooks/useFetch';
import { useUsers } from '../../../hooks/useUsers';
import { useProfile } from '../../../hooks/useProfile';

import { ROUTES } from '../../../config/apiRoutes';
import { updateData } from '../../../utils/communications';
import { sendData } from '../../../utils/communications';

import admin_settings from '../../../assets/others/admin-settings.json';

function AdminSettingsPage() {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([])

    const {users} = useUsers()

    const { adminDetails, setfetchAdmin} = useProfile()

    const { t } = useTranslation()

    const filterSearch = () => {
        const filteredUsers = users.filter(user => {
            return query === '' || user.email.toLowerCase().includes(query.toLowerCase())
        })
        
        setResults(filteredUsers)
    }

    const handleSearchClick = () => {
        filterSearch()
      }
    
    const handleSearchChange = (event) => {
        const newSearch = event.target.value === undefined ? '' : event.target.value
        setQuery(newSearch)
        filterSearch()
    }

    const handleButtonClick = async (result, state) => {
        const payload = {
            email: result.email,
            role: state ? 'admin' : 'user'
        }
        const res = await sendData(payload, ROUTES.ADMIN)
        setQuery('')
        setResults('')
    }

    const { popupContent, handleClose, handleOpen } = usePopup();

    const handleSubmit = async (data) => {
        let payload
        if(data.email) {
            payload = {
                email: data.email
            }
        }
        if(data['billing-account']) {
            payload = {
                billingAcount: data['billing-account']
            }
        }
        
        const res = await updateData(payload, ROUTES.ADMIN)
        
        if(res.code) {
            setfetchAdmin(true)
            handleOpen(<OkSection className='white' message={t('profile.ok')} />)
            
        }
        else {
            handleOpen(<FailedSection className='white' message={t('profile.failed')} />)
        }
    }

    return(
        <>
        <main className='settings-page'>
            <Breadcrumbs />
            <section>
                <div>
                    <UserInformation information={{"adminEmail": adminDetails?.email}} sectionTitle={t('adminSettings.title1')}
                    popupContent={<Form inputs={admin_settings['admin-account-popup']} onSubmit={(data) => {handleSubmit(data); handleClose()}} type={t('adminSettings.action')}  isLogin={true}/>}/>
                    <UserInformation information={{"billing": adminDetails?.billingAcount}} sectionTitle={t('adminSettings.title2')}
                    popupContent={<Form inputs={admin_settings['admin-billing-popup']} onSubmit={(data) => {handleSubmit(data); handleClose()}} type={t('adminSettings.action')} />}/>
                </div>
                <div>
                    <section className='information-section' style={{minHeight: "370px"}}>
                        <h3>{t('adminSettings.title3')}</h3>
                        <div>
                            <Searchbar handleSearchChange={handleSearchChange} handleSearchClick={handleSearchClick} searchQuery={query} placeholder={t('adminSettings.search')} />
                        </div>
                        <div className='search-results'>
                            {
                                query.length > 0 &&
                                <ResultList results={results} onButtonClick={handleButtonClick} />
                            }
                            
                        </div>
                    </section>
                </div>
                
            </section>
            
        </main>
        { popupContent &&
            <Popup>
                {popupContent}
            </Popup>
        }
        </>
    )
}

export default AdminSettingsPage;