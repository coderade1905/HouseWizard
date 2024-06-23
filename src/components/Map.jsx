
import '../styles/Map.css';
import { HomeContext } from '../App';
import { useContext, useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, useMapEvents, useMap, Tooltip } from 'react-leaflet';
import { BingLayer } from 'react-leaflet-bing-v2';
import 'leaflet/dist/leaflet.css';
import axios from "axios";
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import "../styles/leaflet_geolocation.css";
import SwipeableEdgeDrawer from './navbar/Drawer.jsx';
import PermanentDrawerLeft from './navbar/DrawerDesktop.jsx';
import { db } from "../firebase";
import { collection, query, where, orderBy, startAt, doc, getDoc, getDocs } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import * as L from "leaflet";


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
function VMap() {
  const [Zoom, setZoom] = useState(13);
  const {setMap, setPlaceInfo, Houses, setHouses, setOpen, selected, setSelected, position, setPostion } = useContext(HomeContext);
  async function fetchData() {
    const querySnapshot = await getDocs(collection(db, "listings"));
    setHouses([]);
    querySnapshot.forEach((doc) => {
      let res = doc.data().data;
      setHouses((prev) => [...prev, { title: res.title, price: res.price, type: res.type, area: res.area, im: res.im, pname: res.pname, lat: res.lat, lng: res.lng, description: res.description, extras: res.extras, id : doc.id, pemail: res.pemail }])
    });
    const map = useMap();
    let center = map.getCenter();
    setPostion([center.lat, center.lng]);
  }
  useEffect(() => {
    fetchData();
  }, [])
  const RecenterAutomatically = () => { 
    const map = useMap();
    useEffect(() => {
      map.setView([position[0], position[1]]);
    }, [position]);
  
    return null;
  };
  const redIcon = new L.Icon({
    iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  const blueIcon = new L.Icon({
    iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });;
  let { id } = useParams();
  useEffect(() => {
    async function FetchData() {
      if (id) {
        console.log(id, 123);
        const snapshot = await getDoc(doc(db, "listings", id));
        if (snapshot.exists()) {
          // Document exists, you can access its data
          const data = snapshot.data();
          console.log("Document data:", data);
          setOpen(true);
          setPlaceInfo(data.data);
          setMap(true);
        } else {
          console.log("Document does not exist.");
        }
      }
    }
    FetchData();
  }, []);
  const MapEvents = () => {
    const map = useMap();
    useMapEvents({
      zoomend() {
        const zoom = map.getZoom();
        setZoom(zoom);
      }
    });
    return false;
  };
  const bing_key = "AqzrTtXbcEmNFpX06G5Y-jVe9EqScIvfH1H_5UHhMY2HT3k-igxa02ggMbZiIWCY";
  return (
    <>
      <div className="map">
        <PermanentDrawerLeft setSelected={setSelected} />
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
          {Zoom >= 13 ?
            Houses.map(((element, i) => {
              console.log(element);
              return (
                <Marker
                  eventHandlers={{
                    click: (e) => {
                      setOpen(true);
                      setPlaceInfo(element);
                      setSelected(element.id);
                      setPostion([element.lat, element.lng]);
                    },
                  }} key={i} position={[element.lat, element.lng]} icon={(element.id === selected? redIcon : blueIcon)}>
                  <Tooltip>ETB {element.price}, Area  4sqm</Tooltip>
                </Marker>
              );
            }))
            : null}
            <RecenterAutomatically />
        </MapContainer>
      </div>
      <SwipeableEdgeDrawer  />
    </>
  );
}
export default VMap;