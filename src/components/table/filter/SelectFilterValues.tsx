import React from "react";
import { useTheme, Theme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { filterSelectionsState } from "@/store/api.feature";
import { useRecoilState } from "recoil";

interface SelectFilterValuesProps {
  data: { [key: string]: any }[]; // List of objects
  filterKey: string; // Keys to use as the filter values
  filterOption: string; // Filter option like "like", "eq", etc.
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, selectedValues: string[], theme: Theme) {
  return {
    fontWeight: selectedValues.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

const SelectFilterValues: React.FC<SelectFilterValuesProps> = ({
  data,
  filterKey,
  filterOption,
}) => {
  const theme = useTheme();
  const [filterSelections, setFilterSelections] = useRecoilState(
    filterSelectionsState
  );

  const handleChange = (
    event: SelectChangeEvent<string[]>,
    filterKey: string
  ) => {
    const updatedValues = event.target.value;

    setFilterSelections((prevFilterSelections) => {
      const existingSelectionIndex = prevFilterSelections.findIndex(
        (selection) => selection.key === filterKey
      );

      if (existingSelectionIndex !== -1) {
        // If there's an existing selection for the current filterKey
        const existingSelection = prevFilterSelections[existingSelectionIndex];
        const updatedSelection = {
          ...existingSelection,
          option: filterOption,
          values: Array.from(
            new Set([...existingSelection.values, ...updatedValues])
          ),
        };
        const updatedFilterSelections = [...prevFilterSelections];
        updatedFilterSelections[existingSelectionIndex] = updatedSelection;
        return updatedFilterSelections;
      } else {
        // If there's no existing selection for the current filterKey
        return [
          ...prevFilterSelections,
          { key: filterKey, option: filterOption, values: updatedValues },
        ];
      }
    });
  };
  console.log(filterSelections);
  const handleChipClick = (filterKey: string, value: string) => {
    setFilterSelections((prevFilterSelections) => {
      const existingSelectionIndex = prevFilterSelections.findIndex(
        (selection) => selection.key === filterKey
      );

      if (existingSelectionIndex !== -1) {
        // Update existing filter selection
        const existingValues =
          prevFilterSelections[existingSelectionIndex].values;
        const updatedValues = existingValues.includes(value)
          ? existingValues.filter((v) => v !== value) // Remove value if already present
          : [...existingValues, value]; // Add value if not present

        const updatedSelection = {
          ...prevFilterSelections[existingSelectionIndex],
          values: updatedValues,
        };
        const updatedFilterSelections = [...prevFilterSelections];
        updatedFilterSelections[existingSelectionIndex] = updatedSelection;
        return updatedFilterSelections;
      } else {
        // Add new filter selection
        return [...prevFilterSelections, { key: filterKey, values: [value] }];
      }
    });
  };
  return (
    <FormControl key={filterKey} size="small" sx={{ maxWidth: "200px" }}>
      <Select
        sx={{ maxWidth: "150px" }}
        multiple
        name={filterKey}
        value={
          filterSelections.find((selection) => selection.key === filterKey)
            ?.values || []
        }
        onChange={(event) => handleChange(event, filterKey)}
        input={<OutlinedInput label={`${filterKey} Filter`} />}
        renderValue={(selected) =>
          selected.length === 0 ? (
            <em>Placeholder</em>
          ) : (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  size="small"
                  variant={
                    filterSelections
                      .find((selection) => selection.key === filterKey)
                      ?.values?.includes(value)
                      ? "filled"
                      : "outlined"
                  }
                  onClick={() => handleChipClick(filterKey, value)}
                />
              ))}
            </Box>
          )
        }
        MenuProps={MenuProps}
      >
        {data
          ?.map((item) => item[filterKey])
          .filter((value, index, self) => self.indexOf(value) === index)
          .map((uniqueValue) => (
            <MenuItem
              key={`${filterKey}-${uniqueValue}`}
              value={uniqueValue}
              style={getStyles(
                uniqueValue,
                filterSelections.find(
                  (selection) => selection.key === filterKey
                )?.values || [],
                theme
              )}
            >
              {uniqueValue}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};
export default SelectFilterValues;
