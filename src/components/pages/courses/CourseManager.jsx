import React, { useState, useEffect } from "react";
import Course from "./Course";
import FormulaireCourse from "./FormulaireCourse";

const CourseManager = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);

  // Récupération initiale
  useEffect(() => {
    fetch("http://localhost:8010/api/courses")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((jsonData) => {
        // jsonData doit être un tableau : [ { _id, name, code }, ...]
        console.log("Données chargées depuis /api/courses :", jsonData);
        setCourses(jsonData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des cours :", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Ajout local du nouveau cours (retourné par l'API)
  const addCourse = (newCourse) => {
    console.log("Ajouter un nouveau cours :", newCourse);
    // newCourse inclut _id généré par Mongo
    setCourses((prev) => [...prev, newCourse]);
  };

  // Suppression locale
  // (vous pouvez ensuite faire un fetch DELETE vers /api/courses/:id)
  const deleteCourse = (mongoId) => {
    console.log("Supprimer le cours _id =", mongoId);
    setCourses((prev) => prev.filter((course) => course._id !== mongoId));
  };

  // Mise à jour locale
  // (vous pouvez ensuite faire un fetch PUT vers /api/courses/:id)
  const updateCourse = (updatedCourse) => {
    console.log("Mettre à jour le cours :", updatedCourse);
    setCourses((prev) =>
      prev.map((course) =>
        course._id === updatedCourse._id ? updatedCourse : course
      )
    );
    setEditingCourse(null);
  };

  // Lance l'édition
  const startEditing = (course) => {
    console.log("Commencer l'édition du cours :", course);
    setEditingCourse(course);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ margin: "20px" }}>
      <FormulaireCourse
        data={courses}
        onAddCourse={addCourse}
        editingCourse={editingCourse}
        onUpdateCourse={updateCourse}
      />
      <Course
        data={courses}
        onDelete={deleteCourse}
        onEdit={startEditing}
      />
    </div>
  );
};

export default CourseManager;
