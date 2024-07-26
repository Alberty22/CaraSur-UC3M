import secondary_visual from '../../../assets/images/visuals/secondary.jpg'
import './DescriptionSection.css'

export function DescriptionSection() {
    return(
        <section className='description-section' style={{ backgroundImage: `url(${secondary_visual})` }}>
            <h1>Asocición deportiva CaraSur UC3M.</h1>
            <p>Un punto de encuentro y colaboración de personas amantes de <br />la montaña y la naturaleza.</p>
        </section>
    )
}