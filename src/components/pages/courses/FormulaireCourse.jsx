import React, { useState, useEffect } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";

const FormulaireCourse = ({
  data,
  onAddCourse,
  editingCourse,
  onUpdateCourse,
}) => {
  // Champs gérés : name, code
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

  // Gère la saisie des champs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingCourse) {
      // Cas: Mise à jour (PUT / PATCH côté back si besoin)
      const updatedCourse = {
        ...editingCourse,
        name: formData.name,
        code: formData.code,
      };
      // Ici on fait seulement une mise à jour en local
      // Si vous voulez mettre à jour en base, faites un fetch PUT
      onUpdateCourse(updatedCourse);
    } else {
      // Cas: Création d'un nouveau cours
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

        // Le back-end renvoie le cours créé (avec _id)
        const createdCourse = await response.json();
        // On l’ajoute dans le state local (tableau courses)
        onAddCourse(createdCourse);
      } catch (error) {
        console.error("Erreur lors de la création du cours :", error);
        // gérer l'erreur (afficher un message, etc.)
      }
    }

    // Réinitialisation du formulaire
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
        {editingCourse ? "Update Course" : "Ajouter un Cours"}
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
          {editingCourse ? "Mettre à jour" : "Ajouter"}
        </Button>
      </form>
    </Box>
  );
};

export default FormulaireCourse;
