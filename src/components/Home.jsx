import '../styles/Home.css';
import {  useContext, useEffect, useState } from 'react';
import Filter from './navbar/Filter';
import { useGeolocated } from "react-geolocated";
import { HomeContext } from '../App';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { LoadingSkeleton } from './navbar/DrawerDesktop.jsx';
import { useNavigate } from 'react-router-dom';
import Error from './minicomps/error.jsx';

function House({ title, price, type, area, im, pname }) {
    console.log(type);
    const types = { "hfs": "House for sale", "hfr": "House for rent", "rfr": "Room for rent", "lnd": "Land", "fsb": "For sell for businesses", "frb": "For rent for businesses", "app": "Appartment" };
    return (
        <div className="house">
            <img src={im} width="100%" height={160} />
            <span className="housetitle">ETB {price} + 2BEDS</span><br />
            <div className="priceanddistance">
                <span style={{color: "rgb(170, 170, 170", fontSize: "18px"}}>Personal property | Debre Berhan, tebase kebele 07</span>
            </div>
            <div className="priceanddistance">
                <span className="houseprice" style={{ color: "#aaa", borderRadius: "5px" }}>{types[type]}</span>
                <span className="houseprice">{area} sqm </span>
            </div>
        </div>
    )
}
function HomePage() {
    const { Houses, setHouses, setHome, setSelected, setPostion } = useContext(HomeContext);
    let [status, setStatus] = useState("l");
    const navigate = useNavigate();
    useEffect(() => {
        setHome(true);
        async function fetchData() {
            try {
                const querySnapshot = await getDocs(collection(db, "listings"));
                const housesData = querySnapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setHouses(housesData);
                setStatus("s");
            } catch (error) {
                console.error("Error fetching listings: ", error);
                alert(error.message || "An error occurred while fetching listings.");
            }
                    
        }
        fetchData();
    }, []);
    return (
        <div className="sectionsparent">
            <Filter margin={30} setHouses={setHouses} />
            <div className="section">
                <div className="sectionlist">
                    {status == "l" ? (
                        <>
                        <LoadingSkeleton />
                        <LoadingSkeleton />
                        <LoadingSkeleton />
                        <LoadingSkeleton />
                        <LoadingSkeleton />
                        <LoadingSkeleton />
                        </>
                    ) : (
                        status == "e" ? <Error /> :
                        Houses.map((element, i) => {
                        console.log(element);
                        return (
                            <div key={i} onClick={() => {navigate(`/listing/${element.id}`); setSelected(element.id); setPostion([element.lat, element.lng]);}}>
                                <House title={element.title} price={element.price} type={element.type} area={element.area} im={element.im} pname={element.pname}  />
                            </div>
                        )
                        }
                    ))}
                </div>
            </div>
        </div>
    );
}
export { HomePage, House };