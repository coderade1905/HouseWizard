import * as React from 'react';
import ViewInDetail from '../ViewInDetail';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { HomeContext } from '../../App';
import { useContext } from 'react';
import DrawerFilters from './Filter';
import { useNavigate } from 'react-router-dom';

export function LoadingSkeleton() {
  return (
    <Box sx={{ width: 300, marginRight: 0.5, my: 5 }}>
      <Skeleton sx={{ bgcolor: 'grey.700' }} variant="rectangular" width={300} height={130} />
      <Box sx={{ pt: 0.5 }}>
        <Skeleton sx={{ bgcolor: 'grey.700' }} />
        <Skeleton sx={{ bgcolor: 'grey.700' }} width="60%" />
      </Box>
    </Box>
  )
}

export default function PermanentDrawerLeft({fetchData, bounds}) {
  const {placeInfo} = useContext(HomeContext);
  const navigate = useNavigate();
  const fetchData1 = () => {
    fetchData(bounds);
  }
  return (
    <div className="drawer-left">
      {placeInfo.id? <div onClick={() => {navigate('/map')}} style={{width: "100%", display: "flex", color: "#fff", padding: "5px", margin: "10px 0px 10px 0px"}}><ArrowBackIosIcon sx={{fontSize: "30px"}}/></div> :  <DrawerFilters margin={30} fetchData={fetchData1}/>}
        <ViewInDetail />
    </div>
  );
}