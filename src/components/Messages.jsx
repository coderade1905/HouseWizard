import React, { useState, useEffect } from 'react';
import '../styles/chat.css';
import ChatInput from "./MessagesInput";
import { CssVarsProvider } from "@mui/joy/styles";
import Avatar from '@mui/joy/Avatar';
import { useParams } from 'react-router-dom';


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
  const [messages, setMessages] = useState([]);
  const [to, setTo] = useState([]);
  let { user } = useParams();
  useEffect(() => {
    if (user){
      setTo(user);
    }
  }, [])
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
            {messages.map((element, i ) => {
              if (element.sender == "user"){
                return <div key={i} className="sent"><span>{element.message}</span></div>
              }
              else{
                return <div key={i} className="received"><span>{element.message}</span></div>
              }
            })}
          </div>

          <div className='chatinput'>
            <ChatInput setMessages={setMessages} messages={messages} to={to} style={{ height: "30px", width: "100%" }} />
          </div>
        </div>
      </div>
    </CssVarsProvider>
  );
};

export default ChatUI;
