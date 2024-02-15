import { useState } from "react";
import { LOGIN_DETAILS } from "./loginDetails";

export interface TAuthHook {
    user: string | null,
    isLoading: boolean,
    login(username: string, password: string): void,
    logout(): void
}

export const useAuth = (): TAuthHook => {
    const [user, setUser] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false);

    function login(username: string, password: string) {
        setIsLoading(true)
        if(LOGIN_DETAILS[username] === undefined || LOGIN_DETAILS[username]['password'] !== password){
            throw Error("Provided login details are incorrect")
        }
        else {
            setUser(username)
        }
        setIsLoading(false)
    }

    function logout() {
        setUser(null)
    }

    return {
        user,
        isLoading,
        login,
        logout
    }
}
