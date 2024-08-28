import { createContext, useState } from "react";
import { checkCookies, checkRole, getCookie } from "../utils/cookies";
import { useUsers } from '../hooks/useUsers.js';
import { useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider ({ children }) {
    const { users } =  useUsers();
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const email = getCookie('email');
        if(users.some(item => item?.email === email)) {
            setIsAuthenticated(checkCookies());
            setIsAdmin(checkRole());
        }
    }, [users]);
    

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, isAdmin, setIsAdmin }}>
            {children}
        </AuthContext.Provider>
    )
}