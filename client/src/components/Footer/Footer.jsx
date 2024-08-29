import './Footer.css';
import carasur_logo from '../../assets/images/logos/carasur.webp';
import instagram_logo from '../../assets/images/logos/instagram.webp';
import x_logo from '../../assets/images/logos/x.webp';
import facebook_logo from '../../assets/images/logos/facebook.webp';
import youtube_logo from '../../assets/images/logos/youtube.webp';
import mountains from '../../assets/images/visuals/mountains.png';
import useMobileQuery from '../../hooks/useMobileQuery';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';

export function Footer () {    
    const isMobile = useMobileQuery('(max-width: 1024px)');
    const { isAuthenticated } = useAuth();

    const { t } = useTranslation();
    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const lng = pathSegments[1];

    const FooterMenu = () => {
        return (
            <>
            { !isMobile &&
                <ul>
                    <li><h3>{t('footer.menu')}</h3></li>
                    <li> <Link to={`/${lng}/`}>{t('footer.home')}</Link> </li>
                    <li> <Link to={`/${lng}/activities`}>{t('footer.activities')}</Link> </li>
                    <li> <Link to={`/${lng}/equipment`}>{t('footer.equipment')}</Link> </li>
                    <li> <Link to={`/${lng}/#contact`}>{t('footer.contact')}</Link> </li>
                    { !isAuthenticated &&
                        <li> <Link to={`/${lng}/login`}>{t('footer.loginArea')}</Link> </li>
                    }
                </ul> 
            }
            </>
        )
    }

    const FooterSocials = () => {
        return (
            <ul>
                { !isMobile &&
                    <li><h3>{t('footer.social')}</h3></li>
                }
                <li>
                    <a href="https://www.instagram.com/carasuruc3m/" target="_blank" rel="noopener noreferrer">
                        <img src={instagram_logo} alt="Instagram" />
                    </a>
                </li>
                <li>
                    <a href="https://x.com/carasuruc3m" target="_blank" rel="noopener noreferrer">
                        <img src={x_logo} alt="X" />
                    </a>
                </li>
                <li>
                    <a href="https://www.facebook.com/ClubCaraSurUC3M" target="_blank" rel="noopener noreferrer">
                        <img src={facebook_logo} alt="Facebook" />
                    </a>
                </li>
                <li>
                    <a href="https://www.youtube.com/@carasuruc3m434" target="_blank" rel="noopener noreferrer">
                        <img src={youtube_logo} alt="YouTube" />
                    </a>
                </li>
            </ul>
        )
    }

    return (
        <footer className='footer'>
            <div>
                <FooterMenu />
            </div>
            <div>
                <img src={carasur_logo} alt="CaraSur UC3M" className="logo" />
            </div>
            <div>
                <FooterSocials />
            </div>

            <div className='extra-links'>
                <ul>
                    <li><a href='/privacy.pdf' target="_blank" download>{t('footer.privacy')}</a></li>
                    <li><a href='/regulations.pdf' target="_blank" download>{t('footer.regulations')}</a></li>
                    <li><a>{t('footer.cookies')}</a></li>
                </ul>
            </div>
            <div className='mountains'>
                <img src={mountains} alt="Mountains" />
            </div>
        </footer>
    )
}