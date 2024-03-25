import {
  TableCell,
  TableSortLabel,
  Box,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";

type Order = "asc" | "desc";

export interface HeadCell<T> {
  disablePadding: boolean;
  id: keyof T;
  label: string;
  numeric: boolean;
  filterable?: boolean;
}

interface TableHeadCellProps<T> {
  headCell: HeadCell<T>;
  order: Order;
  orderBy: keyof T;
  onRequestSort: (property: keyof T) => void;
  // onFilterChange: (
  //   property: keyof T
  // ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TableHeadCell = <T,>({
  headCell,
  order,
  orderBy,
  onRequestSort,
  // onFilterChange,
}: TableHeadCellProps<T>) => {
  const createSortHandler = () => {
    onRequestSort(headCell.id);
  };

  return (
    <TableCell
      key={headCell.id as string}
      align={headCell.numeric ? "right" : "left"}
      padding={headCell.disablePadding ? "none" : "normal"}
      sortDirection={orderBy === headCell.id ? order : false}
    >
      <TableSortLabel
        active={orderBy === headCell.id}
        direction={orderBy === headCell.id ? order : "asc"}
        onClick={createSortHandler}
      >
        {headCell.label}
        {orderBy === headCell.id ? (
          <Box component="span" sx={visuallyHidden}>
            {order === "desc" ? "sorted descending" : "sorted ascending"}
          </Box>
        ) : null}
      </TableSortLabel>
    </TableCell>
  );
};

interface EnhancedTableHeadProps<T> {
  headCells: HeadCell<T>[];
  order: Order;
  orderBy: keyof T;
  onRequestSort: (property: keyof T) => void;
  onFilterChange: (
    property: keyof T
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const EnhancedTableHead = <T,>({
  headCells,
  order,
  orderBy,
  onRequestSort,
  onFilterChange,
}: EnhancedTableHeadProps<T>) => {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableHeadCell
            key={headCell.id as string}
            headCell={headCell}
            order={order}
            orderBy={orderBy}
            onRequestSort={onRequestSort}
            // onFilterChange={onFilterChange}
          />
        ))}
      </TableRow>
    </TableHead>
  );
};

export default EnhancedTableHead;
