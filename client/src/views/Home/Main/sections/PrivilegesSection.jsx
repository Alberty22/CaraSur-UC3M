import './PrivilegesSection.css'
import check_icon from '../../../../assets/images/icons/Check.webp'
import { Link } from 'react-router-dom';

export function PrivilegesSection() {
    return (
        <section className="privileges-section">
            <h2>¿Te animas a ser <span>miembro de CaraSur?</span></h2>
            <div className="membership-card">
                <div>
                    <h3>Socio Estándar</h3>
                    <p >10<span>€ </span><span>/año</span></p>
                </div>
                <ul>
                    <li><img src={check_icon} alt='Checked Icon'/>Acceso a el portal de socio.</li>
                    <li><img src={check_icon} alt='Checked Icon'/>Préstamo del material del club.</li>
                    <li><img src={check_icon} alt='Checked Icon'/>Participación en actividades realizadas por el club.</li>
                    <li><img src={check_icon} alt='Checked Icon'/>Acceso a libros didácticos y guías de escalada.</li>
                    <li><img src={check_icon} alt='Checked Icon'/>Conocer gente con interés en deportes de montaña.</li>
                </ul>
                <Link to='/singup'>
                    <button className="join-button">HAZTE SOCIO</button>
                </Link>
            </div>
        </section>
      );
}