import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchDisplay from "../searchBox/SearchDisplay";
import IconButton from "@mui/material/IconButton";
import FilterIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import TableFilter from "./filter/Filter";
import CP from "..";
import { useState } from "react";
import { Filter } from "@/utils/interfaces/Feature";
interface TableToolbarProp {
  name: string;
  data: object;
  headCells: any[];
  onFilterChange: (filters: Filter[]) => void;
}

const EnhancedTableToolbar: React.FC<TableToolbarProp> = ({
  name,
  data,
  headCells,
  onFilterChange,
}) => {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <Toolbar disableGutters>
      <CP.Styled.Flex direction="column" gap="8px">
        <CP.Styled.Flex padding="8px">
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            {name}
          </Typography>
          <SearchDisplay data={data} />
          <IconButton onClick={() => setShowFilter((prev) => !prev)}>
            {showFilter ? <CloseIcon /> : <FilterIcon />}
          </IconButton>
        </CP.Styled.Flex>
        {showFilter && (
          <Box
            sx={{
              backgroundColor: "whitesmoke",
            }}
            width="100%"
            padding={1}
          >
            <TableFilter
              headCells={headCells}
              onFilterChange={onFilterChange}
            />
          </Box>
        )}
      </CP.Styled.Flex>
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
