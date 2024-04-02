import { useState, useEffect } from "react";
import TablePagination from "@mui/material/TablePagination";

interface TablePaginateProps {
  totalResults: number;
  page: number;
  rowsPerPage: number;
  setPage: (page: number) => void;
  setRowsPerPage: (rowsPerPage: number) => void;
}

export default function TablePaginate({
  totalResults,
  page,
  rowsPerPage,
  setPage,
  setRowsPerPage,
}: TablePaginateProps) {
  const [inputPage, setInputPage] = useState("");
  const [invalidPage, setInvalidPage] = useState(false);

  const handleChangePage = (event: any, newPage: number) => {
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
  };

  useEffect(() => {
    console.log(totalResults);
  }, [totalResults, rowsPerPage]);

  const totalPages = Math.ceil(totalResults / rowsPerPage);

  return (
    <TablePagination
      component="div"
      count={totalResults}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage || 10}
      onRowsPerPageChange={handleChangeRowsPerPage}
      slotProps={{
        actions: {
          nextButtonIcon: { onClick: handleNextButtonClick },
        },
      }}
    />
  );
}
