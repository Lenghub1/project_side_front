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
import { Filter } from "@/utils/interfaces/Feature";
import { HeadCell } from "@/utils/interfaces/Table";

interface EnhancedTableProps<T> {
  headCells: HeadCell<T>[];
  rows: T[];
  tableName: string;
  pagination: any;
  onFilterChange: (filterFields: Filter[]) => void;
  onRequestSort: (id: keyof T) => void;
  onPageChange: (page: number) => void;
  error: React.ReactNode;
}

function EnhancedTable<T>({
  headCells,
  rows,
  tableName,
  pagination,
  onFilterChange,
  onRequestSort,
  onPageChange,
  error,
}: EnhancedTableProps<T>) {
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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

  const handleNextButtonClick = () => {
    setPage(page + 1);
    onPageChange(page + 1);
  };

  const handlePreviousButtonClick = () => {
    setPage(page - 1);
    onPageChange(page - 1);
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

  const emptyRows = page > 0 ? Math.max(0, rowsPerPage - rows.length) : 0;

  return (
    <Container sx={{ minWidth: "300px" }}>
      <Paper sx={{ mb: 2, padding: "1rem 0" }}>
        <EnhancedTableToolbar
          data={rows}
          name={tableName}
          headCells={headCells}
          onFilterChange={onFilterChange}
        />
        <TableContainer>
          <Table
            sx={{ width: "100%", textAlign: "start" }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead<T>
              headCells={headCells}
              onRequestSort={onRequestSort}
            />

            <TableBody>
              {error && (
                <TableRow>
                  <TableCell colSpan={headCells.length}>{error}</TableCell>
                </TableRow>
              )}
              {!error &&
                rows.map((row, rowIndex) => (
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
                      if (cell.visibility) {
                        if (cell.type === "ReactCell" && cell.element) {
                          return (
                            <TableCell key={cellIndex} align="left">
                              {cell.element(row)}
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell key={cellIndex} align="left">
                              {cellValue as React.ReactNode}
                            </TableCell>
                          );
                        }
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
          component="div"
          count={pagination?.total_docs}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={pagination?.perpage || 10}
          onRowsPerPageChange={handleChangeRowsPerPage}
          slotProps={{
            actions: {
              nextButtonIcon: { onClick: handleNextButtonClick },
              previousButton: { onClick: handlePreviousButtonClick },
            },
          }}
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
