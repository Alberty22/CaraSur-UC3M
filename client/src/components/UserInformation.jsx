import './UserInformation.css'
import edit_icon from '../assets/images/icons/Edit.webp'

export const UserInformation = ({ information, sectionTitle }) => {
    
  
    return (
    <section className='information-section'>
        <h3>{sectionTitle}</h3>
        {
            information.map((info) => {
                return <p key={info.title}><strong>{info.title}: </strong>{info.text}</p>
            })
        }
        <button>
            <img src={edit_icon} alt='Editar'></img>
        </button>
    </section>
      
    );
  };