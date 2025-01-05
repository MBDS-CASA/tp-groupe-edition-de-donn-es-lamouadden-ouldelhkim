import React, { useState, useEffect } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";

const FormulaireCourse = ({
  data,
  onAddCourse,       
  editingCourse,      
  onUpdateCourse,      
}) => {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
  });

  useEffect(() => {
    if (editingCourse) {
      setFormData({
        name: editingCourse.name || "",
        code: editingCourse.code || "",
      });
    } else {
      setFormData({
        name: "",
        code: "",
      });
    }
  }, [editingCourse]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingCourse) {
      try {
        const response = await fetch(
          `http://localhost:8010/api/courses/${editingCourse._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: formData.name,
              code: formData.code,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Erreur serveur: ${response.status}`);
        }
        const updatedData = await response.json();
        onUpdateCourse(updatedData.course);
      } catch (error) {
        console.error("Erreur lors de la mise à jour du cours :", error);
      }
    } else {
      try {
        const response = await fetch("http://localhost:8010/api/courses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            code: formData.code,
          }),
        });

        if (!response.ok) {
          throw new Error(`Erreur serveur: ${response.status}`);
        }

        const createdCourseData = await response.json(); 
        onAddCourse(createdCourseData.course);
      } catch (error) {
        console.error("Erreur lors de la création du cours :", error);
      }
    }
    setFormData({
      name: "",
      code: "",
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
        {editingCourse ? "Update Course" : "Add New Course"}
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name of Course"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Code"
          name="code"
          value={formData.code}
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
          {editingCourse ? "Update" : "Add"}
        </Button>
      </form>
    </Box>
  );
};

export default FormulaireCourse;
