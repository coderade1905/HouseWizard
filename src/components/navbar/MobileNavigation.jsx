import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation className='BottomNavigation' sx={{ width: "100%", position: "fixed", bottom: "0", background: "#141414", color: "#fff",  borderTop: "1px solid #777", borderRadius: "5px 5px 0px 0px"}} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="Home"
        value="home"
        icon={<HomeIcon />}
        sx={{color: "#fff"}}
      />
      <BottomNavigationAction
        label="Saved"
        value="saved"
        icon={<FavoriteIcon />}
        sx={{color: "#fff"}}
      />
      <BottomNavigationAction
        label="Rent / Sell"
        value="rentsell"
        icon={<AddIcon />}
        sx={{color: "#fff"}}
      />
      <BottomNavigationAction label="Profile" value="profile" sx={{color: "#fff"}} icon={<AccountCircle />} />
    </BottomNavigation>
  );
}