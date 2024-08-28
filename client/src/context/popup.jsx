import { createContext, useState, useCallback } from "react";

export const PopupContext = createContext();

export function PopupProvider ({ children }) {
    const [popupContent, setPopupContent] = useState(null);

    const openPopup = useCallback((content) => {
        setPopupContent(content);
    }, []);

    const closePopup = useCallback(() => {
        setPopupContent(null);
    }, []);

    return (
        <PopupContext.Provider value={{ popupContent, openPopup, closePopup }}>
            {children}
        </PopupContext.Provider>
    )
}