import { useState, createContext } from "react";
import { LOGIN_DETAILS } from "./loginDetails";

export interface AuthContext {
  isAuthenticated: () => boolean
  setUser: (username: string | null) => void
  login(username: string, password: string): void
  logout(): void
  user: string | null
}

export const AuthContext = createContext<AuthContext | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null)
  const isAuthenticated = () => {
    return user !== null
  }
  function login(username: string, password: string) {
    if(LOGIN_DETAILS[username] === undefined || LOGIN_DETAILS[username]['password'] !== password){
        throw Error("Provided login details are incorrect")
    }
    else {
        setUser(username)
      }
    }

    function logout() {
        setUser(null)
    }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, setUser, logout, login }}>
      {children}
    </AuthContext.Provider>
  )
}