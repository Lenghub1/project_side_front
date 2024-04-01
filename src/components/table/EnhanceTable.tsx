// EnhancedTable.tsx
import React, { useState } from "react";
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
import EnhancedTableToolbar from "./Toolbar";
import EnhancedTableHead from "./TableHead";
import CP from "..";

interface ReactCell<T> {
  id: string;
  label: string;
  type: "ReactCell";
  element: (row: T) => React.ReactNode;
  sortable: boolean;
  filterable?: boolean;
}

interface SortField {
  field: string;
  direction: "asc" | "desc";
}

interface EnhancedTableProps<T> {
  headCells: any[];
  rows: T[];
  rowCount: number;
  tableName: string;
  pagination: any;
  onFilterChange: (sortFields: SortField[]) => void;
  onRequestSort: (sortFields: SortField[]) => void;
}

type SortOrder = "asc" | "desc" | "none";

function EnhancedTable<T>({
  headCells,
  rows,
  rowCount,
  tableName,
  pagination,
  onFilterChange,
  onRequestSort,
}: EnhancedTableProps<T>) {
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [isSelectable, setIsSelectable] = useState(false);

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

  // Calculate the starting index and ending index for the current page
  const startIndex = page * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, rows.length);

  return (
    <Container>
      <Paper sx={{ mb: 2, padding: "1rem 0" }}>
        <EnhancedTableToolbar
          data={rows}
          name={tableName}
          headCells={headCells}
          onFilterChange={onFilterChange}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750, textAlign: "start" }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead<T>
              headCells={headCells}
              onRequestSort={onRequestSort}
            />

            <TableBody>
              {rows.slice(startIndex, endIndex).map((row, rowIndex) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={rowIndex}
                  selected={selectedRows.includes(row)}
                  onClick={() => isSelectable && handleRowClick(row)}
                  sx={{
                    cursor: isSelectable ? "pointer" : "default",
                  }}
                >
                  {isSelectable && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedRows.includes(row)}
                        onChange={() => isSelectable && handleRowClick(row)}
                      />
                    </TableCell>
                  )}
                  {headCells.map((cell, cellIndex) => {
                    const cellValue = row[cell.id];

                    if (cell.type === "ReactCell" && "element" in cell) {
                      return (
                        <TableCell key={cellIndex} align="left">
                          {(cell as ReactCell<T>).element(row)}
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
          count={pagination?.total_docs}
          rowsPerPage={pagination?.perpage}
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
