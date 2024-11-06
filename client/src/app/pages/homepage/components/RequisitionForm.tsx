import { Button, Dialog, DialogActions, DialogContent, Grid2 as Grid, MenuItem, TextField, Typography } from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs"
import {DatePicker} from "@mui/x-date-pickers/DatePicker"
import {TimePicker} from "@mui/x-date-pickers/TimePicker"
import 'dayjs/locale/en-gb';


interface IRequestFormProps{
  isOpen: boolean
  setIsOpen: (arg:boolean)=>void
}

export const RequisitionForm: React.FC<IRequestFormProps> = (props) => {

  return(
    <>
    
      <Dialog sx={{padding:2}} open={props.isOpen} onClose={()=>{props.setIsOpen(false)}}>
        <Typography variant="h6" sx={{ml:2, mt:2}}>Book form</Typography>

        <DialogContent sx={{display:"grid", flexDirection:"row", gap:4, maxWidth:1000}}>
          <Grid container rowSpacing={1} columnSpacing={1}>

            <Grid size={6}>
              <TextField disabled sx={{width:"100%", minWidth:200}} required label="Responsible" select value={"id"}>
                <MenuItem value="id" >YOUR_ID</MenuItem>
              </TextField>
            </Grid>

            <Grid size={6}>
              <TextField sx={{width:"100%", minWidth:200}} required label="Lecc" select>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
              </TextField>
            </Grid>

            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
              <Grid size={6}>
                  <DatePicker label="Date" sx={{width:"100%", minWidth:200}} format="YYYY-MM-DD" slotProps={{ textField:{required:true}}}/>
              </Grid>
              
              <Grid size={6}>
                  <TimePicker label="Time" sx={{width:"100%", minWidth:200}} views={["hours", "minutes"]} format="HH:MM" slotProps={{ textField:{required:true}}}/>
              </Grid>
            </LocalizationProvider>

            <Grid size={6}>
            <TextField sx={{width:"100%", minWidth:200}} required label="Category" select>
                <MenuItem value="1">Class</MenuItem>
                <MenuItem value="2">Meeting</MenuItem>
                <MenuItem value="3">Course</MenuItem>
                <MenuItem value="3">Lecture</MenuItem>
              </TextField>
            </Grid>

            <Grid size={12}>
              <TextField sx={{width:"100%"}} multiline label="Description" rows={4}/>
            </Grid>

          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={()=>{props.setIsOpen(false)}}>Cancel</Button>
          <Button>Request</Button>
        </DialogActions>

      </Dialog>

    </>
  )
};
