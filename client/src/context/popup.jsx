import { createContext, useState } from "react"

export const PopupContext = createContext()

export function PopupProvider ({ children }) {
    const [activePopup, setActivePopup] = useState(null);

    // Función para abrir un popup y cerrar todos los demás
    const openPopup = (popupId) => {
        console.log(`se abre ${popupId}`)
        setActivePopup(popupId);
    };

    // Función para cerrar el popup actual
    const closePopup = () => {
        console.log(`se cierra`)
        setActivePopup(null);
    };

    return (
        <PopupContext.Provider value={{ activePopup, openPopup, closePopup }}>
            {children}
        </PopupContext.Provider>
    )
}