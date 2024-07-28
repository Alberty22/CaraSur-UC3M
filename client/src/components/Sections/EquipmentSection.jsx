import './EquipmentSection.css'
import { Link } from 'react-router-dom'

export function EquipmentSection() {
    return(
        <section className='equipment-section'>
            <h2>Alquiler de <span>material</span></h2>
            <button>
                <Link to='/equipment'>Acceso al portal de alquiler</Link>
            </button>
        </section>
    )
}