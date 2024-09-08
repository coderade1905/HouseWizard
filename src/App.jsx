import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from './components/Home.jsx';
import PrimarySearchAppBar from './components/navbar/NavBarDesktop.jsx';
import LabelBottomNavigation from './components/navbar/MobileNavigation.jsx';
import AddListing from './components/AddListing.jsx';
import VMap from './components/Map.jsx';
import Cookies from 'js-cookie';
import { useState, createContext, useEffect } from "react";
import SignInScreen from './components/Login.jsx';
import MyListings from './components/MyListings.jsx';
import OfflineNotification from './components/minicomps/OfflineDetector.jsx';
import ErrorBoundary from './components/minicomps/Boundary.jsx';
import supabase from './supabase.js';
import getLocation from './components/minicomps/GeoLocation.jsx';
import CheckUserExists from './components/minicomps/CheckProfile.jsx';
import Profile from './components/Profile.jsx';
import EditListing from './components/EditListing.jsx';
import { useLocation } from 'react-router-dom';

export const HomeContext = createContext({
  errors: {},
  setErrors: () => { },
  map: false,
  setMap: () => { },
  isHome: false,
  setHome: () => { },
  showSidebar: false,
  setShowSidebar: () => { },
  placeInfo: { bednum: 0, title: "", type: "", area: 0, price: 0, description: "", extras: [], lng: "", lat: "", im: [], geo: "", location: "", youtube: "", user_id: "" },
  setPlaceInfo: () => { },
  Houses: [],
  setHouses: () => { },
  open: false,
  setOpen: () => { },
  selected: "",
  setSelected: () => { },
  position: [9.668168, 39.516678],
  setPostion: () => { },
  data: [{ bednum: 0, title: "", type: "", area: 0, price: 0, description: "", extras: [], lng: "", lat: "", im: [], geo: "", location: "", youtube: "", user_id: "" }],
  setData: () => { },
  loading: false,
  setLoading: () => { },
  active: {},
  setActive: () => { },
});

function App() {
  const getLanguageCookie = () => {
    return Cookies.get('language') || 'en';
  };

  const [user, setUser] = useState({});
  let [status, setStatus] = useState("l");
  const [errors, setErrors] = useState({ bderror: "", tyerror: "", derreor: "", perror: "", aerror: "", exerror: "", lngerror: "", laterror: "", locerror: "" });
  const [map, setMap] = useState(false);
  const [isHome, setHome] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [placeInfo, setPlaceInfo] = useState({ bednum: 0, type: "", area: 0, price: 0, description: "", extras: [], lng: "", lat: "", im: [], geo: "", location: "", youtube: "", user_id: '' });
  const [Houses, setHouses] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [query1, setQuery1] = useState();
  const [loading, setLoading] = useState(false);
  const [position, setPostion] = useState([9.668168, 39.516678]);
  const [ndf, setNdf] = useState(false);
  const [active, setActive] = useState({ bednum: false, area: false, price: false, description: false, extras: false });
  const [data, setData] = useState({ bednum: 0, type: "", area: 0, price: 0, description: "", extras: [], lng: "", lat: "", im: [], geo: "", location: "", youtube: "", user_id: '' });
  const types = { "hfs": "House for sale", "hfr": "House for rent", "rfr": "Room for rent", "lnd": "Land", "fsb": "For sell for businesses", "frb": "For rent for businesses", "app": "Appartment" };
  const [language, setLanguage] = useState(getLanguageCookie());

  const [type, setType] = useState([]);
  const [price, setPrice] = useState({ min: 0, max: 0 });
  const [area, setArea] = useState({ min: 0, max: 0 });
  const [bednum, setBednum] = useState({ min: 0, max: 0 });

  useEffect(() => {
    getLocation(setPostion, setNdf);
  }, [map]);
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN') {
      console.log('User signed in:', session.user);
      setUser(session.user);
      // Access user details here
    } else if (event === 'SIGNED_OUT') {
      console.log('User signed out');
    }
  });
  return (
    <HomeContext.Provider value={{ loading, setLoading, language, setLanguage, active, setActive, errors, setErrors, map, setMap, setHome, placeInfo, setPlaceInfo, Houses, setHouses, showSidebar, setShowSidebar, open, setOpen, data, setData, selected, setSelected, position, setPostion, status, setStatus, user, types, query1, setQuery1, ndf, setNdf, type, setType, price, setPrice, area, setArea, bednum, setBednum }}>
      <Router>
        <PrimarySearchAppBar map={map} setMap={setMap} setHome={setHome} />
        <OfflineNotification />
        <ErrorBoundary>
          <div className="parent">
            <Routes>
              <Route exact path="/" Component={HomePage} />
              <Route path="/map" Component={VMap} />
              <Route path="/editlisting/:id" Component={EditListing} />
              <Route path="/listing/:id" Component={VMap} />
              <Route path="/add" Component={AddListing} />
              <Route path="/login" Component={SignInScreen} />
              <Route path="/mylistings" Component={MyListings} />
              <Route path="/profile" Component={Profile} />
            </Routes>
          </div>
        </ErrorBoundary>
        {isHome ? <LabelBottomNavigation /> : ""}
        <CheckUserExists />
      </Router>
    </HomeContext.Provider>
  )
}

export default App;
