import { usePopup } from "../hooks/usePopups";
import './Popup.css'
import cross_icon from "../assets/images/icons/Cross.webp"

const Popup = ({ children, className='popup'}) => {
    const { isOpen, popupRef, handleClose } = usePopup();

    if (!isOpen) return null;
    return (
        <div className={className} ref={popupRef}>
            <button onClick={handleClose} style={{ marginTop: '10px' }}>
                <img src={cross_icon} alt="X"></img>
            </button>
            <div>
                {children}
            </div>
            
        </div>
    );
};

export default Popup;
