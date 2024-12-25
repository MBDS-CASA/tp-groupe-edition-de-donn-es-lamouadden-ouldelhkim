import React, { useState, useEffect } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";

const FormulaireNote = ({ data, onAddNote, editingNote, onUpdateNote }) => {
  const [formData, setFormData] = useState({
    grade: "",
  });

  useEffect(() => {
    if (editingNote) {
      setFormData({ grade: editingNote.grade });
    } else {
      setFormData({ grade: "" });
    }
  }, [editingNote]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingNote) {
      const updatedNote = {
        ...editingNote,
        grade: formData.grade,
      };
      onUpdateNote(updatedNote);
    } else {
      const newNote = {
        unique_id: data.length + 1,
        course: "New Course",
        student: {
          id: Date.now(),
        },
        date: new Date().toISOString().split("T")[0],
        grade: formData.grade,
      };
      onAddNote(newNote);
    }

    setFormData({ grade: "" });
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
        {editingNote ? "Edit Note" : "Add New Note"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Grade"
          name="grade"
          value={formData.grade}
          onChange={handleInputChange}
          required
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color={editingNote ? "success" : "primary"}
          sx={{ mt: 2 }}
          fullWidth
        >
          {editingNote ? "Update Note" : "Add Note"}
        </Button>
      </form>
    </Box>
  );
};

export default FormulaireNote;
