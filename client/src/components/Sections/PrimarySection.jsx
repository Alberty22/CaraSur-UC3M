import carasur_logo from '../../assets/images/logos/carasur.webp'; 
import primary_visual from '../../assets/images/visuals/primary.jpg'
import './PrimarySection.css'
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export function PrimarySection() {

    const { isAuthenticated } = useAuth()

    return(
        <section className='primary-section' style={{ backgroundImage: `url(${primary_visual})` }}>
            <img src={carasur_logo} alt="CaraSur UC3M" className="logo" />
            { !isAuthenticated &&
            <Link to='/singup'>
                <button className="join-button">HAZTE SOCIO</button>
            </Link>
            }
        </section>
    )
}