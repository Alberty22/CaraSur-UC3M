import './NewActivity.css'
import { Breadcrumbs } from '../../components/others/Breadcrumbs'
import { Form } from '../../components/Form/Form'
import inputs_activity from '../../assets/others/inputs-activity.json'
import { useTranslation } from 'react-i18next'

export function NewActivity(){

    const { t } = useTranslation();

    return(
        <main className='new-activity-page'>
            <Breadcrumbs />
            <section>

                <Form inputs={inputs_activity} onSubmit={(data) => {console.log(data)}} type={t('newActivity.action')} className='form-new-activity'/>
                <p>* <span>{t('newActivity.text1')}:</span> {t('newActivity.text2')}</p>
            </section>
            
        </main>
    )
}