import { Box, Container} from "@mui/material";
import { BookButton, DisplayCard, RequisitionForm, Sidebar } from "./components";
import { useCallback, useState } from "react";


export const Homepage = () => {

  const [isRequestFormOpen, setIsRequestFormOpen] = useState<boolean>(false)

  const openForm = useCallback(()=>{
    setIsRequestFormOpen(true)
  },[])

  return(
    <Container sx={{ display:"flex", flexDirection:"column", justifyItems:"left", padding:10}}>

      <Sidebar/>
      <Box sx={{display:"flex", flexDirection:"column", justifyContent:"right", gap:4}}>
        <BookButton action={openForm}/>
        <DisplayCard/>
        <RequisitionForm isOpen={isRequestFormOpen} setIsOpen={setIsRequestFormOpen}/>
      </Box>
    </Container>
  )

};
