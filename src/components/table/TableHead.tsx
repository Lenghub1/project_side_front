import {
  TableCell,
  TableSortLabel,
  TableHead,
  TableRow,
  Checkbox,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";

type Order = "asc" | "desc";

export interface HeadCell<T> {
  disablePadding: boolean;
  id: keyof T;
  label: string;
  numeric: boolean;
  filterable?: boolean;
  sortable?: boolean;
}

interface TableHeadCellProps<T> {
  headCell: HeadCell<T>;
  order: Order;
  orderBy: keyof T;
  onRequestSort: (property: keyof T) => void;
}

const TableHeadCell = <T,>({
  headCell,
  order,
  orderBy,
  onRequestSort,
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
      {headCell.sortable ? (
        <TableSortLabel
          active={orderBy === headCell.id}
          direction={orderBy === headCell.id ? order : "asc"}
          onClick={createSortHandler}
        >
          {headCell.label}
          {orderBy === headCell.id ? (
            <span style={visuallyHidden}>
              {order === "desc" ? "sorted descending" : "sorted ascending"}
            </span>
          ) : null}
        </TableSortLabel>
      ) : (
        <span>{headCell.label}</span>
      )}
    </TableCell>
  );
};

interface EnhancedTableHeadProps<T> {
  headCells: HeadCell<T>[];
  order: Order;
  orderBy: keyof T;
  isSelectable: boolean;
  onSelectClick: () => void;
  numSelected: number;
  rowCount: number;
  onRequestSort: (property: keyof T) => void;
}

function EnhancedTableHead<T>({
  order,
  orderBy,
  headCells,
  onRequestSort,
  isSelectable,
  onSelectClick,
  numSelected,
  rowCount,
}: EnhancedTableHeadProps<T>) {
  return (
    <TableHead>
      <TableRow>
        {isSelectable && (
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectClick}
            />
          </TableCell>
        )}
        {headCells.map((headCell) => (
          <TableHeadCell
            key={headCell.id as string}
            headCell={headCell}
            order={order}
            orderBy={orderBy}
            onRequestSort={onRequestSort}
          />
        ))}
      </TableRow>
    </TableHead>
  );
}

export default EnhancedTableHead;
