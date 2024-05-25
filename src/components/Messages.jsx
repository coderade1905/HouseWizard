import React, { useState } from 'react';
import '../styles/chat.css';
import ChatInput from "./MessagesInput";
import { CssVarsProvider } from "@mui/joy/styles";
import Avatar from '@mui/joy/Avatar';


function Card({selected}){
  return (
    <div className="chatcard" style={{backgroundColor : (selected?  "#333" : "")}}>
      <Avatar
        color="neutral"
        size="lg"
        variant="solid"
        style={{marginLeft: "20px"}}
      >KB</Avatar>
      <h2>Kaleab Belayhun</h2>
    </div>
  )
}
const ChatUI = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { sender: 'user', message }]);
      setMessage('');
    }
  };

  return (
    <CssVarsProvider defaultMode="dark">
      <div className="chat">
        <div className="chatlist">
          <Card selected={false} />
          <Card selected={true} />
          <Card selected={false} />
          <Card selected={false} />
        </div>
        <div className="chatmain">
          <div className="chatheader">
            <div className="avatar">
              <Avatar
                color="neutral"
                size="lg"
                variant="solid"
              >
                KB
              </Avatar>
              <h2>Kaleab Belayhun</h2>
            </div>
            <div className="contact"></div>
          </div>
          <div className="chatcontent">
            <div className="sent"><span>Hey</span></div>
            <div className="received"><span>Hi</span></div>
          </div>
          <div className='chatinput'>
            <ChatInput style={{ height: "30px", width: "100%" }} />
          </div>
        </div>
      </div>
    </CssVarsProvider>
  );
};

export default ChatUI;
