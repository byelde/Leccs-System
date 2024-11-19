import { Button, Dialog, DialogActions, DialogContent, Grid2 as Grid, MenuItem, TextField, Typography } from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs"
import {DatePicker} from "@mui/x-date-pickers/DatePicker"
import {TimePicker} from "@mui/x-date-pickers/TimePicker"
import 'dayjs/locale/en-gb';
import { useContext, useState } from "react";
import { LoggedUserDataContext } from "../../../shared/contexts";
import dayjs, { Dayjs } from "dayjs";


interface IRequestFormProps{
  isOpen: boolean
  setIsOpen: (arg:boolean)=>void
}

export const RequisitionForm: React.FC<IRequestFormProps> = (props) => {

  const loggedUserContext = useContext(LoggedUserDataContext)
  
  const [respId, setRespIp] = useState(loggedUserContext.id)
  const [lecc, setLecc] = useState(1)
  const [datetime, setDateTime] = useState<Dayjs|null>(dayjs())
  const [category, setCategory] = useState("Class")
  const [description, setDescription] = useState("")


  const handleSendRequest = async () => {
    if(datetime !== null){
      const options = {
        method: "POST",
        body: JSON.stringify(
          {
            responsible_id: respId,
            category: category,
            init_date: datetime.format("YYYY-MM-DD HH:MM"),
            end_date: datetime.add(1,"hour").format("YYYY-MM-DD HH:mm") ? datetime !== null : null,
            lecc_id: lecc,
            description: description
         }
        )
      }
      await fetch('https://localhost:5000/activity', options)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
    }
  }


  return(
    <>
    
      <Dialog sx={{padding:2}} open={props.isOpen} onClose={()=>{props.setIsOpen(false)}}>
        <Typography variant="h6" sx={{ml:2, mt:2}}>Book form</Typography>

        <DialogContent sx={{display:"grid", flexDirection:"row", gap:4, maxWidth:1000}}>
          <Grid container rowSpacing={1} columnSpacing={1}>

            <Grid size={6}>
              <TextField value={respId} onChange={()=>{setRespIp(respId)}} disabled sx={{width:"100%", minWidth:200}} required label="Responsible" select>
                <MenuItem>{respId}</MenuItem>
              </TextField>
            </Grid>

            <Grid size={6}>
              <TextField value={lecc} sx={{width:"100%", minWidth:200}} required label="Lecc" select onChange={(e)=>{setLecc(Number(e.target.value))}}>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
              </TextField>
            </Grid>

            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
              <Grid size={6}>
                  <DatePicker onChange={(e)=>{setDateTime(e)}} value={datetime} label="Date" sx={{width:"100%", minWidth:200}} format="YYYY-MM-DD" slotProps={{ textField:{required:true}}}/>
              </Grid>
              
              <Grid size={6}>
                  <TimePicker onChange={(e)=>{setDateTime(e)}} value={datetime} label="Time" sx={{width:"100%", minWidth:200}} views={["hours", "minutes"]} format="HH:mm" slotProps={{ textField:{required:true}}}/>
              </Grid>
            </LocalizationProvider>

            <Grid size={6}>
              <TextField sx={{width:"100%", minWidth:200}} required label="Category" select value={category} onChange={(e)=>{setCategory(e.target.value)}}>
                <MenuItem value={"Class"}>Class</MenuItem>
                <MenuItem value={"Meeting"}>Meeting</MenuItem>
                <MenuItem value={"Course"}>Course</MenuItem>
                <MenuItem value={"Lecture"}>Lecture</MenuItem>
              </TextField>
            </Grid>

            <Grid size={12}>
              <TextField sx={{width:"100%"}} multiline label="Description" rows={4} value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
            </Grid>

          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={()=>{props.setIsOpen(false)}}>Cancel</Button>
          <Button onClick={()=>{props.setIsOpen(false); handleSendRequest()}}>Request</Button>
        </DialogActions>

      </Dialog>

    </>
  )
};
