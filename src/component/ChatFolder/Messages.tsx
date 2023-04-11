import React from 'react';
import './messageItems.scss'
type MessageItemsProps={
    message:any,
    params:any
}

const Messages:React.FC<MessageItemsProps> = ({message,params}) => {


    return (
        <ul className='message'>
            {message.map(({user,message}:any,i:number)=>{
                let isMe = user.name.trim().toLowerCase()===params.name.trim().toLowerCase()?true:false
                return(
                    <li key={i} className={isMe?'messages message_me':'messages message_users'} >
                        <span className='message_name'>{user.name}</span>
                        <div className={isMe?'text_me':'text_users'}>{message}</div>
                    </li>
                )
            })}
        </ul>
    );
};

export default Messages;