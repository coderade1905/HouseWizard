import * as React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey, lightGreen } from '@mui/material/colors';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import DrawerFilters from './Filter';
import { HomeContext } from '../../App';
import { useContext } from 'react';
import ViewInDetail from '../ViewInDetail';

const drawerBleeding = 56;

const Root = styled('div')(({ theme }) => ({
  backgroundColor: "#2c2f33",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
}));

const StyledBox = styled('div')(({ theme }) => ({
  backgroundColor: "#2c2f33"
}));

const Puller = styled('div')(({ theme }) => ({
  width: 30,
  height: 5,
  backgroundColor:  grey[300],
  borderRadius: 20,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

function SwipeableEdgeDrawer(props) {
  const {open, setOpen, Houses, selected} = useContext(HomeContext);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };


  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(90% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
      <SwipeableDrawer
        className="sed" 
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            visibility: 'visible',
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Typography sx={{ p: 2, color: '#fff' }}>51 houses</Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: '100%',
            overflow: 'auto',
          }}
        >
        <ViewInDetail />
       
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}



export default SwipeableEdgeDrawer;