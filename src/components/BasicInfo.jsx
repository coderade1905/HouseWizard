import Typography from "@mui/material/Typography";
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { Box, Chip } from '@mui/joy';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { useContext } from 'react';
import { HomeContext } from "../App";


function TypeSelect({ values, setValues }) {
    const handleChange = (event, newValue) => {
        setValues({...values, type: newValue});
    };
    return (
        <Select
            placeholder="Type of property"
            value={values.type}
            onChange={handleChange}
            indicator={<KeyboardArrowDown />}
            sx={{
                width: 200
            }}
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

function SelectMultiple({ values, setValues }) {
    const handleChange = (event, newValue) => {
        setValues({...values, extras: newValue});
    };
    return (
        <Select
            value={values.extras}
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

function Inputs() {
    const { data, setData, errors } = useContext(HomeContext);
    return (
        <div className="inputs">
            <FormControl>
                <FormLabel>Title</FormLabel>
                <Input placeholder="Title" defaultValue={data.title} onChange={(e) => { setData({ ...data, title: e.target.value }) }} />
                <FormHelperText>{errors.tierror}</FormHelperText>
            </FormControl>
            <FormControl>
                <FormLabel>Area</FormLabel>
                <Input value={data.area} onChange={(e) => { setData({ ...data, area: e.target.value }) }} type="number" startDecorator="sqm" placeholder="Area" />
                <FormHelperText>{errors.aerror}</FormHelperText>
            </FormControl>
            <FormControl>
                <FormLabel>Type</FormLabel>
                <TypeSelect values={data} setValues={setData} />
                <FormHelperText>{errors.tyerror}</FormHelperText>
            </FormControl>
            <FormControl>
                <FormLabel>Price</FormLabel>
                <Input value={data.price} onChange={(e) => { setData({ ...data, price: Number(e.target.value) }) }} type="number" startDecorator="ETB" placeholder="Price" />
                <FormHelperText>{errors.perror}</FormHelperText>
            </FormControl>
            <FormControl>
                <FormLabel>Description</FormLabel>
                <Input value={data.description} onChange={(e) => { setData({ ...data, description: e.target.value }) }} placeholder="Description" />
                <FormHelperText>{errors.derror}</FormHelperText>
            </FormControl>
            <FormControl>
                <FormLabel>Extras</FormLabel>
                <SelectMultiple values={data} setValues={setData} />
                <FormHelperText>{errors.exerror}</FormHelperText>
            </FormControl>
        </div>
    )
}

function BasicInfo() {
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
            <Inputs />
        </>
    );
}

export default BasicInfo;