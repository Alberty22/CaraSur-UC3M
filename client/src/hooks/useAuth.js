import { useContext } from "react";
import { AuthContext } from "../context/auth";
import { saveUserCookies, clearUserCookies } from "../utils/cookies";

export function useAuth () {
    const { isAuthenticated, setIsAuthenticated, isAdmin, setIsAdmin } = useContext(AuthContext)

    const login = (data) => {
        console.log(data)
        saveUserCookies({name: 'Alberto', email:data['email'], rememberMe:data?.rememberMe ? data.rememberMe : false})
        setIsAuthenticated(true)
        setIsAdmin(true)
    }

    const logout = () => {
        clearUserCookies()
        setIsAuthenticated(false)
        setIsAdmin(false)
    }

    return { isAuthenticated, isAdmin,  login, logout }
}

