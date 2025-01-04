import React, { useState, useEffect } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";

const FormulaireNote = ({ data, onAddNote, editingNote, onUpdateNote }) => {
  // On gère 3 champs : student, course, grade
  const [formData, setFormData] = useState({
    student: "",
    course: "",
    grade: "",
  });

  useEffect(() => {
    if (editingNote) {
      setFormData({
        student: editingNote.student || "",
        course: editingNote.course || "",
        grade: editingNote.grade || "",
      });
    } else {
      setFormData({
        student: "",
        course: "",
        grade: "",
      });
    }
  }, [editingNote]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingNote) {
      // Mise à jour d'un grade existant
      const updatedNote = {
        ...editingNote,
        student: formData.student,
        course: formData.course,
        grade: formData.grade,
      };
      onUpdateNote(updatedNote);
    } else {
      // Ajout d'une nouvelle note
      const newNote = {
        student: formData.student,
        course: formData.course,
        grade: formData.grade,
      };
      onAddNote(newNote);
    }

    // Réinitialisation du formulaire
    setFormData({
      student: "",
      course: "",
      grade: "",
    });
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 4,
        p: 3,
        boxShadow: 2,
        borderRadius: 1,
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        {editingNote ? "Edit Grade" : "Add New Grade"}
      </Typography>

      <form onSubmit={handleSubmit}>
        {/* Champ Student */}
        <TextField
          fullWidth
          label="Student"
          name="student"
          value={formData.student}
          onChange={handleInputChange}
          required
          margin="normal"
          helperText="Entrez la valeur du champ 'student'"
        />

        {/* Champ Course */}
        <TextField
          fullWidth
          label="Course"
          name="course"
          value={formData.course}
          onChange={handleInputChange}
          required
          margin="normal"
          helperText="Entrez la valeur du champ 'course'"
        />

        {/* Champ Grade (numérique) */}
        <TextField
          fullWidth
          label="Grade"
          name="grade"
          type="number"
          value={formData.grade}
          onChange={handleInputChange}
          required
          margin="normal"
          inputProps={{ min: 0, max: 20 }} // Ex. note /20
        />

        <Button
          type="submit"
          variant="contained"
          color={editingNote ? "success" : "primary"}
          sx={{ mt: 2 }}
          fullWidth
        >
          {editingNote ? "Update Grade" : "Add Grade"}
        </Button>
      </form>
    </Box>
  );
};

export default FormulaireNote;
