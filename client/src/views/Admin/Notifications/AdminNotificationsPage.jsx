import './AdminNotificationsPage.css'
import { Breadcrumbs } from '../../../components/others/Breadcrumbs'
import { Searchbar } from '../../../components/others/Searchbar'
import { ResultList } from '../../../components/others/ResultList'
import Popup from '../../../components/others/Popup'
import { OkSection } from '../../../components/others/OkSection'
import { FailedSection } from '../../../components/others/FailedSection'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { usePopup } from '../../../hooks/usePopups'


export function AdminNotificationsPage() {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [selectedUsers, setSelectedUsers] = useState([])
    const [message, setMessage] = useState('')
    const [error, setError] = useState(false)

    const { t } = useTranslation()
    const { popupContent, handleOpen } = usePopup();

    const filterSearch = () => {
        const users = [
            { "email": "pablo@gmail.com"},
            { "email": "jose@gmail.com"},
            { "email": "josefina@gmail.com"}
        ];
        const filteredUsers = users.filter(user => {
            return query === '' || user.email.toLowerCase().includes(query.toLowerCase())
        });
        setResults(filteredUsers)
    }

    const handleSearchChange = (event) => {
        const newSearch = event.target.value === undefined ? '' : event.target.value
        setQuery(newSearch)

        filterSearch()   
    }

    const handleAddUser = (user) => {
        setResults([])
        if (!selectedUsers.find(u => u.email === user.email)) {
            setSelectedUsers([...selectedUsers, user])
        }
    }

    const handleRemoveUser = (user) => {
        setSelectedUsers(selectedUsers.filter(u => u.email !== user.email))
    }

    const handleMessageChange = (event) => {
        setMessage(event.target.value)
    }

    const handleSendClick = () => {
        if (selectedUsers.length === 0 || message.trim() === '') {
            setError(true)
            return
        }

        setError(false)
        const payload = {
            users: selectedUsers,
            message: message,
        };

        // Aquí puedes enviar la información al backend
        console.log('Enviando:', payload)
        // Resetear el estado después de enviar
        setSelectedUsers([])
        setMessage('')
        handleOpen(<OkSection message={t('adminNotifications.ok')} />)
        // handleOpen(<FailedSection message={t('adminNotifications.failed')} />)
    }

    return (
        <>
        <main className='admin-notificactions-page'>
            <Breadcrumbs />
            <section>
                <div>
                    <section className='information-section' style={{ minHeight: "370px" }}>
                        <h3>{t('adminNotifications.title')}</h3>
                        <div className='search'>
                            <Searchbar
                                handleSearchChange={handleSearchChange}
                                handleSearchClick={filterSearch}
                                searchQuery={query}
                                placeholder={t('adminSettings.search')}
                            />
                            
                        </div>
                        <div className='search-results'>
                            {
                                results.length > 0 &&
                                <ResultList results={results} onButtonClick={handleAddUser} />
                            }
                            
                        </div>
                        <div className='selected-users'>
                            <ul>
                                {selectedUsers.map(user => (
                                    <li key={user.email}>
                                        {user.email}
                                        <button onClick={() => handleRemoveUser(user)}>x</button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className='message'>
                            <label htmlFor="message">{t('adminNotifications.message')}:</label>
                            <textarea
                                id="message"
                                placeholder={t('adminNotifications.placeholder')}
                                value={message}
                                onChange={handleMessageChange}
                            />
                        </div>
                        
                        {
                            error &&
                            <div className='error'>
                                <span> {t('adminNotifications.error')}</span>
                            </div>
                        }

                        <div className='send'>
                            
                            <button onClick={handleSendClick}>{t('adminNotifications.send')}</button>
                        </div>
                    </section>
                </div>
                
            </section>
        </main>

        { popupContent &&
            <Popup className='popup-product'>
                {popupContent}
            </Popup>
        }
        </>
        
    )
}
