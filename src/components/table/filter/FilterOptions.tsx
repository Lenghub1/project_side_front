import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const filterOptions = [
  {
    value: "like",
    label: "contain",
  },
  {
    value: "eq",
    label: "is",
  },
  {
    value: "ne",
    label: "is not",
  },
  {
    value: "gte",
    label: "start",
  },
  {
    value: "lte",
    label: "end",
  },
];

function FilterOptions({ data = filterOptions, onSelectChange }) {
  const [filterOption, setFilterOption] = React.useState();

  const handleChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value as string;
    setFilterOption(selectedValue);
    onSelectChange(selectedValue);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth size="small">
        <Select
          value={filterOption}
          onChange={handleChange}
          defaultValue="like"
          inputProps={{ "aria-label": "Without label" }}
        >
          {data.map((option) => {
            return (
              <MenuItem
                key={`${option.label}-${option.value}`}
                value={option.value}
              >
                {option.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}

export default FilterOptions;
