import CP from "..";
import styled from "styled-components";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import useScreenSize from "@/hooks/useScreenSize";

interface RoleCardProps {
  accountType: "employer" | "employee" | null;
  // setType: React.Dispatch<React.SetStateAction<"employer" | "employee" | null>>;
  setAccountType: (value: "employer" | "employee" | null) => void;
  role: "employer" | "employee";
  image: string;
  title: string;
  description: string;
}

const Typography = styled(CP.Typography)`
  color: inherit;
`;

const RoleCard = ({
  accountType,
  setAccountType,
  role,
  image,
  title,
  description,
}: RoleCardProps) => {
  const isActive = accountType === role;
  const { isMobile } = useScreenSize();
  return (
    <CP.Card 
      sx={{
        border: isActive ? "2px solid" : "1px solid",
        borderColor: isActive ? "primary.main" : "grey.300",
        color: isActive ? "primary.main" : "text.primary",
        maxWidth: "340px",
        borderRadius: "1rem",
      }}
      variant="outlined"
      padding="0"
      onClick={() => setAccountType(role)}
    >
      <CardActionArea
        sx={{ color: isActive ? "primary.main" : "text.primary" }}
      >
        <CP.Styled.Div padding={isMobile ? "1rem" : "1.5rem"}>
          <CardMedia component="img" alt={title} height="auto" image={image} />
          <CardContent>
            <Typography
              variant={isMobile ? "h6" : "h5"}
              gutterBottom
              color="inherit"
            >
              {title}
            </Typography>
            <Typography variant="body2" color="inherit">
              {description}
            </Typography>
          </CardContent>
        </CP.Styled.Div>
      </CardActionArea>
    </CP.Card>
  );
};

export default RoleCard;
