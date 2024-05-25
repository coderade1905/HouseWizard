import * as React from 'react';
import SendIcon from '@mui/icons-material/Send';
import MailIcon from '@mui/icons-material/Mail';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';

export default function ChatInput() {
  const [data, setData] = React.useState({
    email: '',
    status: 'initial',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setData((current) => ({ ...current, status: 'loading' }));
    try {
      // Replace timeout with real backend operation
      setTimeout(() => {
        setData({ email: '', status: 'sent' });
      }, 1500);
    } catch (error) {
      setData((current) => ({ ...current, status: 'failure' }));
    }
  };

  return (
    <Input
        style={{height: "50px", width: "90%"}}
        aria-label="Email"
        placeholder="Type your message here..."
        type="Text"
        required
        value={data.email}
        onChange={(event) =>
        setData({ email: event.target.value, status: 'initial' })
        }
        startDecorator={<MailIcon />}
        endDecorator={
        <Button
            variant="solid"
            color="primary"
            loading={data.status === 'loading'}
            type="submit"
            sx={{ borderRadius: 5, height: "40px" }}
        >
            <SendIcon />
        </Button>
        }
    />
  );
}
