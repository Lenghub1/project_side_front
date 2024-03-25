import CP from "@/components";
import MuiDivider from "@mui/material/Divider";
import styled from "styled-components";
import useValidatedInput from "@/hooks/useValidatedInput";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import useScreenSize from "@/hooks/useScreenSize";
import { Flex } from "../getStarted/GetStarted";
import Modal from "@/components/modal";
import useModal from "@/hooks/useModal";
import { Typography } from "@mui/material/styles/createTypography";
import { TypographyOwnProps } from "@mui/material";

const Divider = styled(MuiDivider)`
  width: 100%;
`;

export const Title = ({ children, align }: any) => {
  const { isMobile, isTablet } = useScreenSize();

  return (
    <CP.Typography
      variant={isMobile ? "h5" : "h4"}
      style={{
        marginBottom: "2rem",
        fontWeight: "semibold",
        textAlign: align ? align : isMobile || isTablet ? "center" : "start",
      }}
    >
      {children}
    </CP.Typography>
  );
};

export const FormContainer = ({ children }: any) => {
  const { isMobile } = useScreenSize();
  return (
    <Flex
      items={isMobile ? "center" : "flex-start"}
      padding={isMobile ? "0" : "0 3rem"}
      direction="column"
      gap="1rem"
    >
      {children}
    </Flex>
  );
};
export const AlreadyHaveAccountLink = () => {
  return (
    <CP.Typography align="center">
      Already have an account?{" "}
      <Link to="/login">
        <b>Login here</b>
      </Link>
    </CP.Typography>
  );
};

interface CancelSignupButtonProps {
  resetFunction?: () => void;
}

export const CancelSignupButton = ({
  resetFunction,
}: CancelSignupButtonProps) => {
  const navigate = useNavigate();
  const { isModalOpen, openModal, closeModal } = useModal();

  const handleOk = (resetFunction: () => void = () => {}) => {
    resetFunction();
    navigate("/");
  };

  const handleCancel = () => {
    console.log("Close modal");
    closeModal();
  };

  return (
    <>
      <CP.Button variant="text" onClick={openModal}>
        Cancel
      </CP.Button>
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        onOk={() => handleOk(resetFunction)}
        onCancel={handleCancel}
        okText="Confirm"
        cancelText="Cancel"
        type="confirm"
      >
        <p>Are you sure you want to cancel this signup process?</p>
      </Modal>
    </>
  );
};

const CompanySearch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isMobile } = useScreenSize();
  const companyCode = useValidatedInput("", "Company Code");
  const isCompanySearch = location.pathname === "/get-started/company-search";

  const handleCompanySearch = () => {
    if (companyCode.value) {
      navigate(location.pathname + `/${companyCode.value}`);
    } else {
      companyCode.setTouched(true);
    }
  };

  return (
    <>
      {isCompanySearch ? (
        <>
          <CP.Styled.Form>
            <FormContainer>
              <CP.Styled.Div>
                <Title>Search Company</Title>
                <Flex direction="column" gap="1.5rem" items="flex-start">
                  <CP.Typography variant="body1">
                    You can search for a company by typing in the correct
                    company code.
                  </CP.Typography>

                  <CP.Input
                    label="Company Code"
                    required
                    value={companyCode.value}
                    onChange={companyCode.onChange}
                    onBlur={companyCode.onBlur}
                    error={!!companyCode.error}
                    helperText={<companyCode.HelperText />}
                  />

                  <Flex gap="1rem" justify={isMobile ? "center" : "flex-end"}>
                    <CancelSignupButton
                      resetFunction={() => console.log("Cancle signup")}
                    />
                    <CP.Button type="submit" onClick={handleCompanySearch}>
                      Search
                    </CP.Button>
                  </Flex>
                </Flex>
              </CP.Styled.Div>
              <CP.Styled.Div>
                <Title>Join by invitation</Title>
                <CP.Typography variant="body1">
                  Check your inbox (and spam folder) for a Riem invite from your
                  manager
                </CP.Typography>
                <CP.Typography variant="body1">
                  If your manager hasn’t invited you yet, please contact and
                  provide them your email or phone number to invite you
                </CP.Typography>
              </CP.Styled.Div>
            </FormContainer>
            <Flex direction="column" margin="1rem 0 0" gap="1rem">
              <Divider></Divider>
              <AlreadyHaveAccountLink />
            </Flex>
          </CP.Styled.Form>
        </>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default CompanySearch;
