import { createContext, useState } from "react"

export const DropdownContext = createContext()

export function DropdownProvider ({ children }) {
    const [activePopup, setActivePopup] = useState(null);

    // Función para abrir un popup y cerrar todos los demás
    const openPopup = (popupId) => {
        setActivePopup(popupId);
    };

    // Función para cerrar el popup actual
    const closePopup = () => {
        setActivePopup(null);
    };

    return (
        <DropdownContext.Provider value={{ activePopup, openPopup, closePopup}}>
            {children}
        </DropdownContext.Provider>
    )
}