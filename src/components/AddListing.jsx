import { CssVarsProvider } from "@mui/joy/styles";
import * as React from 'react';
import Stepper from '@mui/joy/Stepper';
import Step from '@mui/joy/Step';
import StepButton from '@mui/joy/StepButton';
import StepIndicator from '@mui/joy/StepIndicator';
import Check from '@mui/icons-material/Check';
import Button from '@mui/joy/Button';
import { KeyboardArrowRight } from '@mui/icons-material';
import { KeyboardArrowLeft } from "@mui/icons-material";
import '../styles/AddListing.css';
import BasicInfo from './BasicInfo';
import MediaInfo from './MediaInfo';
import MapInput from './LocationInfo';



const steps = ['Basic Information', 'Location Information', 'Media Information'];

function ButtonStepper({activeStep, setActiveStep}) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Stepper sx={{ width: '80%' }}>
        {steps.map((step, index) => (
          <Step
            key={step}
            indicator={
              <StepIndicator
                variant={activeStep <= index ? 'soft' : 'solid'}
                color={activeStep < index ? 'neutral' : 'primary'}
              >
                {activeStep <= index ? index + 1 : <Check />}
              </StepIndicator>
            }
            sx={{
              '&::after': {
                ...(activeStep > index &&
                  index !== 2 && { bgcolor: 'primary.solidBg' }),
              },
            }}
          >
            <StepButton style={{ color: "#fff" }} onClick={() => setActiveStep(index)}>{step}</StepButton>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
function AddListing() {
  const [activeStep, setActiveStep] = React.useState(1);
  const CurrentStep = () => {
    switch(activeStep){
      case 1:
        return <BasicInfo/>;
      case 2:
        return <MapInput/>
      case 3:
        return <MediaInfo/>
    }
  }
  return (
    <CssVarsProvider defaultMode="dark">
      <div style={{ marginTop: "30px" }}>
        <ButtonStepper activeStep={activeStep} setActiveStep={setActiveStep} />
        <div className="ListingInfo">
          <div className="ListingInfoMain">
              <CurrentStep/>
            <div className="ListingNav">
              <Button
                color="primary"
                disabled={false}
                loading={false}
                onClick={function () { 
                  activeStep > 1 ? setActiveStep(old => old - 1) : ""
                 }}
                size="lg"
                startDecorator={<KeyboardArrowLeft />}
                style={{ marginLeft: "30px" }}
              >
                Back
              </Button>
              <Button
                color="primary"
                disabled={false}
                loading={false}
                onClick={function () { 
                  activeStep < 3 ? setActiveStep(old => old + 1) : ""
                 }}
                size="lg"
                endDecorator={<KeyboardArrowRight />}
                style={{ marginRight: "30px" }}
              >
                {activeStep == 3 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CssVarsProvider>
  )
}
export default AddListing;