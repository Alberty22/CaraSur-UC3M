import { useContext } from "react";
import { AuthContext } from "../context/auth";
import { saveUserCookies, clearUserCookies, checkRole } from "../utils/cookies";

export function useAuth () {
    const { isAuthenticated, setIsAuthenticated, isAdmin, setIsAdmin } = useContext(AuthContext)

    const login = (data) => {
        saveUserCookies({name: data.name, email:data.email, role: data.role, rememberMe:data?.rememberMe ? data.rememberMe : false})
        setIsAuthenticated(true)
        setIsAdmin(checkRole())
    }

    const logout = () => {
        clearUserCookies()
        setIsAuthenticated(false)
        setIsAdmin(false)
    }

    return { isAuthenticated, isAdmin,  login, logout }
}

