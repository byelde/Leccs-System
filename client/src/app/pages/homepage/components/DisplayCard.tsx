import { Box, List, ListItem, ListItemText, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import 'dayjs/locale/en-gb';
import dayjs, { Dayjs } from 'dayjs';
import { IActivities } from "../../../shared/models";

export const DisplayCard = () => {
  
  const DATE:Dayjs =dayjs()
  const [currTodayActivities, setCurrTodayActivities] = useState<IActivities[]>([])

  useEffect(()=>{
    fetchTodayActivities()
  },[])


  const fetchTodayActivities = async () => {
    const options = {
      method:"GET",
    }

    const response = await fetch(
      `http://localhost:5000/activity/filtered/2?min_date=${DATE.format("YYYYMMDD")}&max_date=${DATE.add(1, "day").format("YYYYMMD")}`, 
      options
    )

    const data = await response.json()

    setCurrTodayActivities(data[0])
    console.log(data[0])

  }   


  return(
    <>
      <Paper>
          <Box sx={{display:"flex", flexDirection:"row", gap:4, backgroundColor:"#e5e5e5", padding:4}}>

            {[1,2,3].map((id)=>{
              return(
              <Stack sx={{width:"100%", backgroundColor:"white"}}>
                <Box sx={{backgroundColor:"gray"}}>
                  <Typography 
                    component="h1"
                    variant="h6"
                    sx={{
                      textAlign:"center",
                      mb:2,
                      fontSize:16,
                      paddingTop:2
                  }}>
                    Lecc {id}
                  </Typography>
                </Box>

                <List>
                  {currTodayActivities.map((item)=>{
                    if (item.lecc_id == id && item.init_date){
                      return(
                          <ListItem>
                            <ListItemText primary={`${item.category}`}/>
                            <ListItemText primary={`${item.init_date.slice(-8)}`}/>
                          </ListItem>
                      )
                    }
                  })}
                </List>
              </Stack>
              )
            })}
          </Box>
        </Paper>
    </>
  )
};
