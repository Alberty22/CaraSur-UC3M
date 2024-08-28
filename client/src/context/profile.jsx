import { createContext, useState, useEffect, useCallback } from "react";
import { ROUTES } from '../config/apiRoutes.js';
import { getCookie } from "../utils/cookies.js";
import { useAuth } from "../hooks/useAuth.js";

export const ProfileContext = createContext();

export function ProfileProvider ({ children }) {
    const [userDetails, setUserDetails] = useState({});
    const [adminDetails, setAdmiDetails] = useState({});
    const [fetchData, setfetchData] = useState(true);
    const [fetchAdmin, setfetchAdmin] = useState(true);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { isAuthenticated, isAdmin } = useAuth();

    const fetchUserDetails = useCallback(async () => {
        try {
            const res = await fetch(`${ROUTES.PROFILE}/${encodeURIComponent(getCookie('email'))}`);
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json();
            setUserDetails(data);
        } 
        catch (error) {
            setError(error);
        } 
        finally {
            setLoading(false);
        }
    }, [])

    const fetchAdminDetails = useCallback(async () => {
        try {
            const res = await fetch(ROUTES.ADMIN);
            if (!res.ok) {
                throw new Error('Network response was not ok')
            }
            const data = await res.json();
            setAdmiDetails(data);
        } 
        catch (error) {
            setError(error);
        } 
        finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if(isAuthenticated && fetchData){
            setfetchData(false);
            fetchUserDetails();
        } 
        
    }, [isAuthenticated, fetchData]);

    useEffect(() => {
        if(isAuthenticated && fetchAdmin && isAdmin){
            setAdmiDetails(false);
            fetchAdminDetails();
        } 
        
    }, [isAuthenticated, fetchAdmin, isAdmin]);

    return (
        <ProfileContext.Provider value={{ userDetails, setfetchData, adminDetails, setfetchAdmin }}>
            {children}
        </ProfileContext.Provider>
    )
}