import './PrivilegesSection.css';

import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import check_icon from '../../assets/images/icons/Check.webp';

export function PrivilegesSection() {

    const { t } = useTranslation();
    const { lng } = useParams();

    return (
        <section className="privileges-section">
            <h2>{t('home.privilegesSection.title1')} <span>{t('home.privilegesSection.title2')}</span></h2>
            <div className="membership-card">
                <div>
                    <h3>{t('home.privilegesSection.title3')}</h3>
                    <p >{t('home.privilegesSection.price1')}<span>{t('home.privilegesSection.price2')} </span><span>{t('home.privilegesSection.price3')}</span></p>
                </div>
                <ul>
                    <li><img src={check_icon} alt='Checked Icon'/>{t('home.privilegesSection.privilege1')}</li>
                    <li><img src={check_icon} alt='Checked Icon'/>{t('home.privilegesSection.privilege2')}</li>
                    <li><img src={check_icon} alt='Checked Icon'/>{t('home.privilegesSection.privilege3')}</li>
                    <li><img src={check_icon} alt='Checked Icon'/>{t('home.privilegesSection.privilege4')}</li>
                    <li><img src={check_icon} alt='Checked Icon'/>{t('home.privilegesSection.privilege5')}</li>
                </ul>
                <Link to={`/${lng}/signup`}>
                    <button className="join-button">{t('home.privilegesSection.partner')}</button>
                </Link>
            </div>
        </section>
      );
}