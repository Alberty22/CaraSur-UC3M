import { useContext, useRef, useEffect, useCallback } from "react";
import { PopupContext } from "../context/popup.jsx";

export function usePopup() {
    const { popupContent, openPopup, closePopup } = useContext(PopupContext);
    const isOpen = popupContent !== null;
    const popupRef = useRef(null);

    useEffect(() => {
        
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                closePopup();
            }

        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closePopup]);

    const handleOpen = useCallback((content) => {
        openPopup(content);
    }, [openPopup]);

    const handleClose = useCallback(() => {
        closePopup();
    }, [closePopup]);

    return { popupContent, isOpen, popupRef, handleOpen, handleClose };
}
