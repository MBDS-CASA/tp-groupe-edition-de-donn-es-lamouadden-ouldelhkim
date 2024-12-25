// src/components/pages/courses/FormulaireCourse.jsx

import React, { useState } from "react";

/**
 * Formulaire d'ajout d'un nouveau cours
 * @param {Array} data - Tableau des cours existants
 * @param {Function} onAddCourse - Callback pour ajouter un nouveau cours
 */
const FormulaireCourse = ({ data, onAddCourse }) => {
  const [formData, setFormData] = useState({
    courseName: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCourse = {
      unique_id: data.length + 1, 
      courseName: formData.courseName,
      description: formData.description,
    };

    console.log("Cours soumis :", newCourse); // Log du nouveau cours

    onAddCourse(newCourse);

    setFormData({
      courseName: "",
      description: "",
    });
  };

  return (
    <div>
      <h1>Course Manager</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Nom du Cours:
            <input
              type="text"
              name="courseName"
              value={formData.courseName}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <button type="submit">Ajouter Cours</button>
      </form>
    </div>
  );
};

export default FormulaireCourse;
