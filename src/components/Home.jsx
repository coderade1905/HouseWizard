import '../styles/Home.css';
import {  useContext, useEffect, useState } from 'react';
import Filter from './navbar/Filter';
import { HomeContext } from '../App';
import supabase from '../supabase.js';
import { LoadingSkeleton } from './navbar/DrawerDesktop.jsx';
import { useNavigate } from 'react-router-dom';
import NoResults from './minicomps/NoResults.jsx';
import PullToRefresh from 'react-simple-pull-to-refresh';

function House({data}) {
    const types = { "hfs": "House for sale", "hfr": "House for rent", "rfr": "Room for rent", "lnd": "Land", "fsb": "For sell for businesses", "frb": "For rent for businesses", "app": "Appartment" };
    return (
        <div className="house">
            <img src={data.im[0]} width="100%" height={160} />
            <span className="housetitle">ETB {data.price} + {data.area} SQM</span><br />
            <div className="priceanddistance">
                <span style={{color: "rgb(170, 170, 170", fontSize: "18px"}}>{data.location}</span>
            </div>
            <div className="priceanddistance">
                <span className="houseprice" style={{ color: "#aaa", borderRadius: "5px" }}>{types[data.type]}</span>
                <span className="houseprice">{data.area} sqm </span>
            </div>
        </div>
    )
}
function HomePage() {
    const { loading, setLoading, Houses, setHouses, setHome, setSelected, setPostion, setMap } = useContext(HomeContext);
    const fetchData = async () => {
        setLoading(true);
        let { data, error } = await supabase
          .from('listings')
          .select('*, user_info (*)');
        if (error) {
          console.error('Error fetching data:', error);
          return;
        }
        setHouses(data);
        setLoading(false);
        console.log(data);
      }
    const navigate = useNavigate();
    useEffect(() => {  
      fetchData();
    }, []);
    return (
        <PullToRefresh onRefresh={fetchData}>
            <div className="sectionsparent">
                <Filter margin={30} setHouses={setHouses} />
                <div className="section">
                    <div className="sectionlist">
                        {loading ? (
                            <>
                            <LoadingSkeleton />
                            <LoadingSkeleton />
                            <LoadingSkeleton />
                            <LoadingSkeleton />
                            <LoadingSkeleton />
                            <LoadingSkeleton />
                            </>
                        ) : (
                            Houses.length == 0 ? <NoResults /> :
                            Houses.map((element, i) => {
                            console.log(element);
                            return (
                                <div style={{display: "flex", justifyContent: "center"}} key={i} onClick={() => {navigate(`/listing/${element.id}`); setSelected(element.id); setPostion([element.lat, element.lng]); setMap(true)}}>
                                    <House data={element}  />
                                </div>
                            )
                            }
                        ))}
                    </div>
                </div>
            </div>
        </PullToRefresh>
    );
}
export { HomePage, House };