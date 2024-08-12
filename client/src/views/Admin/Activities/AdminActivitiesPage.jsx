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
import { sendData } from '../../../utils/communications';

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
            activity : pendingActivities.filter(activity => activity.id !== index)[0],
            drive: data['drive-url']
        }
        console.log(payload)
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

    const handleClick = (index) => {
        handleOpen(<Form inputs={admin_activities} onSubmit={(data) => {handleSubmit(data, index)}} type={t('adminActivities.aprove')} />)
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