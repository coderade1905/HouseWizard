import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import DrawerFilters from './Filter';
import { House } from '../Home';

const drawerWidth = 390;

export default function PermanentDrawerLeft() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        className='dd'
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            marginTop: '64px',
            height: 'calc(100% - 64px)',
            background: '#141414',
            display: "grid",
            placeItems: "center",
            gridTemplateColumns: "1fr",
            overflowY: "auto"
          },
        }}
        variant="permanent"
        anchor="left"
      >
                <DrawerFilters margin={10}/>
        <h1 style={{color: "#fff", marginBottom: "0px"}}>Nearby</h1>
        <House title="Blah blah blah" price={2000} distance={25}/>
        <House title="Blah blah blah" price={2000} distance={25}/>
        <House title="Blah blah blah" price={2000} distance={25}/>
        <House title="Blah blah blah" price={2000} distance={25}/>
      </Drawer>
    </Box>
  );
}