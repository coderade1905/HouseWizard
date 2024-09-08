import * as React from 'react';
import ScrollableTabsButtonAuto from './minicomps/scrollmenu.jsx'
import '../styles/ViewInDetail.css';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import { LoadingSkeleton } from './navbar/DrawerDesktop.jsx';
import { HomeContext } from '../App';
import { useContext } from 'react';
import TvIcon from '@mui/icons-material/Tv';
import NetworkWifi3BarIcon from '@mui/icons-material/NetworkWifi3Bar';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import HvacIcon from '@mui/icons-material/Hvac';
import { House } from './Home.jsx';
import { useNavigate } from 'react-router-dom';
import NoResults from './minicomps/NoResults.jsx';
import translation from './translation/translation.js';

function ViewInDetail() {
    const { loading, placeInfo, Houses, setPlaceInfo, language } = useContext(HomeContext);
    const pmo =  ["hfr", "rfr", "frb"];
    const navigate = useNavigate();
    const Icons = { "tv": <TvIcon />, "wifi": <NetworkWifi3BarIcon />, "kitchen": <SoupKitchenIcon />, "parking": <LocalParkingIcon />, "heating": <HvacIcon /> };
    const types = { "hfs": "House for sale", "hfr": "House for rent", "rfr": "Room for rent", "lnd": "Land", "fsb": "For sell for businesses", "frb": "For rent for businesses", "app": "Appartment" };
    if (loading) {
        return (
            <div style={{ display: "grid", placeItems: "center" }}>
                <LoadingSkeleton />
                <LoadingSkeleton />
                <LoadingSkeleton />
                <LoadingSkeleton />
                <LoadingSkeleton />
                <LoadingSkeleton />
            </div>
        );
    }
    if (placeInfo?.user_id == "") {
        if (Houses.length == 0) {
            return (
                <>
                    <h1 style={{ textAlign: "center", color: "#fff", margin: "5px" }}>{translation[language]['piv']}</h1>
                    <div className="sectionsparent">
                        <NoResults />
                    </div>
                </>
            )
        }
        return (
            <>
                <h1 style={{ textAlign: "center", color: "#fff", margin: "5px" }}>{translation[language]['piv']}</h1>
                {Houses.map((element, i) => {
                    return (
                        <div style={{ display: "flex", justifyContent: "center" }} key={i} onClick={() => { navigate(`/listing/${element.id}`), setPlaceInfo(element) }}>
                            <House data={element} types={types} language={language} />
                        </div>
                    )
                }
                )}
            </>
        )
    }
    return (
        <div style={{ overflowY: "hidden" }}>
            <div className='view-in-detail'>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="housetitle">{translation[language]['etb']} {placeInfo.price} {pmo.includes(placeInfo.type) ? translation[language]['pmo'] : ""} + {placeInfo.area} {translation[language]['sqm']} {placeInfo.bednum > 0 ? "| " + placeInfo.bednum + ` ${translation[language]['bds']}` : ""}</span>
                </div>
                <span style={{ color: "#bbbbbb", fontSize: "18px" }}>{types[placeInfo.type]} | {placeInfo.location}</span>
                <Box sx={{ marginTop: "20px", display: "flex", gap: "15px", flexWrap: "wrap", borderBottom: "1px #777 solid", paddingBottom: "15px" }}>
                    {placeInfo.extras.length > 0 ? placeInfo.extras.map((element, i) => {
                        return (
                            <Chip sx={{ marginRight: "5px", padding: "8px 12px", color: "#fff", background: "#5865f2", borderRadius: "8px", fontSize: "14px", display: "flex", alignItems: "center" }} key={i} variant='soft' startDecorator={Icons[element]}>
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