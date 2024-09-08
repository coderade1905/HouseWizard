import Typography from "@mui/material/Typography";
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import {Textarea} from "@mui/joy";
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { useContext, useState } from 'react';
import { HomeContext } from "../App";
import translation from './translation/translation.js';


function TypeSelect({ values, setValues, active, setActive, setData }) {
    const { language } = useContext(HomeContext);
    const handleChange = (event, newValue) => {
        setValues({ bednum: 0, type: newValue, area: 0, price: 0, description: "", extras: [], lng: "", lat: "", im : [], geo: "", location : "", youtube : "", user_id: ''});
        switch (newValue) {
            case "rfr":
                setActive({bednum: true, area: false, price: false, description: false, extras: false})
                break;
            case "lnd":
                setActive({bednum: true, area: false, price: false, description: false, extras: true})
                break;
            case "fsb":
                setActive({bednum: true, area: false, price: false, description: false, extras: false})
                break;
            case "frb":
                setActive({bednum: true, area: false, price: false, description: false, extras: false})
                break;
            default:
                setActive({bednum: false, area: false, price: false, description: false, extras: false})
                break;
        }
    };
    return (
        <Select
            className="input"
            placeholder={translation[language]['top']}
            value={values.type}
            onChange={handleChange}
            indicator={<KeyboardArrowDown />}
            >
            <Option value="hfs">{translation[language]['hfs']}</Option>
            <Option value="hfr">{translation[language]['hfr']}</Option>
            <Option value="rfr">{translation[language]['rfr']}</Option>
            <Option value="lnd">{translation[language]['lnd']}</Option>
            <Option value="fsb">{translation[language]['fsb']}</Option>
            <Option value="frb">{translation[language]['frb']}</Option>
            <Option value="app">{translation[language]['app']}</Option>
        </Select>
    );
}

function SelectMultiple({ values, setValues, disabled }) {
    const { language } = useContext(HomeContext);
    const handleChange = (event, newValue) => {
        setValues({...values, extras: newValue});
    };
    return (
        <Select
            className="input"
            value={values.extras}
            disabled={disabled}
            multiple
            onChange={handleChange}
            sx={{
                minWidth: '13rem',
                color: '#fff !important'
            }}
            slotProps={{
                listbox: {
                    sx: {
                        width: '100%',
                    },
                },
            }}
        >
            <Option value="wifi">{translation[language]['wifi']}</Option>
            <Option value="kitchen">{translation[language]['kitchen']}</Option>
            <Option value="tv">{translation[language]['tv']}</Option>
            <Option value="parking">{translation[language]['parking']}</Option>
            <Option value="heating">{translation[language]['heating']}</Option>
        </Select>
    );
}

function Inputs(props) {
    const { data, setData, errors, language } = useContext(HomeContext);
    const pmo =  ["hfr", "rfr", "frb"];
    return (
        <div className="inputs">
            <FormControl>
                <FormLabel>{translation[language]['typ']}</FormLabel>
                <TypeSelect className="input" values={data} setValues={setData} active={props.active} setActive={props.setActive} />
                <FormHelperText>{errors.tyerror}</FormHelperText>
            </FormControl>
            <FormControl style={{display: props.active.bednum ? "none" : "block"}}>
                <FormLabel>{translation[language]['bdnum']}</FormLabel>
                <Input disabled={props.active.bednum}  className="input" type="number" placeholder={translation[language]['bdnum']} value={data.bednum === 0 ? '' : data.bednum} onChange={(e) => {if (Number(e.target.value) < 0) {return } else{setData({ ...data, bednum: Number(e.target.value) })}}} />
                <FormHelperText>{errors.bderror}</FormHelperText>
            </FormControl>
            <FormControl style={{display: props.active.area ? "none" : "block"}}>
                <FormLabel>{translation[language]['ar']}</FormLabel>
                <Input disabled={props.active.area} className="input" value={data.area === 0 ? '' : data.area}  onChange={(e) => {if (Number(e.target.value) < 0) {return } else{setData({ ...data, area: Number(e.target.value) })}}} type="number" startDecorator={translation[language]['sqm']} placeholder={translation[language]['ar']} />
                <FormHelperText>{errors.aerror}</FormHelperText>
            </FormControl>
            <FormControl style={{display: props.active.price ? "none" : "block"}}>
                <FormLabel>{translation[language]['pr']} {pmo.includes(data.type) ? translation[language]['pmo'] : ""}</FormLabel>
                <Input disabled={props.active.price} className="input" value={data.price === 0 ? '' : data.price}  onChange={(e) => {if (Number(e.target.value) < 0) {return } else{setData({ ...data, price: Number(e.target.value) })}}} type="number" startDecorator={translation[language]['etb']} placeholder={translation[language]['pr']} />
                <FormHelperText>{errors.perror}</FormHelperText>
            </FormControl>
            <FormControl style={{display: props.active.description ? "none" : "block"}}>
                <FormLabel>{translation[language]['desc']}</FormLabel>
                <Textarea disabled={props.active.description} className="input" value={data.description} onChange={(e) => { setData({ ...data, description: e.target.value }) }} placeholder={translation[language]['desc']} />
                <FormHelperText>{errors.derror}</FormHelperText>
            </FormControl>
            <FormControl style={{display: props.active.extras ? "none" : "block"}}>
                <FormLabel>{translation[language]['amen']}</FormLabel>
                <SelectMultiple disabled={props.active.extras} className="input" values={data} setValues={setData} />
                <FormHelperText>{errors.exerror}</FormHelperText>
            </FormControl>
        </div>
    )
}

function BasicInfo({active, setActive}) {
    let options = {
        startColor: "#fff",
        endColor: "#FF6767",
        direction: "left",
        variant: "h2",
        textAlign: "left"
    };
    const { language } = useContext(HomeContext);
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
                {translation[language]['adb']}
            </Typography>
            <Inputs active={active} setActive={setActive} />
        </>
    );
}

export default BasicInfo;