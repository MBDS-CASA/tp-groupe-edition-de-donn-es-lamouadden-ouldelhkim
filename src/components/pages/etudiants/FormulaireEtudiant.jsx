import React, { useState, useEffect } from "react";
import FormulaireEtudiant from "./FormulaireEtudiant";
import Etudiants from "./Etudiants";

const StudentManager = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  // Charger les étudiants depuis l'API
  useEffect(() => {
    fetch("http://localhost:8010/api/students")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des étudiants");
        }
        return response.json();
      })
      .then((data) => {
        setStudents(data); // Met à jour la liste des étudiants
      })
      .catch((error) => console.error("Erreur :", error));
  }, []);

  // Ajouter un étudiant (localement)
  const handleAddStudent = (newStudent) => {
    const newId = Math.random().toString(36).substr(2, 9); // Génère un ID unique local
    const newStudentWithId = { ...newStudent, _id: newId };
    setStudents([...students, newStudentWithId]); // Ajoute l'étudiant à la liste locale
  };

  // Modifier un étudiant (localement)
  const handleModifyStudent = (updatedStudent) => {
    setStudents(
      students.map((student) =>
        student._id === updatedStudent._id ? updatedStudent : student
      )
    );
    setEditingStudent(null); // Arrête l'édition après la modification
  };

  // Supprimer un étudiant (localement)
  const handleDeleteStudent = (id) => {
    setStudents(students.filter((student) => student._id !== id));
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
    </div>
  );
};

export default StudentManager;
