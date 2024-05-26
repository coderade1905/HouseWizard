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

const drawerBleeding = 56;

const Root = styled('div')(({ theme }) => ({
  backgroundColor: grey[800],
}));

const StyledBox = styled('div')(({ theme }) => ({
  backgroundColor:  grey[800],
}));

const Puller = styled('div')(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor:  grey[300],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

function SwipeableEdgeDrawer(props) {
  const {open, setOpen} = useContext(HomeContext);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };


  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(100% - ${drawerBleeding}px)`,
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
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Typography sx={{ p: 2, color: '#fff' }}>51 nearby houses</Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: '100%',
            overflow: 'auto',
          }}
        >
        <DrawerFilters margin={0}/>
        <Skeleton style={{borderRadius: "5px", marginBottom: "10px", marginTop: "10px"}} variant="rectangular"  width="100%" height={160} sx={{ bgcolor: '#777' }}/>
        <Skeleton height={30} sx={{ bgcolor: '#777' }} />
        <Skeleton height={30} sx={{ bgcolor: '#777' }} width="60%" />
        <div style={{display: 'flex', justifyContent: 'space-around', marginTop: "10px"}}>
            <Skeleton variant="circular" sx={{ bgcolor: '#777' }} width={40} height={40} />
            <Skeleton variant="circular" sx={{ bgcolor: '#777' }} width={40} height={40} />
            <Skeleton variant="circular" sx={{ bgcolor: '#777' }} width={40} height={40} />
            <Skeleton variant="circular" sx={{ bgcolor: '#777' }} width={40} height={40} />
        </div>
        <Skeleton style={{borderRadius: "5px", marginBottom: "10px", marginTop: "20px"}} variant="rectangular"  width="100%" height={250} sx={{ bgcolor: '#777' }}/>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}



export default SwipeableEdgeDrawer;