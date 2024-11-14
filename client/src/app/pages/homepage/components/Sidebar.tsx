import { Box, Button, Drawer, Typography } from "@mui/material";


interface ISideBarProps {
  navigateToEvents: () => void;
  navigateToMyEvents: () => void;
}

export const Sidebar:React.FC<ISideBarProps> = (props) => {
  return(
    <Drawer variant="permanent" anchor="left">
      <Box sx={{padding:4, height:"100%", display:"flex", flexDirection:"column", gap:2}}>
          <Box>
            <Typography component={"h1"} variant="h2" sx={{textAlign:"left", fontSize:24}}>
              SiRAS
            </Typography>
          </Box>
          <Box sx={{ display:"flex", flexDirection:"column", gap:1}}>
            <Button onClick={props.navigateToEvents} variant="contained" color="inherit">
              Events
            </Button>

            <Button onClick={props.navigateToMyEvents} variant="contained" color="inherit">
              My events
            </Button>
          </Box>
      </Box>
    </Drawer>
  )
};
