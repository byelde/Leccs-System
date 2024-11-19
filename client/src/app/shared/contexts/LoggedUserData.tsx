import React, { createContext, useCallback, useState } from "react"


interface ILoggedUserData {
  name:   string|null
  id:     string|null
  email:  string|null
  usrClass:  string|null
  reqs?:  boolean

  login: (name:string, id:string, email:string, usrClass:string, reqs:boolean) => void
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
  const [usrClass, setUsrClass] = useState<string|null>(null)
  const [req, setReq] = useState<boolean|null>(null)

  
  const handleSignIn = async (id:string, password: string) => {

    try {
      const options = {
        method:"GET"
      }
  
      const response = await fetch(`http://localhost:5000/login?id=${id}&pwd=${password}`, options) 

      if( (response).status === 200 ){
        const data = await response.json()
        return handleLoginUser(data.name, data.id, data.email, data.class, data.pending_req)
      } else {
        return alert("Wrong login data.")
      }
    } catch (error) {
      return alert(error)
    }
    
  }
  
  
  const handleLoginUser = useCallback((name: string, id: string, email: string, usrClass: string, req:boolean)=>{
    setName(name)
    setId(id)
    setEmail(email)
    setUsrClass(usrClass)
    setReq(req)
  },[])


  const handleLogoutUser = useCallback(()=>{
    setName(null)
    setId(null)
    setEmail(null)
    setUsrClass(null)
    setReq(null)
  },[])


  const handleUserIsAuthenticated = useCallback(()=>{
    if(name && id && email && usrClass){
      return true
    }
    return false
  },[name, id, email, usrClass])


  return(
    <LoggedUserDataContext.Provider 
      value={{name:name, id:id, email:email, usrClass: usrClass, reqs:req,
              login: handleLoginUser, 
              logout: handleLogoutUser,
              auth:handleUserIsAuthenticated,
              signin: handleSignIn}}>
      {children}
    </LoggedUserDataContext.Provider>
  )
}