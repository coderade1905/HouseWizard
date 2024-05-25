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


const steps = ['Basic Information', 'Location Information', 'Media Information'];

function ButtonStepper() {
  const [activeStep, setActiveStep] = React.useState(1);
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
  return (
    <CssVarsProvider defaultMode="dark">
      <div style={{ marginTop: "30px" }}>
        <ButtonStepper />
        <div className="ListingInfo">
          <div className="ListingInfoMain">
            <div className="ListingNav">
              <Button
                color="primary"
                disabled={false}
                loading={false}
                onClick={function () { }}
                size="lg"
                startDecorator={<KeyboardArrowLeft />}
              >
                Back
              </Button>
              <Button
                color="primary"
                disabled={false}
                loading={false}
                onClick={function () { }}
                size="lg"
                endDecorator={<KeyboardArrowRight />}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CssVarsProvider>
  )
}
export default AddListing;