import { useContext, useState, useRef, useEffect, useCallback } from "react";
import { DropdownContext } from "../context/dropdown.jsx";

export function useDropdown({ id, maxHeight, toggleRefs = [] }) {
    const { activeDropdown, openDropdown, closeDropdown } = useContext(DropdownContext);
    const isOpen = activeDropdown === id;
    const dropdownRef = useRef(null);

    const toggleDropdown = useCallback(() => {
        if (isOpen) {
            closeDropdown();
        } else {
            openDropdown(id);
        }
      }, [isOpen, openDropdown, closeDropdown, id]);


    useEffect(() => {
        if (dropdownRef.current) {
            dropdownRef.current.style.maxHeight = isOpen ? `${maxHeight}px` : '0';
        }
    }, [isOpen, maxHeight]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && dropdownRef.current.contains(event.target)) {
                return;
            }

            // Check if click is inside any of the toggle references
            const clickedInsideToggleRef = toggleRefs.some(ref => ref.current && ref.current.contains(event.target));
            if (!clickedInsideToggleRef) {
                closeDropdown();
            }
            else {
                toggleDropdown()
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closeDropdown, toggleRefs, toggleDropdown]);

    const handleOpen = () => {
        openDropdown(id);
    };

    const handleClose = () => {
        closeDropdown();
    };

    return { activeDropdown, isOpen, dropdownRef, handleOpen, handleClose};
}
