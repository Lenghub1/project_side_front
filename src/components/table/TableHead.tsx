import { TableCell, TableSortLabel, TableRow, TableHead } from "@mui/material";
import { useState } from "react";
import { HeadCell } from "@/utils/interfaces/Table";
import Checkbox from "@mui/material/Checkbox";
interface TableHeadCellProps<T> {
  headCell: HeadCell<T>;
  onRequestSort: (id: keyof T) => void;
}

type SortOrder = "asc" | "desc" | "none";

const TableHeadCell = <T,>({
  headCell,
  onRequestSort,
}: TableHeadCellProps<T>) => {
  const [order, setOrder] = useState<SortOrder>("none");

  const createSortHandler = () => {
    let newOrder: SortOrder;
    if (order === "none") {
      newOrder = "asc";
    } else if (order === "asc") {
      newOrder = "desc";
    } else {
      newOrder = "none";
    }
    setOrder(newOrder);
    onRequestSort(headCell.id);
  };

  return (
    <TableCell
      key={headCell.id as string}
      align={headCell.numeric ? "right" : "left"}
      padding={headCell.disablePadding ? "none" : "normal"}
    >
      {headCell.sortable ? (
        <TableSortLabel
          active={order !== "none"}
          direction={order !== "none" ? order : undefined}
          onClick={createSortHandler}
        >
          {headCell.label}
        </TableSortLabel>
      ) : (
        <span>{headCell.label}</span>
      )}
    </TableCell>
  );
};

interface EnhancedTableHeadProps<T> {
  headCells: HeadCell<T>[];
  isSelectable: boolean;
  onRequestSort: (id: keyof T) => void;
}

function EnhancedTableHead<T>({
  headCells,
  isSelectable,
  onRequestSort,
}: EnhancedTableHeadProps<T>) {
  return (
    <TableHead>
      <TableRow>
        {isSelectable && (
          <TableCell padding="checkbox">
            <Checkbox disabled />
          </TableCell>
        )}
        {headCells.map((headCell) => {
          return (
            headCell.visibility && (
              <TableHeadCell
                key={headCell.id as string}
                headCell={headCell}
                onRequestSort={onRequestSort}
              />
            )
          );
        })}
      </TableRow>
    </TableHead>
  );
}

export default EnhancedTableHead;
