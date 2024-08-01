import failed_icon from '../../assets/images/icons/failed.webp'
import './FailedSection.css'

export function FailedSection ({ message }) {
    return (
        <div className='failed-section'>
            <img src={failed_icon} alt="failed image"></img>
            <p>{message}</p>
        </div>
    )
}