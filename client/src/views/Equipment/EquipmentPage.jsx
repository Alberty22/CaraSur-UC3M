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

export function EquipmentPage() {

    const { data } = useFetch({ url:'/inventory.json' })
    const inventory = data?.inventory

    const { openSidebars, handleOpenSidebar, handleCloseSidebar } = useSideBar()

    return (
        <main className='equipment-page'>
            <Breadcrumbs />
            <header>
                <h2>ALQUILER DE MATERIAL</h2>
                <div></div>
            </header>
            <section className='shop'>
                <aside>
                    <button className='filter-button' onClick={() => handleOpenSidebar('filtersSidebar')}>
                        <img src={filters_icon} alt='Filtros'/>
                    </button>
                    {openSidebars?.filtersSidebar &&
                        <FiltersSidebar>
                            <button onClick={() => handleCloseSidebar('filtersSidebar')}>
                                <img src={swipe_icon} alt='cerrar' />
                            </button>
                        </FiltersSidebar>
                    }
                </aside>
                

                {
                    inventory !== undefined &&
                    <Products products={inventory} />
                }
                
                
                
                <aside>
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
                </aside>
                
            </section>
        </main>
    )
}