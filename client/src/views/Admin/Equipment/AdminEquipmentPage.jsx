import './AdminEquipmentPage.css'
import { Breadcrumbs } from '../../../components/others/Breadcrumbs'
import { AddProduct } from '../../../components/Admin/AddProduct';
import Popup from '../../../components/others/Popup';

import { useTranslation } from 'react-i18next'
import { usePopup } from '../../../hooks/usePopups';


function AdminEquipmentPage() {

    const { t } = useTranslation();

    const { popupContent } = usePopup();

    return (
        <>
        <main className='admin-equipment-page'>
            <Breadcrumbs />
            <section>
                <h2>{t('adminEquipment.title')}</h2>
                <AddProduct />
            
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

export default AdminEquipmentPage;