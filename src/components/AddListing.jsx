import { CssVarsProvider } from "@mui/joy/styles";
import * as React from 'react';
import Stepper from '@mui/joy/Stepper';
import Step from '@mui/joy/Step';
import StepButton from '@mui/joy/StepButton';
import StepIndicator from '@mui/joy/StepIndicator';
import Check from '@mui/icons-material/Check';
import Button from '@mui/joy/Button';
import { KeyboardArrowRight, KeyboardArrowLeft } from '@mui/icons-material';
import '../styles/AddListing.css';
import BasicInfo from './BasicInfo';
import MediaInfo from './MediaInfo';
import MapInput from './LocationInfo';
import { useContext, useState } from 'react';
import { HomeContext } from "../App";
import { useNavigate } from 'react-router-dom';
import supabase from '../supabase.js';

const steps = ['Basic Information', 'Location Information', 'Media Information'];

function ButtonStepper({ activeStep, setActiveStep }) {
  return (
    <div className="DesktopStepper">
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
            <StepButton style={{ color: "#fff" }}>{step}</StepButton>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

const CurrentStep = ({ activeStep, active, setActive }) => {
  switch (activeStep) {
    case 0:
      return <BasicInfo active={active} setActive={setActive} />;
    case 1:
      return <MapInput />;
    case 2:
      return <MediaInfo />;
    default:
      return null;
  }
}

function AddListing() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const { data, setData, errors, setErrors, user, active, setActive } = useContext(HomeContext);

  const insertRecord = async (data1) => {
    const { data: insertData, error } = await supabase
      .from('listings')
      .insert([data1]);

    if (error) {
      console.error('Error inserting record:', error);
    } else {
      console.log('Record inserted:', insertData);
    }
  };

  const handleSubmit = async () => {
    if (activeStep < 3) {
      setErrors({});
      let hasError = false;

      if (activeStep === 0) {
        if (!data.type) {
          setErrors(prev => ({ ...prev, tyerror: "This field is required" }));
          hasError = true;
        }
        if (!active.bednum && data.bednum === 0) {
          setErrors(prev => ({ ...prev, bderror: "This field is required" }));
          hasError = true;
        }
        if (!active.area && data.area === 0) {
          setErrors(prev => ({ ...prev, aerror: "This field is required" }));
          hasError = true;
        }
        if (!active.price && data.price === 0) {
          setErrors(prev => ({ ...prev, perror: "This field is required" }));
          hasError = true;
        }
        if (!active.description && data.description === "") {
          setErrors(prev => ({ ...prev, derror: "This field is required" }));
          hasError = true;
        }
        if (!active.extras && data.extras.length === 0) {
          setErrors(prev => ({ ...prev, exerror: "This field is required" }));
          hasError = true;
        }
        if (!hasError) setActiveStep(old => old + 1);
      }
      else if (activeStep === 1) {
        if (!data.location) {
          setErrors(prev => ({ ...prev, locerror: "This field is required" }));
          hasError = true;
        }
        if (!data.lng) {
          setErrors(prev => ({ ...prev, lngerror: "This field is required" }));
          hasError = true;
        }
        if (!data.lat) {
          setErrors(prev => ({ ...prev, laterror: "This field is required" }));
          hasError = true;
        }
        if (!hasError) setActiveStep(old => old + 1);
      }
      else if (activeStep === 2) {
        try {
          const { data: user1, error } = await supabase.auth.getUser();

          if (error) {
            console.error('Error fetching user:', error);
            return;
          }

          if (user1 && user1.user) {
            setData({ ...data, user_id: user1.user.id });
            await insertRecord(data);
            navigate("/");
            console.log(data);
          } else {
            console.error('User data is not available');
          }
        } catch (e) {
          console.error('Unexpected error:', e);
        }
      }
    }
  }

  return (
    <CssVarsProvider defaultMode="dark">
      <div style={{ marginTop: "30px" }}>
        <ButtonStepper activeStep={activeStep} setActiveStep={setActiveStep} errors={errors} />
        <div className="ListingInfo">
          <div className="ListingInfoMain">
            <CurrentStep activeStep={activeStep} active={active} setActive={setActive} />
            <div className="ListingNav">
              <Button
                color="primary"
                onClick={() => {
                  if (activeStep > 0) setActiveStep(old => old - 1);
                }}
                size="lg"
                startDecorator={<KeyboardArrowLeft />}
                style={{ marginLeft: "30px" }}
              >
                Back
              </Button>
              <Button
                color="primary"
                onClick={handleSubmit}
                size="lg"
                endDecorator={<KeyboardArrowRight />}
                style={{ marginRight: "30px" }}
              >
                {activeStep === 2 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CssVarsProvider>
  )
}

export default AddListing;
