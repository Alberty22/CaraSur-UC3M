import { useContext, useState, useRef, useEffect } from "react";
import { PopupContext } from "../context/popup";

export function usePopup({ id, maxHeight, toggleRefs = [] }) {
    const { activePopup, openPopup, closePopup } = useContext(PopupContext);
    const isOpen = activePopup === id;
    const popupRef = useRef(null);
    console.log(toggleRefs)

    useEffect(() => {
        if (popupRef.current) {
            popupRef.current.style.maxHeight = isOpen ? `${maxHeight}px` : '0';
        }
    }, [isOpen, maxHeight]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                const clickedInsideToggleRef = toggleRefs.some(ref => ref.current && ref.current.contains(event.target));
                if (!clickedInsideToggleRef) {
                    closePopup();
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closePopup, toggleRefs]);

    const handleOpen = () => {
        openPopup(id);
    };

    const handleClose = () => {
        closePopup();
    };

    const togglePopup = () => {
        if (isOpen) {
            closePopup();
        } else {
            openPopup(id);
        }
    };

    return { activePopup, isOpen, popupRef, handleOpen, handleClose, togglePopup };
}
