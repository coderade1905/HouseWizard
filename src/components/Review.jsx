
import Typography from "@mui/material/Typography";
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import { useContext, useState } from 'react';
import { HomeContext } from "../App";
import translation from './translation/translation.js';

function Info() {
    const { data, language } = useContext(HomeContext);
    function translate(key) {
        return translation[language][key] || key;
    }
    
    return (
        <div className="inputs">
            <FormControl>
                <FormLabel>{translation[language]['typ']}</FormLabel>
                <Input style={{ color: "#fff" }} disabled={true} className="input" value={translation[language][data.type]} />
            </FormControl>
            <FormControl style={{ display: (data.bednum > 0 ? "flex" : "none") }} >
                <FormLabel>{translation[language]['bednum']}</FormLabel>
                <Input style={{ color: "#fff" }} disabled={true} className="input" value={data.bednum} />
            </FormControl>
            <FormControl>
                <FormLabel>{translation[language]['ar']}</FormLabel>
                <Input style={{ color: "#fff" }} disabled={true} className="input" value={data.area} />
            </FormControl>
            <FormControl >
                <FormLabel>{translation[language]['pr']}</FormLabel>
                <Input style={{ color: "#fff" }} disabled={true} className="input" value={data.price} />
            </FormControl>
            <FormControl >
                <FormLabel>{translation[language]['desc']}</FormLabel>
                <Input style={{ color: "#fff" }} disabled={true} className="input" value={data.description} />
            </FormControl>
            <FormControl style={{ display: (data.extras.length > 0 ? "flex" : "none") }} >
                <FormLabel>{translation[language]['amen']}</FormLabel>
                <Input style={{ color: "#fff" }} disabled={true} className="input" value={data.extras.map(translate).join(",")} />
            </FormControl>
            <FormControl >
                <FormLabel>{translation[language]['loc']}</FormLabel>
                <Input style={{ color: "#fff" }} disabled={true} className="input" value={data.location} />
            </FormControl>
            <FormControl >
                <FormLabel>({translation[language]['lat']}, {translation[language]['loc']})</FormLabel>
                <Input style={{ color: "#fff" }} disabled={true} className="input" value={`(${data.lat}, ${data.lng})`} />
            </FormControl>
            <FormControl style={{ display: (data.youtube != "" ? "flex" : "none") }}>
                <FormLabel>{translation[language]['ytv']}</FormLabel>
                <Input style={{ color: "#fff" }} disabled={true} className="input" value={data.youtube} />
            </FormControl>
            <FormControl style={{ display: (data.im.length > 0 ? "block" : "none") }}>
                <FormLabel>{translation[language]['imgp']}</FormLabel>
                <Input
                    style={{ color: "#fff" }}
                    disabled={true}
                    className="input"
                    value={data.im.length + " Images Added"}
                />
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "5px", marginTop: "10px" }}>
                    {data.im.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`Selected image ${index + 1}`}
                            style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "5px" }}
                        />
                    ))}
                </div>
            </FormControl>

        </div>
    )
}

function Review() {
    const { language } = useContext(HomeContext);
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
                {translation[language]['rev']}
            </Typography>
            <Info />
        </>
    );
}

export default Review;
