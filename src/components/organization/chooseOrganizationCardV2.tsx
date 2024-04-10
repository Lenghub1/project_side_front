import CP from "..";
import styled from "styled-components";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button"; // Import Button from MUI

interface RoleCardProps {
  id: string;
  setActiveOrgId: (id: string | undefined) => void;
  isActive: boolean;
  title: string;
  description: string;
}

const Typography = styled(CP.Typography)`
  color: inherit;
`;

const ChooseOrganizationCardV2 = ({
  id,
  setActiveOrgId,
  isActive,
  title,
  description,
}: RoleCardProps) => {
  const handleCardClick = () => {
    console.log("click", id);

    setActiveOrgId(isActive ? undefined : id);
  };

  // Truncate title if it's longer than 25 characters
  const truncatedTitle = title.length > 25 ? title.slice(0, 23) + " .." : title;

  // Prevent the click event from propagating when the button is clicked
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  };

  return (
    <CP.Card
      sx={{
        maxWidth: "100%",
        width: "375px",
        borderRadius: "1rem",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Add box shadow
        transition: "box-shadow 0.3s ease", // Add transition effect
        "&:hover": {
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)", // Adjust shadow on hover
          border: "1px solid #ccc", // Add border on hover
          cursor: "pointer", // Change cursor on hover
        },
      }}
      variant="outlined"
      padding="0"
      onClick={handleCardClick}
    >
      <CP.Styled.Flex
        padding="1.5rem"
        justify="flex-start"
        items="flex-start"
        direction="column"
      >
        <CardContent style={{ width: "100%" }}>
          <Typography variant="h6" gutterBottom color="inherit">
            {truncatedTitle}
          </Typography>
          <CP.Button
            fullWidth
            onClick={handleButtonClick}
            variant="outlined"
            style={{ pointerEvents: "auto", marginBottom: "20px" }}
          >
            Update now
          </CP.Button>
          <CP.Styled.Flex gap="20px" justify="flex-start" margin="10px 0">
            <KeyOutlinedIcon />
            Employee
          </CP.Styled.Flex>
          <CP.Styled.Flex gap="20px" justify="flex-start" margin="10px 0">
            <LocationOnOutlinedIcon />1 location
          </CP.Styled.Flex>
          <CP.Styled.Flex gap="20px" justify="flex-start" margin="10px 0">
            <PersonIcon />1 person
          </CP.Styled.Flex>
        </CardContent>
      </CP.Styled.Flex>

      <CP.Styled.Flex justify="space-evenly" style={{ marginBottom: "20px" }}>
        <CP.Button
          variant="text"
          onClick={handleButtonClick}
          style={{ pointerEvents: "auto" }}
        >
          Setting
        </CP.Button>
        <CP.Button
          onClick={handleButtonClick}
          style={{ pointerEvents: "auto" }}
        >
          Open
        </CP.Button>
      </CP.Styled.Flex>
    </CP.Card>
  );
};

export default ChooseOrganizationCardV2;
