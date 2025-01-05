// components/grades/NoteManager.jsx
import React, { useState, useEffect } from "react";
import Note from "./Note";
import FormulaireNote from "./FormulaireNote";
import { Alert, Snackbar } from "@mui/material";

const NoteManager = () => {
  const [grades, setGrades] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loadingGrades, setLoadingGrades] = useState(true);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [error, setError] = useState(null);
  const [editingGrade, setEditingGrade] = useState(null);
  const [feedback, setFeedback] = useState({
    open: false,
    message: "",
    type: "success",
  });

  // Charger les grades
  useEffect(() => {
    fetch("http://localhost:8010/api/grades")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP! statut: ${response.status}`);
        }
        return response.json();
      })
      .then((jsonData) => {
        setGrades(jsonData);
        setLoadingGrades(false);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des grades:", error);
        setError(error.message);
        setLoadingGrades(false);
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:8010/api/students")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP! statut: ${response.status}`);
        }
        return response.json();
      })
      .then((jsonData) => {
        setStudents(jsonData);
        setLoadingStudents(false);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des étudiants:", error);
        setError(error.message);
        setLoadingStudents(false);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8010/api/courses")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP! statut: ${response.status}`);
        }
        return response.json();
      })
      .then((jsonData) => {
        setCourses(jsonData);
        setLoadingCourses(false);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des cours:", error);
        setError(error.message);
        setLoadingCourses(false);
      });
  }, []);

  const addGrade = (newGrade) => {
    console.log("Nouvelle note ajoutée :", newGrade); // Ajouté pour débogage
    setGrades((prev) => [...prev, newGrade]);
    setFeedback({
      open: true,
      message: "Note ajoutée avec succès",
      type: "success",
    });
  };

  const deleteGrade = async (id) => {
    try {
      const response = await fetch(`http://localhost:8010/api/grades/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Erreur serveur : ${response.status}`);
      }
      // Suppression locale
      setGrades((prev) => prev.filter((grade) => grade._id !== id));
      setFeedback({
        open: true,
        message: "Note supprimée avec succès",
        type: "success",
      });
    } catch (err) {
      console.error("Erreur lors de la suppression de la note :", err);
      setError(err.message);
      setFeedback({
        open: true,
        message: `Erreur de suppression : ${err.message}`,
        type: "error",
      });
    }
  };
  const updateGrade = async (updatedGrade) => {
    try {
      const response = await fetch(
        `http://localhost:8010/api/grades/${updatedGrade._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            student: updatedGrade.student._id, 
            course: updatedGrade.course._id,   
            grade: updatedGrade.grade,
            date: updatedGrade.date,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`Erreur serveur : ${response.status}`);
      }
      const savedGrade = await response.json(); 
      console.log("Grade mis à jour :", savedGrade); 
      setGrades((prev) =>
        prev.map((grade) => (grade._id === savedGrade.grade._id ? savedGrade.grade : grade))
      );
      setEditingGrade(null);
      setFeedback({
        open: true,
        message: "Note mise à jour avec succès",
        type: "success",
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la note :", error);
      setError(error.message);
      setFeedback({
        open: true,
        message: `Erreur de mise à jour : ${error.message}`,
        type: "error",
      });
    }
  };

  const startEditing = (grade) => {
    setEditingGrade(grade);
  };

  const handleCloseFeedback = () => {
    setFeedback((prev) => ({ ...prev, open: false }));
  };

  if (loadingGrades || loadingStudents || loadingCourses) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <div style={{ margin: "20px" }}>
      <FormulaireNote
        students={students}
        courses={courses}
        onAddGrade={addGrade}
        editingGrade={editingGrade}
        onUpdateGrade={updateGrade}
      />
      <Note
        data={grades}
        onDelete={deleteGrade}
        onEdit={startEditing}
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

export default NoteManager;
