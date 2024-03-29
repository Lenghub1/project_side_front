import React, { useState, useMemo } from "react";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Checkbox,
  FormControlLabel,
  Switch,
} from "@mui/material";
import CP from "..";
import EnhancedTableToolbar from "./Toolbar";
import EnhancedTableHead, { HeadCell } from "./TableHead";
import { getComparator, stableSort } from "@/utils/table.util";
import { SetStateAction } from "react";

type Order = "asc" | "desc";

interface ReactCell<T> {
  id: string;
  label: string;
  type: "ReactCell";
  element: (row: T) => React.ReactNode;
  sortable: boolean;
  sortFeild: keyof T;
  filterable?: boolean;
}

interface NormalCell {
  type?: "NormalCell";
}

type TableCellType<T> = ReactCell<T> | NormalCell;

interface EnhancedTableProps<T> {
  headCells: (HeadCell<T> & TableCellType<T>)[];
  rows: T[];
  order: Order;
  orderBy: keyof T;
  rowCount: number;
  tableName: string;
}

function EnhancedTable<T>({
  headCells,
  rows,
  order,
  orderBy,
  rowCount,
  tableName,
}: EnhancedTableProps<T>) {
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentOrder, setCurrentOrder] = useState<Order>(order);
  const [currentOrderBy, setCurrentOrderBy] = useState<keyof T>(orderBy);
  const [filters, setFilters] = useState<{ [key: string]: string }>(
    Object.fromEntries(headCells.map((cell) => [cell.id, ""]))
  );
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [isSelectable, setIsSelectable] = useState(false);
  const [sortedRows, setSortedRows] = useState<T[]>(rows);

  const handleRequestSort = (property: keyof T | string) => {
    const isAsc = currentOrderBy === property && currentOrder === "asc";
    setCurrentOrder(isAsc ? "desc" : "asc");
    setCurrentOrderBy(property as SetStateAction<keyof T>);

    if (typeof property === "string") {
      const headCell = headCells.find((cell) => cell.id === property);
      if (headCell && headCell.sortable) {
        if (headCell.type === "ReactCell" && "sortField" in headCell) {
          const isAsc =
            currentOrderBy === headCell.sortField && currentOrder === "asc";
          const sortedRows = stableSort(rows, (a: T, b: T) => {
            const valueA = a[headCell.sortField];
            const valueB = b[headCell.sortField];
            return isAsc
              ? valueA.localeCompare(valueB)
              : valueB.localeCompare(valueA);
          });
          setSortedRows(sortedRows);
        } else {
          const currentSortedRows = stableSort(
            rows as { [key in string | (keyof T & string)]: string }[],
            getComparator(isAsc ? "desc" : "asc", property)
          );
          setSortedRows(currentSortedRows as SetStateAction<T[]>);
        }
      }
    }
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const handleFilterChange =
    (property: keyof T) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value.toLowerCase();
      setFilters({ ...filters, [property]: value });
    };

  const handleRowClick = (row: T) => {
    const selectedIndex = selectedRows.indexOf(row);
    let newSelected: T[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedRows, row);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedRows.slice(1));
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelected = newSelected.concat(selectedRows.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedRows.slice(0, selectedIndex),
        selectedRows.slice(selectedIndex + 1)
      );
    }

    setSelectedRows(newSelected);
  };

  const handleSelectClick = () => {
    setIsSelectable((prev) => !prev);
    setSelectedRows([]);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(
        sortedRows as { [key in keyof T]: string }[],
        getComparator(currentOrder, currentOrderBy)
      ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [currentOrder, currentOrderBy, page, rowsPerPage, sortedRows, filters]
  );

  return (
    <Container>
      <Paper sx={{ mb: 2, padding: "1rem 0" }}>
        <EnhancedTableToolbar
          data={rows}
          name={tableName}
          headCells={headCells}
          onFilterChange={() => handleFilterChange}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750, textAlign: "start" }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead<T>
              order={currentOrder}
              orderBy={currentOrderBy}
              headCells={headCells}
              onRequestSort={handleRequestSort}
              isSelectable={isSelectable}
              onSelectClick={handleSelectClick}
              numSelected={selectedRows.length}
              rowCount={rowCount}
            />

            <TableBody>
              {visibleRows.map((row, rowIndex) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={rowIndex}
                  selected={selectedRows.includes(row as T)}
                  onClick={() => isSelectable && handleRowClick(row as T)}
                  sx={{
                    cursor: isSelectable ? "pointer" : "default",
                  }}
                >
                  {isSelectable && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedRows.includes(row as T)}
                        onChange={() =>
                          isSelectable && handleRowClick(row as T)
                        }
                      />
                    </TableCell>
                  )}
                  {headCells.map((cell, cellIndex) => {
                    const cellValue = row[cell.id];

                    if (cell.type === "ReactCell" && "element" in cell) {
                      return (
                        <TableCell key={cellIndex} align="left">
                          {(cell as ReactCell<T>).element(row as T)}
                        </TableCell>
                      );
                    } else {
                      return (
                        <TableCell key={cellIndex} align="left">
                          {cellValue}
                        </TableCell>
                      );
                    }
                  })}
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 32 : 54) * emptyRows,
                  }}
                >
                  <TableCell colSpan={headCells.length} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rowCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <CP.Styled.Flex justify="flex-start" padding="0 2rem">
          <CP.Button onClick={handleSelectClick} size="small" variant="text">
            {isSelectable ? "disable" : "select"}
          </CP.Button>
          {!!selectedRows.length && (
            <small>{selectedRows.length} selected</small>
          )}
        </CP.Styled.Flex>
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
        sx={{ color: (theme) => theme.palette.text.primary }}
      />
    </Container>
  );
}

export default EnhancedTable;
