import React, { useState } from "react";

/**
 * Formulaire d'ajout d'une nouvelle note
 * @param {Array}   data       Tableau des notes existantes
 * @param {Function} onAddNote Callback pour ajouter une nouvelle note
 */
const FormulaireNote = ({ data, onAddNote }) => {
  const [formData, setFormData] = useState({
    grade: "",
  });

  // Gère la saisie des champs (ici, on n’a qu’un champ grade)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newNote = {

      unique_id: data.length + 1,
      course: "New Course", 
      student: {
        id: Date.now(), 
      },
      date: new Date().toISOString().split("T")[0], // date du jour
      grade: formData.grade,
    };
    onAddNote(newNote);
    setFormData({ grade: "" });
  };

  return (
    <div>
      <h1>Note Manager</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Note:
            <input
              type="text"
              name="grade"
              value={formData.grade}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <button type="submit">Add Note</button>
      </form>
    </div>
  );
};

export default FormulaireNote;
