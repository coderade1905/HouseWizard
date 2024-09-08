import React, { useEffect, useState, useContext } from 'react';
import { MapContainer, TileLayer, Marker, LayersControl, Tooltip, useMap, useMapEvents } from 'react-leaflet';
import { BingLayer } from 'react-leaflet-bing-v2';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import SwipeableEdgeDrawer from './navbar/Drawer.jsx';
import PermanentDrawerLeft from './navbar/DrawerDesktop.jsx';
import { useParams } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import * as L from "leaflet";
import Button from '@mui/material/Button';
import '../styles/Map.css';
import { HomeContext } from '../App';
import supabase from '../supabase.js';
import { useNavigate } from 'react-router-dom';
import image from '../images/image.png';
import translation from './translation/translation.js';


// Define marker icons
const createIcon = (color) => new L.Icon({
  iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
const createBigIcon = () => new L.Icon({
  iconUrl: image,
  iconSize: [41, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const colors = { "hfs": createIcon("blue"), "hfr": createIcon("gold"), "rfr": createIcon("green"), "lnd": createIcon("violet"), "fsb": createIcon("green"), "frb": createIcon("black"), "app": createIcon("grey"), "selected": createBigIcon() }

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
const Recenter = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng]);
  return null;
}

const VMap = () => {
  const [bound1, setBound1] = useState(null);
  const { Houses, setHouses, setLoading, position, setPlaceInfo, selected, setSelected, setPostion, setOpen, type, price, area, bednum , language } = useContext(HomeContext);
  let { id } = useParams();
  useEffect(() => {
    setPlaceInfo({ bednum: 0, title: "", type: "", area: 0, price: 0, description: "", extras: [], lng: "", lat: "", im: [], geo: "", location: "", youtube: "", user_id: "" })
    setSelected("");
    const fetchHouseById = async (houseId) => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('listings')
          .select(`
            *,
            user_info(*)
          `)
          .eq('id', houseId)
          .single();
        if (error) {
          console.error('Error fetching house by ID:', error);
          return;
        }

        if (data) {
          setPostion([data.lat, data.lng]);
          setPlaceInfo(data);
          setSelected(data.id);
          setOpen(true);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchHouseById(id);
    }
  }, [id]);

  const MapEventHandler = ({ fetchData }) => {
    let map = useMap();
    useMapEvents({
      moveend: () => {
        if (map) {
          const bounds = map.getBounds();
          setBound1(bounds);
          fetchData(bounds);
        }
      },
    });

    return null;
  };
  const types1 =
    {
        "House for sale": "hfs",
        "House for rent": "hfr",
        "Room for rent": "rfr",
        "Land": "lnd",
        "For sale for businesses": "fsb",
        "For rent for businesses": "frb",
        "Appartment": "app",
        "የሚሸጥ ቤት": 'hfs',
        "የሚከራይ ቤት": 'hfr',
        "የሚከራይ ክፍል": 'rfr',
        "መሬት": 'lnd',
        "ለንግድ ቤቶች የሚሸጥ": 'fsb',
        "ለንግድ ቤቶች ኪራይ": 'frb',
        "አፓርታማ": 'app',
    }
  const fetchData = async (bounds) => {
    const { _southWest: sw, _northEast: ne } = bounds;
    let filtertype = ["hfs", "hfr", "rfr", "lnd", "fsb", "frb", "app"];
    if (id) {
      //
    }
    else {
      setLoading(true);
      setPlaceInfo({ bednum: 0, type: "", area: 0, price: 0, description: "", extras: [], lng: "", lat: "", im: [], geo: "", location: "", youtube: "", user_id: '' });
    }
    try {
      if (type.length > 0) {
        filtertype = [];
        type.map((element) => {
            filtertype.push(types1[element]);
        })
    }
      let query = supabase.rpc('listings_in_view', {
        min_lat: sw.lat,
        min_long: sw.lng,
        max_lat: ne.lat,
        max_long: ne.lng,
      });
      if (price.min !== 0 && price.min !== undefined) {
        query = query.filter('price', 'gte', price.min);
      }
      if (price.max !== 0 && price.max !== undefined) {
        query = query.filter('price', 'lte', price.max);
      }
      if (area.min !== 0 && area.min !== undefined) {
        query = query.filter('area', 'gte', area.min);
      }
      if (area.max !== 0 && area.max !== undefined) {
        query = query.filter('area', 'lte', area.max);
      }
      if (bednum.min !== 0 && bednum.min !== undefined) {
        query = query.filter('bednum', 'gte', bednum.min);
      }
      if (bednum.max !== 0 && bednum.max !== undefined) {
        query = query.filter('bednum', 'lte', bednum.max);
      }
      if (type.length > 0) {
        if (filtertype.length == 1) {
          query = query.filter('type', 'eq', filtertype[0]);
        } else {
          query = query.filter('type', 'in', `(${filtertype.join(',')})`);
        }
      }
      let { data, error } = await query;
      if (error) {
        console.error('Error retrieving properties:', error);
        return [];
      }
      setHouses(data);
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setLoading(false);
    }
  }
  const [keys, setKeys] = useState(false);
  const navigate = useNavigate();
  const HandleMarkerClick = (house) => {
    navigate(`/listing/${house.id}`);
  };
  const HandleMapLoad = (map) => {
    const bounds = map.getBounds();
    setBound1(bounds);
    fetchData(bounds);
  };
  return (
    <>
      <SwipeableEdgeDrawer fetchData={fetchData} bounds={bound1} />
      <div style={{ height: 'calc(100vh - 65px)', width: '100%', position: 'relative' }}>
        <div className="color-key">
          <Button onClick={() => setKeys(!keys)}>{keys ? "Hide Keys" : "Show keys"}</Button>
          <div style={{ display: keys ? "grid" : "none" }}>
            <div><img src={image} width="20px" height="20px" /> Selected</div>
            <div><span className="color-box" style={{ backgroundColor: "#2A81CB" }}></span>House for sale</div>
            <div><span className="color-box" style={{ backgroundColor: "#FFD326" }}></span>House for rent</div>
            <div><span className="color-box" style={{ backgroundColor: "#2AAD27" }}></span>Room for rent</div>
            <div><span className="color-box" style={{ backgroundColor: "#9C2BCB" }}></span>Land</div>
            <div><span className="color-box" style={{ backgroundColor: "#3D3D3D" }}></span>For sale for businesses</div>
            <div><span className="color-box" style={{ backgroundColor: "#CB8427" }}></span>For rent for businesses</div>
            <div><span className="color-box" style={{ backgroundColor: "#7B7B7B" }}></span>Apartment</div>
          </div>
        </div>
        <div className="map-container">
          <PermanentDrawerLeft fetchData={fetchData} bounds={bound1} />
          <MapContainer whenReady={({ target }) => {
            HandleMapLoad(target);
          }} center={position} zoom={15} style={{ height: "100%", position: "sticky" }}>
            <Recenter lat={position[0]} lng={position[1]} />
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
                icon={selected == house.id ? colors["selected"] : colors[house.type]}
                eventHandlers={{
                  click: () => {
                    HandleMarkerClick(house);
                  }
                }}
              >
                <Tooltip>{`${translation[language]['etb']} ${house.price}, Area ${house.area}sqm`}</Tooltip>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </>
  );
};

export default VMap;
