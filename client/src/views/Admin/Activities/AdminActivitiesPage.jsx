import './AdminActivitiesPage.css';

import { Breadcrumbs } from '../../../components/others/Breadcrumbs';
import { Activities } from '../../../components/Activities/Activities';
import Popup from '../../../components/others/Popup';
import { Form } from '../../../components/Form/Form';

import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useFetch } from '../../../hooks/useFetch';
import { usePopup } from '../../../hooks/usePopups';

import { ROUTES } from '../../../config/apiRoutes';
import { sendData, updateData } from '../../../utils/communications';

import admin_activities from '../../../assets/others/admin-activities.json';


export function AdminActivitiesPage() {

    const { t } = useTranslation();

    const { data } = useFetch({ url: ROUTES.PENDING_ACTIVITIES})

    const [pendingActivities, setPendingActivities] = useState([])

    const { popupContent, handleOpen, handleClose } = usePopup();

    useEffect(() => {
        if (data) {
            setPendingActivities(data ? data : [])
            
        }
    }, [data]);

    const handleSubmit = async (data, index) => {
        const payload = {
            activity : pendingActivities.filter(activity => activity.id === index)[0],
            drive: data['drive-url']
        }
        
        const res = await sendData(payload, ROUTES.ACTIVITIES)

        if(res.code) {
            setPendingActivities((prev) => {
                const updated = [...prev]
                return updated.filter(activity => activity.id !== index)
            })
            handleClose()
        }
        else {
            handleClose()
        }
        
    }

    const handleAprove = (index) => {
        handleOpen(<Form inputs={admin_activities} onSubmit={(data) => {handleSubmit(data, index)}} type={t('adminActivities.aprove')} />)
    }

    const handleDecline = async (index) => {
        console.log(pendingActivities.filter(activity => activity.id === index)[0])
        const payload = pendingActivities.filter(activity => activity.id !== index)[0]
            
        const res = await updateData(payload, ROUTES.PENDING_ACTIVITIES)

        if(res.code) {
            setPendingActivities((prev) => {
                const updated = [...prev]
                return updated.filter(activity => activity.id !== index)
            })
        }
        
    }

    return (
        <>
        <main className='admin-activities-page'>
            <Breadcrumbs />
            <section>
                <Activities activities={pendingActivities} admin={true} handleAprove={handleAprove} handleDecline={handleDecline}/>
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