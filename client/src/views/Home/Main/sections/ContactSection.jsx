import './ContactSection.css';
import useMobileQuery from '../../../../hooks/useMobileQuery';

export function ContactSection() {
    const isMobile = useMobileQuery('(max-width: 768px)')

    return (
        <section className="contact-section">
        <h2>Conoce <span>nuestro club</span></h2>
        <div className="contact-info">
            <div>
            <p><strong>Puedes contactar con nosotros:</strong></p>
            <p><strong>Correo:</strong> <a href="mailto:carasur@uc3m.es">carasur@uc3m.es</a></p>
            <p><strong>Puedes visitarnos:</strong></p>
            <p><strong>Dirección:</strong> Escuela Politécnica Superior, Avda. de la Universidad, 30. 28911 Leganés (Madrid) España.</p>
            <p><strong>Edificio:</strong> Sabatini</p>
            <p><strong>Despacho:</strong> 2.3.D.02B</p>
            </div>
            { !isMobile && 
            <div>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.593084479286!2d-3.764535484598187!3d40.33218337937733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd418859e8c02b17%3A0x6f53eebf04a83105!2sUniversidad%20Carlos%20III%20de%20Madrid!5e0!3m2!1sen!2ses!4v1597765831788!5m2!1sen!2ses"
                    style={{ border: 0 }}
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
