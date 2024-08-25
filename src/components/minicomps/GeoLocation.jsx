const getLocation = (setLocation) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
        (position) => {
            setLocation([position.coords.latitude, position.coords.longitude])
        },
        (err) => {
            setLocation([9.0317, 38.7433]);
        }
        );
    } else {
        setLocation([9.0317, 38.7433]);
    }
};

export default getLocation;
