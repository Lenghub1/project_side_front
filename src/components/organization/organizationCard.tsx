import CP from "..";
import styled from "styled-components";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

interface TypeCardProps {
  typeSelected: "Join" | "Create" | null;
  setTypeSelected: (value: "Join" | "Create" | null) => void;
  image: string;
  title: string;
  description: string;
}

const Typography = styled(CP.Typography)`
  color: inherit;
`;

const TypeCard = ({
  typeSelected,
  setTypeSelected,
  image,
  title,
  description,
}: TypeCardProps) => {
  const isActive = typeSelected === title;
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
      onClick={() => setTypeSelected(title as "Join" | "Create" | null)}
    >
      <CardActionArea
        sx={{ color: isActive ? "primary.main" : "text.primary" }}
      >
        <CP.Styled.Div padding="1.5rem">
          <CardMedia component="img" alt={title} height="auto" image={image} />
          <CardContent>
            <Typography variant="h5" gutterBottom color="inherit">
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

export default TypeCard;
