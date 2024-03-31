import React from "react";
import TextField from "@mui/material/TextField";
import FilterOptions from "./FilterOptions";
import SelectFilterValues from "./SelectFilterValues";
import CP from "@/components";
import { useRecoilState } from "recoil";
import { filterSelectionsState } from "@/store/api.feature";

interface FilterSectionProps {
  dataToFilter: any[];
  filterKey: string;
  option: string;
  handleOptionChange: (selectedValue: string) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  dataToFilter,
  filterKey,
  option,
  handleOptionChange,
}) => {
  const [filterSelections, setFilterSelections] = useRecoilState(
    filterSelectionsState
  );

  const handleChange = (selectedValues: string[]) => {
    setFilterSelections((prevFilterSelections) => {
      const existingSelectionIndex = prevFilterSelections.findIndex(
        (selection) => selection.key === filterKey
      );

      if (existingSelectionIndex !== -1) {
        // If there's an existing selection for the current filterKey
        const existingSelection = prevFilterSelections[existingSelectionIndex];
        const updatedSelection = {
          ...existingSelection,
          option: option,
          values: selectedValues,
        };
        const updatedFilterSelections = [...prevFilterSelections];
        updatedFilterSelections[existingSelectionIndex] = updatedSelection;
        return updatedFilterSelections;
      } else {
        // If there's no existing selection for the current filterKey
        return [
          ...prevFilterSelections,
          { key: filterKey, option: option, values: selectedValues },
        ];
      }
    });
  };

  return (
    <CP.Styled.Flex
      items="flex-start"
      gap="8px"
      width="100%"
      justify="flex-start"
    >
      <TextField
        disabled
        defaultValue={filterKey}
        size="small"
        sx={{ width: "100px" }}
      />
      <FilterOptions
        data={filterOptions}
        onSelectChange={(selectedOption) => handleOptionChange(selectedOption)}
      />
      <SelectFilterValues
        data={dataToFilter}
        filterKey={filterKey}
        filterOption={option}
      />
    </CP.Styled.Flex>
  );
};

const MemoizedFilterSection = React.memo(FilterSection);
export default MemoizedFilterSection;
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
