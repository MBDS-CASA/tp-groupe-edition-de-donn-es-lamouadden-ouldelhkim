import React, { useState, useEffect } from "react";
import Etudiants from "./Etudiants";
import FormulaireEtudiant from "./FormulaireEtudiant";

const StudentManager = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);

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
  };

  const deleteStudent = (id) => {
    setData(data.filter((student) => student.student.id !== id));
  };

  const modifyStudent = (updatedStudent) => {
    setData(
      data.map((student) =>
        student.student.id === updatedStudent.id
          ? { ...student, student: updatedStudent }
          : student
      )
    );
    setEditingStudent(null); // Clear editing mode
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
    </div>
  );
};

export default StudentManager;
