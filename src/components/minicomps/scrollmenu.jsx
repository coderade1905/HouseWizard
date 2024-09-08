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
import translation from '../translation/translation.js';
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
  const { placeInfo, language } = useContext(HomeContext);


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
              Name: {placeInfo?.user_info?.firstname} {placeInfo?.user_info?.lastname}
            </Typography>
            <Typography sx={{ mt: 2, color: "#fff" }}>
              Phone number: {placeInfo?.user_info?.phonenumber}
            </Typography>
            {placeInfo?.user_info?.email? <Typography sx={{ mt: 2, color: "#fff" }}>
              Email: {placeInfo?.user_info?.email}
            </Typography> : ""}
            {placeInfo?.user_info?.instagram? <Typography sx={{ mt: 2, color: "#fff" }}>
              Instagram: {placeInfo?.user_info?.instagram}
            </Typography> : ""}
            {placeInfo?.Telegram? <Typography sx={{ mt: 2, color: "#fff" }}>
              Telegram: {placeInfo?.user_info?.telegram}
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
      <div style={{ display: "grid", gridTemplateColumns: "1fr", placeItems: "center", width: "100%", borderBottom: "1px solid #777" }}>
        <Button onClick={handleOpen} variant="contained" sx={{ borderRadius: "15px", marginBottom: "10px", background: "#026132", color: "#fff" }}><ContactPhoneRoundedIcon style={{ marginRight: "10px" }} />{translation[language]['cs']}</Button>
        <Button onClick={() => {window.open(`https://www.google.com/maps/search/?api=1&query=${placeInfo.lat},${placeInfo.lng}`, "_blank")}} variant="contained" sx={{ borderRadius: "15px", marginBottom: "10px", background: "#610210", color: "#fff" }}><DirectionsRoundedIcon style={{ marginRight: "10px" }} />{translation[language]['vgm']}</Button>
        <BasicModal />
      </div>
      <Typography sx={{ mt: 2, color: "#fff", textAlign: "center"}}>
        {placeInfo?.description}
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
          <Tab label={translation[language]['abt']} />
          <Tab label={translation[language]['pht']} />
          <Tab label={translation[language]['vid']} />
        </Tabs>
      </Box>
      <Box sx={{ p: 3 }}>
        <TabContent />
      </Box>
    </ThemeProvider>
  );
}
