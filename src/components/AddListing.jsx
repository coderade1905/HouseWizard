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
import { useContext, useState } from 'react';
import { HomeContext } from "../App";
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const steps = ['Basic Information', 'Location Information', 'Media Information'];

function ButtonStepper({ activeStep, setActiveStep }) {
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
const CurrentStep = ({activeStep}) => {
  switch (activeStep) {
    case 1:
      return <BasicInfo />;
    case 2:
      return <MapInput />
    case 3:
      return <MediaInfo />
  }
}
function AddListing() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);
  const { data, setData, errors, setErrors } = useContext(HomeContext);
  const auth = getAuth();
  const user = auth.currentUser;
  const handleSubmit = async () => {
    setData({...data, pname : user.displayName, pemail: user.email})
    if (activeStep < 4) {
      if(activeStep === 1){
        if (data.title === ""){
          setErrors({...errors, tierror: "this field is required"});
        }
        else if (data.type === "" || data.type === null){
          setErrors({...errors, tyerror: "this field is required"});
        }
        else if (data.description === ""){
          setErrors({...errors, derror: "this field is required"});
        }
        else if (data.price === 0){
          setErrors({...errors, perror: "this field is required"});
        }
        else if (data.area === 0){
          setErrors({...errors, aerror: "this field is required"});
        }
        else if (data.extras.length === 0){
          setErrors({...errors, exerror: "this field is required"});
        }
        else{
          setActiveStep(old => old + 1);
        }
      }
      else if (activeStep === 2){
        if (data.lng === ""){
          setErrors({...errors, lngerror: "this field is required"});
        }
        else if (data.lat === ""){
          setErrors({...errors, laterror: "this field is required"});
        }
        else{
          setActiveStep(old => old + 1);
        }
      }
      else{
        console.log(user.email);
        try {
          const docRef = await addDoc(collection(db, "listings"), {
            data
          });
          navigate(`/listing/${docRef.id}`);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
        
        console.log(data);
      }
    }
  }
  return (
    <CssVarsProvider defaultMode="dark">
        <div style={{ marginTop: "30px" }}>
          <ButtonStepper activeStep={activeStep} setActiveStep={setActiveStep} errors={errors} />
          <div className="ListingInfo">
            <div className="ListingInfoMain">
              <CurrentStep activeStep={activeStep} />
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
                    handleSubmit();
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
    </CssVarsProvider >
  )
}
export default AddListing;