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
import CP from "@/components";
import { Filter } from "@/utils/interfaces/Feature";

interface SelectFilterValuesProps {
  data: { [field: string]: any }[];
  filterField: string;
  logicalClause: string;
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
  filterField,
  logicalClause,
}) => {
  const theme = useTheme();
  const [filterSelections, setFilterSelections] = useRecoilState(
    filterSelectionsState
  );

  const handleChange = (
    event: SelectChangeEvent<string[]>,
    filterField: string
  ) => {
    const updatedValues = event.target.value;

    setFilterSelections((prevFilterSelections: Filter[]) => {
      const existingSelectionIndex = prevFilterSelections.findIndex(
        (selection) => selection.field === filterField
      );

      if (existingSelectionIndex !== -1) {
        // If there's an existing selection for the current filterField
        const existingSelection = prevFilterSelections[existingSelectionIndex];
        const updatedSelection = {
          ...existingSelection,
          logicalClause: logicalClause,
          values: Array.from(
            new Set([...existingSelection.values!, ...updatedValues])
          ),
        };
        const updatedFilterSelections = [...prevFilterSelections];
        updatedFilterSelections[existingSelectionIndex] = updatedSelection;
        return updatedFilterSelections;
      } else {
        // If there's no existing selection for the current filterField
        return [
          ...prevFilterSelections,
          {
            field: filterField,
            logicalClause: logicalClause,
            values: updatedValues,
          },
        ];
      }
    });
  };
  const handleChipClick = (filterField: string, value: string) => {
    setFilterSelections((prevFilterSelections: Filter[]) => {
      const existingSelectionIndex = prevFilterSelections.findIndex(
        (selection) => selection.field === filterField
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
        return [
          ...prevFilterSelections,
          { field: filterField, values: [value] },
        ];
      }
    });
  };
  return (
    <CP.Styled.Div width="200px">
      <FormControl key={filterField} size="small" fullWidth>
        <Select
          multiple
          sx={{ height: "40px" }}
          inputProps={{ "aria-label": "Without label" }}
          value={
            filterSelections.find(
              (selection) => selection.field === filterField
            )?.values || []
          }
          onChange={(event) => handleChange(event, filterField)}
          input={<OutlinedInput label={`${filterField} Filter`} />}
          renderValue={(selected) => (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 0.5,
              }}
            >
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  size="small"
                  color="primary"
                  variant={
                    filterSelections
                      .find((selection) => selection.field === filterField)
                      ?.values?.includes(value)
                      ? "filled"
                      : "outlined"
                  }
                  onClick={() => handleChipClick(filterField, value)}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {data
            ?.map((item) => item[filterField])
            .filter((value, index, self) => self.indexOf(value) === index)
            .map((uniqueValue) => (
              <MenuItem
                key={`${filterField}-${uniqueValue}`}
                value={uniqueValue}
                style={getStyles(
                  uniqueValue,
                  filterSelections.find(
                    (selection) => selection.field === filterField
                  )?.values || [],
                  theme
                )}
              >
                {uniqueValue}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </CP.Styled.Div>
  );
};
export default SelectFilterValues;
