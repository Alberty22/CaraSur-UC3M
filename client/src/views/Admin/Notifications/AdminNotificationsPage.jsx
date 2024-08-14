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
import { useFetch } from '../../../hooks/useFetch'
import { useUsers } from '../../../hooks/useUsers'

import { ROUTES } from '../../../config/apiRoutes'
import { sendData } from '../../../utils/communications'


function AdminNotificationsPage() {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [selectedUsers, setSelectedUsers] = useState([])
    const [message, setMessage] = useState('')
    const [error, setError] = useState(false)

    const { t } = useTranslation()
    const { popupContent, handleOpen } = usePopup();

    const {users} = useUsers()
    const simpleUsers = users ? users.map(({ role, ...rest }) => rest) : []

    const filterSearch = () => {
        const filteredUsers = simpleUsers.filter(user => {
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

    const handleSendClick = async () => {
        if (selectedUsers.length === 0 || message.trim() === '') {
            setError(true)
            return
        }

        setError(false)
        const payload = {
            emails: selectedUsers,
            message: message,
        }

       
        const res = await sendData(payload, ROUTES.NOTIFICATIONS)
        
        if(res.code) {
            setSelectedUsers([])
            setMessage('')
            handleOpen(<OkSection message={t('adminNotifications.ok')} />)
        }
        else {
            handleOpen(<FailedSection message={t('adminNotifications.failed')} />)
        }
        
        
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
                                <ResultList results={results} onButtonClick={handleAddUser} all={true}/>
                            }
                            
                        </div>
                        <div className='selected-users'>
                            <ul>
                                {selectedUsers.map(user => (
                                    <li key={user.email}>
                                        {user.email === 'all' ? t('adminNotifications.all') : user.email}
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

export default AdminNotificationsPage;
