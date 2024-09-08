import '../styles/Home.css';
import { useContext, useEffect, useState } from 'react';
import DrawerFilters from './navbar/Filter';
import { HomeContext } from '../App';
import supabase from '../supabase.js';
import { LoadingSkeleton } from './navbar/DrawerDesktop.jsx';
import { useNavigate } from 'react-router-dom';
import NoResults from './minicomps/NoResults.jsx';
import PullToRefresh from 'react-simple-pull-to-refresh';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import translation from './translation/translation.js';

function House({ data, types, language }) {
    if (!language) {
        language = "en";
    }
    const formattedDate = new Date(data.created_at).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour12: true,
    });
    return (
        <div className="house">
            <img src={data?.im.length > 0 ? data?.im[0] : "https://img.freepik.com/free-photo/blue-house-with-blue-roof-sky-background_1340-25953.jpg"} width="100%" height={160} style={{ objectFit: 'contain', background: "#000" }} />
            <span className="housetitle">{translation[language]['etb']} {data.price} + {data.area} {translation[language]['sqm']} </span><br />
            <div className="priceanddistance">
                <span style={{ color: "rgb(170, 170, 170", fontSize: "18px" }}>{data.location}</span>
            </div>
            <div className="priceanddistance">
                <span className="houseprice" style={{ color: "#aaa", borderRadius: "5px" }}>{translation[language]['types'][data.type]}</span>
                <span className="houseprice">{formattedDate}</span>
            </div>
        </div>
    )
}
function HomePage() {
    const { loading, setLoading, Houses, setHouses, types, setPostion, map, position, ndf, language, setNdf, type, price, area, bednum } = useContext(HomeContext);
    const [count, setCount] = useState(1);
    const roundToDecimal = (value, decimals) => {
        if (isNaN(value) || isNaN(decimals)) {
            return 0; // or any default value you'd like to return in case of invalid input
        }
        let multiplier = Math.pow(10, decimals);
        return Math.round(value * multiplier) / multiplier;
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
    const fetchData = async (page, pageSize) => {
        let filtertype = ["hfs", "hfr", "rfr", "lnd", "fsb", "frb", "app"];
        setHouses([]);
        setLoading(true);
        if (type.length > 0) {
            filtertype = [];
            type.map((element) => {
                filtertype.push(types1[element]);
            })
        }
        const start = (page - 1) * pageSize;
        const end = start + pageSize - 1;
        if (ndf) {
            let query = supabase.rpc('nearby_listings', { p_lat: position[0], p_lng: position[1] }).range(start, end);
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
                console.error('Error fetching data:', error);
                return;
            }
            if (data.length > 0) {
                setCount(data[0].total_count);
                setHouses(data);
            }
        }
        else {
            let query = supabase
                .rpc('random_ordered_listings', { start: start, limit_end: end });
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
                console.error('Error fetching data:', error);
            }
            if (data?.data?.length > 0) {
                setCount(data?.total_count);
                setHouses(data?.data);
            }
        }
        setLoading(false);
    }
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const pageSize = 20;
    useEffect(() => {
        fetchData(page, pageSize);
    }, [page, ndf, map]);
    const Refresh = () => {
        fetchData(page, pageSize);
    }
    const nextPage = () => setPage((prevPage) => prevPage + 1);
    const prevPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));
    if (loading) {
        return (
            <div className="sectionlist">
                <LoadingSkeleton />
                <LoadingSkeleton />
                <LoadingSkeleton />
                <LoadingSkeleton />
                <LoadingSkeleton />
                <LoadingSkeleton />
            </div>
        )
    }
    if (Houses.length == 0) {
        return (
            <PullToRefresh onRefresh={Refresh}>
                <div className="sectionsparent">
                    <DrawerFilters margin={30} fetchData={fetchData} page={page} pageSize={pageSize} />
                    <NoResults />
                </div>
            </PullToRefresh>
        )
    }
    return (
        <PullToRefresh onRefresh={Refresh}>
            <div className="sectionsparent">
                <DrawerFilters margin={30} fetchData={fetchData} page={page} pageSize={pageSize} />
                <h2 style={{ marginTop: "15px", marginBottom: "10px", fontSize: "30px" }}>{ndf ? translation[language]['sbl'] : "Ordered randomly (give location access to order by distance)"}</h2>
                <div className="section">
                    <div className="sectionlist">
                        {
                            Houses.map((element, i) => {
                                return (
                                    <div style={{ display: "grid", placeItems: "center", gridTemplateColumns: "1fr" }} key={i} onClick={() => { setPostion([element.lat, element.lng]); navigate(`/listing/${element.id}`) }}>
                                        <House language={language} data={element} types={types} />
                                        {ndf ? <span style={{ color: "#fff", fontSize: "20px" }}>{roundToDecimal(element.dist_meters / 1000, 2)} {translation[language]['kmf']}</span> : ""}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="pagination-buttons">
                    <button onClick={prevPage} disabled={page === 1}>
                        <ArrowBackIosIcon />
                    </button>
                    <span>{translation[language]['pge']} {page} {translation[language]['of']} {Math.ceil(count / pageSize)}</span>
                    <button onClick={nextPage} disabled={page === Math.ceil(count / pageSize)}>
                        <ArrowForwardIosIcon />
                    </button>
                </div>
            </div>
        </PullToRefresh>
    );
}
export { HomePage, House };