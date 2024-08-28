import { createContext, useReducer} from "react";
import { cartReducer, cartInitialState } from "../reducers/cart.js";


function useCartReducer () {

    const [state, dispach] = useReducer(cartReducer, cartInitialState)

    const addToCart = product => dispach({
        type: 'ADD_TO_CART',
        payload: product
    });

    const removeFromCart = product => dispach({
        type: 'REMOVE_FROM_CART',
        payload: product
    });

    const removeOneFromCart = product => dispach({
        type: 'REMOVE_ONE_FROM_CART',
        payload: product
    });

    const clearCart = product => dispach({
        type: 'CLEAR_CART',
        payload: product
    });

    return { state, addToCart, removeFromCart, removeOneFromCart, clearCart }
}

export const CartContext = createContext();

export function CartProvider ({ children }) {
    
    const { state, addToCart, removeFromCart, removeOneFromCart, clearCart } = useCartReducer()

    return(
        <CartContext.Provider value={{
            cart: state, addToCart, clearCart, removeFromCart, removeOneFromCart
        }}
        >
            {children}
        </CartContext.Provider>
    )
}