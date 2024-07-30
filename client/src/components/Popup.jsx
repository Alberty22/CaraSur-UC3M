import { usePopup } from "../hooks/usePopups";
import './Popup.css'
import cross_icon from "../assets/images/icons/Cross.webp"

const Popup = ({ id, children }) => {
    const { isOpen, popupRef, handleClose } = usePopup({ id });

    if (!isOpen) return null;

    return (
        <div className="popup" ref={popupRef}>
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
