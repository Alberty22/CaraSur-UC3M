import { createContext, useState, useEffect, useCallback } from "react";
import { ROUTES } from '../config/apiRoutes.js';
import { getCookie } from "../utils/cookies.js";
import { useAuth } from "../hooks/useAuth.js";
import { usePageVisibility } from "../hooks/usePageVisibility.js";

export const UserLoansContext = createContext();

export function UserLoansProvider ({ children }) {
    const [loans, setLoans] = useState(undefined);
    const [firstFetch, setFirstFecth] =  useState(false);
    const isVisible = usePageVisibility();
    const [eventSource, setEventSource] = useState(null);


    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { isAuthenticated } = useAuth();

    const fetchLoans = useCallback(async () => {
        try {
            const res = await fetch(`${ROUTES.USER_LOANS}/${encodeURIComponent(getCookie('email'))}`);
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json();
            setLoans(data);
        } 
        catch (error) {
            setError(error);
        } 
        finally {
            setLoading(false);
        }
    }, [])

    useEffect(() => {
        if(isAuthenticated){

            if (isVisible && !eventSource) {
                const es = new EventSource(`${import.meta.env.VITE_SERVER_URL}/loans/${encodeURIComponent(getCookie('email'))}`);
                es.onmessage = async (event) => {
                    const newMessage = JSON.parse(event.data);
                    if(newMessage.message === 'first' && !firstFetch){
                        fetchLoans();
                        setFirstFecth(true);
                    } 
    
                    if(newMessage.message === 'get'){
                        fetchLoans();
                    } 
                }
                setEventSource(es);
                return () => {
                    es.close();
                }
            }

            if (!isVisible && eventSource) {
                eventSource.close();
                setFirstFecth(false);
                setEventSource(null);
            } 
        }
    }, [isAuthenticated, isVisible]);

    return (
        <UserLoansContext.Provider value={{ loans, setLoans }}>
            {children}
        </UserLoansContext.Provider>
    )
}