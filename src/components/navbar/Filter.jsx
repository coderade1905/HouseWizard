import * as React from "react";
import Drawer from "@mui/joy/Drawer";
import Button from "@mui/joy/Button";
import DialogTitle from "@mui/joy/DialogTitle";
import ModalClose from "@mui/joy/ModalClose";
import Divider from "@mui/joy/Divider";
import Stack from "@mui/joy/Stack";
import Sheet from "@mui/joy/Sheet";
import TuneIcon from "@mui/icons-material/TuneRounded";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import { Input } from "@mui/joy";
import Slider, { sliderClasses } from "@mui/joy/Slider";
import FilterCheckBox from "./CheckBox";
import { CssVarsProvider } from "@mui/joy/styles";
import { collection, query, orderBy, startAt, endAt, getDocs, where } from 'firebase/firestore';
import FormHelperText from '@mui/joy/FormHelperText';
import {InputNumMin, InputNumMax} from '../minicomps/Input.jsx';
import { HomeContext } from '../../App';
import supabase from '../../supabase.js';


export default function DrawerFilters({ margin, useHouses }) {
  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState([]);
  const [price, setPrice] = React.useState({min: 0, max : 0});
  const [area, setArea] = React.useState({min: 0, max : 0});
  const [bednum, setBednum] = React.useState({min: 0, max : 0});
  const { setHouses, setStatus, loading, setLoading } = React.useContext(HomeContext);
  const types =
  {
    "House for sale": "hfs",
    "House for rent": "hfr",
    "Room for rent": "rfr",
    "Land": "lnd",
    "For sale for businesses": "fsb",
    "For rent for businesses": "frb",
    "Appartment": "app"
  }
  function fetchData() {
    const fetchListings = async (filtertype, filterprice, filterarea, filterbednum) => {
      try {
        console.log(filterprice, 15);
        let query = supabase.from('listings').select('*');
        if (filterprice.min !== 0 && filterprice.min !== undefined) {
          query = query.filter('price', 'gte', filterprice.min);
        }
        if (filterprice.max !== 0 && filterprice.max !== undefined) {
          query = query.filter('price', 'lte', filterprice.max);
        }
        if (filterarea.min !== 0 && filterarea.min !== undefined) {
          query = query.filter('area', 'gte', filterarea.min);
        }
        if (filterarea.max !== 0 && filterarea.max !== undefined) {
          query = query.filter('area', 'lte', filterarea.max);
        }
        if (filterbednum.min !== 0 && filterbednum.min !== undefined) {
          query = query.filter('bednum', 'gte', filterbednum.min);
        }
        if (filterbednum.max !== 0 && filterbednum.max !== undefined) {
          query = query.filter('bednum', 'lte', filterbednum.max);
        }
        if (filtertype.length > 0) {
          query = query.filter('type', 'in', `(${filtertype.join(',')})`);
        }
        setLoading(true);
        let { data, error } = await query;
        setLoading(false);
        return data;
      }
      catch (e) {
        console.log("Connection error!")
      }
    }
    let filtertype = ["hfs", "hfr", "rfr", "lnd", "fsb", "frb", "app"];
    setHouses([]);
    if (type.length > 0) {
      filtertype = [];
      type.map((element) => {
        filtertype.push(types[element]);
      })
    }
    fetchListings(filtertype, price, area, bednum)
    .then((listings) => {console.log(listings), setHouses(listings)})
    .catch((e) => {console.error(e), setStatus('e')});
    }
  return (
    <CssVarsProvider defaultMode="dark">
      <React.Fragment>
        <Button
          variant="outlined"
          style={{ marginLeft: margin + "px", marginTop: "15px" }}
          startDecorator={<TuneIcon />}
          onClick={() => setOpen(true)}
        >
          Change filters
        </Button>
        <Drawer
          size="md"
          variant="plain"
          open={open}
          onClose={() => setOpen(false)}
          slotProps={{
            content: {
              sx: {
                bgcolor: "transparent",
                p: { md: 3, sm: 0 },
                boxShadow: "none",
              },
            },
          }}
        >
          <Sheet
            sx={{
              borderRadius: "md",
              p: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              height: "100%",
              overflowX: "hidden",
            }}
          >
            <DialogTitle>Filters</DialogTitle>
            <ModalClose />
            <div>
              <FormLabel>Area range</FormLabel>
              <div style={{maxWidth:"100%", display: "flex", justifyContent: "space-around", marginTop: "20px"}}>
                <div>
                  <InputNumMin value={area.min} data={area} setData={setArea} placeholder="Min area" />
                  <FormHelperText style={{width: "90px"}}>Minimum area</FormHelperText>
                </div>
                <div>
                  <InputNumMax value={area.max} data={area} setData={setArea} placeholder="Max area" />
                  <FormHelperText style={{width: "90px"}}>Maximum area</FormHelperText>
                </div>
              </div>
            </div>
            <Divider sx={{ mt: "auto" }} />
            <div>
              <FormLabel>Price range</FormLabel>
              <div style={{maxWidth:"100%", display: "flex", justifyContent: "space-around", marginTop: "20px"}}>
                <div>
                  <InputNumMin value={price.min} data={price} setData={setPrice} placeholder="Min price" />
                  <FormHelperText style={{width: "90px"}}>Minimum price</FormHelperText>
                </div>
                <div>
                <InputNumMin value={price.max} data={price} setData={setPrice} placeholder="Max price" />
                  <FormHelperText style={{width: "90px"}}>Maximum price</FormHelperText>
                </div>
              </div>
            </div>
            <Divider sx={{ mt: "auto" }} />
            <div>
              <FormLabel>Bednum range</FormLabel>
              <div style={{maxWidth:"100%", display: "flex", justifyContent: "space-around", marginTop: "20px"}}>
                <div>
                  <InputNumMin value={bednum.min} data={bednum} setData={setBednum} placeholder="Min bednum" />
                  <FormHelperText style={{width: "90px"}}>Minimum bednum</FormHelperText>
                </div>
                <div>
                  <InputNumMin value={bednum.max} data={bednum} setData={setBednum} placeholder="Max bednum" />
                  <FormHelperText style={{width: "90px"}}>Maximum bednum</FormHelperText>
                </div>
              </div>
            </div>
            <Divider sx={{ mt: "auto" }} />
            <FilterCheckBox
              value={type}
              setValue={setType}
              title="Choose type"
              options={[
                "House for rent",
                "House for sale",
                "Room for rent",
                "For sale for businesses",
                "For rent for businesses",
                "Appartment",
                "Land"
              ]}
            />
            <Stack
              direction="row"
              justifyContent="space-between"
              useFlexGap
              spacing={1}
            >
              <Button
                variant="outlined"
                color="neutral"
                onClick={() => {
                  setType([]);
                  setPrice({min: 0, max : 0});
                }}
                className="clear"
              >
                Clear
              </Button>
              <Button onClick={() => { fetchData(), setOpen(false) }}>Filter</Button>
            </Stack>
          </Sheet>
        </Drawer>
      </React.Fragment>
    </CssVarsProvider>
  );
}
