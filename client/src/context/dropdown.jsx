import { createContext, useState } from "react";

export const DropdownContext = createContext();

export function DropdownProvider ({ children }) {
    const [activeDropdown, setActiveDropdown] = useState(null);

    const openDropdown = (dropdownId) => {
        setActiveDropdown(dropdownId);
    };

    const closeDropdown = () => {
        setActiveDropdown(null);
    };

    return (
        <DropdownContext.Provider value={{ activeDropdown, openDropdown, closeDropdown }}>
            {children}
        </DropdownContext.Provider>
    )
}