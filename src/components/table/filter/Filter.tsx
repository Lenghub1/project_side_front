import { Chip, FormControl, InputLabel, Select } from "@mui/material";
import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import FilterListIcon from "@mui/icons-material/FilterList";

const FilterLabel: React.FC<{ label: string }> = ({ label }) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>("");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedValue(event.target.value as string);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        value={selectedValue}
        onChange={() => handleChange}
        renderValue={(selected) => (
          <div>
            {(selected as string).split(",").map((item) => (
              <Chip key={item} label={item} />
            ))}
          </div>
        )}
      ></Select>
    </FormControl>
  );
};

const FilterButton = ({}) => {
  const [open, setOpen] = useState(false);
  const handleToggleFilter = () => {
    setOpen((prev) => !prev);
  };
  return (
    <>
      <Tooltip title="Filter">
        <IconButton onClick={() => handleToggleFilter}>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
      {open && <FilterLabel label="Filter" />}
    </>
  );
};

export default FilterButton;
