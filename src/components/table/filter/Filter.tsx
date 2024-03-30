// import TextField from "@mui/material/TextField";
// import React, { useState, useEffect } from "react";
// import Box from "@mui/material/Box";
// import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";
// import Chip from "@mui/material/Chip";
// import Popper, { PopperPlacementType } from "@mui/material/Popper";
// import Paper from "@mui/material/Paper";
// import Stack from "@mui/material/Stack";
// import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// import { useRecoilState, useRecoilValue } from "recoil";
// import { dataToFilterState, filteredDataState } from "@/store/filterStore";
// import AddIcon from "@mui/icons-material/Add";
// import { Filter } from "@/utils/interfaces/Feature";
// import CP from "@/components";
// import FilterOptions from "./FilterOptions";
// import SelectFilterValues from "./SelectFilterValues";

// interface TableFilterProps {
//   headCells: any[];
//   onFilterChange: (filters: Filter[]) => void;
// }

// const TableFilter = ({ headCells, onFilterChange }: TableFilterProps) => {
//   const [outerOpen, setOuterOpen] = useState(false);
//   const [innerOpen, setInnerOpen] = useState(false);
//   const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
//   const [placement, setPlacement] = useState<PopperPlacementType>();
//   const [selectedFilters, setSelectedFilters] = useState<
//     Record<string, string[]>
//   >({});
//   const [currentFilter, setCurrentFilter] = useState<string | undefined>();
//   const [_, setFilteredData] = useRecoilState(filteredDataState);
//   const [selectedFilterValues, setSelectedFilterValues] = useState("");
//   const [selectFilterOption, setSelectFilterOption] = useState("");
//   const [combinedFilterString, setCombinedFilterString] = useState("");

//   const dataToFilter = useRecoilValue(dataToFilterState);

//   const handleOuterClick =
//     (newPlacement: PopperPlacementType) =>
//     (event: React.MouseEvent<HTMLButtonElement>) => {
//       setAnchorEl(event.currentTarget);
//       setOuterOpen((prev) => placement !== newPlacement || !prev);
//       setPlacement(newPlacement);
//       if (innerOpen) {
//         setInnerOpen(false);
//       }
//     };

//   const handleChipClick = (chipId: string) => {
//     const updatedFilters = { ...selectedFilters };
//     if (updatedFilters[chipId]) {
//       delete updatedFilters[chipId];
//       if (Object.keys(updatedFilters).length === 0) {
//         setFilteredData({ isFilter: false, data: dataToFilter });
//       }
//     } else {
//       setCurrentFilter(chipId);
//       updatedFilters[chipId] = [];
//     }
//     const keys = Object.keys(updatedFilters);
//     keys.forEach((key) => {
//       if (updatedFilters[key].length === 0) delete updatedFilters[key];
//     });
//     setSelectedFilters(updatedFilters);
//     setOuterOpen(false);
//     setInnerOpen(true);
//   };

//   const handleCloseInnerPopper = () => {
//     setInnerOpen(false);
//     setOuterOpen(true);
//   };

//   const handleClearFilters = () => {
//     setSelectedFilters({});
//     onFilterChange([]);
//     const filterState = { isFilter: false, data: _ };
//     setFilteredData(filterState);
//   };

//   const handleSelectChange = (selectedValue: any) => {
//     setSelectFilterOption(selectedValue);
//   };

//   const handleValuesSelectChange = (selectedValue: any) => {
//     setSelectedFilterValues(selectedValue);
//   };

//   const handleFilterOptionChange = (newOption: string) => {
//     setCombinedFilterString(newOption);
//     console.log(newOption);
//   };

//   return (
//     <Box>
//       <Chip
//         label="Add Filter"
//         key="NewFilter"
//         icon={<AddIcon />}
//         onClick={handleOuterClick("bottom-start")}
//       />

//       {outerOpen && (
//         <Popper open={outerOpen} anchorEl={anchorEl} placement={placement}>
//           <Paper
//             sx={{
//               padding: 4,
//               maxHeight: "350px",
//               width: "300px",
//             }}
//           >
//             <Stack gap="16px" width="100%">
//               {headCells.map((headCell) => (
//                 <Chip
//                   key={headCell.id.toString()}
//                   label={headCell.label}
//                   variant={selectedFilters[headCell.id] ? "filled" : "outlined"}
//                   color="primary"
//                   size="small"
//                   icon={
//                     selectedFilters[headCell.id] ? <CloseIcon /> : <AddIcon />
//                   }
//                   onClick={() => handleChipClick(headCell.id)} // Adjusted
//                 />
//               ))}
//               <Chip
//                 label="Clear Filters"
//                 color="default"
//                 size="small"
//                 onClick={handleClearFilters}
//               />
//             </Stack>
//           </Paper>
//         </Popper>
//       )}
//       {innerOpen && currentFilter && (
//         <Popper open={innerOpen} anchorEl={anchorEl} placement={placement}>
//           <Paper
//             sx={{
//               padding: 4,
//               maxHeight: "350px",
//               overflowY: "scroll",
//             }}
//           >
//             <Stack gap="16px" alignItems="flex-start">
//               <IconButton aria-label="close" onClick={handleCloseInnerPopper}>
//                 <ArrowBackIosIcon fontSize="small" />
//               </IconButton>
//               <CP.Styled.Flex items="flex-start" gap="8px">
//                 <TextField disabled defaultValue={currentFilter} size="small" />
//                 <FilterOptions onSelectChange={handleSelectChange} />
//                 <SelectFilterValues
//                   data={dataToFilter}
//                   filterKey={currentFilter}
//                   filterOption={selectFilterOption}
//                   onSelectChange={handleValuesSelectChange}
//                   onCombinedFilterChange={handleFilterOptionChange}
//                 />
//               </CP.Styled.Flex>
//             </Stack>
//           </Paper>
//         </Popper>
//       )}
//     </Box>
//   );
// };
// export default TableFilter;

import TextField from "@mui/material/TextField";
import React, { useState, useEffect } from "react";
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
import { Filter } from "@/utils/interfaces/Feature";
import CP from "@/components";
import FilterOptions from "./FilterOptions";
import SelectFilterValues from "./SelectFilterValues";
import { filterSelectionsState } from "@/store/api.feature";

interface TableFilterProps {
  headCells: any[];
  onFilterChange: (filters: Filter[]) => void;
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
  const [selectedFilterValues, setSelectedFilterValues] = useState("");
  const [selectFilterOption, setSelectFilterOption] = useState("");
  const [combinedFilterString, setCombinedFilterString] = useState("");
  const [filterSelections, setFilterSelections] = useRecoilState(
    filterSelectionsState
  );

  // Function to handle click on "Apply" button
  const handleApplyFilters = () => {
    // Combine selected filter keys, options, and values into a string
    const combinedFilterString = filterSelections
      .map((selection) => {
        const { key, option, values } = selection;
        return values.map((value) => `${key}_${option}="${value}"`).join("||");
      })
      .join("&");

    // Pass the combined filter string to the parent component or perform any other action
    console.log(combinedFilterString);
  };

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

  const handleCloseInnerPopper = () => {
    setInnerOpen(false);
    setOuterOpen(true);
  };

  const handleClearFilters = () => {
    setSelectedFilters({});
    onFilterChange([]);
    const filterState = { isFilter: false, data: _ };
    setFilteredData(filterState);
  };

  const handleSelectChange = (selectedValue: any) => {
    setSelectFilterOption(selectedValue);
  };

  const handleValuesSelectChange = (selectedValue: any) => {
    setSelectedFilterValues(selectedValue);
  };

  const handleFilterOptionChange = (newOption: string) => {
    setCombinedFilterString(newOption);
    console.log(newOption);
  };
  console.log(filterSelections);
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
                  onClick={() => handleChipClick(headCell.id)} // Adjusted
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
              overflowY: "scroll",
            }}
          >
            <Stack gap="16px" alignItems="flex-start">
              <IconButton aria-label="close" onClick={handleCloseInnerPopper}>
                <ArrowBackIosIcon fontSize="small" />
              </IconButton>
              <CP.Styled.Flex items="flex-start" gap="8px">
                <TextField disabled defaultValue={currentFilter} size="small" />
                <FilterOptions onSelectChange={handleSelectChange} />
                <SelectFilterValues
                  data={dataToFilter}
                  filterKeys={[currentFilter]} // Pass filterKeys as an array with the currentFilter
                  filterOption={selectFilterOption}
                  onSelectChange={handleValuesSelectChange}
                  onCombinedFilterChange={handleFilterOptionChange}
                />
              </CP.Styled.Flex>
            </Stack>
          </Paper>
        </Popper>
      )}
    </Box>
  );
};
export default TableFilter;
