import * as React from 'react';
import DrawerFilters from './Filter';
import { House } from '../Home';
import { HomeContext } from '../../App';
import { useContext } from 'react';
import ViewInDetail from '../ViewInDetail';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

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

export default function PermanentDrawerLeft({setSelected}) {
  const { Houses, setHouses, open, setOpen, setPlaceInfo, position, setPostion } = useContext(HomeContext);
  return (
    !open ? (
      <div style={{ overflowY: "auto", height: "calc(100vh - 60px)" }}>
        <DrawerFilters margin={20} />
        <h1 style={{ color: "#fff", marginBottom: "0px", marginLeft: "20px" }}>Nearby</h1>
        <div className='nearbylist'>
          {Houses.length === 0 ? (
            <>
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            </>) : (
              Houses.map(((element, i) => {
                return (
                  <div style={{ display: "flex", justifyContent: "center" }} key={i} onClick={() => {
                    setOpen(true);
                    setPlaceInfo(element);
                    setSelected(element.id);
                    setPostion([element.lat, element.lng]);
                  }}>
                    <House title={element.title} price={element.price} type={element.type} area={element.area} im={element.im} pname={element.pname} />
                  </div>
                );
              }))
          )}
        </div>
      </div >
    ) : (
      <ViewInDetail />
    )
  );
}