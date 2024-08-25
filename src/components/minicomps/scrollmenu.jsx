import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { HomeContext } from '../../App';
import { useContext, useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import Button from '@mui/material/Button';
import ContactPhoneRoundedIcon from '@mui/icons-material/ContactPhoneRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import DirectionsRoundedIcon from '@mui/icons-material/DirectionsRounded';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function ScrollableTabsButtonAuto() {
  const [value, setValue] = React.useState(0);
  const { placeInfo } = useContext(HomeContext);


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: "grid",
    gridTemplateColumns: "1fr", 
    placeItems: "center"
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const BasicModal = () => {
    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Contact Information
            </Typography>
            <Typography sx={{ mt: 2, color: "#fff" }}>
              Name: {placeInfo?.user_info?.FirstName} {placeInfo.user_info.LastName}
            </Typography>
            <Typography sx={{ mt: 2, color: "#fff" }}>
              Phone number: {placeInfo?.user_info?.PhoneNumber}
            </Typography>
            {placeInfo?.user_info?.PhoneNumber? <Typography sx={{ mt: 2, color: "#fff" }}>
              Email: {placeInfo?.user_info?.Email}
            </Typography> : ""}
            {placeInfo?.user_info?.Instagram? <Typography sx={{ mt: 2, color: "#fff" }}>
              Instagram: @{placeInfo?.user_info?.Instagram}
            </Typography> : ""}
            {placeInfo?.user_info?.Telegram? <Typography sx={{ mt: 2, color: "#fff" }}>
              Telegram: @{placeInfo?.user_info?.Telegram}
            </Typography> : ""}
          </Box>
        </Modal>
      </div>
    );
  }


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const FullscreenImage = ({ img }) => {
    const [isFullscreen, setIsFullscreen] = useState(false);

    const handleImageClick = () => {
      setIsFullscreen(true);
    };

    const handleCloseClick = () => {
      setIsFullscreen(false);
    };

    return (
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "15px", width: "100%" }}>
        <img
          src={img}
          width="100%"
          height="auto"
          onClick={handleImageClick}
          className={isFullscreen ? 'fullscreen' : 'thumbnail'}
        />
        {isFullscreen && (
          <div className="overlay" onClick={handleCloseClick}>
            <button className="close-button" onClick={handleCloseClick}>
              &times;
            </button>
            <a
              href={img}
              download
              className="download-button"
              onClick={(e) => e.stopPropagation()}
            >
              &#x1F4BE;
            </a>
            <img
              src={img}
              className="fullscreen-image"
            />
          </div>
        )}
      </div>
    );
  };

  const Photos = () => {
    return (
      <>{placeInfo?.im.map(
        (image, i) => {
          return (
            <FullscreenImage key={i} img={image} />
          )
        }
      )}</>
    )
  }
  const Video = () => {
    return (
      <div className="video-container">
        <ReactPlayer url={placeInfo.youtube} />
      </div>
    )
  }
  const About = () => {
    return (
      <>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", placeItems: "center", width: "100%" }}>
        <Button onClick={handleOpen} variant="contained" sx={{ borderRadius: "15px", marginBottom: "10px", background: "#026132", color: "#fff" }}><ContactPhoneRoundedIcon style={{ marginRight: "10px" }} /> Contact Seller</Button>
        <Button onClick={handleOpen} variant="contained" sx={{ borderRadius: "15px", marginBottom: "10px", background: "#496102", color: "#fff" }}><FavoriteRoundedIcon style={{ marginRight: "10px" }} />Save</Button>
        <Button onClick={() => {window.open(`https://www.google.com/maps/search/?api=1&query=${placeInfo.lat},${placeInfo.lng}`, "_blank")}} variant="contained" sx={{ borderRadius: "15px", marginBottom: "10px", background: "#610210", color: "#fff" }}><DirectionsRoundedIcon style={{ marginRight: "10px" }} /> View on GoogleMaps</Button>
        <BasicModal />
      </div>
      <Typography sx={{ mt: 2, color: "#fff" }}>
        Description: {placeInfo?.description}
      </Typography>
      </>
    );
  };

  // Components to render for each tab
  const TabContent = () => {
    switch (value) {
      case 0:
        return <About />;
      case 1:
        return <Photos />;
      case 2:
        return <Video />;
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ width: '100%', borderBottom: '1px solid #777' }}>
        <Tabs value={value} onChange={handleChange} scrollButtons="auto" centered>
          <Tab label="About" />
          <Tab label="Photos" />
          <Tab label="Video" />
        </Tabs>
      </Box>
      <Box sx={{ p: 3 }}>
        <TabContent />
      </Box>
    </ThemeProvider>
  );
}
