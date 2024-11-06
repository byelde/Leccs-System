import { Box, Button, Drawer, Typography } from "@mui/material";

export const Sidebar = () => {
  return(
    <Drawer variant="permanent" anchor="left">
      <Box sx={{padding:4, height:"100%"}}>
          <Box>
            <Typography component={"h1"} variant="h2" sx={{textAlign:"left", fontSize:24}}>
              SiRAS
            </Typography>
          </Box>

          <Button variant="contained" color="inherit">
            My events
          </Button>
      </Box>
    </Drawer>
  )
};
