import { Box, Card, Grid2 as Grid, IconButton, List, ListItem, ListItemText, MenuItem, Paper, TextField, Typography } from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs"
import {DatePicker} from "@mui/x-date-pickers/DatePicker"
import 'dayjs/locale/en-gb';
import dayjs, { Dayjs } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { ActivityPopUp } from "../../shared/components";

import { IActivities } from "../../shared/models";


export const ConsultEventsPage = () => {
  
  dayjs.extend(isSameOrAfter)
  
  // const dialogRef = useRef<HTMLInputElement>(null)
  const returnWeekButton = useRef<HTMLButtonElement>(null)
  const forwardWeekButton = useRef<HTMLButtonElement>(null)
  
  const [date, setDate] = useState<Dayjs>(dayjs().startOf("week"))
  const [lecc, setLecc] = useState<number>(1)
  const [currActivityData, setCurrActivityData] = useState<(IActivities)>({} as IActivities)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)


  const [activityData, setActivityData] = useState<IActivities[]>([])


  useEffect(()=>{
    handleFetchActivities();
  },[date, lecc])


  const DEFAULT_DATE:Dayjs = useMemo(()=>{
    return dayjs().startOf("week")
  },[])


  const handleReturnWeek = useCallback(()=>{
    if (date.subtract(1,"week").isSameOrAfter(DEFAULT_DATE)) setDate(date.subtract(1,"week"));
  },[date, DEFAULT_DATE])
  

  const handleForwardWeek = useCallback(()=>{
    if (date.add(1,"week").isBefore(DEFAULT_DATE.add(6,"month"))) setDate(date.add(1,"week"));
  },[date, DEFAULT_DATE])

  
  const handleModalData = useCallback((responsible_id: string, category: string, init_date: string, description:string, lecc_id:number)=>{
    setCurrActivityData({responsible_id: responsible_id, category: category, init_date: init_date, description:description, lecc_id:lecc_id})
    setIsDialogOpen(true);
  },[])


  const handleFetchActivities = useCallback(async () => {
    try{

      const options = {
        method: "GET"
      }

      const response = await fetch(
        `http://localhost:5000/activity/filtered/2?min_date=${date.format("YYYYMMDD")}&lecc_id=${(lecc)}&max_date=${date.add(7,"days").format("YYYYMMDD")}`,
        options
      )

      const data = await response.json()
      
      console.log(data[0])
      setActivityData(data[0])

    } catch (error) {
      alert(error)
    }
  },[date, lecc])


  return(
    <Paper sx={{marginTop:10, minWidth:600, maxWidth:"100%"}}>

      <ActivityPopUp
        name={"Event"}
        category={currActivityData.category ? currActivityData.category : ""}
        responsible_id={currActivityData.responsible_id ? currActivityData.responsible_id : ""}
        init_date={currActivityData.init_date ? currActivityData.init_date : ""}
        description={currActivityData.description ? currActivityData.description : ""}
        lecc_id={currActivityData.lecc_id ? currActivityData.lecc_id : 0}
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />

      <Box sx={{display:"flex", flexDirection:"column", gap:4, backgroundColor:"#e5e5e5", padding:4}}>
        
        <Grid container>
          <Grid>
            <TextField value={lecc} sx={{width:"100%", minWidth:200}} label="Lecc" select onChange={(e)=>{setLecc(Number(e.target.value))}}>
              <MenuItem value={1}>Lecc 1</MenuItem>
              <MenuItem value={2}>Lecc 2</MenuItem>
              <MenuItem value={3}>Lecc 3</MenuItem>
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
                  <Typography>{`${date.add(index,"day").format("dddd")} - ${date.add(index,"day").date()}/${date.add(index,"day").month()+1}`}</Typography>
                  <List>
                    {activityData.map((item)=>{
                      if(dayjs(item.init_date).format("YYYYMMDD") == date.add(index,"day").format("YYYYMMDD")){
                        return(
                          <ListItem
                            key={item.id}
                            onClick={
                              ()=>{handleModalData(
                                    String(item.responsible_id),
                                    String(item.category),
                                    String(item.init_date),
                                    String(item.description),
                                    Number(item.lecc_id)
                                    // `${date.add(index,"day").date()}/${date.add(index,"day").month()+1}`)}
                          )}}
                          >
                            <ListItemText>{item.category}</ListItemText>
                            <ListItemText>{dayjs(item.init_date).format("HH:mm")}</ListItemText>
                          </ListItem>
                        )
                      }
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
