import React, { useState, useEffect } from "react";
import Etudiants from "./Etudiants";
import FormulaireEtudiant from "./FormulaireEtudiant";

const StudentManager = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <FormulaireEtudiant data={data} onAddStudent={addStudent} />
      <Etudiants data={data} />
    </div>
  );
};

export default StudentManager;