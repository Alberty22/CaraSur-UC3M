import { useContext } from "react";
import { AuthContext } from "../context/auth";

export function useAuth () {
    const { isAuthenticated, setIsAuthenticated, isAdmin, setIsAdmin } = useContext(AuthContext)

    const login = () => {
        setIsAuthenticated(true)
        setIsAdmin(true)
    }

    const logout = () => {
        setIsAuthenticated(false)
        setIsAdmin(false)
    }

    return { isAuthenticated, isAdmin,  login, logout }
}

