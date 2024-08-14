import { createContext, useState, useEffect, useCallback } from "react";
import { ROUTES } from '../config/apiRoutes.js';
import { getCookie } from "../utils/cookies.js";
import { useAuth } from "../hooks/useAuth.js"

export const UsersContext = createContext()

export function UsersProvider ({ children }) {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const { isAuthenticated } = useAuth()

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
        const eventSource = new EventSource('http://localhost:5000/users')

        eventSource.onmessage = async (event) => {
            const newMessage = JSON.parse(event.data)
            
            if(newMessage.message === 'get'){
                fetchUsers()
            } 
        }
        return () => {
            eventSource.close();
        }
        
    }, [])

    return (
        <UsersContext.Provider value={{ users, setUsers }}>
            {children}
        </UsersContext.Provider>
    )
}