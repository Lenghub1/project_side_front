import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchDisplay from "../searchBox/SearchDisplay";
import FilterButton from "./filter/Filter";
interface TableToolbarProp {
  name: string;
  data: object;
}

const EnhancedTableToolbar: React.FC<TableToolbarProp> = ({ name, data }) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        {name}
      </Typography>

      <SearchDisplay data={data} />
      <FilterButton />
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
