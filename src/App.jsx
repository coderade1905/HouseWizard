import './App.css'
import { BrowserRouter as Router, Route, Routes, BrowserRouter} from "react-router-dom";
import {HomePage} from './components/Home.jsx';
import PrimarySearchAppBar from './components/navbar/NavBarDesktop.jsx';
import LabelBottomNavigation from './components/navbar/MobileNavigation.jsx';
import VMap from './components/Map.jsx';
import { useState, createContext } from "react";

export const HomeContext = createContext();

function App() {
  const [map, setMap] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [placeInfo, setPlaceInfo] = useState({title: "Place Title", price : "0"});
  const [Houses, setHouses] = useState([]);
  const [open, setOpen] = useState(false);
  return (
    <HomeContext.Provider value={{map, setMap, placeInfo, setPlaceInfo, Houses, setHouses, showSidebar, setShowSidebar, open, setOpen}}>
      <Router>  
        <PrimarySearchAppBar />
        <div className="parent">
          <Routes>
            <Route exact path="/" Component={HomePage}/>
            <Route path="/map" Component={VMap}/>
          </Routes>
        </div>
        {map? "" : <LabelBottomNavigation/>}
      </Router>
    </HomeContext.Provider>
  )
}

export default App;
