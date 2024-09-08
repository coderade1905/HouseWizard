import * as React from "react";
import Drawer from "@mui/joy/Drawer";
import Button from "@mui/joy/Button";
import DialogTitle from "@mui/joy/DialogTitle";
import ModalClose from "@mui/joy/ModalClose";
import Divider from "@mui/joy/Divider";
import Stack from "@mui/joy/Stack";
import Sheet from "@mui/joy/Sheet";
import TuneIcon from "@mui/icons-material/TuneRounded";
import FormLabel from "@mui/joy/FormLabel";
import translation from '../translation/translation.js';
import FilterCheckBox from "./CheckBox";
import { CssVarsProvider } from "@mui/joy/styles";
import FormHelperText from '@mui/joy/FormHelperText';
import { InputNumMin, InputNumMax } from '../minicomps/Input.jsx';
import { HomeContext } from '../../App';
import supabase from '../../supabase.js';


export default function DrawerFilters({ margin, fetchData, page, pageSize}) {
  const [open, setOpen] = React.useState(false);
  const { language, type, setType, price, setPrice, area, setArea, bednum, setBednum } = React.useContext(HomeContext);
  const handleFilter = () => {
    if (page & pageSize)
    {
      fetchData(page, pageSize);
    }
    else{
      fetchData(page, pageSize);
    }
    setOpen(false);
  };
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
              <FormLabel>{translation[language]['arr']}</FormLabel>
              <div style={{ maxWidth: "100%", display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
                <div>
                  <InputNumMin value={area.min} data={area} setData={setArea} placeholder="Min area" />
                  <FormHelperText style={{ width: "90px" }}>Minimum area</FormHelperText>
                </div>
                <div>
                  <InputNumMax value={area.max} data={area} setData={setArea} placeholder="Max area" />
                  <FormHelperText style={{ width: "90px" }}>Maximum area</FormHelperText>
                </div>
              </div>
            </div>
            <Divider sx={{ mt: "auto" }} />
            <div>
              <FormLabel>{translation[language]['prr']}</FormLabel>
              <div style={{ maxWidth: "100%", display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
                <div>
                  <InputNumMin value={price.min} data={price} setData={setPrice} placeholder="Min price" />
                  <FormHelperText style={{ width: "90px" }}>Minimum price</FormHelperText>
                </div>
                <div>
                  <InputNumMax value={price.max} data={price} setData={setPrice} placeholder="Max price" />
                  <FormHelperText style={{ width: "90px" }}>Maximum price</FormHelperText>
                </div>
              </div>
            </div>
            <Divider sx={{ mt: "auto" }} />
            <div>
              <FormLabel>{translation[language]['bdnmr']}</FormLabel>
              <div style={{ maxWidth: "100%", display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
                <div>
                  <InputNumMin value={bednum.min} data={bednum} setData={setBednum} placeholder="Min bednum" />
                  <FormHelperText style={{ width: "90px" }}>Minimum bednum</FormHelperText>
                </div>
                <div>
                  <InputNumMax value={bednum.max} data={bednum} setData={setBednum} placeholder="Max bednum" />
                  <FormHelperText style={{ width: "90px" }}>Maximum bednum</FormHelperText>
                </div>
              </div>
            </div>
            <Divider sx={{ mt: "auto" }} />
            <FilterCheckBox
              value={type}
              setValue={setType}
              title={translation[language]['typ']}
              options={[
                translation[language]['hfr'],
                translation[language]['hfs'],
                translation[language]['rfr'],
                translation[language]['fsb'],
                translation[language]['frb'],
                translation[language]['app'],
                translation[language]['lnd']
              ]}
            />
            <Stack
              direction="row"
              justifyContent="end"
              useFlexGap
              spacing={1}
            >
              <Button onClick={handleFilter}>Filter</Button>
            </Stack>
          </Sheet>
        </Drawer>
      </React.Fragment>
    </CssVarsProvider>
  );
}
