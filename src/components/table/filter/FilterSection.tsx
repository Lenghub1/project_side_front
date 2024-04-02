import React from "react";
import TextField from "@mui/material/TextField";
import FilterOptions from "./FilterOptions";
import SelectFilterValues from "./SelectFilterValues";
import CP from "@/components";

interface FilterSectionProps {
  dataToFilter: any[];
  filterField: string;
  filterClause: string;
  handleOptionChange: (selectedValue: string) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  dataToFilter,
  filterField,
  filterClause,
  handleOptionChange,
}) => {
  return (
    <CP.Styled.Flex gap="8px" width="100%" justify="flex-start">
      <TextField
        disabled
        defaultValue={filterField}
        size="small"
        sx={{ width: "100px" }}
      />
      <FilterOptions
        data={filterOptions}
        onSelectChange={(selectedOption) => handleOptionChange(selectedOption)}
      />
      <SelectFilterValues
        data={dataToFilter}
        filterField={filterField}
        logicalClause={filterClause}
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
