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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Etudiants = ({ data, onDeleteStudent, onEditStudent }) => {
  console.log("Data reçue:", data);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    _id: null,
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteClick = (id) => {
    setDeleteDialog({ open: true, _id: id });
  };

  const handleDeleteConfirm = () => {
    onDeleteStudent(deleteDialog._id);
    setDeleteDialog({ open: false, _id: null });
  };

  return (
    <>
      <TableContainer
        component={Paper}
        style={{
          margin: "20px auto",
          maxWidth: 1000,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          style={{ textAlign: "center", padding: "20px", fontWeight: "bold" }}
        >
          Student List
        </Typography>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#f5f5f5" }}>
              <TableCell style={{ fontWeight: "bold" }}>ID</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>First Name</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Last Name</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((element, index) => (
                <TableRow
                  key={element?._id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#fafafa" : "white",
                  }}
                >
                  <TableCell>{element?._id}</TableCell>
                  <TableCell>{element?.firstName}</TableCell>
                  <TableCell>{element?.lastName}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit Student">
                      <IconButton
                        color="primary"
                        onClick={() =>
                          onEditStudent({
                            _id: element?._id,
                            firstName: element?.firstName,
                            lastName: element?.lastName,
                          })
                        }
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Student">
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteClick(element?._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
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
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, _id: null })}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this student with ID: {deleteDialog._id}?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialog({ open: false, _id: null })}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Etudiants;
