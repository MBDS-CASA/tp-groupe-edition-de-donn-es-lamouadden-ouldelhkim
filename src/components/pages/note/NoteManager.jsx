import React, { useState, useEffect } from "react";
import Note from "./Note";
import FormulaireNote from "./FormulaireNote";

/**
 * Gère le chargement des données (notes) depuis /data.json,
 * l'ajout d'une nouvelle note, et l'affichage de la liste.
 */
const NoteManager = () => {
  const [data, setData] = useState([]);    // stocke la liste des notes
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

  const addNote = (newNote) => {
    setData((prev) => [...prev, newNote]);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {/* Formulaire d'ajout de note */}
      <FormulaireNote data={data} onAddNote={addNote} />

      {/* Liste des notes */}
      <Note data={data} />
    </div>
  );
};

export default NoteManager;
