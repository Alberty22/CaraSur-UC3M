import { useContext } from "react";
import { PopupContext } from "../context/popup";
import { useRef, useEffect } from "react";

export function usePopup ({ id, maxHeight }) {
    const { activePopup, openPopup, closePopup } = useContext(PopupContext);
    const isOpen = activePopup === id;
    const popupRef = useRef(null);

    useEffect(() => {
        if (popupRef.current) {
        popupRef.current.style.maxHeight = isOpen ? `${maxHeight}px` : '0';
        }
    }, [isOpen, maxHeight]);

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

    return { activePopup,isOpen, popupRef, handleOpen, handleClose, togglePopup};
}