const getLocation = (setLocation, setNdf) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
        (position) => {
            setLocation([position.coords.latitude, position.coords.longitude])
            setNdf(true);
        },
        (err) => {
            setLocation([9.0317, 38.7433]);
            setNdf(false);
        }
        );
    } else {
        setLocation([9.0317, 38.7433]);
        setNdf(false);
    }
};

export default getLocation;
