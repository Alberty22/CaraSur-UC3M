import './UserInformation.css'
import edit_icon from '../../assets/images/icons/Edit.webp'
import { usePopup } from '../../hooks/usePopups';
import { useTranslation } from 'react-i18next';

export const UserInformation = ({ information, sectionTitle, popupContent }) => {
    
    const { handleOpen } = usePopup();

    const { t } = useTranslation();

    return (
    <>
    <section className='information-section'>
        <h3>{sectionTitle}</h3>
        {
            information.map((info) => {
                return <p key={info.title}><strong>{t(`profile.${info.title}`)}: </strong>{info.text}</p>
            })
        }
        <button onClick={() => {handleOpen(popupContent)}}>
            <img src={edit_icon} alt='Editar'></img>
        </button>
    </section>
    </>
    
      
    );
  };