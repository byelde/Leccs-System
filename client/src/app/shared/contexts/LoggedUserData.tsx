import React, { createContext, useCallback, useState } from "react"


// This context is not used yet


interface ILoggedUserData {
  name:   string|null
  id:     string|null
  email:  string|null

  login: (name:string, id:string, email:string) => void
  logout: () => void
  auth: () => void

}


interface LoggedUserProviderProps {
  children: React.ReactNode
}


export const LoggedUserDataContext = createContext<ILoggedUserData>({} as ILoggedUserData)


export const LoggedUserProvider: React.FC<LoggedUserProviderProps> = ({children}) => {

  const [name, setName] = useState<string|null>(null)
  const [id, setId] = useState<string|null>(null)
  const [email, setEmail] = useState<string|null>(null)

  
  const handleLoginUser = useCallback((name: string, id: string, email: string)=>{
    setName(name)
    setId(id)
    setEmail(email)
  },[])


  const handleLogoutUser = useCallback(()=>{
    setName(null)
    setId(null)
    setEmail(null)
  },[])


  const handleUserIsAuthenticated = useCallback(()=>{
    if(name && id && email){
      return true
    }
    return false
  },[name, id, email])


  return(
    <LoggedUserDataContext.Provider 
      value={{name:name, id:id, email:email, 
              login: handleLoginUser, 
              logout: handleLogoutUser,
              auth:handleUserIsAuthenticated}}>
      {children}
    </LoggedUserDataContext.Provider>
  )
}