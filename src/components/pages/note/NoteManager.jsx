import React, { useState, useEffect } from "react";
import Note from "./Note";
import FormulaireNote from "./FormulaireNote";

const NoteManager = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingNote, setEditingNote] = useState(null);
  // Au montage, on récupère les données depuis l'API
  useEffect(() => {
    fetch("http://localhost:8010/api/grades")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((jsonData) => {
        setData(jsonData); // jsonData doit être un tableau
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Ajout local d'une nouvelle note
  const addNote = (newNote) => {
    setData((prev) => [...prev, newNote]);
  };

  const deleteNote = (id) => {
    setData((prev) => prev.filter((note) => note.unique_id !== id));
  };
  
  // Mise à jour locale
  const updateNote = (updatedNote) => {
    setData((prev) =>
      prev.map((note) => (note._id === updatedNote._id ? updatedNote : note))
    );
    setEditingNote(null);
  };

  // Passe la note choisie en mode "édition"
  const startEditing = (note) => {
    setEditingNote(note);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ margin: "20px" }}>
      <FormulaireNote
        data={data}
        onAddNote={addNote}
        editingNote={editingNote}
        onUpdateNote={updateNote}
      />

      <Note
        data={data}
        onDelete={deleteNote}
        onEdit={startEditing}
      />
    </div>
  );
};

export default NoteManager;
