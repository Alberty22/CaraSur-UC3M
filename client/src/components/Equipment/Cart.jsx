import { useId } from "react";
import './Cart.css'
import { useCart } from "../../hooks/useCart";
import add_icon from "../../assets/images/icons/Add.webp"
import remove_icon from "../../assets/images/icons/Remove.webp"
import trash_icon from "../../assets/images/icons/Trash.webp"
import { usePopup } from "../../hooks/usePopups";
import { OkSection } from "../Others/OkSection";
import { FailedSection } from "../Others/FailedSection";


function CartItem ({ photo, object, quantity, addToCart, removeOneFromCart }) {
    return (
      <li>
        <div>
            <img src={photo} alt={object}/>
            <strong>{object}</strong>
        </div>
  
        <footer>
          <small>
            Qty: {quantity}
          </small>
          <button className="qty-button" onClick={removeOneFromCart}><img src={remove_icon} alt="-"/></button>
          <button className="qty-button" onClick={addToCart}><img src={add_icon} alt="+"/></button>
        </footer>
      </li>
    )
  }



export function Cart() {

    const cartCheckboxId = useId()
    const { cart, clearCart, addToCart, removeOneFromCart } = useCart()

    const { handleOpen } = usePopup();

    const handleCheckout = () => {
        
        console.log(cart)
        if (cart.length > 0) {
            handleOpen(<OkSection message={"Todo ha salido correctamente"} />)
            // handleOpen(<FailedSection message={"Se ha producido un error"} />)
            clearCart()
        }
        
    }

    return(
        <>
        <aside className="cart">
            <ul>
                {cart.map(product => (
                    <CartItem key={product.id} 
                    addToCart={() => addToCart(product)}
                    removeOneFromCart={() => removeOneFromCart(product)}
                    {...product } />
                ))}
            </ul>
            <div>
                <button className='clean-cart' onClick={clearCart}>
                    <img src={trash_icon} alt="Vaciar"/>
                </button>

                <button className='confirm-cart' onClick={handleCheckout}>
                    Confirmar
                </button>

            </div>
            
        </aside>
        </>
    )
}