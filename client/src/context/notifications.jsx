import { createContext, useState, useEffect, useCallback } from "react"

export const NotificationContext = createContext()

export function NotificationsProvider ({ children }) {
    const [notifications, setNotifications] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchNotifications = useCallback(async () => {
        try {
        const response = await fetch('/notifications.json');
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
    }, [fetchNotifications]);

    return (
        <NotificationContext.Provider value={{ notifications, setNotifications }}>
            {children}
        </NotificationContext.Provider>
    )
}