import CP from "..";
import styled from "styled-components";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import { Avatar } from "@mui/material";
import { useState } from "react";

interface RoleCardProps {
  id: string;
  setActiveOrgId: (id: string | null) => void;
  isActive: boolean;
  title: string;
  description: string;
}

const Typography = styled(CP.Typography)`
  color: inherit;
`;

const ChooseOrganizationCard = ({
  id,
  setActiveOrgId,
  isActive,
  title,
  description,
}: RoleCardProps) => {
  const handleCardClick = () => {
    setActiveOrgId(isActive ? null : id);
  };

  return (
    <CP.Card
      sx={{
        border: isActive ? "2px solid" : "1px solid",
        borderColor: isActive ? "primary.main" : "grey.300",
        color: isActive ? "primary.main" : "text.primary",
        maxWidth: "100%",
        borderRadius: "1rem",
      }}
      variant="outlined"
      padding="0"
      onClick={handleCardClick}
    >
      <CardActionArea
        sx={{ color: isActive ? "primary.main" : "text.primary" }}
      >
        <CP.Styled.Flex padding="1.5rem">
          <Avatar></Avatar>
          <CardContent>
            <Typography variant="h5" gutterBottom color="inherit">
              {title}
            </Typography>
            <Typography variant="body2" color="inherit">
              {description}
            </Typography>
          </CardContent>
        </CP.Styled.Flex>
      </CardActionArea>
    </CP.Card>
  );
};

export default ChooseOrganizationCard;
