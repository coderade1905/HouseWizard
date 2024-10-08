import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AddHomeIcon from '@mui/icons-material/AddHome';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import supabase from '../../supabase.js';
import translation from '../translation/translation.js';
import { useContext } from 'react';
import { HomeContext } from '../../App';

export default function AccountMenu() {
  const navigate = useNavigate();
  const { language, setLanguage } = useContext(HomeContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogout = async () => {
      const { error } = await supabase.auth.signOut();
      if (error) {
          console.error('Error logging out:', error);
      } else {
          navigate('/login');
      }
};
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => {handleClose(); navigate('/profile')}}>
          <Avatar /> {translation[language]['prf']}
        </MenuItem>
        <MenuItem onClick={() => {handleClose(); navigate('/add')}}>
          <ListItemIcon>
            <AddHomeIcon fontSize="small" />
          </ListItemIcon>
          {translation[language]['adl']}
        </MenuItem>
        <MenuItem onClick={() => {handleClose(); navigate('/mylistings')}}>
          <ListItemIcon>
            <MyLocationIcon fontSize="small" />
          </ListItemIcon>
          {translation[language]['mls']}
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => {handleClose(); handleLogout()}}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {translation[language]['lg']}
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}