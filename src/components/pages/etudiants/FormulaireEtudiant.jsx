import React, { useState, useEffect } from "react";
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Card, 
  CardContent 
} from "@mui/material";

const FormulaireEtudiant = ({ data, onAddStudent, editingStudent, onModifyStudent }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
  });

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        firstname: editingStudent.firstname,
        lastname: editingStudent.lastname,
      });
    } else {
      setFormData({
        firstname: "",
        lastname: "",
      });
    }
  }, [editingStudent]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingStudent) {
      onModifyStudent({
        id: editingStudent.id,
        firstname: formData.firstname,
        lastname: formData.lastname,
      });
    } else {
      const newStudent = {
        unique_id: data.length + 1,
        course: "New Course",
        student: {
          firstname: formData.firstname,
          lastname: formData.lastname,
          id: Date.now(),
        },
        date: new Date().toISOString().split("T")[0],
        grade: null,
      };
      onAddStudent(newStudent);
    }
    setFormData({ firstname: "", lastname: "" });
  };

  return (
    <Card sx={{ maxWidth: 600, margin: '20px auto', padding: 2 }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {editingStudent ? "Edit Student" : "Add Student"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="First Name"
            name="firstname"
            value={formData.firstname}
            onChange={handleInputChange}
            required
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Last Name"
            name="lastname"
            value={formData.lastname}
            onChange={handleInputChange}
            required
            margin="normal"
            variant="outlined"
          />
          <Button
            type="submit"
            variant="contained"
            color={editingStudent ? "success" : "primary"}
            sx={{ mt: 2 }}
            fullWidth
          >
            {editingStudent ? "Save Changes" : "Add Student"}
          </Button>
          {editingStudent && (
            <Button
              variant="outlined"
              color="secondary"
              sx={{ mt: 1 }}
              fullWidth
              onClick={() => onModifyStudent(null)}
            >
              Cancel Edit
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default FormulaireEtudiant;