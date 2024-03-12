import React, { useState } from "react";
import MapComponent from "@/components/map/Map";
import {
  Button,
  Container,
  Step,
  StepLabel,
  Stepper,
  TextField,
} from "@mui/material";
import CP from "@/components";

interface branchData {
  name: string;
  manager: string;
  location: string;
  geoFancing: number;
  member: [];
}

const CreateBranch: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const [branchData, setBranchData] = useState<branchData>({
    name: "",
    manager: "",
    location: "",
    geoFancing: 0,
    member: [],
  });

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setBranchData({ ...branchData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  const fetchData = () => {
    console.log(branchData);
  };
  return (
    <Container>
      <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
        <Stepper activeStep={step} alternativeLabel>
          <Step key={0}>
            <StepLabel>Information</StepLabel>
          </Step>
          <Step key={1}>
            <StepLabel>Employee</StepLabel>
          </Step>
          <Step key={2}>
            <StepLabel>Confirmation</StepLabel>
          </Step>
        </Stepper>
        {step === 0 && (
          <CP.Styled.Div style={{ marginTop: "20px" }}>
            <MapComponent />
            <TextField
              label="Name"
              type="text"
              name="name"
              value={branchData.name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="manager"
              type="text"
              name="manager"
              value={branchData.manager}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Location"
              type="text"
              name="location"
              value={branchData.location}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="GeoFancing"
              type="text"
              name="geoFancing"
              value={branchData.geoFancing}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
          </CP.Styled.Div>
        )}
        {step === 1 && (
          <TextField
            label="Member"
            type="text"
            name="member"
            value={branchData.member}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
        )}
        {step === 2 && (
          <CP.Styled.Div>
            <CP.Card width="100%"> Detail</CP.Card>
          </CP.Styled.Div>
        )}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {step > 0 && (
            <Button variant="outlined" onClick={handlePrevious}>
              Previous
            </Button>
          )}
          {step < 2 ? (
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button variant="contained" type="submit" onClick={fetchData}>
              Submit
            </Button>
          )}
        </div>
      </form>
    </Container>
  );
};

export default CreateBranch;
