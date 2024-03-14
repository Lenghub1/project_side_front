import * as React from "react";
import CP from "..";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import EnhancedTableToolbar from "./Toolbar";
import EnhancedTableHead, { HeadCell } from "./TableHead";
import { getComparator, stableSort } from "@/utils/table.util";

type Order = "asc" | "desc";

interface EnhancedTableProps<T> {
  headCells: HeadCell<T>[];
  rows: T[];
  order: Order;
  orderBy: keyof T;
  rowCount: number;
  tableName: string;
  actionCell?: (row: T) => React.ReactNode;
}

/**
 * EnhancedTable Component
 *
 * This component displays an enhanced table with sorting, pagination, dense padding, and optional action cells.
 *
 * Props:
 *   - headCells: An array of objects defining the table header cells.
 *   - rows: An array of data objects to be displayed in the table rows.
 *   - order: The current sorting order ('asc' for ascending, 'desc' for descending).
 *   - orderBy: The currently sorted column key.
 *   - rowCount: The total number of rows.
 *   - tableName: The name of the table.
 *   - actionCell: An optional function that returns ReactNode to be rendered in an additional action cell for each row.
 *
 * @param {Array} headCells - An array of objects defining the table header cells.
 * @param {Array} rows - An array of data objects to be displayed in the table rows.
 * @param {string} order - The current sorting order ('asc' for ascending, 'desc' for descending).
 * @param {string} orderBy - The currently sorted column key.
 * @param {number} rowCount - The total number of rows.
 * @param {string} tableName - The name of the table.
 * @param {Function} [actionCell] - An optional function that returns ReactNode to be rendered in an additional action cell for each row.
 *
 * @returns {JSX.Element} React component
 */
function EnhancedTable<T>({
  headCells,
  rows,
  order,
  orderBy,
  rowCount,
  tableName,
  actionCell,
}: EnhancedTableProps<T>) {
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [currentOrder, setCurrentOrder] = React.useState<Order>(order);
  const [currentOrderBy, setCurrentOrderBy] = React.useState<keyof T>(orderBy);

  const handleRequestSort = (property: keyof T) => {
    const isAsc = currentOrderBy === property && currentOrder === "asc";
    setCurrentOrder(isAsc ? "desc" : "asc");
    setCurrentOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
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

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(currentOrder, currentOrderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [currentOrder, currentOrderBy, page, rowsPerPage, rows]
  );

  return (
    <CP.Container>
      <Paper sx={{ mb: 2 }}>
        <EnhancedTableToolbar name={tableName} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750, textAlign: "start" }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead<T>
              order={currentOrder}
              orderBy={currentOrderBy}
              rowCount={rowCount}
              headCells={
                actionCell
                  ? [
                      ...headCells,
                      {
                        disablePadding: false,
                        id: "action",
                        label: "Action",
                        numeric: false,
                      },
                    ]
                  : headCells
              }
              onRequestSort={handleRequestSort}
            />

            <TableBody>
              {visibleRows.map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    sx={{
                      cursor: "default",
                    }}
                  >
                    {headCells.map((cell) => (
                      <TableCell key={cell.id} align="left">
                        {row[cell.id]}
                      </TableCell>
                    ))}

                    {actionCell && (
                      <TableCell align="left">{actionCell(row)}</TableCell>
                    )}
                  </TableRow>
                );
              })}
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
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
        sx={{ color: (theme) => theme.palette.text.primary }}
      />
    </CP.Container>
  );
}

export default EnhancedTable;
