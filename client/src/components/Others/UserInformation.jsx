import './UserInformation.css'

import { usePopup } from '../../hooks/usePopups';
import { useTranslation } from 'react-i18next';

import edit_icon from '../../assets/images/icons/Edit.webp'

export const UserInformation = ({ information, sectionTitle, popupContent, editable = true }) => {
    
    const { handleOpen } = usePopup();

    const { t } = useTranslation();
    return (
    <>
    <section className='information-section'>
        <h3>{sectionTitle}</h3>
        {
            Object.entries(information).map((data) => {
                return <p key={data[0]}><strong>{t(`profile.${data[0]}`)}: </strong>{data[1]}</p>
            })
        }
        { editable &&
        <button onClick={() => {handleOpen(popupContent)}}>
            <img src={edit_icon} alt='Editar'></img>
        </button>
        }
    </section>
    </>
    
      
    );
  };