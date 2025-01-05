// components/grades/FormulaireNote.jsx
import React, { useState, useEffect } from "react";
import { Button, TextField, Box, Typography, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

const FormulaireNote = ({
  students,
  courses,
  onAddGrade,
  editingGrade,
  onUpdateGrade,
}) => {
  const [formData, setFormData] = useState({
    student: "",
    course: "",
    grade: "",
    date: "",
  });

  useEffect(() => {
    if (editingGrade) {
      setFormData({
        student: editingGrade.student._id || "",
        course: editingGrade.course._id || "",
        grade: editingGrade.grade || "",
        date: editingGrade.date ? editingGrade.date.substring(0, 10) : "",
      });
    } else {
      setFormData({
        student: "",
        course: "",
        grade: "",
        date: "",
      });
    }
  }, [editingGrade]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingGrade) {
      onUpdateGrade({
        ...editingGrade,
        student: students.find(s => s._id === formData.student),
        course: courses.find(c => c._id === formData.course),
        grade: formData.grade,
        date: formData.date,
      });
    } else {
      try {
        const response = await fetch("http://localhost:8010/api/grades", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            student: formData.student,
            course: formData.course,
            grade: formData.grade,
            date: formData.date,
          }),
        });

        if (!response.ok) {
          throw new Error(`Erreur serveur: ${response.status}`);
        }

        const createdGradeData = await response.json(); 
        onAddGrade(createdGradeData.grade);
      } catch (error) {
        console.error("Erreur lors de la création de la note :", error);
      }
    }

    setFormData({
      student: "",
      course: "",
      grade: "",
      date: "",
    });
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 4,
        p: 3,
        boxShadow: 2,
        borderRadius: 1,
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        {editingGrade ? "Mettre à jour la Note" : "Ajouter une Note"}
      </Typography>

      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="student-label">Étudiant</InputLabel>
          <Select
            labelId="student-label"
            label="Étudiant"
            name="student"
            value={formData.student}
            onChange={handleInputChange}
            required
          >
            {students.map((student) => (
              <MenuItem key={student._id} value={student._id}>
                {student.firstName} {student.lastName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel id="course-label">Cours</InputLabel>
          <Select
            labelId="course-label"
            label="Cours"
            name="course"
            value={formData.course}
            onChange={handleInputChange}
            required
          >
            {courses.map((course) => (
              <MenuItem key={course._id} value={course._id}>
                {course.name} ({course.code})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Note"
          name="grade"
          type="number"
          value={formData.grade}
          onChange={handleInputChange}
          required
          margin="normal"
          inputProps={{ min: 0, max: 20 }}
          helperText="Note entre 0 et 20"
        />
        <Button
          type="submit"
          variant="contained"
          color={editingGrade ? "success" : "primary"}
          sx={{ mt: 2 }}
          fullWidth
        >
          {editingGrade ? "Mettre à jour la Note" : "Ajouter la Note"}
        </Button>
      </form>
    </Box>
  );
};

export default FormulaireNote;
