import React, { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Chip from "@mui/material/Chip";
import Popper, { PopperPlacementType } from "@mui/material/Popper";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useRecoilState, useRecoilValue } from "recoil";
import { dataToFilterState, filteredDataState } from "@/store/filterStore";
import AddIcon from "@mui/icons-material/Add";

interface TableFilterProps {
  headCells: any[];
  onFilterChange: (filters: Record<string, string[]>) => void;
}

const TableFilter = ({ headCells, onFilterChange }: TableFilterProps) => {
  const [outerOpen, setOuterOpen] = useState(false);
  const [innerOpen, setInnerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [placement, setPlacement] = useState<PopperPlacementType>();
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});
  const [currentFilter, setCurrentFilter] = useState<string | undefined>();
  const [_, setFilteredData] = useRecoilState(filteredDataState);
  const dataToFilter = useRecoilValue(dataToFilterState);

  const handleOuterClick =
    (newPlacement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setOuterOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
      if (innerOpen) {
        setInnerOpen(false);
      }
    };

  const handleChipClick = (chipId: string) => {
    const updatedFilters = { ...selectedFilters };
    if (updatedFilters[chipId]) {
      delete updatedFilters[chipId];
      if (Object.keys(updatedFilters).length === 0) {
        setFilteredData({ isFilter: false, data: dataToFilter });
      }
    } else {
      setCurrentFilter(chipId);
      updatedFilters[chipId] = [];
    }
    const keys = Object.keys(updatedFilters);
    keys.forEach((key) => {
      if (updatedFilters[key].length === 0) delete updatedFilters[key];
    });
    setSelectedFilters(updatedFilters);
    setOuterOpen(false);
    setInnerOpen(true);
  };

  const handleValueClick = (chipId: string, value: string) => {
    const updatedFilters = { ...selectedFilters };
    if (!updatedFilters[chipId]) {
      updatedFilters[chipId] = [];
    }
    const index = updatedFilters[chipId].indexOf(value);
    if (index !== -1) {
      updatedFilters[chipId].splice(index, 1);
    } else {
      updatedFilters[chipId].push(value);
    }
    setSelectedFilters(updatedFilters);
    onFilterChange(updatedFilters);
    const filteredData = dataToFilter?.filter((item) =>
      Object.entries(updatedFilters).every(([key, value]) => {
        const itemValue = item[key].toString();
        const filterValues = value.map((val) => val.toString());
        if (filterValues.length === 0) {
          return true;
        } else if (filterValues.length === 1) {
          return filterValues.includes(itemValue);
        } else {
          return filterValues.some((filterValue) => filterValue === itemValue);
        }
      })
    );
    setFilteredData({ isFilter: true, data: filteredData });
  };

  const handleCloseInnerPopper = () => {
    setInnerOpen(false);
    setOuterOpen(true);
  };

  const handleClearFilters = () => {
    setSelectedFilters({});
    onFilterChange({});
    const filterState = { isFilter: false, data: _ };
    setFilteredData(filterState);
  };

  return (
    <Box>
      <Chip
        label="Add Filter"
        key="NewFilter"
        icon={<AddIcon />}
        onClick={handleOuterClick("bottom-start")}
      />

      {outerOpen && (
        <Popper open={outerOpen} anchorEl={anchorEl} placement={placement}>
          <Paper
            sx={{
              padding: 4,
              maxHeight: "350px",
              width: "300px",
            }}
          >
            <Stack gap="16px" width="100%">
              {headCells.map((headCell) => (
                <Chip
                  key={headCell.id.toString()}
                  label={headCell.label}
                  variant={selectedFilters[headCell.id] ? "filled" : "outlined"}
                  color="primary"
                  size="small"
                  icon={
                    selectedFilters[headCell.id] ? <CloseIcon /> : <AddIcon />
                  }
                  onClick={() => handleChipClick(headCell.id)}
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
      )}
      {innerOpen && currentFilter && (
        <Popper open={innerOpen} anchorEl={anchorEl} placement={placement}>
          <Paper
            sx={{
              padding: 4,
              maxHeight: "350px",
              width: "300px",
            }}
          >
            <Stack gap="16px" alignItems="flex-start">
              <IconButton aria-label="close" onClick={handleCloseInnerPopper}>
                <ArrowBackIosIcon fontSize="small" />
              </IconButton>
              <Stack gap="8px" width="100%">
                {dataToFilter
                  ?.map((item) => item[currentFilter].toString())
                  .filter((value, index, self) => self.indexOf(value) === index)
                  .map((uniqueValue) => (
                    <Chip
                      key={`${currentFilter}-${uniqueValue}`}
                      label={uniqueValue}
                      variant={
                        selectedFilters[currentFilter]?.includes(uniqueValue)
                          ? "filled"
                          : "outlined"
                      }
                      color="primary"
                      size="small"
                      onClick={() =>
                        handleValueClick(currentFilter, uniqueValue)
                      }
                    />
                  ))}
              </Stack>
            </Stack>
          </Paper>
        </Popper>
      )}
    </Box>
  );
};
export default TableFilter;
