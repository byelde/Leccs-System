import { Box, List, ListItem, ListItemText, Paper, Stack, Typography } from "@mui/material";

export const DisplayCard = () => {
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
                  {[1,2,3,4,5,6,7,8,9,10,11].map((item)=>{
                    return(
                      <ListItem>
                        <ListItemText primary={`Item ${item}`}/>
                      </ListItem>
                    )
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
