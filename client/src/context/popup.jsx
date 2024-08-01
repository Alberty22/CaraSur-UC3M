import { createContext, useState, useCallback } from "react"

export const PopupContext = createContext()

export function PopupProvider ({ children }) {
    const [popupContent, setPopupContent] = useState(null);

    // Función para abrir un popup y cerrar todos los demás
    const openPopup = useCallback((content) => {
        setPopupContent(content);
    }, []);

    // Función para cerrar el popup actual
    const closePopup = useCallback(() => {
        setPopupContent(null);
    }, []);

    return (
        <PopupContext.Provider value={{ popupContent, openPopup, closePopup }}>
            {children}
        </PopupContext.Provider>
    )
}