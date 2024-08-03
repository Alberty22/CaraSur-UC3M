import './ActivityPage.css'
import { useParams, useLocation } from 'react-router-dom'
import { Breadcrumbs } from '../../components/others/Breadcrumbs'
import { AsideSection } from '../../components/Activities/AsideSection'
import { useFetch } from '../../hooks/useFetch'
import { useActivity } from '../../hooks/useActivity'
import useMobileQuery from '../../hooks/useMobileQuery';
import whatsapp_logo from '../../assets/images/logos/whatsapp.webp'
import drive_logo from '../../assets/images/logos/drive.webp'
import star_icon from '../../assets/images/icons/Star.webp'

const formattedDate = (date) => {
    const months = {
        '01': 'ENE',
        '02': 'FEB',
        '03': 'MAR',
        '04': 'ABR',
        '05': 'MAY',
        '06': 'JUN',
        '07': 'JUL',
        '08': 'AGO',
        '09': 'SEP',
        '10': 'OCT',
        '11': 'NOV',
        '12': 'DIC'
      };
    
      const day = date.getDate();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();

      return `${day} ${months[month]} ${year}`;
}

export function ActivityPage() {
    const location = useLocation();
    const {id, title, description, date, time, difficulty, chat, drive } = location?.state || {};
    
    const { registeredActivities, toggleRegistration } = useActivity();

    const { data } = useFetch({ url:'/activities.json' })
    const activities = data?.activities

    const markedDates = activities 
        ? Object.values(activities).map(activity => ({
        date: new Date(activity.date),
        text: activity.title
        })) 
        : []
    
    const difficultyArray = Array.from({ length: difficulty }, (_, index) => index);


    const isMobile = useMobileQuery('(max-width: 1024px)')

    return (

        <main className='activity-page'>
            <Breadcrumbs />
            <section>
                <div className='activity-info'>
                    <div>
                        <h2>{title}</h2>
                        <div>
                            <div>{formattedDate(new Date(date))}</div>
                            <div>{time}</div>
                        </div>
                        
                    </div>
                    <div>
                        <h3>Dificultad:</h3>
                        {difficultyArray.map((index) => {
                            return <img key={index} className='star' src={star_icon} alt='dificultad' />
                        })}
                    </div>
                    <div>
                        <h3>Descripción</h3>
                        <p>{description}</p>
                    </div>
                    <div>
                        <p><img src={whatsapp_logo} alt='whatsapp'/>Unete al <a href={chat}>chat</a> de la actividad</p>
                        <p><img src={drive_logo} alt='drive'/>Accede a las <a href={drive}>fotos</a> de la actividad</p>
                    </div>
                    <button onClick={() => toggleRegistration(id)}>
                        {registeredActivities.includes(id) ? 'Desinscribirse' : 'Inscribirse'}
                    </button>
                </div>
                { !isMobile &&
                    <AsideSection markedDates={markedDates}></AsideSection>}
            </section>
            
        </main>
            
    )
}