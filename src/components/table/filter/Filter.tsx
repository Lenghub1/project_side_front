import React, { useState, useCallback, useMemo } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Popper, { PopperPlacementType } from "@mui/material/Popper";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { useRecoilState, useRecoilValue } from "recoil";
import { dataToFilterState } from "@/store/filterStore";
import AddIcon from "@mui/icons-material/Add";
import FilterSection from "./FilterSection";
import { filterSelectionsState } from "@/store/api.feature";
import { FilterSelection } from "@/utils/interfaces/Feature";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import IconButton from "@mui/material/IconButton";

interface TableFilterProps {
  headCells: any[];
  onFilterChange: (filters: FilterSelection[]) => void;
}

const TableFilter = ({ headCells, onFilterChange }: TableFilterProps) => {
  const [outerOpen, setOuterOpen] = useState(false);
  const [innerOpen, setInnerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null); // Use a single anchor element for both poppers
  const [placement, setPlacement] = useState<PopperPlacementType>();
  const [filterOptions, setFilterOptions] = useState<Record<string, string>>(
    {}
  );
  const [filterSelections, setFilterSelections] = useRecoilState(
    filterSelectionsState
  );
  const dataToFilter = useRecoilValue(dataToFilterState);
  const [currentFilter, setCurrentFilter] = useState<string | undefined>();
  const [selectedOuterChip, setSelectedOuterChip] = useState<string | null>(
    null
  );

  const handleOuterClick = useCallback(
    (newPlacement: PopperPlacementType) =>
      (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        setOuterOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
        setSelectedOuterChip(null); // Clear selected chip
      },
    [placement]
  );

  const handleAddFilter = useCallback(
    (filterKey: string, event: React.MouseEvent<HTMLDivElement>) => {
      setSelectedOuterChip(filterKey);
      const exists = filterSelections.some(
        (selection) => selection.key === filterKey
      );

      if (!exists) {
        setFilterSelections((prevSelections) => [
          ...prevSelections,
          { key: filterKey, values: [] },
        ]);
      }

      setFilterOptions((prevOptions) => ({
        ...prevOptions,
        [filterKey]: "like",
      }));
      setCurrentFilter(filterKey);
      setOuterOpen(false);
      setInnerOpen(true);
    },
    [filterSelections, setFilterSelections]
  );

  const handleCloseInnerPopper = () => {
    setInnerOpen(false);
    setOuterOpen(true);
  };

  const handleClearFilters = useCallback(() => {
    onFilterChange([]);
    setFilterOptions({});
    setInnerOpen(false);
  }, [onFilterChange]);

  const filterSections = useMemo(() => {
    return filterSelections.map((selection) => ({
      key: selection.key,
      option: filterOptions[selection.key] || "",
    }));
  }, [filterSelections, filterOptions]);

  const renderedFilterSections = useMemo(() => {
    return filterSections.map((selection) => (
      <FilterSection
        key={selection.key}
        dataToFilter={dataToFilter}
        filterKey={selection.key}
        option={selection.option}
      />
    ));
  }, [filterSections, dataToFilter]);

  return (
    <Box>
      <Chip
        label="Add Filter"
        key="NewFilter"
        icon={<AddIcon />}
        onClick={handleOuterClick("bottom-start")}
      />

      <Popper open={outerOpen} anchorEl={anchorEl} placement={placement}>
        <Paper sx={{ padding: 4, maxHeight: "350px", width: "300px" }}>
          <Stack gap="16px" width="100%">
            {headCells.map((headCell) => (
              <Chip
                key={headCell.id.toString()}
                label={headCell.label}
                variant={filterOptions[headCell.id] ? "filled" : "outlined"}
                color="primary"
                size="small"
                onClick={(event) => handleAddFilter(headCell.id, event)}
              />
            ))}
            <Chip
              label="Clear Filters"
              color="default"
              size="small"
              onClick={handleClearFilters}
            />
          </Stack>
        </Paper>
      </Popper>

      <Popper open={innerOpen} anchorEl={anchorEl} placement={placement}>
        <Paper sx={{ padding: 4, maxHeight: "350px", width: "300px" }}>
          <IconButton aria-label="close" onClick={handleCloseInnerPopper}>
            <ArrowBackIosIcon fontSize="small" />
          </IconButton>

          {renderedFilterSections}
        </Paper>
      </Popper>
    </Box>
  );
};

export default TableFilter;
