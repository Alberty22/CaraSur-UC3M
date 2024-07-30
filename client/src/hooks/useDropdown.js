import { useContext, useState, useRef, useEffect, useCallback } from "react";
import { DropdownContext } from "../context/dropdown.jsx";

export function useDropdown({ id, maxHeight, toggleRefs = [] }) {
    const { activePopup, openPopup, closePopup } = useContext(DropdownContext);
    const isOpen = activePopup === id;
    const popupRef = useRef(null);

    const togglePopup = useCallback(() => {
        if (isOpen) {
          closePopup();
        } else {
          openPopup(id);
        }
      }, [isOpen, openPopup, closePopup, id]);


    useEffect(() => {
        if (popupRef.current) {
            popupRef.current.style.maxHeight = isOpen ? `${maxHeight}px` : '0';
        }
    }, [isOpen, maxHeight]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            console.log(toggleRefs)
            if (popupRef.current && popupRef.current.contains(event.target)) {
                return;
            }

            // Check if click is inside any of the toggle references
            const clickedInsideToggleRef = toggleRefs.some(ref => ref.current && ref.current.contains(event.target));
            if (!clickedInsideToggleRef) {
                closePopup();
            }
            else {
                togglePopup()
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closePopup, toggleRefs, togglePopup]);

    const handleOpen = () => {
        openPopup(id);
    };

    const handleClose = () => {
        closePopup();
    };

    return { activePopup, isOpen, popupRef, handleOpen, handleClose};
}
