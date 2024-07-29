import { useContext, useState, useRef, useEffect } from "react";
import { DropdownContext } from "../context/dropdown";

export function useDropdown({ id, maxHeight }) {
    const { openDropdownId, openDropdown, closeDropdown, dropdownRefs } = useContext(DropdownContext);
    
    const isOpen = openDropdownId === id;
    const dropdownRef = useRef(null);

    // useEffect(() => {
    //     dropdownRefs.current.set(id, dropdownRef.current);
    //     return () => {
    //     dropdownRefs.current.delete(id);
    //     };
    // }, [id, dropdownRefs]);

    useEffect(() => {
        if (dropdownRef.current) {
          dropdownRef.current.style.maxHeight = isOpen ? `${maxHeight}px` : '0';
        }
      }, [isOpen, maxHeight]);

    const handleToggle = () => {
        if (isOpen) {
        closeDropdown();
        } else {
        openDropdown(id);
        }
    };

    return { dropdownRefs, handleToggle, closeDropdown};
}
