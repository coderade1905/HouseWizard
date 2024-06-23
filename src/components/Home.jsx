import '../styles/Home.css';
import { Skeleton, Avatar } from '@mui/material';
import { useState, useContext, useEffect } from 'react';
import Filter from './navbar/Filter';
import { useGeolocated } from "react-geolocated";
import { HomeContext } from '../App';
import { collection, query, orderBy, startAt, endAt, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { LoadingSkeleton } from './navbar/DrawerDesktop.jsx';
import { useNavigate } from 'react-router-dom';

function House({ title, price, type, area, im, pname }) {
    console.log(type);
    const types = { "hfs": "House for sale", "hfr": "House for rent", "rfr": "Room for rent", "lnd": "Land", "fsb": "For sell for businesses", "frb": "For rent for businesses", "app": "Appartment" };
    return (
        <div className="house">
            <img src={im} width="100%" height={160} />
            <span className="housetitle">{title}</span><br />
            <div className="priceanddistance">
                <span className="houseprice">ETB {price}</span>
                <span className="houseprice">{types[type]}</span>
            </div>
            <div className="priceanddistance">
                <span className="houseprice" style={{ color: "#aaa", borderRadius: "5px" }}>By: {pname}</span>
                <span className="houseprice">{area} m^2 </span>
            </div>
        </div>
    )
}
function HomePage() {
    const [loading, setLoading] = useState(false);
    const { Houses, setHouses, setHome, setOpen, setPlaceInfo, selected, setSelected, position, setPostion } = useContext(HomeContext);
    const navigate = useNavigate();
    useEffect(() => {
        setHome(true);
        async function fetchData() {
            const querySnapshot = await getDocs(collection(db, "listings"));
            setHouses([]);
            querySnapshot.forEach((doc) => {
                let res = doc.data().data;
                setHouses((prev) => [...prev, { title: res.title, price: res.price, type: res.type, area: res.area, im: res.im, pname: res.pname, lat: res.lat, lng: res.lng, description: res.description, id : doc.id, pemail: res.pemail }])
            });
        }
        fetchData();
    }, []);
    useGeolocated({
        positionOptions: {
            enableHighAccuracy: true,
        },
        watchLocationPermissionChange: true,
        watchPosition: true,
        onError: error => {
            console.log(error);
        },
        onSuccess: async (position) => {
            let center = [position.coords.latitude, position.coords.longitude];
        }
    });
    return (
        <div className="sectionsparent">
            <Filter margin={30} />
            <div className="section">
                <div className="sectionlist">
                    {Houses.length === 0 ? (
                        <>
                        <LoadingSkeleton />
                        <LoadingSkeleton />
                        <LoadingSkeleton />
                        <LoadingSkeleton />
                        <LoadingSkeleton />
                        <LoadingSkeleton />
                        </>
                    ) : (Houses.map((element, i) => {
                        console.log(element);
                        return (
                            <div key={i} onClick={() => {navigate(`/listing/${element.id}`); setSelected(element.id); setPostion([element.lat, element.lng]);}}>
                                <House title={element.title} price={element.price} type={element.type} area={element.area} im={element.im} pname={element.pname}  />
                            </div>
                        )
                    }))}
                </div>
            </div>
        </div>
    );
}
export { HomePage, House };