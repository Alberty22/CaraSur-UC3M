import { createContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "../hooks/useAuth.js";
import { usePageVisibility } from "../hooks/usePageVisibility.js";

import { ROUTES } from '../config/apiRoutes.js';
import { getCookie } from "../utils/cookies.js";

export const NotificationContext = createContext();

export function NotificationsProvider ({ children }) {
    const [notifications, setNotifications] = useState({});
    const [firstFetch, setFirstFecth] =  useState(false);
    const isVisible = usePageVisibility();
    const [eventSource, setEventSource] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { isAuthenticated } = useAuth();

    const fetchNotifications = useCallback(async () => {
        try {
            const res = await fetch(`${ROUTES.NOTIFICATIONS}/${encodeURIComponent(getCookie('email'))}`);
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json();
            setNotifications(data);
        } 
        catch (error) {
            setError(error);
        } 
        finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if(isAuthenticated){

            if (isVisible && !eventSource) {
                const es = new EventSource(`${import.meta.env.VITE_SERVER_URL}/notifications/${encodeURIComponent(getCookie('email'))}`);

                es.onmessage = async (event) => {
                    const newMessage = JSON.parse(event.data);
                    
                    if(newMessage.message === 'first' && !firstFetch){
                        fetchNotifications();
                        setFirstFecth(true);
                    } 

                    if(newMessage.message === 'get'){
                        fetchNotifications();
                    } 
                }

                setEventSource(es);
                return () => {
                    if (es) {
                        es.close();
                    }
                    
                }
            }
            
            if (!isVisible && eventSource) {
                eventSource.close();
                setFirstFecth(false)
                setEventSource(null);
            }
        }
    }, [isAuthenticated, isVisible]);

    return (
        <NotificationContext.Provider value={{ notifications, setNotifications }}>
            {children}
        </NotificationContext.Provider>
    )
}