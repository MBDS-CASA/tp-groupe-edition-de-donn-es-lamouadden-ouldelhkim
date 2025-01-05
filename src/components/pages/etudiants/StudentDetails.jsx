import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const StudentDetails = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        if (!id) {
          throw new Error("Aucun ID fourni dans l'URL.");
        }

        const response = await fetch(
          `http://localhost:8010/api/students/search?id=${id}`
        );

        if (!response.ok) {
          throw new Error("Étudiant non trouvé");
        }

        const studentData = await response.json();
        setStudent(studentData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchStudent();
  }, [id]);

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  if (!student) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <h2>Détails de l'Étudiant</h2>
      <p>ID : {student._id}</p>
      <p>Prénom : {student.firstName}</p>
      <p>Nom : {student.lastName}</p>
    </div>
  );
};

export default StudentDetails;
