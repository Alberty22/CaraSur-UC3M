import './NewActivity.css'
import { Breadcrumbs } from '../../components/others/Breadcrumbs'
import { Form } from '../../components/others/Form'
import inputs_activity from '../../assets/others/inputs-activity.json'
import { useTranslation } from 'react-i18next'

export function NewActivity(){

    const { t } = useTranslation();

    return(
        <main className='new-activity-page'>
            <Breadcrumbs />
            <section>

                <Form inputs={inputs_activity} onSubmit={(data) => {console.log(data)}} type={'Registrar actividad'} />
                <p>* <span>{t('newActivity.text1')}:</span> {t('newActivity.text2')}</p>
                {/* <div className='activity-info'>
                    <div>
                        <h2></h2>
                        <div>
                            <div></div>
                            <div></div>
                        </div>
                        
                    </div>
                    <div>
                        <h3>Dificultad:</h3>
                        
                    </div>
                    <div>
                        <h3>Descripción</h3>
                        <p>dsafs</p>
                    </div>
                    <div>
                        <p><img src={whatsapp_logo} alt='whatsapp'/>Unete al chat de la actividad</p>
                        <p><img src={drive_logo} alt='drive'/>Accede a las fotos de la actividad</p>
                    </div>
                    <button >
                        Registrar actividad
                    </button>
                </div> */}
            </section>
            
        </main>
    )
}