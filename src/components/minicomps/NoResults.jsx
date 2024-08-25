import React from 'react';
import './NoResults.css'; // Import your styles

const NoResults = () => {
    return (
        <div className="no-results">
            <h2>No results found</h2>
            <p>Try checking your spelling or use different keywords.</p>
        </div>
    );
};

export default NoResults;
