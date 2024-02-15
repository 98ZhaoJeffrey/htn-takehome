import { createContext, ReactNode } from "react";
import { useAuth, TAuthHook } from "../hooks/useAuth/useAuth";

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<TAuthHook | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) =>  {
    const auth = useAuth();
    return <AuthContext.Provider value={auth}>
        {children}
    </AuthContext.Provider>
}