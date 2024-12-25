import React, { useState, useEffect } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";

const FormulaireCourse = ({
  data,
  onAddCourse,
  editingCourse,
  onUpdateCourse,
}) => {
  const [formData, setFormData] = useState({
    courseName: "",
    description: "",
  });

  useEffect(() => {
    if (editingCourse) {
      setFormData({
        courseName: editingCourse.courseName,
        description: editingCourse.description || "",
      });
    } else {
      setFormData({
        courseName: "",
        description: "",
      });
    }
  }, [editingCourse]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingCourse) {
      const updatedCourse = {
        ...editingCourse,
        courseName: formData.courseName,
        description: formData.description,
      };
      console.log("Mise à jour du cours :", updatedCourse);
      onUpdateCourse(updatedCourse);
    } else {
      const newCourse = {
        unique_id: data.length + 1,
        courseName: formData.courseName,
        description: formData.description,
      };
      console.log("Nouveau cours :", newCourse);
      onAddCourse(newCourse);
    }

    setFormData({
      courseName: "",
      description: "",
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
        {editingCourse ? "Modifier le Cours" : "Ajouter un Cours"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Nom du Cours"
          name="courseName"
          value={formData.courseName}
          onChange={handleInputChange}
          required
          margin="normal"
        />
       
        <Button
          type="submit"
          variant="contained"
          color={editingCourse ? "success" : "primary"}
          sx={{ mt: 2 }}
          fullWidth
        >
          {editingCourse ? "Mettre à jour" : "Ajouter"}
        </Button>
      </form>
    </Box>
  );
};

export default FormulaireCourse;
