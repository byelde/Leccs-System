import React, { createContext, useCallback, useState } from "react"


// This context is not used yet


interface ILoggedUserData {
  name:   string|null
  id:     string|null
  email:  string|null

  login: (name:string, id:string, email:string, type:string) => void
  logout: () => void
  auth: () => void
  signin: (id:string, password:string)=> void

}


interface LoggedUserProviderProps {
  children: React.ReactNode
}


export const LoggedUserDataContext = createContext<ILoggedUserData>({} as ILoggedUserData)


export const LoggedUserProvider: React.FC<LoggedUserProviderProps> = ({children}) => {

  const [name, setName] = useState<string|null>(null)
  const [id, setId] = useState<string|null>(null)
  const [email, setEmail] = useState<string|null>(null)
  const [type, setType] = useState<string|null>(null)

  
  const handleSignIn = async (id:string, password: string) => {

    try {
      const options = {
        method:"GET"
      }
  
      const response = await fetch(`http://localhost:5000/login?id=${id}&pwd=${password}`, options) 

      if( (response).status === 200 ){
        const data = await response.json()
        return handleLoginUser(data.name, data.id, data.email, data.type)
      } else {
        return alert("Wrong login data.")
      }
    } catch (error) {
      return alert(error)
    }
    
  }
  
  
  const handleLoginUser = useCallback((name: string, id: string, email: string, type: string)=>{
    setName(name)
    setId(id)
    setEmail(email)
    setType(type)
    console.log(name)
  },[])


  const handleLogoutUser = useCallback(()=>{
    setName(null)
    setId(null)
    setEmail(null)
    setType(null)
  },[])


  const handleUserIsAuthenticated = useCallback(()=>{
    if(name && id && email && type){
      return true
    }
    return false
  },[name, id, email, type])


  return(
    <LoggedUserDataContext.Provider 
      value={{name:name, id:id, email:email, 
              login: handleLoginUser, 
              logout: handleLogoutUser,
              auth:handleUserIsAuthenticated,
              signin: handleSignIn}}>
      {children}
    </LoggedUserDataContext.Provider>
  )
}