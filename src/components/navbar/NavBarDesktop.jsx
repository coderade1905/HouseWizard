import * as React from 'react';
import ET from 'country-flag-icons/react/3x2/ET';
import GB from 'country-flag-icons/react/3x2/GB';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import translation from '../translation/translation.js';
import MapIcon from '@mui/icons-material/Map';
import HomeIcon from '@mui/icons-material/Home';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { HomeContext } from '../../App';
import AccountMenu from '../minicomps/AccountMenu.jsx';
import { useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function PrimarySearchAppBar({ map, setMap, setHome }) {
  const navigate = useNavigate();
  const currentRoute = useLocation();
  const { language, setLanguage } = useContext(HomeContext);
  const setLanguageCookie = (language) => {
    Cookies.set('language', language, { expires: 365 }); // The cookie will expire in 365 days
  };
  const getLanguageCookie = () => {
    return Cookies.get('language');
  };

  useEffect(() => {
    if (currentRoute.pathname == "/map" || currentRoute.pathname.replace(/\/\d+$/, '') === "/listing") { setMap(true) }
    else {setMap(false)}
  }, [currentRoute])

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar style={{ background: "rgba(20, 20, 20, 0.7)", margin: '0', backdropFilter: "blur(20px)", padding: '0', borderBottom: "1px solid #777", zIndex: 100, position: "fixed", top: "0" }}>
          <Toolbar>
            {map ? <IconButton size="large" edge="start" color="inherit" aria-label="Home" sx={{ mr: 2 }} onClick={() => { navigate('/') }}><HomeIcon /></IconButton> : <IconButton size="large" edge="start" color="inherit" aria-label="Map" sx={{ mr: 2 }} onClick={() => { navigate('/map') }}><MapIcon /></IconButton>}
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              {translation[language]['gjf']}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            {getLanguageCookie() == "am" ? <Box onClick={() => { setLanguageCookie("en"), setLanguage("en") }} sx={{ display: { display: 'flex' } }}>
              <span>EN <GB title="Switch To English" /></span>
              </Box> :
              <Box onClick={() => { setLanguageCookie("am"), setLanguage("am") }} sx={{ display: { display: 'flex' } }}>
                <span>አማ <ET title="Switch To English" /></span>
              </Box>
            }
            <AccountMenu />
            </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}