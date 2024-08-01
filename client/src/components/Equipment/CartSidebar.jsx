import './CartSidebar.css'
import { Cart } from './Cart.jsx'

export function CartSidebar({ children }) {

    return (
        <aside className="cart-sidebar">
            <div>
                {children}
                <Cart />
            </div>
        </aside>
    )
}