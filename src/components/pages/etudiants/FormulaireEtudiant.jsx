import React, { useState, useEffect } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";

const FormulaireEtudiant = ({
  onAddStudent,
  editingStudent,
  onModifyStudent,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        firstName: editingStudent.firstName || "",
        lastName: editingStudent.lastName || "",
      });
    } else {
      setFormData({
        firstName: "",
        lastName: "",
      });
    }
  }, [editingStudent]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingStudent) {
      try {
        const response = await fetch(
          `http://localhost:8010/api/students/${editingStudent._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              firstName: formData.firstName,
              lastName: formData.lastName,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Erreur serveur: ${response.status}`);
        }

        const updatedStudent = await response.json();
        onModifyStudent(updatedStudent);
      } catch (error) {
        console.error("Erreur lors de la mise à jour de l'étudiant :", error);
      }
    } else {
      try {
        const response = await fetch("http://localhost:8010/api/students", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
          }),
        });

        if (!response.ok) {
          throw new Error(`Erreur serveur: ${response.status}`);
        }
        const createdStudent = await response.json();
        onAddStudent(createdStudent);
      } catch (error) {
        console.error("Erreur lors de la création de l'étudiant :", error);
      }
    }

    setFormData({
      firstName: "",
      lastName: "",
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
        {editingStudent ? "Update Student" : "Add New Student"}
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          required
          margin="normal"
        />

        <TextField
          fullWidth
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          required
          margin="normal"
        />

        <Button
          type="submit"
          variant="contained"
          color={editingStudent ? "success" : "primary"}
          sx={{ mt: 2 }}
          fullWidth
        >
          {editingStudent ? "Update" : "Add"}
        </Button>
      </form>
    </Box>
  );
};

export default FormulaireEtudiant;
