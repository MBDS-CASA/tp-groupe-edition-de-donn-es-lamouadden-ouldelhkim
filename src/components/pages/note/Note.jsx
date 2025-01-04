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
  IconButton,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Note = ({ data, onDelete, onEdit }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Pagination : on détermine l'intervalle (startIndex, endIndex)
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = data?.slice(startIndex, endIndex);

  return (
    <TableContainer
      component={Paper}
      style={{
        margin: "20px 0",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h6"
        component="div"
        style={{ textAlign: "center", padding: "10px", fontWeight: "bold" }}
      >
        List of Grades
      </Typography>

      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: "#f5f5f5" }}>
            <TableCell style={{ fontWeight: "bold" }}>ID</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Student</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Course</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Grade</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {currentData?.map((element, index) => {
            // Exemple d'ID séquentiel : on part de 1 pour la première ligne de la page
            // "numéro d'affichage" = index local + 1 + décalage de pagination
            const rowNumber = startIndex + index + 1;

            // On peut quand même récupérer un identifiant interne pour la clé
            // s'il existe, sinon on utilise rowNumber comme fallback
            const rowKey = element?._id || element?.unique_id || rowNumber;

            return (
              <TableRow
                key={rowKey}
                style={{
                  backgroundColor: index % 2 === 0 ? "#fafafa" : "white",
                }}
              >
                {/* On affiche l'ID séquentiel (rowNumber) */}
                <TableCell>{rowNumber}</TableCell>

                <TableCell>
                  {element?.student ? element.student : "No student"}
                </TableCell>

                <TableCell>
                  {element?.course ? element.course : "No course"}
                </TableCell>

                <TableCell>
                  {typeof element?.grade !== "undefined"
                    ? element.grade
                    : "No grade"}
                </TableCell>

                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton
                      onClick={() => onEdit(element)}
                      size="small"
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete">
                    <IconButton
                      onClick={() => onDelete(element.unique_id)}
                      size="small"
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            );
          })}
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

export default Note;
