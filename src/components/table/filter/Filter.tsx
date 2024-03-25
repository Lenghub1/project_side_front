import { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FilterIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import Chip from "@mui/material/Chip";
import Popper, { PopperPlacementType } from "@mui/material/Popper";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import CP from "@/components";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

interface TableFilterProps {
  headCells: any[];
  data: any[]; // Array of objects with keys corresponding to headCell.id
  onFilterChange: (filterKey: string, value: string) => void;
}

const TableFilter = ({ headCells, data, onFilterChange }: TableFilterProps) => {
  const [outerOpen, setOuterOpen] = useState(false);
  const [innerOpen, setInnerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [placement, setPlacement] = useState<PopperPlacementType>();
  const [selectedChip, setSelectedChip] = useState<string | null>(null);
  const [uniqueValues, setUniqueValues] = useState<string[]>([]);

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

  const handleInnerClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setInnerOpen((prev) => !prev);
  };

  const handleChipClick = (chipId: string) => {
    if (selectedChip === chipId) {
      setSelectedChip(null);
      setUniqueValues([]);
    } else {
      setSelectedChip(chipId);
      const values = Array.from(
        new Set(data.map((item) => item[chipId].toString()))
      );
      setUniqueValues(values);
      setOuterOpen(false);
      if (!innerOpen) {
        setInnerOpen(true);
      }
    }
  };

  const handleCloseInnerPopper = () => {
    setInnerOpen(false);
    setOuterOpen(true);
  };

  return (
    <Box>
      <IconButton onClick={handleOuterClick("bottom-start")}>
        {outerOpen ? <CloseIcon /> : <FilterIcon />}
      </IconButton>
      {outerOpen && (
        <Popper open={outerOpen} anchorEl={anchorEl} placement={placement}>
          <Paper sx={{ padding: 4 }}>
            <CP.Typography variant="body1">Filter List</CP.Typography>
            <Stack
              gap="16px"
              direction="column"
              padding="1rem 0"
              alignItems="flex-start"
            >
              {headCells.map((headCell) => (
                <Chip
                  key={headCell.id.toString()}
                  label={headCell.label}
                  variant={selectedChip === headCell.id ? "filled" : "outlined"}
                  size="small"
                  icon={
                    selectedChip === headCell.id ? <RemoveIcon /> : <AddIcon />
                  }
                  onClick={() => handleChipClick(headCell.id)}
                />
              ))}
            </Stack>
          </Paper>
        </Popper>
      )}
      {innerOpen && (
        <Popper open={innerOpen} anchorEl={anchorEl} placement={placement}>
          <Paper sx={{ padding: 4, maxHeight: "500px", overflowY: "scroll" }}>
            <CP.Styled.Flex>
              <IconButton aria-label="close" onClick={handleCloseInnerPopper}>
                <ArrowBackIosIcon fontSize="small" />
              </IconButton>
              <CP.Typography variant="body1">
                Unique Values for {selectedChip}
              </CP.Typography>
            </CP.Styled.Flex>
            <Stack
              gap="16px"
              direction="column"
              padding="1rem 0"
              alignItems="flex-start"
            >
              {uniqueValues.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  variant="outlined"
                  size="small"
                  onClick={() => onFilterChange(selectedChip!, value)}
                />
              ))}
            </Stack>
          </Paper>
        </Popper>
      )}
    </Box>
  );
};

export default TableFilter;
