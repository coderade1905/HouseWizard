import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { HomeContext } from "../App";
import { useState, useContext } from "react";

const LoadingOverlay = (props) => {
  const { loading } = useContext(HomeContext);
    return (
      <div className="loading" style={{display: loading ? "flex" : "none"}}>
        <div className="loading-spinner">
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', placeItems: 'center' }}>
            {props.failed ? 
            <>
              <CircularProgress sx={{ color: '#FF5733' }} />
              <h5 style={{color: "#fff"}}>Uploading... please wait</h5>
            </>
             : 
             <h1>Failed</h1>
             }
        </Box>
        </div>
      </div>
    );
  };
  
export default LoadingOverlay;
  