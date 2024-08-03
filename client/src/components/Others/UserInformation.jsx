import './UserInformation.css'
import edit_icon from '../../assets/images/icons/Edit.webp'
import { usePopup } from '../../hooks/usePopups';
import Popup from './Popup';

export const UserInformation = ({ information, sectionTitle, popupContent }) => {
    
    const { handleOpen } = usePopup();

    return (
    <>
    <section className='information-section'>
        <h3>{sectionTitle}</h3>
        {
            information.map((info) => {
                return <p key={info.title}><strong>{info.title}: </strong>{info.text}</p>
            })
        }
        <button onClick={() => {handleOpen(popupContent)}}>
            <img src={edit_icon} alt='Editar'></img>
        </button>
    </section>
    </>
    
      
    );
  };