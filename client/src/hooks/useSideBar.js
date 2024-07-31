import { useContext, useState, useRef, useEffect } from "react";
import { PopupContext } from "../context/popup.jsx"; // Asegúrate de definir este contexto en tu aplicación

export function useSideBar() {
    const [openSidebars, setOpenSidebars] = useState({});

    const handleOpenSidebar = (sidebarId) => {
        setOpenSidebars((prev) => ({
        ...prev,
        [sidebarId]: !prev[sidebarId],
        }));
    };

    const handleCloseSidebar = (sidebarId) => {
        setOpenSidebars((prev) => ({
        ...prev,
        [sidebarId]: false,
        }));
    };

    return { openSidebars, handleOpenSidebar, handleCloseSidebar };
}

