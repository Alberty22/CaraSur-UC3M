import { createContext, useState } from "react"

export const DropdownContext = createContext()

export function DropdownProvider ({ children }) {
    const [activeDropdown, setActiveDropdown] = useState(null);

    // Función para abrir un popup y cerrar todos los demás
    const openDropdown = (dropdownId) => {
        setActiveDropdown(dropdownId);
    };

    // Función para cerrar el popup actual
    const closeDropdown = () => {
        setActiveDropdown(null);
    };

    return (
        <DropdownContext.Provider value={{ activeDropdown, openDropdown, closeDropdown }}>
            {children}
        </DropdownContext.Provider>
    )
}