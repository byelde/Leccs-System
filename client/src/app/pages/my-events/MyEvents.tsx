import { Avatar, Box, Button, Container, Drawer, Grid2 as Grid, IconButton, List, ListItem, ListItemText, Paper, TextField, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { ActivityPopUp } from "../../shared/components";
import { LoggedUserDataContext } from "../../shared/contexts";
import { useNavigate } from "react-router-dom";


export const MyEvents = () => {

  const dialogRef = useRef<HTMLInputElement>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currActivityData, setCurrActivityData] = useState<ICurrActivityData>({} as ICurrActivityData)

  const loggedUserContext = useContext(LoggedUserDataContext)

  const navigate = useNavigate();

  useEffect(()=>{
    if(!loggedUserContext.id) navigate("/login")
  })

  
  interface ICurrActivityData {
    name: string;
    responsible_id: string;
    category: string;
    init_date: string;
  }

  const handleModalData = useCallback((name: string, responsible_id: string, category: string, init_date: string)=>{
    setCurrActivityData({name: name, responsible_id: responsible_id, category: category, init_date: init_date})
    setIsDialogOpen(true);
  },[])
  
  return(
    <Container sx={{display:"flex", justifyContent:"center", alignContent:"center"}}>

      <ActivityPopUp
        ref={dialogRef}
        name={currActivityData.name}
        responsible_id={currActivityData.responsible_id}
        category={currActivityData.category}
        init_date={currActivityData.init_date}
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />

      <Drawer variant="permanent" anchor="left">
        <Box sx={{display:"flex", padding:4, height:"100%", minWidth:10, justifyContent:"center", alignItems:"start"}}>
          <Grid container maxWidth={256}>
            <Grid size={12}  sx={{display:"flex", justifyContent:"center"}}>
              <Avatar sx={{width:128, height:128}}></Avatar>
            </Grid> 
            <Grid size={12}  sx={{display:"flex", justifyContent:"center"}}>
              <Typography variant="h6">{loggedUserContext.name}</Typography>
            </Grid>
            <Grid size={12}  sx={{display:"flex"}}>
              <Typography variant="h6">Email: {loggedUserContext.email}</Typography>
            </Grid>
            <Grid size={12}  sx={{display:"flex"}}>
              <Typography variant="h6">Id: {loggedUserContext.id}</Typography>
            </Grid>
            <Grid size={12}  sx={{display:"flex"}}>
              <Button variant="contained" onClick={() =>{loggedUserContext.logout()}}>Logout</Button>
            </Grid>
          </Grid>
        </Box>
      </Drawer>

      <Paper sx={{marginTop:20, minWidth:1000, marginLeft:"25%"}}>
        <Box sx={{display:"flex", flexDirection:"column", gap:4, backgroundColor:"#e5e5e5", padding:4}}>
          
          <Grid container>
            <Grid size={4}>
              <TextField label="Name" sx={{width:"100%"}}></TextField>
            </Grid>
            <Grid size={6}></Grid>
            <Grid size={2}>
              <Box sx={{display:"flex", flexDirection:"row-reverse", alignItems:"center"}}>
                <Button variant="text">Date</Button>
                <Button variant="text">Time</Button>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{border:2, borderColor:"black", display:"flex", alignItems:"center"}}>
            <List sx={{display:"grid", flexDirection:"column", maxHeight:500, width:"100%", border:1, borderColor:"gray", overflow:"scroll"}}>
              {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map((arg)=>{
                return(
                  <ListItem
                    secondaryAction={
                      <IconButton>
                        <DeleteIcon/>
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={`item ${arg}`}
                      onClick={()=>{handleModalData(
                        String(arg),
                        String(arg),
                        String(arg),
                        String(arg)
                      )}}
                    />
                    <Box sx={{display:"flex", gap:2}}>
                      <Typography>yy/mm/ss</Typography>
                      <Typography>00:00-00:00</Typography>
                    </Box>
                  </ListItem>
                )
              })}
            </List>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
};
