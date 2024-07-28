import { useContext } from "react";
import { AuthContext } from "../context/auth";

export function useAuth () {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext)

    const login = () => {
        setIsAuthenticated(true)
    }

    const logout = () => {
        setIsAuthenticated(false)
    }

    return { isAuthenticated, login, logout }
}

