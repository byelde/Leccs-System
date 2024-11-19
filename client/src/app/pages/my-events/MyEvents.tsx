import { Avatar, Box, Button, Container, Drawer, Grid2 as Grid, IconButton, List, ListItem, ListItemText, Paper, TextField, Typography} from "@mui/material";
// import DeleteIcon from '@mui/icons-material/Delete';
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { ActivityPopUp } from "../../shared/components";
import { LoggedUserDataContext } from "../../shared/contexts";
import { useNavigate } from "react-router-dom";
import { IActivities } from "../../shared/models";


export const MyEvents = () => {

  const dialogRef = useRef<HTMLInputElement>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currActivityData, setCurrActivityData] = useState<IActivities>({} as IActivities)
  const [ownActivities, setOwnActivities] = useState<IActivities[]>([])

  const loggedUserContext = useContext(LoggedUserDataContext)

  const navigate = useNavigate();

  useEffect(()=>{
    if(!loggedUserContext.id){
      return navigate("/login")
    }
  })

  useEffect(()=>{
    fetchActivities()
  },[])


  const fetchActivities = async () => {
    const options = {
      method:"GET",
    }

    const response = await fetch(
      `http://localhost:5000/activity/filtered/2?responsible_id=${loggedUserContext.id}`, 
      options
    )
    const data = await response.json()
    setOwnActivities(data[0])
  }  


  // const deleteActivity = async (activity_id:number) => {
  //   try{

  //     console.log(typeof(activity_id))

  //     const options = {
  //         method: "DELETE"
  //     }
      
  //     const response = await fetch(`https://localhost:5000/activity?id={activitie_id}`, options)

  //     if (response.status === 200){
  //         window.location.reload()
  //     } else {
  //         console.error("Failed to delete.")
  //     }


  // } catch (error) {
  //     alert(error)

  // }
  // }


  const handleModalData = useCallback((name: string, responsible_id: string, category: string, init_date: string, lecc_id: number, description:string)=>{
    setCurrActivityData({responsible_id: responsible_id, category: category, init_date: init_date, lecc_id: lecc_id, description:description})
    setIsDialogOpen(true);
  },[])
  
  return(
    <Container sx={{display:"flex", justifyContent:"center", alignContent:"center"}}>

      <ActivityPopUp
        ref={dialogRef}
        name={"Event"}
        // responsible_id={currActivityData.responsible_id ? currActivityData.responsible_id : ""}
        category={currActivityData.category ? currActivityData.category : ""}
        init_date={currActivityData.init_date ? currActivityData.init_date : ""}
        description={currActivityData.description ? currActivityData.description : ""}
        lecc_id={currActivityData.lecc_id ? currActivityData.lecc_id : 0}
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
          
          {/* <Grid container>
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
          </Grid> */}

          <Box sx={{border:2, borderColor:"black", display:"flex", alignItems:"center"}}>
            <List sx={{display:"grid", flexDirection:"column", maxHeight:500, width:"100%", border:1, borderColor:"gray", overflow:"scroll"}}>
              {ownActivities.map((item)=>{
                return(
                  <ListItem
                    // secondaryAction={
                    //   <IconButton>
                    //     <DeleteIcon onClick={()=>{deleteActivity(item.id ? item.id : 0)}}/>
                    //   </IconButton>
                    // }
                  >
                    <ListItemText
                      primary={`${item.category}`}
                      onClick={()=>{handleModalData(
                        "Event",
                        item.responsible_id ? item.responsible_id : "",
                        item.category ? item.category : "",
                        item.init_date ? item.init_date : "",
                        item.lecc_id ? item.lecc_id: 0,
                        item.description ? item.description : "No description"
                      )}}
                    />
                    <Box sx={{display:"flex", gap:2}}>
                      <Typography>{item.init_date?.slice()}</Typography>
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
