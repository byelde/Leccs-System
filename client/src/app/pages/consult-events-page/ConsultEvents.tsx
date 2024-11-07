import { Box, Grid2 as Grid, MenuItem, Paper, TextField } from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs"
import {DatePicker} from "@mui/x-date-pickers/DatePicker"
import 'dayjs/locale/en-gb';
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from 'dayjs';


export const ConsultEventsPage = () => {

  useEffect(()=>{
    console.log(dayjs("2024-11-02").startOf("week"))
  })

  const DEFAULT_DATE: Dayjs = dayjs()
  const [date, setDate] = useState<Dayjs>(DEFAULT_DATE)
  const [lecc, setLecc] = useState<string>("")

  return(
    <Paper sx={{marginTop:20, minWidth:600, maxWidth:"80%"}}>
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
                    onChange={(e)=>{
                      if(e !== null){
                        setDate(e);
                      }
                    }}
                    sx={{width:"100%",minWidth:200}}
                    format="MM"
                    views={["month"]}
                    slotProps={{textField:{required:false}}}
                  />
              </Grid>
            </LocalizationProvider>
          </Grid>

          <Box sx={{border:2, borderColor:"black", display:"flex", alignItems:"center"}}>
            <Grid container width={"100%"}>
                {/* AQQQQQQQQ */}
            </Grid>
          </Box>
        </Box>
      </Paper>
  )
};
