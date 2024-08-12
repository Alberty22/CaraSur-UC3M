import ok_icon from '../../assets/images/icons/ok.webp'
import './OkSection.css'

export function OkSection ({ message, className='black' }) {
    return (
        <div className='ok-section'>
            <img src={ok_icon} alt="ok image"></img>
            <p className={className}>{message}</p>
        </div>
    )
}