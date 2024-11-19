import { Box, Button, Drawer, Typography } from "@mui/material";
import { LoggedUserDataContext } from "../../../shared/contexts";
import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";


interface ISideBarProps {
  navigateToEvents: () => void;
  navigateToMyEvents: () => void;
}

export const Sidebar:React.FC<ISideBarProps> = (props) => {

  const loggedUserContext = useContext(LoggedUserDataContext)

  const navigate = useNavigate();

  const handleReqButton = useCallback(()=>{
    console.log(loggedUserContext.reqs)
    if(loggedUserContext.reqs && loggedUserContext.usrClass == "coord"){
      return (<Button onClick={()=>{navigate("/pending")}}>Requisitions</Button>)
    }
  },[])

  return(
    <Drawer variant="permanent" anchor="left">
      <Box sx={{padding:4, height:"100%", display:"flex", flexDirection:"column", gap:2}}>
          <Box>
            <Typography component={"h1"} variant="h2" sx={{textAlign:"left", fontSize:24}}>
              SiRAS
            </Typography>
          </Box>
          <Box sx={{ display:"flex", flexDirection:"column", gap:1}}>
            <Button onClick={props.navigateToEvents} variant="contained" color="inherit">
              Events
            </Button>

            <Button onClick={props.navigateToMyEvents} variant="contained" color="inherit">
              My events
            </Button>
            
            {handleReqButton()}
            
          </Box>
      </Box>
    </Drawer>
  )
};
