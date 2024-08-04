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

export function AdminSettingsPage() {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearchClick = () => {

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
      };
    
      const handleSearchChange = (event) => {
        const newSearch = event.target.value === undefined ? '' : event.target.value
        setQuery(newSearch);
      };
    
      const handleButtonClick = (result, state) => {
        alert(`Botón presionado en: ${result.title} ${state}`);
      };

    const { popupContent } = usePopup();

    return(
        <>
        <main className='settings-page'>
            <Breadcrumbs />
            <section>
                <div>
                    <UserInformation information={[{"title": "Correo de administrador", "text": "correo"}]} sectionTitle='Detalles de cuenta'
                    popupContent={<Form inputs={admin_settings['admin-account-popup']} onSubmit={(data) => {console.log(data)}} type={'Cambiar'} />}/>
                    <UserInformation information={[{"title": "Cuenta", "text": "000000"}]} sectionTitle='Detalles de facturación'
                    popupContent={<Form inputs={admin_settings['admin-billing-popup']} onSubmit={(data) => {console.log(data)}} type={'Cambiar'} />}/>
                </div>
                <div>
                    <section className='information-section' style={{minHeight: "370px"}}>
                        <h3>Añadir administradores</h3>
                        <div>
                            <Searchbar handleSearchChange={handleSearchChange} handleSearchClick={handleSearchClick} searchQuery={query} placeholder='Introduce un correo de un usuario' />
                            <ResultList results={results} onButtonClick={handleButtonClick} />
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