import './LoanItem.css'
import { useTranslation } from 'react-i18next';

export function LoanItem({ information }) {

    const { t } = useTranslation();

    return (
        <div className="loan-item">
            <h3>
                {information.name}
            </h3>

            <section>
                <div className="image-part">
                    <img src={information.image}></img>
                    <p>{t('loans.quantity')}: {information.quantity}</p>
                </div>
                <div className="date-part">
                    <p>{t('loans.date1')}:</p>
                    <div>{information.loan_date}</div>
                    <p>{t('loans.date2')}:</p>
                    <div>{information.return_date}</div>
                </div>
            </section>
        </div>
    )
}