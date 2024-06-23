import * as React from 'react';
import SendIcon from '@mui/icons-material/Send';
import MailIcon from '@mui/icons-material/Mail';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { useState, useEffect } from 'react';
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";


export default function ChatInput({ setMessages, messages, to }) {
  const [message, setMessage] = useState('');
  const [displayName1, setdisplayName] = useState('');
  const [photoURL1, setphotoURL] = useState('');
  const [email1, setEmail] = useState('');
  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setdisplayName(user.displayName);
      setphotoURL(user.photoURL);
      setEmail(user.email);
    });

    return () => unsubscribe();
  }, []);
  const handleSubmit = async (event) => {
    if (message.trim()) {
      event.preventDefault();
      try {
        await addDoc(collection(db, "chat"), {
          text: message,
          sendername: displayName1,
          senderemail: email1,
          avatar: photoURL1,
          createdAt: serverTimestamp(),
          to: to
        });
        setMessages([...messages, { sender: 'user', message }]);
        setMessage('');
      } catch (error) {

      }
    }
  };

  return (
    <Input
      style={{ height: "50px", width: "90%" }}
      aria-label="Message"
      placeholder="Type your message here..."
      type="Text"
      required
      value={message}
      onChange={(event) => { setMessage(event.target.value) }}
      startDecorator={<MailIcon />}
      endDecorator={
        <Button
          variant="solid"
          color="primary"
          type="submit"
          sx={{ borderRadius: 5, height: "40px" }}
          onClick={handleSubmit}
        >
          <SendIcon />
        </Button>
      }
    />
  );
}
