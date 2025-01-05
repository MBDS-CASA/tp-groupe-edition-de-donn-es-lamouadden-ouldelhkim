// components/grades/Note.jsx
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

const Note = ({ data, onDelete, onEdit }) => {
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
    onDelete(deleteDialog._id);
    setDeleteDialog({ open: false, _id: null });
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = data?.slice(startIndex, endIndex);

  return (
    <>
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
          Liste des Notes
        </Typography>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#f5f5f5" }}>
              <TableCell style={{ fontWeight: "bold" }}>ID</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Étudiant</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Cours</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Note</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentData?.map((element, index) => (
              <TableRow
                key={element?._id}
                style={{
                  backgroundColor: index % 2 === 0 ? "#fafafa" : "white",
                }}
              >
                <TableCell>{element?._id}</TableCell>
                <TableCell>
                  {element?.student
                    ? `${element.student.firstName} ${element.student.lastName}`
                    : "Étudiant inconnu"}
                </TableCell>
                <TableCell>
                  {element?.course
                    ? `${element.course.name} (${element.course.code})`
                    : "Cours inconnu"}
                </TableCell>
                <TableCell>{element?.grade}</TableCell>
                <TableCell>
                  <Tooltip title="Modifier">
                    <IconButton
                      onClick={() => onEdit(element)}
                      size="small"
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Supprimer">
                    <IconButton
                      onClick={() => handleDeleteClick(element._id)}
                      size="small"
                      color="error"
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
          labelRowsPerPage="Lignes par page:"
        />
      </TableContainer>

      {/* Dialog de confirmation de suppression */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, _id: null })}
      >
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          Êtes-vous sûr de vouloir supprimer cette note avec l'ID : {deleteDialog._id} ?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, _id: null })}>
            Annuler
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Note;
