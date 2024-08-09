import { createContext, useState } from "react"
import { checkCookies } from "../utils/cookies"

export const AuthContext = createContext()

export function AuthProvider ({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(checkCookies())
    const [isAdmin, setIsAdmin] = useState(checkCookies())

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, isAdmin, setIsAdmin }}>
            {children}
        </AuthContext.Provider>
    )
}