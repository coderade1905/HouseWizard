import '../styles/Home.css';
import { Skeleton, Avatar } from '@mui/material';
import { useState, useContext, useEffect } from 'react';
import axios from "axios";
import Filter from './navbar/Filter';
import { useGeolocated } from "react-geolocated";
import { HomeContext } from '../App';

function House({title, price, distance, loading, Type}){
    return(
        <div className="house">
            <Skeleton style={{borderRadius: "5px", marginBottom: "10px"}} variant="rectangular"  width="100%" height={160} sx={{ bgcolor: 'grey.800' }}/>
            {loading? 
            <>
            <Skeleton height={30} sx={{ bgcolor: 'grey.800' }} />
            <Skeleton height={30} sx={{ bgcolor: 'grey.800' }} width="60%" /> 
            </>
            : <>
            <span className="housetitle">{title}</span><br />
            <div className="priceanddistance">
                <span className="houseprice">ETB {price}</span>
                <span className="houseprice">{distance? distance.toFixed(2) + "Miles far" : "Unknown distance"}</span>
            </div>
            <div className="priceanddistance">
                <span className="houseprice" style={{color: "#aaa", borderRadius: "5px"}}>{Type}</span>
                <span className="houseprice">20 m^2 </span>
            </div>
            </>}
        </div>
    )
}
function HomePage(){
    const [loading, setLoading] = useState(false);
    const {Houses, setHouses} = useContext(HomeContext);
    const client = axios.create({
        baseURL: "http://localhost:3000/recommend" 
    });
    useGeolocated({
        positionOptions: {
            enableHighAccuracy: true,
          },
          watchLocationPermissionChange: true,
          watchPosition: true,
        onError: error => {
            console.log(error);
            client.get('/').then((response) => {
                setHouses([]);
                response.data.forEach((element) => {
                    setHouses(prevArr => [...prevArr, {title : element.Title, price: element.Price, distance : element.distance, area : element.Area, lat : element.latitude, lng : element.longitude, Type : element.Type}]);
                    }
                );
            });
        },
        onSuccess: position => {
            let center = {lat: position.coords.latitude, lng: position.coords.longitude}; 
            client.get(`${center["lat"]}/${center["lng"]}`).then((response) => {
                setHouses([]);
                response.data.forEach((element) => {
                    setHouses(prevArr => [...prevArr, {title : element.Title, price: element.Price, distance : element.distance, area : element.Area, lat : element.latitude, lng : element.longitude, Type : element.Type}]);
                    }
                );
            });
        }
    });
    return (
        <div className="sectionsparent">
            <Filter margin={30} />
            <div className="section">
                <div className="sectionlist">
                    {Houses.map((element, i) => {
                        return(
                            <House key={i} title={element.title}  price={element.price} distance={element.distance} loading={loading}/>
                        )
                    })}
                    <House title="Blah blah blah"  price={2000} distance={25} loading={loading}/>
                    <House title="Blah blah blah" price={2000} distance={25} loading={loading}/>
                    <House title="Blah blah blah" price={2000} distance={25} loading={loading}/>
                    <House title="Blah blah blah" price={2000} distance={25} loading={loading}/>
                    <House title="Blah blah blah" price={2000} distance={25} loading={loading}/>
                    <House title="Blah blah blah" price={2000} distance={25} loading={loading}/>
                </div>
            </div>
        </div>
    );
}
export  {HomePage, House};