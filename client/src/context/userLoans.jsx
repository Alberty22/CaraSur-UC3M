import { createContext, useState, useEffect, useCallback } from "react";
import { ROUTES } from '../config/apiRoutes.js';
import { getCookie } from "../utils/cookies.js";
import { useAuth } from "../hooks/useAuth.js"

export const UserLoansContext = createContext()

export function UserLoansProvider ({ children }) {
    const [loans, setLoans] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const { isAuthenticated } = useAuth()

    const fetchLoans = useCallback(async () => {
        try {
            const res = await fetch(`${ROUTES.USER_LOANS}/${encodeURIComponent(getCookie('email'))}`)
            if (!res.ok) {
                throw new Error('Network response was not ok')
            }
            const data = await res.json()
            setLoans(data)
        } 
        catch (error) {
            setError(error)
        } 
        finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if(isAuthenticated){
            const eventSource = new EventSource(`http://localhost:5000/loans/${encodeURIComponent(getCookie('email'))}`)

            eventSource.onmessage = async (event) => {
                const newMessage = JSON.parse(event.data)
                
                if(newMessage.message === 'get'){
                    console.log("fetch loans")
                    fetchLoans()
                } 
            }
            return () => {
                eventSource.close()
            }
        }
    }, [isAuthenticated])

    return (
        <UserLoansContext.Provider value={{ loans, setLoans }}>
            {children}
        </UserLoansContext.Provider>
    )
}