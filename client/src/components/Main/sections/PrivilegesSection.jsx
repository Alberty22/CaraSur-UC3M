import './PrivilegesSection.css'

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
                    <li>Acceso a el portal de socio.</li>
                    <li>Préstamo del material del club.</li>
                    <li>Participación en actividades realizadas por el club.</li>
                    <li>Acceso a libros didácticos y guías de escalada.</li>
                    <li>Conocer gente con interés en deportes de montaña.</li>
                </ul>
                <button className="join-button">HAZTE SOCIO</button>
            </div>
        </section>
      );
}