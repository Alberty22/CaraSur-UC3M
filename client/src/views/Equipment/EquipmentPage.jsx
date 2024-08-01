import { Breadcrumbs } from '../../components/Breadcrumbs'
import filters_icon from '../../assets/images/icons/Filter.webp'
import cart_icon from '../../assets/images/icons/Cart.webp'
import './EquipmentPage.css'
import { useFetch } from '../../hooks/useFetch'
import { Products } from '../../components/Equipment/Products'
import { useSideBar } from '../../hooks/useSideBar'
import { FiltersSidebar } from '../../components/Equipment/FiltersSidebar'
import { CartSidebar } from '../../components/Equipment/CartSidebar'
import swipe_icon from '../../assets/images/icons/Expand_left.webp'
import { useFilters } from '../../hooks/useFilters'
import { usePopup } from '../../hooks/usePopups'
import Popup from '../../components/Popup'

export function EquipmentPage() {

    const { data } = useFetch({ url:'/inventory.json' })
    const inventory = data?.inventory

    const inventory_unique = {
        "object": inventory ? [...new Set(Object.values(inventory).map(item => item?.object))] : [],
        "size" : inventory ? [...new Set(Object.values(inventory).map(item => item?.size))] : [],
        "condition": inventory ? [...new Set(Object.values(inventory).map(item => item?.condition))] : [],
        "category": inventory ? [...new Set(Object.values(inventory).map(item => item?.category))] : [],
    }

    const { openSidebars, handleOpenSidebar, handleCloseSidebar } = useSideBar()

    const { filters, filterProducts, sortProducts } = useFilters()
    const filteredProducts = sortProducts(filterProducts(inventory ? Object.values(inventory) : []))
    
    const { popupContent } = usePopup();

    return (
        <>
        <main className='equipment-page'>
            <Breadcrumbs />
            <header>
                <h2>ALQUILER DE MATERIAL</h2>
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