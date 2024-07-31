import './LoanItem.css'

export function LoanItem({ information }) {
    return (
        <div className="loan-item">
            <h3>
                {information.name}
            </h3>

            <section>
                <div className="image-part">
                    <img src={information.image}></img>
                    <p>Cantidad: {information.quantity}</p>
                </div>
                <div className="date-part">
                    <p>Fecha del préstamo:</p>
                    <div>{information.loan_date}</div>
                    <p>Fecha de devolución:</p>
                    <div>{information.return_date}</div>
                </div>
            </section>
        </div>
    )
}