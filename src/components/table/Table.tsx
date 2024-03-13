import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import FilterListIcon from "@mui/icons-material/FilterList";
import Box from "@mui/material/Box";
import { Avatar, Container } from "@mui/material";
import { Employement } from "@/utils/interfaces/Employment";
import CP from "..";
import EnhancedTableHead, { HeadCell } from "./TableHead";
import { socket } from "src/socket";
import { deleteEmployee, updateEmployee } from "@/api/employee";
import { handleApiRequest } from "@/api";

const orgId = "30ed163a-f86f-4b6d-8a9e-eb4263e5a9de";

interface Data extends Employement {
  action: string;
}
interface EmploymentWithAction extends Employement {
  action: string;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: string }, b: { [key in Key]: string }) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface EnhancedTableProps<T> {
  rows: T[];
  onRequestSort: (property: keyof T, event: React.MouseEvent<unknown>) => void;
  order: Order;
  orderBy: keyof T;
  rowCount: number;
}

function EnhancedTableToolbar() {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Employee Registrations
      </Typography>

      <Tooltip title="Filter list">
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}

// ... (import statements remain unchanged)

const EnhancedTable: React.FC<EnhancedTableProps<EmploymentWithAction>> = ({
  rows,
}) => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("name");
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  console.log(rows);
  const handleRequestSort = (property: keyof Data) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
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

  const handleAcceptEmployee = async (employeeId: string) => {
    console.log(employeeId);
    const newRecord = await updateEmployee(orgId, employeeId, {
      status: "active",
    });

    if (newRecord) {
      console.log(newRecord);
      socket.emit("acceptEmployee", newRecord);
    }
  };

  const handleRejectEmployee = async (employeeId: string) => {
    console.log(employeeId);
    const [response, error] = await handleApiRequest(() =>
      deleteEmployee(orgId, employeeId)
    );
    if (error) {
      alert(error.message);
    } else {
      console.log(response);
      socket.emit("rejectEmployee", { employeeId });
    }
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <Container sx={{ width: "100%", padding: 2 }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table
            sx={{ minWidth: 750, textAlign: "start" }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead<EmploymentWithAction>
              order={order}
              orderBy={orderBy}
              rowCount={rows.length}
              headCells={headCells}
              onRequestSort={handleRequestSort}
            />

            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

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
                    {/* <TableCell padding="checkbox" /> */}
                    <TableCell component="th" id={labelId} scope="row">
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Avatar />
                        {row?.name}
                      </Box>
                    </TableCell>
                    <TableCell align="left">{row?.position}</TableCell>
                    <TableCell align="left">{row?.privilege}</TableCell>
                    <TableCell align="left">{row?.status}</TableCell>
                    <TableCell align="left">
                      <CP.Styled.Div>
                        <CP.Button onClick={() => handleAcceptEmployee(row.id)}>
                          Accept
                        </CP.Button>
                        <CP.Button
                          variant="contained"
                          color="accent"
                          onClick={() => handleRejectEmployee(row.id)}
                        >
                          Reject
                        </CP.Button>
                      </CP.Styled.Div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 32 : 54) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
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
    </Container>
  );
};
export default EnhancedTable;

const headCells: HeadCell<EmploymentWithAction>[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Emplyee Information",
  },
  {
    id: "position",
    numeric: false,
    disablePadding: false,
    label: "Position",
  },
  {
    id: "privilege",
    numeric: false,
    disablePadding: false,
    label: "Priviledges",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Actions",
  },
];
