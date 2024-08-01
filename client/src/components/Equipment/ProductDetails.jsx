import './ProductDetails.css'

export function ProductDetails({ product }) {

    const keysToCopy = ["object", "model", "description", "size", "length", "condition", "available", "category"];
    const targetDetails = keysToCopy.reduce((acc, key) => {
    if (product.hasOwnProperty(key)) {
        acc[key] = product[key];
    }
    return acc;
    }, {});
    return (
        <div className="product-details">
            <section className="product-photo">
                <img src={product.photo} alt={product.object} />
            </section>
            <section className="product-info">
                {
                    Object.keys(targetDetails).map((key) => {
                        return (
                            targetDetails[key] !== null
                            ? <p key={key}><strong>{key}: </strong>{targetDetails[key]}</p>
                            : <></>
                        )
                    })
                }
            </section>
        </div>
    )
}