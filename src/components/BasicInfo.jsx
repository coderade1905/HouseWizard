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


function TypeSelect({ values, setValues, active, setActive }) {
    const handleChange = (event, newValue) => {
        setValues({...values, type: newValue});
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
            placeholder="Type of property"
            value={values.type}
            onChange={handleChange}
            indicator={<KeyboardArrowDown />}
            >
            <Option value="hfs">House for sale</Option>
            <Option value="hfr">House for rent</Option>
            <Option value="rfr">Room for rent</Option>
            <Option value="lnd">Land</Option>
            <Option value="fsb">For sell for businesses</Option>
            <Option value="frb">For rent for businesses</Option>
            <Option value="app">Appartment</Option>
        </Select>
    );
}

function SelectMultiple({ values, setValues, disabled }) {
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
            <Option value="wifi">Wifi</Option>
            <Option value="kitchen">Kitchen</Option>
            <Option value="tv">TV</Option>
            <Option value="parking">Parking</Option>
            <Option value="heating">Heating</Option>
        </Select>
    );
}

function Inputs(props) {
    const { data, setData, errors } = useContext(HomeContext);
    return (
        <div className="inputs">
            <FormControl>
                <FormLabel>Type</FormLabel>
                <TypeSelect className="input" values={data} setValues={setData} active={props.active} setActive={props.setActive} />
                <FormHelperText>{errors.tyerror}</FormHelperText>
            </FormControl>
            <FormControl style={{display: props.active.bednum ? "none" : "block"}}>
                <FormLabel>Bed Number</FormLabel>
                <Input disabled={props.active.bednum} className="input" type="number" placeholder="Bed Number" value={data.bednum} onChange={(e) => {if (Number(e.target.value) < 0) {return } else{setData({ ...data, bednum: Number(e.target.value) })}}} />
                <FormHelperText>{errors.bderror}</FormHelperText>
            </FormControl>
            <FormControl style={{display: props.active.area ? "none" : "block"}}>
                <FormLabel>Area</FormLabel>
                <Input disabled={props.active.area} className="input" value={data.area} onChange={(e) => {if (Number(e.target.value) < 0) {return } else{setData({ ...data, area: Number(e.target.value) })}}} type="number" startDecorator="sqm" placeholder="Area" />
                <FormHelperText>{errors.aerror}</FormHelperText>
            </FormControl>
            <FormControl style={{display: props.active.price ? "none" : "block"}}>
                <FormLabel>Price</FormLabel>
                <Input disabled={props.active.price} className="input" value={data.price} onChange={(e) => {if (Number(e.target.value) < 0) {return } else{setData({ ...data, price: Number(e.target.value) })}}} type="number" startDecorator="ETB" placeholder="Price" />
                <FormHelperText>{errors.perror}</FormHelperText>
            </FormControl>
            <FormControl style={{display: props.active.description ? "none" : "block"}}>
                <FormLabel>Description</FormLabel>
                <Textarea disabled={props.active.description} className="input" value={data.description} onChange={(e) => { setData({ ...data, description: e.target.value }) }} placeholder="Description" />
                <FormHelperText>{errors.derror}</FormHelperText>
            </FormControl>
            <FormControl style={{display: props.active.extras ? "none" : "block"}}>
                <FormLabel>Extras</FormLabel>
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
                Step 1: Add Basic Information
            </Typography>
            <Inputs active={active} setActive={setActive} />
        </>
    );
}

export default BasicInfo;