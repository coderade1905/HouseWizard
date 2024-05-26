import Typography from "@mui/material/Typography";
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import "../styles/leaflet_geolocation.css";
import { MapContainer, TileLayer, Marker, Popup, LayersControl, useMapEvents, useMap, Tooltip } from 'react-leaflet';
import { BingLayer } from 'react-leaflet-bing-v2';
import { useState, useEffect } from "react";
import 'leaflet/dist/leaflet.css';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';

const { BaseLayer } = LayersControl;

const SearchField = () => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
        provider: provider,
        showMarker: false,
        style: 'button'
    });

    const map = useMap();
    useEffect(() => {
        map.addControl(searchControl);
        return () => map.removeControl(searchControl);
    }, []);

    return null;
};

function MapIn({marker, setMarker}) {
    const position = [9.668168, 39.516678];
    const MapEvents = () => {
        const map = useMap();
        useMapEvents({
            click: (e) => {
                const newMarker = { lat: e.latlng.lat, lng: e.latlng.lng };
                setMarker(newMarker);
                L.marker(newMarker.lat, newMarker.lng).addTo(map);
            },
        });
        return false;
    };
    const bing_key = "AqzrTtXbcEmNFpX06G5Y-jVe9EqScIvfH1H_5UHhMY2HT3k-igxa02ggMbZiIWCY";
    return (
        <>
            <div style={{ width: "100%", height: 500, zIndex: 1, position: "relative" }}>
                <MapContainer center={position} zoom={20}  >
                    <SearchField />
                    <LayersControl position='topright'>
                        <BaseLayer name='Road'>
                            <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
                        </BaseLayer>
                        <BaseLayer checked name='Satlite'>
                            <BingLayer bingkey={bing_key} type="AerialWithLabels" />
                        </BaseLayer>
                    </LayersControl>
                    <MapEvents />
                    {marker ?
                        <Marker key={marker.lat + ',' + marker.lng} position={marker} >
                            <Popup>Selected location latitude: {marker.lat}, longitude: {marker.lng}</Popup>
                        </Marker>
                        : ""}
                </MapContainer>
            </div>
        </>
    );
}

function MapInput() {
    const [marker, setMarker] = useState(null);
    let options = {
        startColor: "#fff",
        endColor: "#FF6767",
        direction: "left",
        variant: "h2",
        textAlign: "left"
    };
    return (
        <>
            <Typography
                variant={options.variant}
                textAlign={options.textAlign}
                sx={{
                    backgroundImage: `linear-gradient( to ${options.direction}, ${options.startColor}, ${options.endColor})`,
                    backgroundSize: "100%",
                    backgroundRepeat: "repeat",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textAlign: "center",
                    marginTop: "30px",
                    fontSize: "35px"
                }}
            >
                Step 2: Add Location Information
            </Typography>
            <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "30px" }}>
                <div style={{ width: "90%", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                    <div>
                        <h2 style={{ color: "#fff", fontSize: "20px" }}>Enter coordinates or point the location on the map</h2>
                        <div style={{width: "400px"}}>
                            <FormControl>
                                <FormLabel>Latitude</FormLabel>
                                <Input placeholder="Latitude" value={marker? marker.lat : ""} onChange={(e) => {setMarker({...marker, lat : e.target.value})}} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Longitude</FormLabel>
                                <Input placeholder="Longtiude" value={marker? marker.lng : ""} onChange={(e) => {setMarker({...marker, lng : e.target.value})}} />
                            </FormControl>
                        </div>
                    </div>
                    <MapIn marker={marker} setMarker={setMarker} />
                </div>
            </div>
        </>
    );
}

export default MapInput;