import './Products.css'
import addToCart_icon from "../../assets/images/icons/Add-toCart.webp"
import { useCart } from '../../hooks/useCart'
import { usePopup } from '../../hooks/usePopups'
import { ProductDetails } from './ProductDetails'

export function Products ({ products }) {
    const { addToCart, cart } = useCart()

    const checkProductInCart = product => {
        return cart.some(item=> item.id === product.id)
    }

    const { handleOpen } = usePopup();

    const handleClick = (product) => {
        handleOpen(<ProductDetails product={product} />)
    }


    return(
        <main className='products'>
            <ul>
                {products.map(product => {
                    const isProductInCar = checkProductInCart(product)
                    return (
                    <li key={product.id} className={(product.available === 0) ? 'out-stock' : ''} >
                        <img src={product.photo} alt={product.object} onClick={() => handleClick(product)}></img>
                        <div>
                            <div>
                                <strong>{product.Modelo}</strong>{product.Modelo ? ' - ' : ''}{product.object}
                                <p>Disponibles: {product.available}</p>
                            </div>
                            <button onClick={ () => 
                                {isProductInCar || addToCart({"id": product.id, "photo":product.photo, "object": product.object, "quantity":1, "available":product.available})} 
                                }>
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