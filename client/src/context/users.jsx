import { createContext, useState, useEffect, useCallback } from "react";
import { usePageVisibility } from "../hooks/usePageVisibility.js";

import { ROUTES } from '../config/apiRoutes.js';

export const UsersContext = createContext()

export function UsersProvider ({ children }) {
    const [users, setUsers] = useState([])
    const [firstFetch, setFirstFecth] =  useState(false)
    const isVisible = usePageVisibility()
    const [eventSource, setEventSource] = useState(null)

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchUsers = useCallback(async () => {
        try {
            const res = await fetch(ROUTES.USERS)
            if (!res.ok) {
                throw new Error('Network response was not ok')
            }
            const data = await res.json()
            setUsers(data)
        } 
        catch (error) {
            setError(error)
        } 
        finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {

        if (!isVisible && eventSource) {
            eventSource.close();
            setEventSource(null);
        } 
        if (isVisible && !eventSource) {
            const es = new EventSource('http://localhost:5000/users')
            es.onmessage = async (event) => {
                const newMessage = JSON.parse(event.data)
    
                if(newMessage.message === 'first' && !firstFetch){
                    fetchUsers()
                    setFirstFecth(true)
                } 
    
                if(newMessage.message === 'get'){
                    fetchUsers()
                } 
            }
    
            setEventSource(es)
            return () => {
                if (es) {
                    es.close()
                }
            }
        }
         
    }, [isVisible])

    return (
        <UsersContext.Provider value={{ users, setUsers }}>
            {children}
        </UsersContext.Provider>
    )
}