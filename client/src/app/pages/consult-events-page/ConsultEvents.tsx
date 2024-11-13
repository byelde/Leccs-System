import { Box, Card, Grid2 as Grid, IconButton, List, ListItem, ListItemText, MenuItem, Paper, TextField, Typography } from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs"
import {DatePicker} from "@mui/x-date-pickers/DatePicker"
import 'dayjs/locale/en-gb';
import dayjs, { Dayjs } from 'dayjs';

import { useCallback, useMemo, useRef, useState } from "react";

import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';


export const ConsultEventsPage = () => {

  const DEFAULT_DATE:Dayjs = useMemo(()=>{
    return dayjs()
  },[])
  const [date, setDate] = useState<Dayjs>(dayjs())
  const [lecc, setLecc] = useState<string>("Lecc 1")
  const returnWeekButton = useRef<HTMLButtonElement>(null)
  const forwardWeekButton = useRef<HTMLButtonElement>(null)


  const handleReturnWeek = useCallback(()=>{
    if (date.subtract(1,"week").isAfter(DEFAULT_DATE)) setDate(date.subtract(1,"week"));
  },[date, DEFAULT_DATE])
  
  const handleForwardWeek = useCallback(()=>{
    if (date.add(1,"week").isBefore(DEFAULT_DATE.add(6,"month"))) setDate(date.add(1,"week"));
  },[date, DEFAULT_DATE])


  return(
    <Paper sx={{marginTop:10, minWidth:600, maxWidth:"100%"}}>
        <Box sx={{display:"flex", flexDirection:"column", gap:4, backgroundColor:"#e5e5e5", padding:4}}>
          
          <Grid container>
            <Grid>
              <TextField value={lecc} sx={{width:"100%", minWidth:200}} label="Lecc" select onChange={(e)=>{setLecc(e.target.value)}}>
                <MenuItem value={"Lecc 1"}>Lecc 1</MenuItem>
                <MenuItem value={"Lecc 2"}>Lecc 2</MenuItem>
                <MenuItem value={"Lecc 3"}>Lecc 3</MenuItem>
              </TextField>
            </Grid>

            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
              <Grid>
                  <DatePicker 
                    value={date}
                    minDate={DEFAULT_DATE}
                    maxDate={DEFAULT_DATE.add(6,"month")}
                    onChange={(e)=>{
                      if(e !== null){
                        return (e.isAfter(DEFAULT_DATE)) ? setDate(e.startOf("year")) : setDate(DEFAULT_DATE)
                      }
                    }}
                    views={["year"]}
                    format="YYYY"
                    label="Year"
                    slotProps={{textField:{required:false}}}
                    sx={{width:"100%", minWidth:200}}
                  />
              </Grid>
              <Grid>
                  <DatePicker
                    label="Month"
                    value={date}
                    minDate={DEFAULT_DATE}
                    maxDate={DEFAULT_DATE.add(6,"month")}
                    onChange={(e)=>{if(e !== null){setDate(e);}}}
                    sx={{width:"100%",minWidth:200}}
                    format="MM"
                    views={["month"]}
                    slotProps={{textField:{required:false}}}
                  />
              </Grid>
              <Grid>
                <Card sx={{width:"100%", display:"flex", alignContent:"center", height:"100%"}}>
                  <IconButton ref={returnWeekButton} onClick={()=>{handleReturnWeek()}}>
                    <NavigateBeforeIcon/>
                  </IconButton>       
                  <IconButton ref={forwardWeekButton} onClick={()=>{handleForwardWeek()}}>
                    <NavigateNextIcon/>
                  </IconButton>                
                </Card>
              </Grid>
            </LocalizationProvider>
          </Grid>

          <Box sx={{border:2, borderColor:"black", display:"flex", alignItems:"center"}}>
            <Grid container width={"100%"}>
              {[0,1,2,3,4,5,6].map((_,index)=>{
                return(
                  <Grid size={1.71}>
                    <Typography>{`${date.add(index,"day").date()}/${date.add(index,"day").month()+1}`}</Typography>
                    <List>
                      {Array(12).fill(0).map((value,i)=>{
                        return(
                          <ListItem onClick={()=>{ window.alert(`${date.add(index,"day").date()}/${date.add(index,"day").month()+1} - ${i}`) }}>
                            <ListItemText>{"EVENT NAME"}</ListItemText>
                          </ListItem>
                        )
                      })}
                    </List>
                  </Grid>
                )
              })}
            </Grid>
          </Box>
        </Box>
      </Paper>
  )
};
