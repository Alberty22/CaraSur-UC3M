import { createContext, useState, useEffect, useCallback } from "react";
import { ROUTES } from '../config/apiRoutes.js';
import { getCookie } from "../utils/cookies.js";
import { useAuth } from "../hooks/useAuth.js"

export const NotificationContext = createContext()

export function NotificationsProvider ({ children }) {
    const [notifications, setNotifications] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { isAuthenticated } = useAuth()

    const fetchNotifications = useCallback(async () => {
        try {
        const response = await fetch(`${ROUTES.NOTIFICATIONS}/${encodeURIComponent(getCookie('email'))}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setNotifications(Object.values(data));
        } catch (error) {
        setError(error);
        } finally {
        setLoading(false);
        }
    }, []);

    useEffect(() => {
        if(isAuthenticated) {
            fetchNotifications();
            const intervalId = setInterval(async () => {
                fetchNotifications();
                
            }, 60000);
        
            return () => clearInterval(intervalId);
        }
        
    }, [fetchNotifications, isAuthenticated]);

    return (
        <NotificationContext.Provider value={{ notifications, setNotifications }}>
            {children}
        </NotificationContext.Provider>
    )
}