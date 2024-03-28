import { useState } from "react";
import { styled } from "styled-components";
import CP from "@/components";
import { Avatar, IconButton } from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

interface ContainerProps {
  open: boolean;
}

const Container = styled.div<ContainerProps>`
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: ${({ open }) => (open ? "20%" : "80px")};
  max-width: 250px;
  min-width: "80px";
  transition: width 0.5s ease-in-out;

  @media (max-width: 768px) {
    width: ${({ open }) => (open ? "80px" : "80px")};
  }
`;

interface ContentContainerProps {
  open: boolean;
}

const ContentContainer = styled(CP.Styled.Flex)<ContentContainerProps>`
  gap: 20px;
  transition: opacity 0.5s ease-in-out;
`;

const SideBar = () => {
  const [open, setOpen] = useState(true);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <Container open={open}>
      <CP.Styled.Flex justify="flex-end">
        <IconButton onClick={handleToggle}>
          {open ? (
            <KeyboardDoubleArrowLeftIcon />
          ) : (
            <KeyboardDoubleArrowRightIcon />
          )}
        </IconButton>
      </CP.Styled.Flex>
      <ContentContainer open={open}>
        <Avatar sx={{ width: "32px", height: "32px" }} />
        {open && <CP.Typography variant="h5">Sandbox</CP.Typography>}
      </ContentContainer>
    </Container>
  );
};

export default SideBar;
