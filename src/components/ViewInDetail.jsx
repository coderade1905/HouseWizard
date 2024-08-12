import * as React from 'react';
import Typography from '@mui/joy/Typography';
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
    let allPhotos = [placeInfo.im, placeInfo.im, placeInfo.im, placeInfo.im, placeInfo.im, placeInfo.im, placeInfo.im];
    console.log(allPhotos);
    const navigate = useNavigate();
    const Icons = {"tv" : <TvIcon />, "wifi" : <NetworkWifi3BarIcon />, "kitchen" : <SoupKitchenIcon />, "parking" : <LocalParkingIcon />, "heating" : <HvacIcon /> };
    const types = { "hfs": "House for sale", "hfr": "House for rent", "rfr": "Room for rent", "lnd": "Land", "fsb": "For sell for businesses", "frb": "For rent for businesses", "app": "Appartment" };
    return (
        <div style={{ overflowY: "scroll", height: "calc(100vh - 60px)" }}>
            <div className="header" onClick={e => { setOpen(false) }}>
                <KeyboardArrowLeft style={{ fontSize: "45px", color: "white" }} />
            </div>
            <div className='view-in-detail'>
                <Slideshow allPhotos={allPhotos}/>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <span className="housetitle">ETB {placeInfo.price} + 2BEDS</span>
                    <Button onClick={() => {navigate(`/chat/${placeInfo.pemail}`)}} startDecorator={<CallIcon />}>Contact seller</Button>
                </div>
                <span style={{color: "rgb(170, 170, 170", fontSize: "18px"}}>{types[placeInfo.type]} | {placeInfo.area} sqm</span>
                <Box sx={{marginTop: "20px" }}>
                    {placeInfo.extras.map((element, i) => {
                        return (
                            <Chip sx={{marginRight: "5px"}} key={i} variant='soft' startDecorator={Icons[element]}>
                                {element}
                            </Chip>
                        )
                    })}
                </Box>
                <div className="description" style={{ marginTop: "20px" }}>
                    <h2 style={{marginTop: "5px"}}>Description: </h2>
                    <p>{placeInfo.description}</p>
                </div>
            </div>
        </div>
    )
}

export default ViewInDetail;