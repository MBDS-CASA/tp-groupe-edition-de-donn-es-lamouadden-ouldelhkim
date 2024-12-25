import React, { useState, useEffect } from "react";
import Etudiants from "./Etudiants";
import FormulaireEtudiant from "./FormulaireEtudiant";
import { Alert, Snackbar } from "@mui/material";

const StudentManager = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [feedback, setFeedback] = useState({ open: false, message: '', type: 'success' });

  useEffect(() => {
    fetch("/data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((jsonData) => {
        setData(jsonData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const addStudent = (newStudent) => {
    setData([...data, newStudent]);
    setFeedback({
      open: true,
      message: 'Student added successfully',
      type: 'success'
    });
  };

  const deleteStudent = (id) => {
    setData(data.filter((student) => student.student.id !== id));
    setFeedback({
      open: true,
      message: 'Student deleted successfully',
      type: 'success'
    });
  };

  const modifyStudent = (updatedStudent) => {
    setData(
      data.map((student) =>
        student.student.id === updatedStudent.id
          ? { ...student, student: updatedStudent }
          : student
      )
    );
    setEditingStudent(null);
    setFeedback({
      open: true,
      message: 'Student updated successfully',
      type: 'success'
    });
  };

  const handleCloseFeedback = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setFeedback({ ...feedback, open: false });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <FormulaireEtudiant
        data={data}
        onAddStudent={addStudent}
        editingStudent={editingStudent}
        onModifyStudent={modifyStudent}
      />
      <Etudiants
        data={data}
        onDeleteStudent={deleteStudent}
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