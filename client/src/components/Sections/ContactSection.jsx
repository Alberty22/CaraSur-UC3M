import './ContactSection.css';
import useMobileQuery from '../../hooks/useMobileQuery';
import { useTranslation } from 'react-i18next';

export function ContactSection() {
    const isMobile = useMobileQuery('(max-width: 768px)')

    const { t } = useTranslation();

    return (
        <section id='contact' className="contact-section">
        <h2>{t('home.contactSection.title1')} <span>{t('home.contactSection.title2')}</span></h2>
        <div className="contact-info">
            <div>
            <p><strong>{t('home.contactSection.subtitle1')}</strong></p>
            <p><strong>{t('home.contactSection.information.title1')}</strong> <a href="mailto:carasur@uc3m.es">{t('home.contactSection.information.text1')}</a></p>
            <p><strong>{t('home.contactSection.subtitle2')}</strong></p>
            <p><strong>{t('home.contactSection.information.title2')}</strong> {t('home.contactSection.information.text2')}</p>
            <p><strong>{t('home.contactSection.information.title3')}</strong> {t('home.contactSection.information.text3')}</p>
            <p><strong>{t('home.contactSection.information.title4')}</strong> {t('home.contactSection.information.text4')}</p>
            </div>
            { !isMobile && 
            <div>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.593084479286!2d-3.764535484598187!3d40.33218337937733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd418859e8c02b17%3A0x6f53eebf04a83105!2sUniversidad%20Carlos%20III%20de%20Madrid!5e0!3m2!1sen!2ses!4v1597765831788!5m2!1sen!2ses"
                    style={{ border: '0' }}
                    allowFullScreen=""
                    aria-hidden="false"
                    tabIndex="0"
                    title="Map">
                </iframe>
            </div>}
        </div>
        </section>
    );
}
