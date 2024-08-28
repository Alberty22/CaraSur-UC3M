import { useState} from "react";

export function useSideBar() {
    const [openSidebars, setOpenSidebars] = useState({});

    const handleOpenSidebar = (sidebarId) => {
        setOpenSidebars((prev) => ({
        ...prev,
        [sidebarId]: !prev[sidebarId],
        }))
    }

    const handleCloseSidebar = (sidebarId) => {
        setOpenSidebars((prev) => ({
        ...prev,
        [sidebarId]: false,
        }))
    }

    return { openSidebars, handleOpenSidebar, handleCloseSidebar };
}

