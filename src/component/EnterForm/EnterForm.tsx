import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import Container from '@mui/material/Container';
import { Button, Grid, Paper } from '@mui/material';
import TextField from '@mui/material/TextField';
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";



const FIELDS = {
  NAME: "name",
  ROOM: "room",
};

const Main = () => {
  const { NAME, ROOM } = FIELDS;

  const [values, setValues] = useState({ [NAME]: "", [ROOM]: "" });

  const handleChange = ({ target: { value, name } }:{target:{value:string,name:string}}) => {
    setValues({ ...values, [name]: value });
  };



  return (
    <div style={{backgroundColor:'orange',display:"flex",alignItems:"center",height:'100vh'}}>
                 <Container maxWidth="sm">
        <Paper elevation={3}  style={{textAlign:"center",padding:"60px",borderRadius:'30px'}}>

           <Typography  variant='h4'gutterBottom >
            Join the room
           </Typography>
         <form action='submit'>
         <Grid
          style={{margin:"20px",borderRadius:'30px'}}>
            <TextField
              value={values[NAME]}
            label='Username'
            variant='outlined'
            name='name'
            autoComplete='off'
            onChange={handleChange}      
            InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            
            />
            </Grid>
        <Grid style={{margin:"10px"}} >
          <TextField
          value={values[ROOM]}
        name='room'
        id="input-with-icon-textfield"
        label="Room"
        onChange={handleChange}  
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <MeetingRoomIcon />
            </InputAdornment>
          ),
        }}
        variant='outlined'
      />
      </Grid>
     <Link
     className='Router_Link'
      style={{
         pointerEvents:(values[NAME]===''||values[ROOM]==='')?'none':'auto',
       textDecoration:"none",
       textTransform:"none"}} 
     to={`/ChatPage?name=${values[NAME]}&room=${values[ROOM]}`}>
           <Button type='submit' 
           style={{
            marginTop:"10px",
           padding:'10px 45px',
           background:'orange'}} 
           variant='contained' >
         Enter
            </Button>
     </Link>
         </form>
        </Paper>
      </Container>
        </div>
  );
};

export default Main;
