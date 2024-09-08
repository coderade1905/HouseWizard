import React, { useState, useEffect, useContext } from "react";
import Typography from "@mui/material/Typography";
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, useMapEvents, useMap } from 'react-leaflet';
import { BingLayer } from 'react-leaflet-bing-v2';
import 'leaflet/dist/leaflet.css';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import { HomeContext } from "../App";
import "../styles/leaflet_geolocation.css";
import translation from './translation/translation.js';


const { BaseLayer } = LayersControl;

const SearchField = () => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
        provider,
        showMarker: false,
        style: 'button',
    });

    const map = useMap();
    useEffect(() => {
        map.addControl(searchControl);
        return () => map.removeControl(searchControl);
    }, [map]);

    return null;
};

function MapIn({ marker, setMarker, position }) {
    const MapEvents = () => {
        const map = useMap();
        useMapEvents({
            click: (e) => {
                const { lat, lng } = e.latlng;
                fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`)
                .then(response => response.json())
                .then(data => {
                    setMarker({ ...marker, lat : lat, lng : lng, geo : `POINT(${lng} ${lat})`, location : data.display_name});
                });
            },
        });
        return null;
    };

    const bing_key = "AqzrTtXbcEmNFpX06G5Y-jVe9EqScIvfH1H_5UHhMY2HT3k-igxa02ggMbZiIWCY";

    return (
        <div style={{ width: "100%", height: 500, zIndex: 1, position: "relative" }}>
            <MapContainer center={marker?.lat && marker?.lng ? [marker?.lat, marker?.lng] : position} zoom={20}>
                <SearchField />
                <LayersControl position='topright'>
                    <BaseLayer name='Road'>
                        <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
                    </BaseLayer>
                    <BaseLayer checked name='Satellite'>
                        <BingLayer bingkey={bing_key} type="AerialWithLabels" />
                    </BaseLayer>
                </LayersControl>
                <MapEvents />
                {marker?.lat && marker?.lng && (
                    <Marker position={[marker?.lat, marker?.lng]}>
                        <Popup>Selected location: Latitude {marker?.lat}, Longitude {marker?.lng}</Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    );
}

function MapInput() {
    const { data, setData, errors, position, language } = useContext(HomeContext);

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
                    backgroundImage: `linear-gradient(to ${options.direction}, ${options.startColor}, ${options.endColor})`,
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
                {translation[language]['lin']}
            </Typography>
            <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "30px" }}>
                <div className="locationcont">
                    <div>
                        <h2 style={{ color: "#fff", fontSize: "20px" }}>{translation[language]['ptl']}</h2>
                        <MapIn marker={data} setMarker={setData} position={position} />
                        <FormControl style={{marginTop: "10px"}}>
                                <FormLabel>{translation[language]['loc']}</FormLabel>
                                <Input
                                    placeholder="E.x Debre Berhan, Tebasse"
                                    value={data.location || ""}
                                    onChange={(e) => {
                                        setData({ ...data, location: e.target.value });
                                    }}
                                />
                                <FormHelperText>{errors.locerror}</FormHelperText>
                        </FormControl>
                        <div style={{marginTop: "15px"}}>
                            <FormControl>
                                <FormLabel>{translation[language]['lat']}</FormLabel>
                                <Input
                                    placeholder={translation[language]['lat']}
                                    value={data.lat || ""}
                                    onChange={(e) => {
                                        if (!isNaN(e.target.value)) {
                                            setData({ ...data, lat: e.target.value });
                                        }
                                    }}
                                    disabled={true}
                                />
                                <FormHelperText>{errors.laterror}</FormHelperText>
                            </FormControl>
                            <FormControl>
                                <FormLabel>{translation[language]['lng']}</FormLabel>
                                <Input
                                    placeholder={translation[language]['lng']}
                                    value={data.lng || ""}
                                    onChange={(e) => {
                                        if (!isNaN(e.target.value)) {
                                            setData({ ...data, lng: e.target.value });
                                        }
                                    }}
                                    disabled={true}
                                />
                                <FormHelperText>{errors.lngerror}</FormHelperText>
                            </FormControl>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MapInput;
