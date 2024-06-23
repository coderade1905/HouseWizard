import { useState, useEffect } from "react";
import { collection, query, orderBy, startAt, endAt, getDocs, where } from 'firebase/firestore';
import { db } from '../firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Button from '@mui/joy/Button';
import { House } from "./Home";
import AlertDialogModal from "./Alert";
import { useNavigate } from "react-router-dom";

function MyListings() {
    const [listing, setListing] = useState([]);
    const [open, setOpen] = useState(false);
    const [id, setId] = useState("");
    const [deleted, setDeleted] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        const auth = getAuth();
        auth.authStateReady().then(() => {
            const user = auth.currentUser;
            if (user) {
                async function fetchData() {
                    const querySnapshot = await getDocs(query(collection(db, "listings"), where("data.pemail", "==", user.email)));
                    setListing([]);
                    querySnapshot.forEach((doc) => {
                        let res = doc.data().data;
                        setListing((prev) => [...prev, { title: res.title, price: res.price, type: res.type, area: res.area, im: res.im, pname: res.pname, lat: res.lat, lng: res.lng, description: res.description, id: doc.id }])
                    });
                }
                fetchData();
            }
        });
    }, [deleted]);
    return (
        <div>
            <AlertDialogModal open={open} setOpen={setOpen} id={id} setDeleted={setDeleted} />
            <h1 style={{ color: "white", marginTop: "30px", marginLeft: "30px" }}>My Listings</h1>
            {
                listing.map(((element, i) => {
                    console.log(element);
                    return (
                        <div key={i} style={{display: "flex", justifyContent: "space-around"}}>
                            <div  onClick={() => {navigate(`/listing/${element.id}`)}}>
                                <House title={element.title} price={element.price} type={element.type} area={element.area} im={element.im} pname={element.pname}  />
                            </div>
                            <div style={{display: "flex", alignItems: "center"}}>
                                <Button onClick={() => {setOpen(!open), setId(element.id)}} size="md" color="danger" style={{width: "200px", height: "60px"}} >
                                    Delete this listing
                                </Button>
                            </div>
                        </div>
                    );
                }))
            }
        </div>
    );
}

export default MyListings;