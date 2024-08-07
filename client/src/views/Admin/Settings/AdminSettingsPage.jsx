import './AdminSettingsPage.css'
import { Breadcrumbs } from '../../../components/others/Breadcrumbs'
import { UserInformation } from '../../../components/others/UserInformation'
import { Form } from '../../../components/others/Form'
import admin_settings from '../../../assets/others/admin-settings.json'
import { usePopup } from '../../../hooks/usePopups'
import Popup from '../../../components/others/Popup'
import { Searchbar } from '../../../components/others/Searchbar'
import { useState } from 'react'
import { ResultList } from '../../../components/others/ResultList'
import { useTranslation } from 'react-i18next'

export function AdminSettingsPage() {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const { t } = useTranslation();

    const filterSearch = () => {
        const users = [
            {
                "email": "pablo@gmail.com",
                "role": "admin"
            },
            {
                "email": "jose@gmail.com",
                "role": "user"
            },
            {
                "email": "josefina@gmail.com",
                "role": "user"
            },
            {
                "email": "josefina@gmail.com",
                "role": "user"
            },
            {
                "email": "josefina@gmail.com",
                "role": "user"
            },
            {
                "email": "josefina@gmail.com",
                "role": "user"
            },
            {
                "email": "josefina@gmail.com",
                "role": "user"
            },
            {
                "email": "josefina@gmail.com",
                "role": "user"
            },
            {
                "email": "josefina@gmail.com",
                "role": "user"
            }
        ]
        const filteredUsers = users.filter(user => {
            return query === '' || user.email.toLowerCase().includes(query.toLowerCase());
        })
        
        setResults(filteredUsers);
    }

    const handleSearchClick = () => {
        filterSearch()
      };
    
    const handleSearchChange = (event) => {
        const newSearch = event.target.value === undefined ? '' : event.target.value
        setQuery(newSearch);
        filterSearch()
    };
    
    const handleButtonClick = (result, state) => {
        alert(`Botón presionado en: ${result.title} ${state}`);
    };

    const { popupContent, handleClose } = usePopup();

    

    return(
        <>
        <main className='settings-page'>
            <Breadcrumbs />
            <section>
                <div>
                    <UserInformation information={[{"title": "adminEmail", "text": "correo"}]} sectionTitle={t('adminSettings.title1')}
                    popupContent={<Form inputs={admin_settings['admin-account-popup']} onSubmit={(data) => {console.log(data); handleClose()}} type={t('adminSettings.action')} />}/>
                    <UserInformation information={[{"title": "billing", "text": "000000"}]} sectionTitle={t('adminSettings.title2')}
                    popupContent={<Form inputs={admin_settings['admin-billing-popup']} onSubmit={(data) => {console.log(data); handleClose()}} type={t('adminSettings.action')} />}/>
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