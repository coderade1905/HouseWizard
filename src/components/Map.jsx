
import '../styles/Map.css';
import { HomeContext } from '../App';
import { useContext, useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, useMapEvents , useMap, Tooltip} from 'react-leaflet';
import {BingLayer} from 'react-leaflet-bing-v2';
import 'leaflet/dist/leaflet.css';
import axios from "axios";
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import "../styles/leaflet_geolocation.css";
import SwipeableEdgeDrawer from './navbar/Drawer.jsx';
import PermanentDrawerLeft from './navbar/DrawerDesktop.jsx';

const client = axios.create({
  baseURL: "http://localhost:3000/distance" 
});

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
function VMap()
{
    const position = [9.668168, 39.516678];
    const [Zoom, setZoom] = useState(13);
    const {setPlaceInfo, Houses, setHouses, setOpen} = useContext(HomeContext);
    const MapEvents = () => {
      const map = useMap();
      useMapEvents({
        zoomend() {
          const zoom = map.getZoom();
          setZoom(zoom);
        },
        moveend() {
          let center = map.getCenter();
          client.get(`${center["lat"]}/${center["lng"]}`).then((response) => {
            setHouses([]);
            response.data.forEach((element) => {
              setHouses(prevArr => [...prevArr, {title : element.Title, price: element.Price, distance : element.distance, lat : element.latitude , lng : element.longitude}]);
              }
            );
         });
        }
      });
      return false;
    };
    const bing_key = "AqzrTtXbcEmNFpX06G5Y-jVe9EqScIvfH1H_5UHhMY2HT3k-igxa02ggMbZiIWCY";
    return (
        <div className="map">
          <MapContainer center={position} zoom={20}  >
          <SearchField/>
            <LayersControl position='topright'>
              <BaseLayer  name='Road'>
                <TileLayer  url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"/>
              </BaseLayer>
              <BaseLayer checked name='Satlite'>
                <BingLayer  bingkey={bing_key} type="AerialWithLabels" />
              </BaseLayer>
            </LayersControl>
            <MapEvents />
            { Zoom >= 13 ?
              Houses.map(((element, i) => {
                return(
                  <Marker 
                  eventHandlers={{
                  click: (e) => {
                    setOpen(true);
                    setPlaceInfo({title: element.title, price: element.price});
                  },
                  }} key={i} position={[element.lat, element.lng]}>
                    <Tooltip>ETB {element.price}, Area  4sqm</Tooltip>
                  </Marker>
                );
              }))
            : null }
          </MapContainer>
          <PermanentDrawerLeft />
          <SwipeableEdgeDrawer/>
        </div>
      );
}
export default VMap;