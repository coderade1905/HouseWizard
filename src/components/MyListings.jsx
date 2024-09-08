import { useState, useEffect, useContext } from "react";
import supabase from '../supabase.js';
import Button from '@mui/joy/Button';
import { House } from "./Home";
import AlertDialogModal from "./Alert";
import { useNavigate } from "react-router-dom";
import NoResults from './minicomps/NoResults.jsx';
import { HomeContext } from '../App';
import { LoadingSkeleton } from './navbar/DrawerDesktop.jsx';
import translation from './translation/translation.js';

function MyListings() {
    const [listing, setListing] = useState([]);
    const [open, setOpen] = useState(false);
    const [id, setId] = useState("");
    const [deleted, setDeleted] = useState(0);
    const navigate = useNavigate();
    const { types, loading, setLoading, language } = useContext(HomeContext);
    useEffect(() => {
        const fetchListings = async () => {
            const { data: user } = await supabase.auth.getUser()
            setLoading(true);
            if (user) {
                const { data, error } = await supabase
                    .rpc('get_filtered_listings', { user_id_inp: user.user.id });

                if (error) {
                    console.error('Error fetching filtered listings:', error);
                } else {
                    setListing(data);
                    setLoading(false);
                }
            }
        };

        fetchListings();
    }, [deleted]);
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
    if (listing.length == 0) {
        return (
            <>
                <NoResults />
            </>
        )
    }
    return (
        <div>
            <AlertDialogModal open={open} setOpen={setOpen} id={id} setDeleted={setDeleted} />
            <h1 style={{ color: "white", marginTop: "30px", marginLeft: "30px" }}>{translation[language]['mls']}</h1>
            <div className="sectionlist">
                {
                    listing.map((element, i) => {
                        return (
                            <div style={{ display: "grid", placeItems: "center" }} key={i}>
                                <House data={element} types={types} language={language} />
                                <Button onClick={() => { setOpen(!open); setId(element.id); }} size="md" color="danger" style={{ height: "40px", width: "90%" }}>
                                    {translation[language]['del']}
                                </Button>
                                <Button onClick={() => { navigate(`/editlisting/${element.id}`) }} size="md" style={{ height: "40px", width: "90%", marginTop: "10px" }}>
                                    {translation[language]['edt']}
                                </Button>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default MyListings;
