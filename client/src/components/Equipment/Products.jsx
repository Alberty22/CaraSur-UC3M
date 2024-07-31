import './Products.css'
import addToCart_icon from "../../assets/images/icons/Add-toCart.webp"
// import { useCart } from '../hooks/useCart.js'

export function Products ({ products }) {
    // const { addToCart, cart, removeFromCart} = useCart()

    // const checkProductInCart = product => {
    //     return cart.some(item=> item.id === product.id)
    // }
    return(
        <main className='products'>
            <ul>
                {products.map(product => {
                    // const isProductInCar = checkProductInCart(product)
                    return (
                    <li key={product.Id}>
                        <img src={product.Foto} alt={product.Objeto}></img>
                        <div>
                            <div>
                                <strong>{product.Modelo}</strong>{product.Modelo ? ' - ' : ''}{product.Objeto}
                                <p>Disponibles: </p>
                            </div>
                            <button
                            
                                // onClick={() => {
                                // isProductInCar 
                                // ? removeFromCart(product) 
                                // : addToCart(product)
                                // }}>
                                // {
                                //     isProductInCar
                                //     ? <RemoveFromCartIcon />
                                //     : <AddToCartIcon />
                                // }
                            >
                                <img src={addToCart_icon} />
                            </button>
                        </div>
                    </li>
                )
                })}
            </ul>
        </main>
    )
}