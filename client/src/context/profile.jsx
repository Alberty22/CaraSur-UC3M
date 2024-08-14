import { createContext, useState, useEffect, useCallback } from "react";
import { ROUTES } from '../config/apiRoutes.js';
import { getCookie } from "../utils/cookies.js";
import { useAuth } from "../hooks/useAuth.js"

export const ProfileContext = createContext()

export function ProfileProvider ({ children }) {
    const [userDetails, setUserDetails] = useState({})
    const [fetchData, setfetchData] = useState(true)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const { isAuthenticated } = useAuth()

    const fetchUserDetails = useCallback(async () => {
        try {
            const res = await fetch(`${ROUTES.PROFILE}/${encodeURIComponent(getCookie('email'))}`)
            if (!res.ok) {
                throw new Error('Network response was not ok')
            }
            const data = await res.json()
            setUserDetails(data)
        } 
        catch (error) {
            setError(error)
        } 
        finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if(isAuthenticated && fetchData){
            setfetchData(false)
            fetchUserDetails()
        } 
        
    }, [isAuthenticated, fetchData])

    return (
        <ProfileContext.Provider value={{ userDetails, setUserDetails, fetchData, setfetchData }}>
            {children}
        </ProfileContext.Provider>
    )
}