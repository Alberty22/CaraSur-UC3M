import { useContext } from "react";
import { ActivityContext } from "../context/activity";


export function useActivity() {
    const context = useContext(ActivityContext)

    if (context === undefined) {
        throw new Error('useActivity must be used within a ActivityProvider')
    }

    return context

}