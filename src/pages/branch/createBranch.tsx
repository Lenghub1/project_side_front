import React, { useState, useEffect } from "react";
import { Button, Container, Step, StepLabel, Stepper } from "@mui/material";
import CP from "@/components";
import InformationBranch from "./informationFormBranch";
import ConfirmationCreateBranch from "./confirmationCreateBranch";
import { useSnackbar } from "notistack";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectMembers } from "@/store/employee";
import { manager } from "@/api/employee";
import { createBranch, myBranch } from "@/api/branch";
import { handleApiRequest } from "@/api";
import { useNavigate } from "react-router-dom";
import { selectedOrganization } from "@/store/userStore";
import { BranchData } from "@/utils/interfaces/Branch";
import EmployeeTable from "../employee/EmployeeTable";
export interface AddMemberProps {
  branchData: BranchData | any;
  setBranchData: React.Dispatch<React.SetStateAction<BranchData>>;
}

const CreateBranch: React.FC = () => {
  const navigate = useNavigate();
  const organization = useRecoilValue(selectedOrganization);
  const { enqueueSnackbar } = useSnackbar();
  const [selected, setSelected] = useRecoilState(selectMembers);
  const [step, setStep] = useState<number>(0);
  const [branchData, setBranchData] = useState<BranchData>({
    id: "",
    name: "",
    managerId: "",
    locationId: "",
    locationName: "",
    addressLine: "",
    pinPoint: { type: "Point", coordinates: [11, 118] },
    geoFencing: 10,
    member: [],
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [managers, setManagers] = React.useState<any>([]);
  const newPendingEmployees = async () => {
    const [response, error] = await handleApiRequest(() =>
      manager(organization)
    );

    if (response) {
      setManagers(response?.data.data);
    }
    if (error) {
      return error;
    }
  };
  const handleBranch = async () => {
    await handleApiRequest(() => myBranch(organization));
  };
  const requestCreateBranch = async () => {
    const [response, error] = await handleApiRequest(() =>
      createBranch(organization, branchData)
    );
    if (error) {
      throw error;
    } else {
      setBranchData({
        id: "",
        name: "",
        managerId: "",
        locationId: "",
        locationName: "",
        addressLine: "",
        pinPoint: {},
        geoFencing: 10,
        member: [],
      });

      navigate("/organization"); // Set step back to 1
    }
  };

  const handleNext = () => {
    // Validate fields before proceeding to the next step
    if (step === 0) {
      const newErrors: string[] = [];
      if (!branchData.name.trim()) {
        newErrors.push("Name is required");
      }
      if (!branchData.managerId) {
        newErrors.push("Manager is required");
      }
      if (!branchData.locationName.trim()) {
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

  const handleSubmit = async () => {
    requestCreateBranch();
  };

  const clearSelection = () => {
    setSelected([]); // Clear the selected state
  };

  useEffect(() => {
    newPendingEmployees();
    clearSelection();
  }, []);

  return (
    <Container style={{ paddingBottom: "50px" }}>
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
          managers={managers}
        />
      )}
      {step === 1 && (
        <EmployeeTable
          selected={true}
          branchData={branchData}
          setBranchData={setBranchData}
        />
      )}
      {step === 2 && (
        <ConfirmationCreateBranch branchData={branchData} manager={managers} />
      )}
      <CP.Styled.Div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          gap: "20px",
          marginTop: "20px",
          padding: 0,
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
          <Button variant="contained" onClick={handleSubmit}>
            submit
          </Button>
        )}
      </CP.Styled.Div>
    </Container>
  );
};

export default CreateBranch;
