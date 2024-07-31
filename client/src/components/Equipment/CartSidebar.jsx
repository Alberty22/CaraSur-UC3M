import './CartSidebar.css'

export function CartSidebar({ children }) {

    return (
        <aside className="cart-sidebar">
            <div>
                {children}
            </div>
        </aside>
    )
}