import './NewActivity.css'
import { Breadcrumbs } from '../../components/others/Breadcrumbs'
import whatsapp_logo from '../../assets/images/logos/whatsapp.webp'
import drive_logo from '../../assets/images/logos/drive.webp'
import { Form } from '../../components/others/Form'
import inputsAtivity from '../../assets/others/inputs-activity.json'

export function NewActivity(){
    return(
        <main className='new-activity-page'>
            <Breadcrumbs />
            <section>

                <Form inputs={inputsAtivity} onSubmit={(data) => {console.log(data)}} type={'Registrar actividad'} />
                <p>* <span>Nota:</span> la actividad propuesta necesitan una aprobación por la Junta Directiva. Cuando se realice la aprobación se le notificará.</p>
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