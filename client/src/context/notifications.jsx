import { createContext, useState, useEffect, useCallback } from "react";
import { ROUTES } from '../config/apiRoutes.js';
import { useLocation } from 'react-router-dom';

export const NotificationContext = createContext()

export function NotificationsProvider ({ children }) {
    const [notifications, setNotifications] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const location = useLocation()

    const fetchNotifications = useCallback(async () => {
        try {
        console.log('notifications')
        const response = await fetch(ROUTES.NOTIFICATIONS);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setNotifications(data);
        } catch (error) {
        setError(error);
        } finally {
        setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchNotifications();
        const intervalId = setInterval(async () => {
            fetchNotifications();
            
          }, 60000);
        
        return () => clearInterval(intervalId);
    }, [fetchNotifications, location]);

    return (
        <NotificationContext.Provider value={{ notifications, setNotifications }}>
            {children}
        </NotificationContext.Provider>
    )
}