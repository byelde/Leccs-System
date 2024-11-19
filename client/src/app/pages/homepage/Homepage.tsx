import { Button, Box, Container} from "@mui/material";
import { DisplayCard, RequisitionForm, Sidebar } from "./components";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedUserDataContext } from "../../shared/contexts";


export const Homepage = () => {

  const loggedUserContext = useContext(LoggedUserDataContext)

  useEffect(()=>{
    if(!loggedUserContext.id) navigate("/login")
  })

  const navigate = useNavigate();

  const [isRequestFormOpen, setIsRequestFormOpen] = useState<boolean>(false)

  

  const handleNavigateToEvents = () => {
    navigate("events");
  }
  
  const handleNavigateToMyEvents = () => {
    navigate("myevents");
  }

  const openForm = useCallback(()=>{
    setIsRequestFormOpen(true)
  },[])

  return(
    <Container sx={{ display:"flex", flexDirection:"column", justifyItems:"left", padding:10}}>

      <Sidebar navigateToEvents={handleNavigateToEvents} navigateToMyEvents={handleNavigateToMyEvents}/>
      <Box sx={{display:"flex", flexDirection:"column", justifyContent:"right", gap:4}}>
      <Button variant="contained" sx={{alignSelf:"end"}} onClick={openForm}>Book</Button>
        <DisplayCard/>
        <RequisitionForm isOpen={isRequestFormOpen} setIsOpen={setIsRequestFormOpen}/>
      </Box>
      
    </Container>
  )

};
