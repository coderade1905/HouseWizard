import './App.css'
import { BrowserRouter as Router, Route, Routes, BrowserRouter} from "react-router-dom";
import {HomePage} from './components/Home.jsx';
import PrimarySearchAppBar from './components/navbar/NavBarDesktop.jsx';
import LabelBottomNavigation from './components/navbar/MobileNavigation.jsx';
import AddListing from './components/AddListing.jsx';
import VMap from './components/Map.jsx';
import { useState, createContext } from "react";
import ChatUI from './components/Messages.jsx';
import SignInScreen from './components/Login.jsx';
import Upload from './components/Upload.jsx';
import MyListings from './components/MyListings.jsx';

export const HomeContext = createContext();

function App() {
  const [errors, setErrors] = useState({tierror : "", tyerror: "", derreor : "", perror: "", aerror: "", exerror: "", lngerror: "", laterror: ""});
  const [map, setMap] = useState(false);
  const [isHome, setHome] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [placeInfo, setPlaceInfo] = useState({title: "Place Title", price : "0"});
  const [Houses, setHouses] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [position, setPostion] = useState([9.668168, 39.516678]);
  const [data, setData] = useState({ title: "", type: "", area: 0, price: 0, description: "", extras: [], lng: "", lat: "", im : "", pl : "", geohash : ""});
  return (
    <HomeContext.Provider value={{errors, setErrors, map, setMap, setHome, placeInfo, setPlaceInfo, Houses, setHouses, showSidebar, setShowSidebar, open, setOpen, data, setData, selected, setSelected, position, setPostion}}>
      <Router>  
        <PrimarySearchAppBar />
        <div className="parent">
          <Routes>
            <Route exact path="/" Component={HomePage}/>
            <Route path="/map" Component={VMap}/>
            <Route path="/listing/:id" Component={VMap}/>
            <Route path="/chat" Component={ChatUI}/>
            <Route path="/chat/:user" Component={ChatUI}/>
            <Route path="/add" Component={AddListing}/>
            <Route path="/login" Component={SignInScreen}/>
            <Route path="/upload" Component={Upload}/>
            <Route path="/mylistings" Component={MyListings}/>
          </Routes>
        </div>
        {isHome? <LabelBottomNavigation/> : ""}
      </Router>
    </HomeContext.Provider>
  )
}

export default App;
