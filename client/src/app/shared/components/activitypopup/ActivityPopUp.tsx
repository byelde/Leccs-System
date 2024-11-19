import { Box, Dialog, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import React from "react";

interface IActivityProps {
  name: string;
  category: string;
  init_date: string
  description: string
  lecc_id: number;
  responsible_id: string; 
}

interface IDialogProps {
  isOpen: boolean
  setIsOpen: (arg:boolean)=>void
}

export const ActivityPopUp = React.forwardRef<HTMLInputElement, IActivityProps & IDialogProps>((props, ref) => {
  return(
    <Dialog open={props.isOpen} onClose={()=>{props.setIsOpen(false)}} ref={ref}>
      <DialogTitle>{props.name}</DialogTitle>
      <DialogContent>
        <Box>
          <DialogContentText>
            <Typography variant="h6">{props.category}</Typography>
            <Typography variant="h6">{`Lecc: ${props.lecc_id}`}</Typography>
            <Typography variant="h6">{props.description}</Typography>
          </DialogContentText>
        </Box>
      </DialogContent>
    </Dialog>
  )
});
