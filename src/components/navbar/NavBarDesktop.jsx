import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MapIcon from '@mui/icons-material/Map';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { useContext , useEffect} from 'react';
import AccountMenu from '../minicomps/AccountMenu.jsx';
import { useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function PrimarySearchAppBar({map, setMap, setHome}) {
  const navigate = useNavigate();
  const currentRoute = useLocation();
  useEffect(() => {
    if (currentRoute.pathname === "/map") {setMap(true);}
  }, [])

  return (
    <ThemeProvider theme={darkTheme}>
          <Box sx={{ flexGrow: 1 }}>
          <AppBar style={{background: "rgba(20, 20, 20, 0.7)", margin: '0', backdropFilter: "blur(20px)",  padding: '0', borderBottom: "1px solid #777", zIndex: 100, position: "fixed", top: "0"}}>
            <Toolbar>
                {map? <IconButton size="large" edge="start" color="inherit" aria-label="Home" sx={{ mr: 2 }} onClick={() => {navigate('/'), setMap(!map)}}><HomeIcon /></IconButton> : <IconButton size="large" edge="start" color="inherit" aria-label="Map" sx={{ mr: 2 }} onClick={() => {navigate('/map'), setMap(!map)}}><MapIcon /></IconButton>}
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block' } }}
              >
                Gojo Felega
              </Typography>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { display : 'flex' } }}>
                <AccountMenu />
              </Box>
            </Toolbar>
          </AppBar>
        </Box>
    </ThemeProvider>
  );
}