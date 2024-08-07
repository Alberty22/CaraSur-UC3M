import './AdminActivitiesPage.css'
import { Breadcrumbs } from '../../../components/others/Breadcrumbs'
import { Activities } from '../../../components/Activities/Activities'
import Popup from '../../../components/others/Popup'
import { Form } from '../../../components/others/Form'

import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import { useFetch } from '../../../hooks/useFetch'
import { usePopup } from '../../../hooks/usePopups'

import admin_activities from '../../../assets/others/admin-activities.json'


export function AdminActivitiesPage() {

    const { t } = useTranslation();

    const { data } = useFetch({ url:'/activities-pending.json'})

    const [pendingActivities, setPendingActivities] = useState([])

    const { popupContent, handleOpen, handleClose } = usePopup();

    useEffect(() => {
        if (data) {
            setPendingActivities(Object.values(data.activities || []))
            
        }
    }, [data]);

    const handleAccept = (index) => {
        setPendingActivities((prev) => {
            const updated = [...prev]
            return updated.filter(activity => activity.id !== index);
        });
    }

    const handleClick = (index) => {
        
        handleOpen(<Form inputs={admin_activities} onSubmit={(data) => {
            console.log(data); handleClose(); handleAccept(index)
        }} type={t('adminActivities.aprove')} />)
    }

    return (
        <>
        <main className='admin-activities-page'>
            <Breadcrumbs />
            <section>
                <Activities activities={pendingActivities} admin={true} handleClick={handleClick}/>
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