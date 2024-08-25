import React, { useState, useEffect } from 'react';
import './Offline.css'; // Import your styles

const OfflineNotification = () => {
    const [isOffline, setIsOffline] = useState(!navigator.onLine);

    const updateOnlineStatus = () => {
        setIsOffline(!navigator.onLine);
    };

    useEffect(() => {
        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);

        // Cleanup event listeners on component unmount
        return () => {
            window.removeEventListener('online', updateOnlineStatus);
            window.removeEventListener('offline', updateOnlineStatus);
        };
    }, []);

    return (
        isOffline && (
            <div className="offline-notification">
                <p>You are offline. Please check your connection.</p>
            </div>
        )
    );
};

export default OfflineNotification;
