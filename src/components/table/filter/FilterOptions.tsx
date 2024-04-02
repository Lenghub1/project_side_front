import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface Option {
  value: string;
  label: string;
}

interface FilterOptionsProps {
  data: Option[];
  onSelectChange: (selectedValue: string) => void;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({
  data = [],
  onSelectChange,
}) => {
  const [filterOption, setFilterOption] = React.useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value as string;
    setFilterOption(selectedValue);
    onSelectChange(selectedValue);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl size="small">
        <Select
          sx={{ width: "120px" }}
          value={filterOption}
          onChange={handleChange}
          defaultValue="like"
          inputProps={{ "aria-label": "Without label" }}
        >
          {data.map((option) => (
            <MenuItem
              key={`${option.label}-${option.value}`}
              value={option.value}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterOptions;
