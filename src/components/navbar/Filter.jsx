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
import Slider, { sliderClasses } from "@mui/joy/Slider";
import FilterCheckBox from "./CheckBox";
import { CssVarsProvider } from "@mui/joy/styles";

export default function DrawerFilters({ margin }) {
  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState([]);
  const [extras, setExtras] = React.useState([]);
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
            <FormControl>
              <FormLabel>Price range</FormLabel>
              <Slider
                defaultValue={[2000, 4900]}
                step={100}
                min={0}
                max={10000}
                marks={[
                  { value: 0, label: "$0" },
                  { value: 5000, label: "$5,000" },
                  { value: 10000, label: "$10,000" },
                ]}
                sx={{
                  [`& .${sliderClasses.markLabel}[data-index="0"]`]: {
                    transform: "none",
                  },
                  [`& .${sliderClasses.markLabel}[data-index="2"]`]: {
                    transform: "translateX(-100%)",
                  },
                }}
              />
            </FormControl>
            <Divider sx={{ mt: "auto" }} />
            <FilterCheckBox
              value={type}
              setValue={setType}
              title="Choose type"
              options={[
                "House for rent",
                "House for sell",
                "Room for rent",
                "For sell for businesses",
                "For rent for businesses",
                "Appartment",
              ]}
            />
            <FilterCheckBox
              value={extras}
              setValue={setExtras}
              title="Choose extras"
              options={["Wifi", "Shower", "Kitchen", "Laundary"]}
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
                  setExtras([]);
                }}
                className="clear"
              >
                Clear
              </Button>
              <Button onClick={() => setOpen(false)}>Filter</Button>
            </Stack>
          </Sheet>
        </Drawer>
      </React.Fragment>
    </CssVarsProvider>
  );
}
