import theme from "@/theme/ligthTheme";
import CP from "..";
import { Avatar } from "@mui/material";
import CardActionArea from "@mui/material/CardActionArea";
interface OrganizationCardProps {
  id: string;
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  image: string;
  title: string;
  description: string;
}

const OrganizationCard = ({
  id,
  activeId,
  setActiveId,
  image,
  title,
  description,
}: OrganizationCardProps) => {
  const isActive = activeId === id;

  const handleClick = () => {
    setActiveId(isActive ? null : id); // Toggle active state
  };

  return (
    <CP.Card
      width="100%"
      padding="32px"
      style={{
        borderRadius: "20px",
        border: isActive
          ? `0.5px solid ${theme.palette.secondary.main}`
          : "0.5px solid",
        boxShadow: isActive ? "0px 0px 20px rgba(0, 0, 0, 0.2)" : "none",
      }}
      onClick={handleClick}
    >
      <CardActionArea
        sx={{ color: isActive ? "primary.main" : "text.primary" }}
      ></CardActionArea>
      <CP.Styled.Flex>
        <Avatar src={image} alt={title}></Avatar>
        <CP.Styled.Flex
          direction="column"
          justify="flex-start"
          items="flex-start"
          padding="20px"
        >
          <CP.Typography>{title}</CP.Typography>
          <CP.Typography>{description}</CP.Typography>
        </CP.Styled.Flex>
      </CP.Styled.Flex>
    </CP.Card>
  );
};

export default OrganizationCard;
