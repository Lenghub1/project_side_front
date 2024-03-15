import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import SearchDisplay from "../searchBox/SearchDisplay";
interface TableToolbarProp {
  name: string;
  data: string;
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

      <Tooltip title="Filter list">
        <SearchDisplay data={data} />
      </Tooltip>
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
