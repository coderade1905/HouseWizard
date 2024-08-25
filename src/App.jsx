import './App.css'
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {HomePage} from './components/Home.jsx';
import PrimarySearchAppBar from './components/navbar/NavBarDesktop.jsx';
import LabelBottomNavigation from './components/navbar/MobileNavigation.jsx';
import AddListing from './components/AddListing.jsx';
import VMap from './components/Map.jsx';
import { useState, createContext, useEffect } from "react";
import ChatUI from './components/Messages.jsx';
import SignInScreen from './components/Login.jsx';
import MyListings from './components/MyListings.jsx';
import OfflineNotification from './components/minicomps/OfflineDetector.jsx';
import ErrorBoundary from './components/minicomps/Boundary.jsx';
import DraggableMarker from './components/Mapt.jsx';
import supabase from './supabase.js';
import getLocation from './components/minicomps/GeoLocation.jsx';
import CheckUserExists from './components/minicomps/CheckProfile.jsx';
import Profile from './components/Profile.jsx';

export const HomeContext = createContext({
  errors: {},
  setErrors: () => {},
  map: false,
  setMap: () => {},
  isHome: false,
  setHome: () => {},
  showSidebar: false,
  setShowSidebar: () => {},
  placeInfo: {bednum: 0, title: "", type: "", area: 0, price: 0, description: "", extras: [], lng: "", lat: "", im: [], geo: "", location: "", youtube : "", user_id: ""},
  setPlaceInfo: () => {},
  Houses: [],
  setHouses: () => {},
  open: false,
  setOpen: () => {},
  selected: "",
  setSelected: () => {},
  position: [9.668168, 39.516678],
  setPostion: () => {},
  data: [{bednum: 0, title: "", type: "", area: 0, price: 0, description: "", extras: [], lng: "", lat: "", im: [], geo: "", location: "", youtube : "", user_id: ""}],
  setData: () => {}, 
  loading: false,
  setLoading: () => {},
  active: {},
  setActive: () => {},
});

function App() {
  const [user, setUser] = useState({});
  let [status, setStatus] = useState("l");
  const [errors, setErrors] = useState({bderror : "", tyerror: "", derreor : "", perror: "", aerror: "", exerror: "", lngerror: "", laterror: "", locerror: ""});
  const [map, setMap] = useState(false);
  const [isHome, setHome] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [placeInfo, setPlaceInfo] = useState({bednum: 0, type: "", area: 0, price: 0, description: "", extras: [], lng: "", lat: "", im : [], geo: "", location : "", youtube : "", user_id: ''});
  const [Houses, setHouses] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);
  const [position, setPostion] = useState([9.668168, 39.516678]);
  const [active, setActive] = useState({bednum: false, area: false, price: false, description: false, extras: false});
  const [data, setData] = useState({ bednum: 0, type: "", area: 0, price: 0, description: "", extras: [], lng: "", lat: "", im : [], geo: "", location : "", youtube : "", user_id: ''});
  useEffect(() => {
    getLocation(setPostion);
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        console.log('User signed in:', session.user);
        setUser(session.user);
        // Access user details here
      } else if (event === 'SIGNED_OUT') {
        console.log('User signed out');
      }
  });
  }, []);
  useEffect(() => {
    console.log(position);
  }, [position]);
  return (
    <HomeContext.Provider value={{loading, setLoading, active, setActive, errors, setErrors, map, setMap, setHome, placeInfo, setPlaceInfo, Houses, setHouses, showSidebar, setShowSidebar, open, setOpen, data, setData, selected, setSelected, position, setPostion, status, setStatus, user}}>
      <Router>
        <PrimarySearchAppBar map={map} setMap={setMap} setHome={setHome}/>
          <OfflineNotification  />
          <ErrorBoundary>
            <div className="parent">
              <Routes>
                <Route exact path="/" Component={HomePage}/>
                <Route path="/map" Component={VMap}/>
                <Route path="/mapp" Component={DraggableMarker}/>
                <Route path="/listing/:id" Component={VMap}/>
                <Route path="/chat" Component={ChatUI}/>
                <Route path="/chat/:user" Component={ChatUI}/>
                <Route path="/add" Component={AddListing}/>
                <Route path="/login" Component={SignInScreen}/>
                <Route path="/mylistings" Component={MyListings}/>
                <Route path="/profile" Component={Profile}/>
              </Routes>
            </div>
          </ErrorBoundary>
        {isHome? <LabelBottomNavigation/> : ""}
        <CheckUserExists />
      </Router>
    </HomeContext.Provider>
  )
}

export default App;
