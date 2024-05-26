import Typography from "@mui/material/Typography";
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { Box, Chip } from '@mui/joy';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';


function TypeSelect() {
    return (
        <Select
            placeholder="Type of property"
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

function SelectMultiple() {
    return (
        <Select
            multiple
            defaultValue={['dog', 'cat']}
            renderValue={(selected) => (
                <Box sx={{ display: 'flex', gap: '0.25rem' }}>
                    {selected.map((selectedOption) => (
                        <Chip variant="soft" color="primary">
                            {selectedOption.label}
                        </Chip>
                    ))}
                </Box>
            )}
            sx={{
                minWidth: '15rem',
            }}
            slotProps={{
                listbox: {
                    sx: {
                        width: '100%',
                    },
                },
            }}
        >
            <Option value="wifi">WiFi</Option>
            <Option value="kitchen">Kitchen</Option>
            <Option value="shower">Shower</Option>
            <Option value="laundary">Laundary</Option>
        </Select>
    );
}

function Inputs() {
    return (
        <div className="inputs">
            <FormControl>
                <FormLabel>Title</FormLabel>
                <Input placeholder="Title" />
                <FormHelperText>This is a helper text.</FormHelperText>
            </FormControl>
            <FormControl>
                <FormLabel>Area</FormLabel>
                <Input type="number" startDecorator="sqm" placeholder="Area" />
                <FormHelperText>This is a helper text.</FormHelperText>
            </FormControl>
            <FormControl>
                <FormLabel>Type</FormLabel>
                <TypeSelect />
                <FormHelperText>This is a helper text.</FormHelperText>
            </FormControl>
            <FormControl>
                <FormLabel>Price</FormLabel>
                <Input type="number" startDecorator="ETB" placeholder="Price" />
                <FormHelperText>This is a helper text.</FormHelperText>
            </FormControl>
            <FormControl>
                <FormLabel>Description</FormLabel>
                <Input placeholder="Description" />
                <FormHelperText>This is a helper text.</FormHelperText>
            </FormControl>
            <FormControl>
                <FormLabel>Extras</FormLabel>
                <SelectMultiple />
                <FormHelperText>This is a helper text.</FormHelperText>
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