import { AppBar, Box, Button, Checkbox, Container, FormControlLabel, IconButton, InputAdornment, Paper, TextField, Toolbar, Typography } from "@mui/material"
import { useCallback, useContext, useEffect, useMemo, useState } from "react"

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { LoggedUserDataContext } from "../../shared/contexts";
import { useNavigate } from "react-router-dom";

export const Login = () => {

  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
  const loggedUserContext = useContext(LoggedUserDataContext)
  
  useEffect(()=>{
    if(loggedUserContext.id)navigate("/")
  })

  const navigate = useNavigate();
  
  const handleChangePasswordType = useCallback(()=>{
    setPasswordVisibility(!passwordVisibility)
  },[passwordVisibility])
  
  
  const typePasswordLabel: string = useMemo(()=>{
    if (passwordVisibility){return "text"} else {return "password"}
  },[passwordVisibility])
  
  
  const handleExecuteLogin = useCallback((id:string, pwd: string)=>{
    loggedUserContext.signin(id, pwd)
  },[])
  

  return(
    <Container maxWidth={false} sx={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", maxWidth:"100%"}}>

    <AppBar position="fixed">

      <Toolbar>
        <Typography component={"h1"} variant="h2" sx={{textAlign:"left"}}>
          SiRAS
        </Typography>

        <Typography component={"h1"} variant="h4" sx={{textAlign:"left", paddingLeft:2}}>
          Sistema de Reserva e Gerenciamento de Salas
        </Typography>
      </Toolbar>

    </AppBar>

    <Box sx={{paddingTop:30}} maxWidth="sm" >

      <Paper elevation={10} sx={{padding:2}}>

        <Typography component="h1" variant="h6" sx={{textAlign:"center", mb:2, fontSize:32}}>
          Login
        </Typography>
        
        <Box component={"form"}>

          <TextField
              name="inputid"
              required
              fullWidth
              autoFocus 
              label={"id"} 
              sx={{mb:2}} 
              slotProps={{
                  input:{style: {fontSize:28}}, 
                  inputLabel:{style:{fontSize:24}}
              }}
              value={id}
              onChange={(e)=>setId(e.target.value)}
          />

          <TextField
              type={typePasswordLabel}
              name="inputPassword"
              required 
              fullWidth 
              label="Password" 
              sx={{mb:1}} 
              slotProps={{
                  input:{
                    style: {fontSize:28},
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleChangePasswordType}> 
                          {passwordVisibility ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                        </IconButton>
                      </InputAdornment>
                    )
                  }, 
                  inputLabel:{style:{fontSize:24}}
              }}
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
          />         

          <FormControlLabel
              control={<Checkbox value="remember"/>}
              label="Remember me"
              sx={{mb:1}}
              slotProps={{typography:{style:{fontSize:24}}}}
          />

          <Button fullWidth variant="contained" sx={{fontSize:24}} onClick={()=>{handleExecuteLogin(id, password)}}>Login</Button>

        </Box>

      </Paper>

    </Box>

  </Container>
  )

}