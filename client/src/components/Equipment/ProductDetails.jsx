import './ProductDetails.css'
import stock_icon from '../../assets/images/icons/Stock-product.webp'
import { useTranslation } from 'react-i18next';

export function ProductDetails({ product }) {

    const keysToCopy = ["object", "model", "description", "size", "length", "condition", "available", "category"];
    const targetDetails = keysToCopy.reduce((acc, key) => {
    if (product.hasOwnProperty(key)) {
        acc[key] = product[key];
    }
    return acc;
    }, {});

    const { t } = useTranslation();

    return (
        <div className="product-details">
            <section className="product-photo">
                <img src={product.photo === null ? stock_icon : product.photo} alt={product.object} />
            </section>
            <section className="product-info">
                {
                    Object.keys(targetDetails).map((key) => {
                        return (
                            targetDetails[key] !== null
                            ? <p key={key}><strong>{t(`equipment.keys.${key}`)}: </strong>{targetDetails[key]}</p>
                            : <></>
                        )
                    })
                }
            </section>
        </div>
    )
}