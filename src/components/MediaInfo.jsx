import Typography from "@mui/material/Typography";
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import SvgIcon from '@mui/joy/SvgIcon';
import { useState } from "react";
import { styled } from '@mui/joy';
import { storage } from '../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useContext } from 'react';
import { HomeContext } from "../App";

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

function Inputs() {
    const [progresspercent, setProgresspercent] = useState(0);
    const [progresspercent1, setProgresspercent1] = useState(0);
    const { data, setData, errors } = useContext(HomeContext);
    const handleUpload = (e) => {
        e.preventDefault()
        const files = e.target.files;
        files.map((file) => {
            const storageRef = ref(storage, `files/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
    
            uploadTask.on("state_changed",
            (snapshot) => {
                const progress =
                Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgresspercent(progress);
            },
            (error) => {
                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setData({ ...data, im: downloadURL })
                });
            }
            );
        })
    }
    const handleUpload1 = (e) => {
        e.preventDefault()
        const file = e.target.files[0];
        const storageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on("state_changed",
        (snapshot) => {
            const progress =
            Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgresspercent1(progress);
        },
        (error) => {
            alert(error);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setData({ ...data, pl: downloadURL })
            });
        }
        );
    }
    return (
        <div className="inputs">
            <FormControl>
                <FormLabel>Exterior & Interior Images</FormLabel>
                <Button
                    component="label"
                    onChange={handleUpload}
                    role={undefined}
                    tabIndex={-1}
                    color="primary"
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
                    Upload a file
                    <VisuallyHiddenInput multiple type="file" />
                </Button>
                <FormHelperText>{`${progresspercent}%`}</FormHelperText>
            </FormControl>
            <FormControl>
                <FormLabel>House Plan Images</FormLabel>
                <Button
                    component="label"
                    role={undefined}
                    tabIndex={-1}
                    color="primary"
                    onChange={handleUpload1}
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
                    Upload a file
                    <VisuallyHiddenInput type="file" />
                </Button>
                <FormHelperText>{`${progresspercent1}%`}</FormHelperText>
            </FormControl>
        </div>
    )
}

function MediaInfo() {
    let options = {
        startColor: "#fff",
        endColor: "#FF6767",
        direction: "left",
        variant: "h2",
        textAlign: "left"
    };
    return (
        <>
            <Typography
                variant={options.variant}
                textAlign={options.textAlign}
                sx={{
                    backgroundImage: `linear-gradient( to ${options.direction}, ${options.startColor}, ${options.endColor})`,
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
                Step 3: Add Media Information
            </Typography>
            <Inputs />
        </>
    );
}

export default MediaInfo;