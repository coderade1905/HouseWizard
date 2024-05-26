import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Skeleton from '@mui/joy/Skeleton';
import Typography from '@mui/joy/Typography';
import '../styles/ViewInDetail.css';
import Cloud from '@mui/icons-material/Cloud';
import Sun from '@mui/icons-material/LightMode';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import { KeyboardArrowLeft } from "@mui/icons-material";

function ViewInDetail() {
    return (
        <div style={{ overflowY: "scroll", height: "calc(100vh - 60px)" }}>
            <div className="header">
                <KeyboardArrowLeft style={{ fontSize: "45px", color: "white" }} />
            </div>
            <div className='view-in-detail'>
                <AspectRatio ratio="21/9">
                    <Skeleton animation="wave" variant="overlay" sx={{ borderRadius: "10px" }}>
                        <img
                            alt=""
                            src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                        />
                    </Skeleton>
                </AspectRatio>
                <Typography sx={{ overflow: 'hidden', fontSize: '30px', marginTop: "20px" }}>
                    <Skeleton animation="wave">
                        New home 5min walk from DBU
                    </Skeleton>
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', rowGap: "10px", alignItems: 'center', marginTop: "20px" }}>
                    <Chip variant="soft" startDecorator={<Sun />}>
                        Today is sunny
                    </Chip>
                    <Chip variant="soft" startDecorator={<Cloud />}>
                        Tomorrow is cloudy
                    </Chip>
                    <Chip variant="soft" startDecorator={<Sun />}>
                        Today is sunny
                    </Chip>
                </Box>
                <div className="description">
                    <Typography variant="h6">Description</Typography>
                </div>
            </div>
        </div>
    )
}

export default ViewInDetail;