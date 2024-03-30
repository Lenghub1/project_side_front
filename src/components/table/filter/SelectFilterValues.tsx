// // import * as React from "react";
// // import { Theme, useTheme } from "@mui/material/styles";
// // import Box from "@mui/material/Box";
// // import OutlinedInput from "@mui/material/OutlinedInput";
// // import MenuItem from "@mui/material/MenuItem";
// // import FormControl from "@mui/material/FormControl";
// // import Select, { SelectChangeEvent } from "@mui/material/Select";
// // import Chip from "@mui/material/Chip";

// // const ITEM_HEIGHT = 48;
// // const ITEM_PADDING_TOP = 8;
// // const MenuProps = {
// //   PaperProps: {
// //     style: {
// //       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
// //       width: 250,
// //     },
// //   },
// // };

// // function getStyles(name: string, personName: readonly string[], theme: Theme) {
// //   return {
// //     fontWeight:
// //       personName.indexOf(name) === -1
// //         ? theme.typography.fontWeightRegular
// //         : theme.typography.fontWeightMedium,
// //   };
// // }

// // interface SelectFilterValuesProps {
// //   data: { [key: string]: any }[]; // List of objects
// //   filterKey: string; // Key to use as the filter value
// //   filterOption: string; // Filter option like "position_like", "privilege_eq", etc.
// //   onSelectChange: (selectedValues: string[]) => void;
// //   handleValueClick: (filter: string, value: string, option: string) => void; // Added option parameter
// //   onCombinedFilterChange: (combinedFilterString: string) => void; // Callback function to pass the combined filter string to parent
// //   renderValue?: (selected: string[]) => React.ReactNode;
// // }

// // const SelectFilterValues: React.FC<SelectFilterValuesProps> = ({
// //   data,
// //   filterKey,
// //   filterOption,
// //   onSelectChange,
// //   handleValueClick,
// //   onCombinedFilterChange,
// //   renderValue,
// // }) => {
// //   const theme = useTheme();
// //   const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

// //   const handleChange = (event: SelectChangeEvent<typeof selectedValues>) => {
// //     const { value } = event.target;
// //     setSelectedValues(typeof value === "string" ? value.split(",") : value);
// //     onSelectChange(value);

// //     // Construct the combined filter string
// //     const combinedFilterString = constructFilterString(value);
// //     // Pass the combined filter string to the parent component
// //     onCombinedFilterChange(combinedFilterString);
// //   };

// //   // Function to construct the combined filter string
// //   const constructFilterString = (selectedValues: string[]) => {
// //     return selectedValues
// //       .map((selectedValue) => `${filterKey}_${filterOption}="${selectedValue}"`)
// //       .join("||");
// //   };

// //   return (
// //     <div>
// //       <FormControl size="small" sx={{ maxWidth: "200px" }}>
// //         <Select
// //           multiple
// //           value={selectedValues}
// //           onChange={handleChange}
// //           input={<OutlinedInput label="Chip" />}
// //           renderValue={
// //             renderValue ||
// //             ((selected) => {
// //               if (selected.length === 0) {
// //                 console.log(selected);
// //                 return <em>Placeholder</em>;
// //               }
// //               return (
// //                 <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
// //                   {selected.map((value) => (
// //                     <Chip
// //                       key={value}
// //                       label={value} // Include the filter option in the chip label
// //                       size="small"
// //                       variant={
// //                         selectedValues.includes(value) ? "filled" : "outlined"
// //                       }
// //                       onClick={
// //                         () => handleValueClick(filterKey, value, filterOption) // Pass the filter option
// //                       }
// //                     />
// //                   ))}
// //                 </Box>
// //               );
// //             })
// //           }
// //           MenuProps={MenuProps}
// //         >
// //           {data
// //             ?.map((item) => item[filterKey])
// //             .filter((value, index, self) => self.indexOf(value) === index)
// //             .map((uniqueValue) => (
// //               <MenuItem
// //                 key={`${filterKey}-${uniqueValue}`}
// //                 value={uniqueValue}
// //                 style={getStyles(uniqueValue, selectedValues, theme)}
// //               >
// //                 {uniqueValue}
// //               </MenuItem>
// //             ))}
// //         </Select>
// //       </FormControl>
// //     </div>
// //   );
// // };

// // export default SelectFilterValues;

// import * as React from "react";
// import { Theme, useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select, { SelectChangeEvent } from "@mui/material/Select";
// import Chip from "@mui/material/Chip";

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// function getStyles(name: string, personName: readonly string[], theme: Theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

// interface SelectFilterValuesProps {
//   data: { [key: string]: any }[]; // List of objects
//   filterKey: string; // Key to use as the filter value
//   filterOption: string; // Filter option like "like", "eq", etc.
//   onSelectChange: (selectedValues: string[]) => void;
//   onCombinedFilterChange: (combinedFilterString: string) => void; // Callback function to pass the combined filter string to parent
//   renderValue?: (selected: string[]) => React.ReactNode;
// }

// const SelectFilterValues: React.FC<SelectFilterValuesProps> = ({
//   data,
//   filterKey,
//   filterOption,
//   onSelectChange,
//   onCombinedFilterChange,
//   renderValue,
// }) => {
//   const theme = useTheme();
//   const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

//   const handleChange = (event: SelectChangeEvent<typeof selectedValues>) => {
//     const { value } = event.target;
//     setSelectedValues(typeof value === "string" ? value.split(",") : value);
//     onSelectChange(value);

//     console.log(value);
//     const combinedFilterString = constructFilterString(value);
//     // Pass the combined filter string to the parent component
//     onCombinedFilterChange(combinedFilterString);
//   };

//   // // Function to construct the combined filter string
//   // const constructFilterString = (selectedValues: string[]) => {
//   //   // Filter out duplicate values
//   //   const uniqueValues = Array.from(new Set(selectedValues));

//   //   // Construct the filter string
//   //   const filterString = uniqueValues
//   //     .map((selectedValue) => {
//   //       // Construct the filter string for the unique value
//   //       return `${filterKey}_="${selectedValue}"`;
//   //     })
//   //     .join("||");

//   //   return filterString;
//   // };
//   // Function to construct the combined filter string
//   const constructFilterString = (selectedValues: string[]) => {
//     // Filter out duplicate values
//     const uniqueValues = Array.from(new Set(selectedValues));

//     // Construct the filter string
//     const filterString = uniqueValues
//       .map((selectedValue) => {
//         // Construct the filter string for the unique value with filter option
//         return `${filterKey}_${filterOption}="${selectedValue}"`;
//       })
//       .join("||");

//     return filterString;
//   };

//   // Function to handle click on a filter value
//   const handleChipClick = (value: string) => {
//     const updatedValues = selectedValues.includes(value)
//       ? selectedValues.filter((v) => v !== value)
//       : [...selectedValues, value];
//     setSelectedValues(updatedValues);

//     // Construct the combined filter string
//     const combinedFilterString = constructFilterString(updatedValues);
//     // Pass the combined filter string to the parent component
//     onCombinedFilterChange(combinedFilterString);
//   };

//   return (
//     <div>
//       <FormControl size="small" sx={{ maxWidth: "200px" }}>
//         <Select
//           multiple
//           value={selectedValues}
//           onChange={handleChange}
//           input={<OutlinedInput label="Chip" />}
//           renderValue={
//             renderValue ||
//             ((selected) => {
//               if (selected.length === 0) {
//                 console.log(selected);
//                 return <em>Placeholder</em>;
//               }
//               return (
//                 <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//                   {selected.map((value) => (
//                     <Chip
//                       key={value}
//                       label={value} // Include the filter option in the chip label
//                       size="small"
//                       variant={
//                         selectedValues.includes(value) ? "filled" : "outlined"
//                       }
//                       onClick={
//                         () => handleChipClick(value) // Pass the filter option
//                       }
//                     />
//                   ))}
//                 </Box>
//               );
//             })
//           }
//           MenuProps={MenuProps}
//         >
//           {data
//             ?.map((item) => item[filterKey])
//             .filter((value, index, self) => self.indexOf(value) === index)
//             .map((uniqueValue) => (
//               <MenuItem
//                 key={`${filterKey}-${uniqueValue}`}
//                 value={uniqueValue}
//                 style={getStyles(uniqueValue, selectedValues, theme)}
//               >
//                 {uniqueValue}
//               </MenuItem>
//             ))}
//         </Select>
//       </FormControl>
//     </div>
//   );
// };

// export default SelectFilterValues;

// import * as React from "react";
// import { Theme, useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select, { SelectChangeEvent } from "@mui/material/Select";
// import Chip from "@mui/material/Chip";

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// function getStyles(name: string, personName: readonly string[], theme: Theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

// interface SelectFilterValuesProps {
//   data: { [key: string]: any }[]; // List of objects
//   filterKey: string; // Key to use as the filter value
//   filterOption: string; // Filter option like "position_like", "privilege_eq", etc.
//   onSelectChange: (selectedValues: string[]) => void;
//   handleValueClick: (filter: string, value: string, option: string) => void; // Added option parameter
//   onCombinedFilterChange: (combinedFilterString: string) => void; // Callback function to pass the combined filter string to parent
//   renderValue?: (selected: string[]) => React.ReactNode;
// }

// const SelectFilterValues: React.FC<SelectFilterValuesProps> = ({
//   data,
//   filterKey,
//   filterOption,
//   onSelectChange,
//   onCombinedFilterChange,
//   renderValue,
// }) => {
//   const theme = useTheme();
//   const [selectedValues, setSelectedValues] = React.useState<{
//     [key: string]: string[];
//   }>({ [filterKey]: [] });

//   const handleChange = (event: SelectChangeEvent<typeof selectedValues>) => {
//     const { value } = event.target;
//     setSelectedValues((prevState) => ({
//       ...prevState,
//       [filterKey]: typeof value === "string" ? value.split(",") : value,
//     }));
//     onSelectChange(value);

//     // Construct the combined filter string only for the current column
//     const combinedFilterString = constructFilterString(filterKey, {
//       ...selectedValues,
//       [filterKey]: typeof value === "string" ? value.split(",") : value,
//     });
//     // Pass the combined filter string to the parent component
//     onCombinedFilterChange(combinedFilterString);
//   };

//   // Function to construct the combined filter string for a specific column
//   const constructFilterString = (
//     currentFilterKey: string,
//     selectedValues: { [key: string]: string[] }
//   ) => {
//     const filterString = selectedValues[currentFilterKey]
//       ?.map(
//         (selectedValue) =>
//           `${currentFilterKey}_${filterOption}="${selectedValue}"`
//       )
//       .join("||");
//     return filterString || "";
//   };

//   // Function to handle click on a filter value
//   const handleChipClick = (value: string) => {
//     const updatedValues = selectedValues[filterKey]?.includes(value)
//       ? selectedValues[filterKey]?.filter((v) => v !== value)
//       : [...(selectedValues[filterKey] || []), value];
//     setSelectedValues((prevState) => ({
//       ...prevState,
//       [filterKey]: updatedValues,
//     }));

//     // Construct the combined filter string
//     const combinedFilterString = constructFilterString(filterKey, {
//       ...selectedValues,
//       [filterKey]: updatedValues,
//     });
//     // Pass the combined filter string to the parent component
//     onCombinedFilterChange(combinedFilterString);
//   };

//   return (
//     <div>
//       <FormControl size="small" sx={{ maxWidth: "200px" }}>
//         <Select
//           multiple
//           value={selectedValues[filterKey]} // Use selectedValues[filterKey] as the value
//           onChange={handleChange}
//           input={<OutlinedInput label="Chip" />}
//           renderValue={
//             renderValue ||
//             ((selected) => {
//               if (selected.length === 0) {
//                 console.log(selected);
//                 return <em>Placeholder</em>;
//               }
//               return (
//                 <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//                   {selected.map((value) => (
//                     <Chip
//                       key={value}
//                       label={value} // Include the filter option in the chip label
//                       size="small"
//                       variant={
//                         (selectedValues[filterKey] || []).includes(value)
//                           ? "filled"
//                           : "outlined"
//                       }
//                       onClick={
//                         () => handleChipClick(value) // Pass the filter option
//                       }
//                     />
//                   ))}
//                 </Box>
//               );
//             })
//           }
//           MenuProps={MenuProps}
//         >
//           {data
//             ?.map((item) => item[filterKey])
//             .filter((value, index, self) => self.indexOf(value) === index)
//             .map((uniqueValue) => (
//               <MenuItem
//                 key={`${filterKey}-${uniqueValue}`}
//                 value={uniqueValue}
//                 style={getStyles(
//                   uniqueValue,
//                   selectedValues[filterKey] || [],
//                   theme
//                 )}
//               >
//                 {uniqueValue}
//               </MenuItem>
//             ))}
//         </Select>
//       </FormControl>
//     </div>
//   );
// };

// export default SelectFilterValues;

import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { filterSelectionsState } from "@/store/api.feature";
import { useRecoilState } from "recoil";

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
interface SelectFilterValuesProps {
  data: { [key: string]: any }[]; // List of objects
  filterKeys?: string[]; // Keys to use as the filter values
  filterOption: string; // Filter option like "position_like", "privilege_eq", etc.
}

interface FilterSelection {
  key: string;
  values: string[];
}

const SelectFilterValues: React.FC<SelectFilterValuesProps> = ({
  data,
  filterKeys = [],
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
      const index = prevFilterSelections.findIndex(
        (selection) => selection.key === filterKey
      );

      if (index !== -1) {
        // Update existing filter selection
        return prevFilterSelections.map((selection) =>
          selection.key === filterKey
            ? { ...selection, values: updatedValues }
            : selection
        );
      } else {
        // Create a new filter selection
        return [
          ...prevFilterSelections,
          { key: filterKey, values: updatedValues },
        ];
      }
    });
  };

  const handleChipClick = (filterKey: string, value: string) => {
    setFilterSelections((prevFilterSelections) => {
      const index = prevFilterSelections.findIndex(
        (selection) => selection.key === filterKey
      );

      if (index !== -1) {
        // Update existing filter selection
        const updatedValues = prevFilterSelections[index].values.includes(value)
          ? prevFilterSelections[index].values.filter((v) => v !== value)
          : [...prevFilterSelections[index].values, value];

        return prevFilterSelections.map((selection) =>
          selection.key === filterKey
            ? { ...selection, values: updatedValues }
            : selection
        );
      } else {
        // Create a new filter selection
        return [...prevFilterSelections, { key: filterKey, values: [value] }];
      }
    });
  };

  return (
    <div>
      {filterKeys.map((filterKey) => (
        <FormControl key={filterKey} size="small" sx={{ maxWidth: "200px" }}>
          <Select
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
      ))}
    </div>
  );
};

export default SelectFilterValues;
