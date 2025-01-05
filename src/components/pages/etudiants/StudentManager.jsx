import React, { useState, useEffect } from "react";
import FormulaireEtudiant from "./FormulaireEtudiant";
import Etudiants from "./Etudiants";
import { Alert, Snackbar } from "@mui/material";

const StudentManager = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [feedback, setFeedback] = useState({
    open: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    fetch("http://localhost:8010/api/students")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setStudents(data);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
        setFeedback({
          open: true,
          message: `Erreur de chargement : ${error.message}`,
          type: "error",
        });
      });
  }, []);
  const handleAddStudent = (createdStudent) => {
    setStudents((prev) => [...prev, createdStudent]);
    setFeedback({
      open: true,
      message: "Student added successfully",
      type: "success",
    });
  };
  const handleDeleteStudent = async (_id) => {
    try {
      const response = await fetch(`http://localhost:8010/api/students/${_id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Erreur serveur : ${response.status}`);
      }
      setStudents((prev) => prev.filter((student) => student._id !== _id));
      setFeedback({
        open: true,
        message: "Student deleted successfully",
        type: "success",
      });
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      setFeedback({
        open: true,
        message: `Delete error : ${error.message}`,
        type: "error",
      });
    }
  };

  const handleModifyStudent = async (updatedStudent) => {
    try {
      const response = await fetch(
        `http://localhost:8010/api/students/${updatedStudent._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: updatedStudent.firstName,
            lastName: updatedStudent.lastName,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Erreur serveur : ${response.status}`);
      }

      const savedStudent = await response.json();

      setStudents((prev) =>
        prev.map((s) => (s._id === savedStudent._id ? savedStudent : s))
      );
      setEditingStudent(null);
      setFeedback({
        open: true,
        message: "Student updated successfully",
        type: "success",
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      setFeedback({
        open: true,
        message: `Update error : ${error.message}`,
        type: "error",
      });
    }
  };

  const handleCloseFeedback = () => {
    setFeedback((prev) => ({ ...prev, open: false }));
  };

  return (
    <div>
      <FormulaireEtudiant
        onAddStudent={handleAddStudent}
        editingStudent={editingStudent}
        onModifyStudent={handleModifyStudent}
      />
      <Etudiants
        data={students}
        onDeleteStudent={handleDeleteStudent}
        onEditStudent={setEditingStudent}
      />
      <Snackbar
        open={feedback.open}
        autoHideDuration={3000}
        onClose={handleCloseFeedback}
      >
        <Alert
          onClose={handleCloseFeedback}
          severity={feedback.type}
          variant="filled"
        >
          {feedback.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default StudentManager;
