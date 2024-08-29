import './CartSidebar.css';
import { Cart } from './Cart.jsx';

export function CartSidebar({ children, refetch }) {

    return (
        <aside className="cart-sidebar">
            <div>
                {children}
                <Cart refetch={refetch}/>
            </div>
        </aside>
    )
}