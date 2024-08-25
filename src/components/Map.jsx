import React, { useEffect, useState, useContext } from 'react';
import { MapContainer, TileLayer, Marker, LayersControl, Tooltip, useMap, useMapEvents } from 'react-leaflet';
import { BingLayer } from 'react-leaflet-bing-v2';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import SwipeableEdgeDrawer from './navbar/Drawer.jsx';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import * as L from "leaflet";
import Button from '@mui/material/Button';
import '../styles/Map.css'; 
import { HomeContext } from '../App';
import supabase from '../supabase.js';

// Define marker icons
const createIcon = (color) => new L.Icon({
  iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const colors = {"hfs": createIcon("blue"), "hfr" : createIcon("gold"), "rfr" : createIcon("green"), "lnd" : createIcon("violet"), "fsb" : createIcon("green"), "frb" : createIcon("black"), "app" : createIcon("grey")}
const blueIcon = createIcon("blue");
const redIcon = createIcon("red");

const SearchField = () => {
  const map = useMap();
  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider,
      style: 'bar',
      showMarker: true,
      retainZoomLevel: false,
      animateZoom: true,
      autoClose: true,
      searchLabel: 'Enter address',
    });
    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, [map]);
  return null;
};

const VMap = () => {
  const { Houses, setHouses, setLoading, position, open, setOpen, setPlaceInfo, placeInfo } = useContext(HomeContext);
  const MapEventHandler = ({ fetchData }) => {
    const map = useMap();
    useMapEvents({
      moveend: () => {
        if (map) {
          const bounds = map.getBounds();
          console.log('Map moved with bounds:', bounds); // Debugging line
          fetchData(bounds);
        }
      },
    });
  
    return null;
  };
  const fetchData = async (bounds) => {
    console.log('Fetching data with bounds:', bounds); // Debugging line
    const { _southWest: sw, _northEast: ne } = bounds;
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('listings_in_view', {
        min_lat: sw.lat,
        min_long: sw.lng,
        max_lat: ne.lat,
        max_long: ne.lng,
      });

      if (error) {
        console.error('Error retrieving properties:', error);
        return [];
      }
      console.log('Fetched data:', data); // Debugging line
      setHouses(data);
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setLoading(false);
    }
  }
  const [keys, setKeys] = useState(false);

  const handleMarkerClick = (house) => {
    setPlaceInfo(house);
    setOpen(!open);
  };
  const HandleMapLoad =  (map) => {
    const bounds = map.getBounds();
    console.log(map);
    fetchData(bounds);
  };
  return (
    <>
      <SwipeableEdgeDrawer />
      <div style={{ height: 'calc(100vh - 65px)', width: '100%', position: 'relative' }}>
        <div className="color-key">
          <Button onClick={() => setKeys(!keys)}>{keys ? "Hide Keys" : "Show keys"}</Button>
          <div style={{display: keys ? "grid" : "none"}}>
            <div><span className="color-box" style={{backgroundColor: "#2A81CB"}}></span>House for sale</div>
            <div><span className="color-box" style={{backgroundColor: "#FFD326"}}></span>House for rent</div>
            <div><span className="color-box" style={{backgroundColor: "#2AAD27"}}></span>Room for rent</div>
            <div><span className="color-box" style={{backgroundColor: "#9C2BCB"}}></span>Land</div>
            <div><span className="color-box" style={{backgroundColor: "#3D3D3D"}}></span>For sale for businesses</div>
            <div><span className="color-box" style={{backgroundColor: "#CB8427"}}></span>For rent for businesses</div>
            <div><span className="color-box" style={{backgroundColor: "#7B7B7B"}}></span>Apartment</div>
          </div>
        </div>
        <MapContainer whenReady={({ target }) => {
          HandleMapLoad(target);
        }} center={position} zoom={15} style={{ height: "100%", width: "100%" }}>
          <SearchField />
          <LayersControl position='topright'>
            <LayersControl.BaseLayer checked name='Road'>
              <TileLayer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name='Satellite'>
              <BingLayer bingkey="AqzrTtXbcEmNFpX06G5Y-jVe9EqScIvfH1H_5UHhMY2HT3k-igxa02ggMbZiIWCY" type="AerialWithLabels" />
            </LayersControl.BaseLayer>
          </LayersControl>
          <MapEventHandler fetchData={fetchData} />
          {Houses.map(house => (
            <Marker
              key={house.id}
              position={[house.lat, house.lng]}
              icon={house.id === placeInfo.id ? redIcon : colors[house.type]}
              eventHandlers={{
                click: () => handleMarkerClick(house),
              }}
            >
              <Tooltip>{`ETB ${house.price}, Area 4sqm`}</Tooltip>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </>
  );
};

export default VMap;
