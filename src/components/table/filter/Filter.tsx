import React, { useState, useCallback, useMemo, useEffect } from "react";
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
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import IconButton from "@mui/material/IconButton";
import CP from "@/components";
import SnackBar from "@/components/snackBar/SnackBar";
import { Filter } from "@/utils/interfaces/Feature";
interface TableFilterProps {
  headCells: any[];
  onFilterChange: (filters: Filter[]) => void;
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
  const [, setCurrentFilter] = useState<string | undefined>();
  const [, setSelectedOuterChip] = useState<string | null>(null);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const handleOptionChanging = (filterKey: string, selectedOption: string) => {
    setFilterSelections((prevFilterSelections) => {
      const index = prevFilterSelections.findIndex(
        (selection) => selection.field === filterKey
      );

      if (index !== -1) {
        const updatedSelections = [...prevFilterSelections];
        updatedSelections[index] = {
          ...updatedSelections[index],
          logicalClause: selectedOption,
        };

        return updatedSelections;
      }
      return prevFilterSelections;
    });
  };

  const handleOuterClick = useCallback(
    (newPlacement: PopperPlacementType) =>
      (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        setOuterOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
        setSelectedOuterChip(null);
      },
    [placement]
  );

  const handleAddFilter = (filterKey: string) => {
    const exists = filterSelections.some(
      (selection) => selection.field === filterKey
    );

    if (!exists) {
      setFilterSelections((prevSelections) => [
        ...prevSelections,
        { field: filterKey, logicalClause: "", values: [] },
      ]);
    }

    setCurrentFilter(filterKey);
    setOuterOpen(false);
    setInnerOpen(true);
  };
  const handleCloseInnerPopper = () => {
    setInnerOpen(false);
    setOuterOpen(true);
  };

  const handleClearFilters = useCallback(() => {
    onFilterChange([]);
    setFilterSelections([]);
    setFilterOptions({});
    setInnerOpen(false);
  }, [onFilterChange]);

  const filterSections = useMemo(() => {
    return filterSelections.map((selection: Filter) => ({
      field: selection.field,
      logicalClause: filterOptions[selection.field] || "",
    }));
  }, [filterSelections, filterOptions]);

  const renderedFilterSections = useMemo(() => {
    return filterSections.map((selection) => (
      <FilterSection
        key={selection.field}
        dataToFilter={dataToFilter}
        filterField={selection.field}
        filterClause={selection.logicalClause}
        handleOptionChange={(selectedOption) =>
          handleOptionChanging(selection.field, selectedOption)
        }
      />
    ));
  }, [filterSections, dataToFilter]);
  const areAllFiltersFilled = () => {
    return filterSelections.every(
      (selection) => selection.values!.length > 0 && selection.logicalClause
    );
  };

  const handleApplyFilter = () => {
    onFilterChange(filterSelections);
    setOpenSnackBar(true);
    setInnerOpen(false);
  };

  useEffect(() => {}, [openSnackBar]);
  return (
    <Box>
      <SnackBar open={openSnackBar} message="Filter had been applied" />
      <Chip
        label="Add Filter"
        key="NewFilter"
        icon={<AddIcon />}
        onClick={handleOuterClick("bottom-start")}
      />

      <Popper open={outerOpen} anchorEl={anchorEl} placement={placement}>
        <Paper sx={{ padding: 4, maxHeight: "350px", width: "300px" }}>
          <Stack gap="16px" width="100%">
            {headCells.map(
              (headCell) =>
                headCell.filterable && (
                  <Chip
                    key={headCell.id.toString()}
                    label={headCell.label}
                    variant={filterOptions[headCell.id] ? "filled" : "outlined"}
                    color="primary"
                    onClick={() => handleAddFilter(headCell.id)}
                  />
                )
            )}
            <Chip
              label="Clear Filters"
              color="default"
              onClick={handleClearFilters}
            />
          </Stack>
        </Paper>
      </Popper>

      <Popper open={innerOpen} anchorEl={anchorEl} placement={placement}>
        <Paper sx={{ padding: 4, maxHeight: "350px", width: "500px" }}>
          <Stack gap={2}>
            <CP.Styled.Flex justify="flex-start">
              <IconButton aria-label="close" onClick={handleCloseInnerPopper}>
                <ArrowBackIosIcon fontSize="small" />
              </IconButton>
            </CP.Styled.Flex>

            {renderedFilterSections}
            {areAllFiltersFilled() && (
              <CP.Button onClick={handleApplyFilter} size="small">
                Apply Filter
              </CP.Button>
            )}
          </Stack>
        </Paper>
      </Popper>
    </Box>
  );
};

export default TableFilter;
