import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TablePagination,
} from "@mui/material";

const Matieres = ({ data }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Set initial rows per page

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when rows per page changes
  };

  return (
    <TableContainer
      component={Paper}
      style={{ margin: "20px 0", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
    >
      <Typography
        variant="h6"
        component="div"
        style={{ textAlign: "center", padding: "10px", fontWeight: "bold" }}
      >
        List of Subjects
      </Typography>
      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: "#f5f5f5" }}>
            <TableCell style={{ fontWeight: "bold" }}>ID</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Course</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((element, index) => (
              <TableRow
                key={element?.unique_id}
                style={{
                  backgroundColor: index % 2 === 0 ? "#fafafa" : "white",
                }}
              >
                <TableCell>{element?.unique_id}</TableCell>
                <TableCell>{element?.course}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default Matieres;
