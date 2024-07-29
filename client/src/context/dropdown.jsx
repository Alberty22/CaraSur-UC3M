import { createContext, useState } from "react"
import { useEffect, useRef } from "react";

export const DropdownContext = createContext()

export function DropdownProvider ({ children }) {
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const dropdownRefs = useRef(new Map());

    const openDropdown = (id) => {
        setOpenDropdownId(id);
    };

    const closeDropdown = () => {
        setOpenDropdownId(null);
    };

    const handleClickOutside = (event) => {
        if (dropdownRefs.current) {
        for (let [id, ref] of dropdownRefs.current.entries()) {
            if (ref && !ref.contains(event.target)) {
            closeDropdown();
            }
        }
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <DropdownContext.Provider value={{ openDropdownId, openDropdown, closeDropdown, dropdownRefs }}>
        {children}
        </DropdownContext.Provider>
    );
}
