import { useContext, useState, useRef, useEffect, useCallback } from "react";
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

    // Función para abrir el popup
    const handleOpen = useCallback((content) => {
        openPopup(content);
    }, [openPopup]);

    // Función para cerrar el popup
    const handleClose = useCallback(() => {
        closePopup();
    }, [closePopup]);

    return { popupContent, isOpen, popupRef, handleOpen, handleClose };
}
