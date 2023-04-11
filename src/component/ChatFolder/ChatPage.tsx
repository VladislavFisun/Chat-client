import Typography from '@mui/material/Typography';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Container from '@mui/material/Container';
import { Button, Paper } from '@mui/material';
import MoodIcon from '@mui/icons-material/Mood';
import { useEffect,useRef,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import * as io from "socket.io-client";
import CloseIcon from '@mui/icons-material/Close';
import EmojiPicker from 'emoji-picker-react';
import './ChatPage.scss'

import Messages from './Messages';

const ChatPage = () => {

  const { search } = useLocation();
  const navigate = useNavigate();
  const [params, setParams] = useState<any>({});
  const [state, setState] = useState([]);
  const [message, setMessage] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [users, setUsers] = useState(0);
  const socket = io.connect("https://chatserver-g2gr.onrender.com");
  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams);
    socket.emit("join", searchParams);
  }, [search]);

  useEffect(() => {
    socket.on("message", ({ data }) => {
      setState((_state):any => [..._state, data]);
    });
  }, []);

  useEffect(() => {
    socket.on("room", ({ data: { users } }) => {
      setUsers(users.length);
    });
  }, []);

  


  const inputRef = useRef<HTMLInputElement>(null)

const toggleEmoji=()=>{
  setOpen(isOpen=>!isOpen)
}

const handleExit=()=>{
  socket.emit('leftRoom',{params})
  navigate('/')
}
const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault()
  if(!message){
    return
  }
  setOpen(false)
  socket.emit('sendMessage',{message,params})
setMessage('')
  inputRef.current?.focus()
}


return (
<div className='main'
 >
<Container maxWidth='lg'>
    <Paper elevation={2} style={{
    backgroundColor:'rgb(51,51,51)',
    color:"white",
    height:'90vh',
    borderRadius:"20px",
    
  
    }} >
    <div className="flex"
   
    >
      <div className="flex_header">
        <div className="flex_header-name"><Typography variant='h6'>Room: {params.room}</Typography></div>
        <div className="flex_header-users">
          <Typography variant='h6' className="flex_header-users"> {users} users in the room <FiberManualRecordIcon style={{color:'lightgreen',marginLeft:'5px'}}/></Typography></div>
        <div className="flex_header-button">
          <Button 
          onClick={handleExit}
          variant='contained'
           style={{
            backgroundColor:'orange'
          }}>
            Left the room
            </Button>
        </div>
      </div>

     <div className="flex_content">
       <Messages message={state} params={params}/>
    </div>

      <div className="flex_message">
          
   <form className='message_form' onSubmit={handleSubmit}>
              <input
              ref={inputRef}
              placeholder='send a message...'
              value={message}
              onChange={(e)=>{
                setMessage(e.target.value)
              }}
                className="message-input"
                type="text" />
          
            <div className="message-button">
              <MoodIcon onClick={toggleEmoji}  className='message_emoji' style={{color:"lightyellow",
            margin:'0px 16px',}}/>
            {isOpen&&<div 

            style={{
              padding:'15px'
            }}
          
            className='Emoji_item' >
              <CloseIcon 
              onClick={toggleEmoji}
              />
            <EmojiPicker 
            onEmojiClick={({emoji})=>{
              setMessage(message=>`${message} ${emoji}`)
            }}
         />
            </div>}
            <Button variant='contained' 
            type='submit'
            style={{
              backgroundColor:'orange'
            }}>
              send a message
            </Button>
            </div>
   </form>
      </div>
    </div>
  
    </Paper>
</Container>
</div>
);
};

export default ChatPage;