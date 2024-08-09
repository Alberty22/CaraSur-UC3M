import './EquipmentPage.css'

import { Breadcrumbs } from '../../components/others/Breadcrumbs.jsx'
import { Products } from '../../components/Equipment/Products'
import { useSideBar } from '../../hooks/useSideBar'
import { FiltersSidebar } from '../../components/Equipment/FiltersSidebar'
import { CartSidebar } from '../../components/Equipment/CartSidebar'
import Popup from '../../components/others/Popup'

import { useFetch } from '../../hooks/useFetch'
import { useEquipmentFilters } from '../../hooks/useEquipmentFilters'
import { usePopup } from '../../hooks/usePopups'
import { useTranslation } from 'react-i18next'

import { ROUTES } from '../../config/apiRoutes.js'

import swipe_icon from '../../assets/images/icons/Expand_left.webp'
import filters_icon from '../../assets/images/icons/Filter.webp'
import cart_icon from '../../assets/images/icons/Cart.webp'

export function EquipmentPage() {

    const { data } = useFetch({ url:ROUTES.EQUIPMENT })
    const inventory = data ? data : []

    const inventory_unique = {
        "object": inventory ? [...new Set(inventory.map(item => item?.object))] : [],
        "size" : inventory ? [...new Set(inventory.map(item => item?.size))] : [],
        "condition": inventory ? [...new Set(inventory.map(item => item?.condition))] : [],
        "category": inventory ? [...new Set(inventory.map(item => item?.category))] : [],
    }

    const { openSidebars, handleOpenSidebar, handleCloseSidebar } = useSideBar()

    const { filterProducts, sortProducts } = useEquipmentFilters()
    const filteredProducts = sortProducts(filterProducts(inventory))
    
    const { popupContent } = usePopup();

    const { t } = useTranslation();

    return (
        <>
        <main className='equipment-page'>
            <Breadcrumbs />
            <header>
                <h2>{t('equipment.title')}</h2>
                <div></div>
            </header>
            <section className='shop'>
                <button className='filter-button' onClick={() => handleOpenSidebar('filtersSidebar')}>
                        <img src={filters_icon} alt='Filtros'/>
                </button>

                
                    {openSidebars?.filtersSidebar &&
                        <FiltersSidebar invetory_unique={inventory_unique}>
                            <button onClick={() => handleCloseSidebar('filtersSidebar')}>
                                <img src={swipe_icon} alt='cerrar' />
                            </button>
                        </FiltersSidebar>
                    }
                
                
                
                {
                    inventory !== undefined &&
                    <Products products={filteredProducts} />
                }
                
                <button className='cart-button' onClick={() => handleOpenSidebar('cartSidebar')}>
                    <img src={cart_icon} alt='Carrito'/>
                </button>

                
                
                    {openSidebars?.cartSidebar &&
                        <CartSidebar>
                            <button onClick={() => handleCloseSidebar('cartSidebar')}>
                                <img src={swipe_icon} alt='cerrar' />
                            </button>
                        </CartSidebar>
                    }
                    
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