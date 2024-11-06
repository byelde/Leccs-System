import { Button } from "@mui/material";

interface IBookButtonProps {
  action: () => void
}

export const BookButton: React.FC<IBookButtonProps> = (props) => {
  return(
    <>
      <Button variant="contained" sx={{alignSelf:"end"}} onClick={props.action}>Book</Button>
    </>
  )
};
