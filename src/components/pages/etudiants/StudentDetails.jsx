import React from "react";
import { useParams } from "react-router-dom";

const StudentDetails = () => {
  // Récupère le paramètre 'id' depuis l'URL
  const { id } = useParams("id");

  return (
    <div>
      <h2>Détails de l'Étudiant</h2>
      <p>ID de l'étudiant : {id}</p>
    </div>
  );
};

export default StudentDetails;
