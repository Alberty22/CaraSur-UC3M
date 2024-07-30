import { useContext, useState, useRef, useEffect } from "react";
import { PopupContext } from "../context/popup.jsx"; // Asegúrate de definir este contexto en tu aplicación

export function usePopup({ id }) {
    const { activePopup, openPopup, closePopup } = useContext(PopupContext);
    const isOpen = activePopup === id;
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

    const handleOpen = () => {
        openPopup(id);
    };

    const handleClose = () => {
        closePopup();
    };

    return { activePopup, isOpen, popupRef, handleOpen, handleClose };
}
