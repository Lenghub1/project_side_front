import React, { useState, useEffect } from "react";
import { Button, Container, Step, StepLabel, Stepper } from "@mui/material";
import CP from "@/components";
import InformationBranch from "./informationFormBranch";
import ConfirmationCreateBranch from "./confirmationCreateBranch";
import AddMember from "./addMember";
import { useSnackbar } from "notistack";
import { ResetRecoilState, useRecoilState } from "recoil";
import { selectMembers } from "@/store/employee";
interface BranchData {
  name: string;
  manager: string;
  location: string;
  geoFencing: number;
  member: any[];
}

export interface AddMemberProps {
  branchData: BranchData;
  setBranchData: React.Dispatch<React.SetStateAction<BranchData>>;
}

const CreateBranch: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [selected, setSelected] = useRecoilState(selectMembers);
  const [step, setStep] = useState<number>(0);
  const [branchData, setBranchData] = useState<BranchData>({
    name: "",
    manager: "",
    location: "",
    geoFencing: 10,
    member: [],
  });
  const [errors, setErrors] = useState<string[]>([]);

  const handleNext = () => {
    // Validate fields before proceeding to the next step
    if (step === 0) {
      const newErrors: string[] = [];
      if (!branchData.name.trim()) {
        newErrors.push("Name is required");
      }
      if (!branchData.manager.trim()) {
        newErrors.push("Manager is required");
      }
      if (!branchData.location.trim()) {
        newErrors.push("Location is required");
      }
      if (!branchData.geoFencing) {
        newErrors.push("GeoFencing is required");
      }
      if (newErrors.length > 0) {
        newErrors.forEach((error) => {
          enqueueSnackbar(error, { variant: "error" });
        });
        return; // Do not proceed if there are errors
      }
    } else if (step === 1) {
      const newErrors: string[] = [];
      if (branchData.member.length === 0) {
        newErrors.push("Please add at least one member");
      }
      if (newErrors.length > 0) {
        newErrors.forEach((error) => {
          enqueueSnackbar(error, { variant: "error" });
        });
        return; // Do not proceed if there are errors
      }
    }
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
    console.log(branchData);
  };
  const clearSelection = () => {
    setSelected([]); // Clear the selected state
  };

  useEffect(() => {
    clearSelection();
  }, []);
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
        {errors.length > 0 && (
          <CP.Styled.Div style={{ color: "red" }}>
            {errors.map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          </CP.Styled.Div>
        )}
        {step === 0 && (
          <InformationBranch
            branchData={branchData}
            setBranchData={setBranchData}
            handleInputChange={handleInputChange}
          />
        )}
        {step === 1 && (
          <AddMember branchData={branchData} setBranchData={setBranchData} />
        )}
        {step === 2 && <ConfirmationCreateBranch branchData={branchData} />}
        <CP.Styled.Div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            gap: "20px",
            marginTop: "20px",
          }}
        >
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
            <Button variant="contained" type="submit">
              Submit
            </Button>
          )}
        </CP.Styled.Div>
      </form>
    </Container>
  );
};

export default CreateBranch;
