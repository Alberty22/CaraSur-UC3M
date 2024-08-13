import './NewActivity.css';
import { Breadcrumbs } from '../../components/others/Breadcrumbs';
import { Form } from '../../components/Form/Form';
import { OkSection } from '../../components/others/OkSection';
import { FailedSection } from '../../components/others/FailedSection';
import Popup from '../../components/others/Popup';

import { useTranslation } from 'react-i18next';
import { usePopup } from '../../hooks/usePopups';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { ROUTES } from '../../config/apiRoutes';
import { sendData } from '../../utils/communications';

import inputs_activity from '../../assets/others/inputs-activity.json';

export function NewActivity(){

    const { t } = useTranslation()
    const { popupContent, handleOpen } = usePopup()

    const handleSubmit = async(data) => {
        const activity = {
            "title": data['activity-title'],
            "description": data['activity-description'],
            "date": data['activity-datetime'].split('T')[0],
            "time": data['activity-datetime'].split('T')[1],
            "difficulty": data['activity-difficulty'],
            "chat": data['activity-group'],
            "drive": ""
        }

        const res = await sendData(activity, ROUTES.PENDING_ACTIVITIES)
        if(res.code) {
            handleOpen(<OkSection message={t('adminNotifications.ok')} />)
            
        }
        else {
            handleOpen(<FailedSection message={t('adminNotifications.failed')} />)
        }
    }
    return(
        <>
        <main className='new-activity-page'>
            <Breadcrumbs />
            <section>

                <Form inputs={inputs_activity} onSubmit={handleSubmit} type={t('newActivity.action')} className='form-new-activity'/>
                <p>* <span>{t('newActivity.text1')}:</span> {t('newActivity.text2')}</p>
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