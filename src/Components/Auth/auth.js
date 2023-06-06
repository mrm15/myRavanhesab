import {createContext, useContext, useState} from "react";

const AuthContext = createContext(null)


export const AuthProvider = ({children}) => {
  // const [user, setUser] = useState((localStorage.getItem('token') !== undefined || localStorage.getItem('token') !== null))
  const [user, setUser] = useState(null )
  const login = user => {
    setUser(user)
  }

  const logOut = () => {
    setUser(null)
  }

  return <AuthContext.Provider value={{user, login, logOut}}>{children}</AuthContext.Provider>
}


export const useAuth = () => {
  return useContext(AuthContext)
}