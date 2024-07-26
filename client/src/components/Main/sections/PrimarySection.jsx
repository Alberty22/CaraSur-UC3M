import carasur_logo from '../../../assets/images/logos/carasur.webp'; 
import primary_visual from '../../../assets/images/visuals/primary.jpg'
import './PrimarySection.css'

export function PrimarySection() {
    return(
        <section className='primary-section' style={{ backgroundImage: `url(${primary_visual})` }}>
            <img src={carasur_logo} alt="CaraSur UC3M" className="logo" />
            <button className="join-button">HAZTE SOCIO</button>
        </section>
    )
}