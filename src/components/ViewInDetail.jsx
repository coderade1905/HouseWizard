import * as React from 'react';
import ScrollableTabsButtonAuto from './minicomps/scrollmenu.jsx'
import '../styles/ViewInDetail.css';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import { KeyboardArrowLeft } from "@mui/icons-material";
import { HomeContext } from '../App';
import { useContext } from 'react';
import TvIcon from '@mui/icons-material/Tv';
import NetworkWifi3BarIcon from '@mui/icons-material/NetworkWifi3Bar';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import HvacIcon from '@mui/icons-material/Hvac';
import CallIcon from '@mui/icons-material/Call';
import Button from '@mui/joy/Button';
import { useNavigate } from 'react-router-dom';
import {Slideshow} from './minicomps/slideshow.jsx';

function ViewInDetail() {
    const { setOpen, placeInfo } = useContext(HomeContext);
    let allPhotos = [placeInfo.im[0], placeInfo.im[0], placeInfo.im[0], placeInfo.im[0], placeInfo.im[0], placeInfo.im[0], placeInfo.im[0]];
    console.log(placeInfo);
    const navigate = useNavigate();
    const Icons = {"tv" : <TvIcon />, "wifi" : <NetworkWifi3BarIcon />, "kitchen" : <SoupKitchenIcon />, "parking" : <LocalParkingIcon />, "heating" : <HvacIcon /> };
    const types = { "hfs": "House for sale", "hfr": "House for rent", "rfr": "Room for rent", "lnd": "Land", "fsb": "For sell for businesses", "frb": "For rent for businesses", "app": "Appartment" };
    return (
        <div style={{ overflowY: "hidden" }}>
            <div className='view-in-detail'>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <span className="housetitle">ETB {placeInfo.price} + {placeInfo.area} SQM {placeInfo.bednum > 0 ? "| " + placeInfo.bednum + " Beds" : ""}</span>
                </div>
                <span style={{color: "#bbbbbb", fontSize: "18px"}}>{types[placeInfo.type]} | {placeInfo.location}</span>
                <Box sx={{marginTop: "20px", display: "flex", gap: "15px", flexWrap: "wrap", borderBottom: "1px #777 solid", paddingBottom: "15px" }}>
                    {placeInfo.extras.length > 0 ? placeInfo.extras.map((element, i) => {
                        return (
                            <Chip sx={{marginRight: "5px", padding: "8px 12px", color: "#fff", background: "#5865f2", borderRadius: "8px", fontSize: "14px", display: "flex", alignItems: "center"}} key={i} variant='soft' startDecorator={Icons[element]}>
                                {element}
                            </Chip>
                        )
                    }) : ""}
                </Box>
                <ScrollableTabsButtonAuto />
            </div>
        </div>
    )
}

export default ViewInDetail;