import './Cart.css'

import { useCart } from "../../hooks/useCart";
import { OkSection } from "../others/OkSection";
import { FailedSection } from "../others/FailedSection";

import { useTranslation } from "react-i18next";
import { usePopup } from "../../hooks/usePopups";

import { ROUTES } from '../../config/apiRoutes';
import { sendData } from '../../utils/communications';
import { getCookie } from '../../utils/cookies';

import add_icon from "../../assets/images/icons/Add.webp"
import remove_icon from "../../assets/images/icons/Remove.webp"
import trash_icon from "../../assets/images/icons/Trash.webp"
import stock_icon from '../../assets/images/icons/Stock-product.webp'



function CartItem ({ photo, object, quantity, addToCart, removeOneFromCart }) {
    return (
      <li>
        <div>
            <img src={photo === null ? stock_icon : photo} alt={object}/>
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



export function Cart({ refetch }) {

    const { cart, clearCart, addToCart, removeOneFromCart } = useCart()

    const { t } = useTranslation();

    const { handleOpen } = usePopup();

    const handleCheckout = async () => {
        
        if (cart.length > 0) {
            const res = await sendData({loansReq:cart, email:getCookie('email')}, ROUTES.PENDING_LOANS)
            if(res.code) {
                handleOpen(<OkSection message={t('equipment.ok')} />)
                clearCart()
                setTimeout(() => {
                    refetch()
                  }, 2000);
            }
            else{
                handleOpen(<FailedSection message={t('equipment.failed')} />)
            }   
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
                    {t('equipment.confirm')}
                </button>

            </div>
            
        </aside>
        </>
    )
}