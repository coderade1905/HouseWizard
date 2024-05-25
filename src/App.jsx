import './App.css'
import { BrowserRouter as Router, Route, Routes, BrowserRouter} from "react-router-dom";
import {HomePage} from './components/Home.jsx';
import PrimarySearchAppBar from './components/navbar/NavBarDesktop.jsx';
import LabelBottomNavigation from './components/navbar/MobileNavigation.jsx';
import AddListing from './components/AddListing.jsx';
import VMap from './components/Map.jsx';
import { useState, createContext } from "react";
import ChatUI from './components/Messages.jsx';

export const HomeContext = createContext();

function App() {
  const [map, setMap] = useState(false);
  const [isHome, setHome] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [placeInfo, setPlaceInfo] = useState({title: "Place Title", price : "0"});
  const [Houses, setHouses] = useState([]);
  const [open, setOpen] = useState(false);
  return (
    <HomeContext.Provider value={{map, setMap, setHome, placeInfo, setPlaceInfo, Houses, setHouses, showSidebar, setShowSidebar, open, setOpen}}>
      <Router>  
        <PrimarySearchAppBar />
        <div className="parent">
          <Routes>
            <Route exact path="/" Component={HomePage}/>
            <Route path="/map" Component={VMap}/>
            <Route path="/chat" Component={ChatUI}/>
            <Route path="/add" Component={AddListing}/>
          </Routes>
        </div>
        {isHome? <LabelBottomNavigation/> : ""}
      </Router>
    </HomeContext.Provider>
  )
}

export default App;
