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
import { db } from '../../firebase';

export default function DrawerFilters({ margin, useHouses }) {
  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState([]);
  const [price, setPrice] = React.useState({min: 0, max : 0});
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
  async function fetchData() {
    let filtertype = ["hfs", "hfr", "rfr", "lnd", "fsb", "frb", "app"];
    let filterprice = {min: 0, max: 10000};
    if (type.length > 0) {
      filtertype = [];
      type.map((element) => {
        filtertype.push(types[element]);
      })
    }
    if (price.min > 0 && price.max > 0) {
      filterprice = price;
    }
    const querySnapshot = await getDocs(query(collection(db, "listings"), where("data.type", "in", filtertype), where("data.price", ">=", filterprice.min), where("data.price", "<=", filterprice.max)));
    setHouses([]);
    querySnapshot.forEach((doc) => {
      let res = doc.data().data;
      setHouses((prev) => [...prev, { title: res.title, price: res.price, type: res.type, area: res.area, im: res.im, pname: res.pname, lat: res.lat, lng: res.lng, description: res.description, extras: res.extras, id : doc.id }])
      console.log(res, 1544);
    });
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
            <Divider sx={{ mt: "auto" }} />
            <div>
              <FormLabel>Price range</FormLabel>
              <div style={{maxWidth:"100%", display: "flex", justifyContent: "space-around", marginTop: "20px"}}>
                <div>
                  <Input style={{width: "90px"}}  placeholder="Min price" type="number" value={price.min} onChange={(e) => { setPrice({ ...price, min: Number(e.target.value) }) }}/>
                  <FormHelperText style={{width: "90px"}}>Minimum price</FormHelperText>
                </div>
                <div>
                <Input style={{width: "90px"}}  placeholder="Max price" type="number" value={price.max} onChange={(e) => { setPrice({ ...price, max: Number(e.target.value) }) }}/>
                  <FormHelperText style={{width: "90px"}}>Maximum price</FormHelperText>
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
