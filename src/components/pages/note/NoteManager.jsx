import React, { useState, useEffect } from "react";
import Note from "./Note";
import FormulaireNote from "./FormulaireNote";

const NoteManager = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingNote, setEditingNote] = useState(null);

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

  const deleteNote = (uniqueId) => {
    setData((prev) => prev.filter(note => note.unique_id !== uniqueId));
  };

  const updateNote = (updatedNote) => {
    setData((prev) => 
      prev.map(note => 
        note.unique_id === updatedNote.unique_id ? updatedNote : note
      )
    );
    setEditingNote(null);
  };

  const startEditing = (note) => {
    setEditingNote(note);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
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