import Typography from "@mui/material/Typography";
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Button from '@mui/joy/Button';
import SvgIcon from '@mui/joy/SvgIcon';
import { useState, useContext } from "react";
import { styled } from '@mui/joy';
import supabase from '../supabase.js';
import { HomeContext } from "../App";
import LoadingOverlay from "./LoadingOverlay.jsx";
import Input from '@mui/joy/Input';
import { v4 as uuidv4 } from 'uuid';
import translation from './translation/translation.js';

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

function Inputs({setFailed}) {
    const { data, setData, loading, setLoading } = useContext(HomeContext);

    const uploadFileToSupabase = async (file, bucketName) => {
        try {
            setLoading(true);
            const fileExtension = file.name.split('.').pop(); // Get the file extension
            const fileName = `${uuidv4()}.${fileExtension}`; // Generate a unique file name
            const { data, error } = await supabase
                .storage
                .from(bucketName)
                .upload(`public/${fileName}`, file);
    
            if (error) {
                console.error('Error uploading file:', error);
                setFailed([true, error])
                return null;
            }
    
            // Correct usage of getPublicUrl method
            const data1 = supabase
                .storage
                .from(bucketName)
                .getPublicUrl(`public/${fileName}`);
            if (data1.error) {
                console.error('Error getting public URL:', urlError);
                setFailed([true, urlError])
                return null;
            }
    
            setLoading(false);
            return data1.data.publicUrl;
        } catch (e) {
            console.error(e.message);
            return null;
        }
    };
    
    

    const handleUpload = async (e) => {
        e.preventDefault();
        const files = Array.from(e.target.files);
        const uploadPromises = files.map(async (file) => {
            const url = await uploadFileToSupabase(file, "HouseWizard");
            return url;
        });
    
        // Wait for all upload promises to resolve
        const urls = await Promise.all(uploadPromises);
    
        // Assuming data.im is meant to be populated with URLs after all uploads are done
        data.im = [...data.im, ...urls.filter(url => url !== null)];
    };
    const { language } = useContext(HomeContext);
    return (
        <div className="inputs">
            <FormControl>
                <FormLabel>{translation[language]['imgp']}</FormLabel>
                <Button
                    component="label"
                    role={undefined}
                    tabIndex={-1}
                    color="primary"
                    className="input"
                    startDecorator={
                        <SvgIcon>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                />
                            </svg>
                        </SvgIcon>
                    }
                >
                    {translation[language]['upf']}
                    <VisuallyHiddenInput multiple type="file" accept="image/*"  onChange={handleUpload} />
                </Button>
                {loading && <FormHelperText>Uploading...</FormHelperText>}
            </FormControl>
            <FormControl>
                <FormLabel>{translation[language]['ytv']}</FormLabel>
                <Input onChange={(e) => {setData({ ...data, youtube: e.target.value })}}  className="input" placeholder="Paste the video link here" />
            </FormControl>
        </div>
        
    );
}

function MediaInfo() {
    const [failed, setFailed] = useState([false, ""]);
    const { language } = useContext(HomeContext);
    const options = {
        startColor: "#fff",
        endColor: "#FF6767",
        direction: "left",
        variant: "h2",
        textAlign: "left"
    };
    return (
        <>
            <LoadingOverlay setFailed={setFailed} failed={failed} />
            <Typography
                variant={options.variant}
                textAlign={options.textAlign}
                sx={{
                    backgroundImage: `linear-gradient(to ${options.direction}, ${options.startColor}, ${options.endColor})`,
                    backgroundSize: "100%",
                    backgroundRepeat: "repeat",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textAlign: "center",
                    marginTop: "30px",
                    fontSize: "35px"
                }}
            >
                {translation[language]['min']}
            </Typography>
            <Inputs setFailed={setFailed} />
        </>
    );
}

export default MediaInfo;
