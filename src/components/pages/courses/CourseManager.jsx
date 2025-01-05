import React, { useState, useEffect } from "react";
import Course from "./Course";
import FormulaireCourse from "./FormulaireCourse";

const CourseManager = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);
  useEffect(() => {
    fetch("http://localhost:8010/api/courses")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((jsonData) => {
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
  const addCourse = (newCourse) => {
    console.log("Ajouter un nouveau cours :", newCourse);
    // newCourse inclut _id généré par Mongo
    setCourses((prev) => [...prev, newCourse]);
  };
  const deleteCourse = async (mongoId) => {
    console.log("Supprimer le cours _id =", mongoId);
    try {
      const response = await fetch(
        `http://localhost:8010/api/courses/${mongoId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`Erreur serveur : ${response.status}`);
      }
      setCourses((prev) => prev.filter((course) => course._id !== mongoId));
    } catch (err) {
      console.error("Erreur lors de la suppression du cours :", err);
      setError(err.message);
    }
  };
  const updateCourse = async (updatedCourse) => {
    console.log("Mettre à jour le cours :", updatedCourse);
    try {
      const response = await fetch(
        `http://localhost:8010/api/courses/${updatedCourse._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: updatedCourse.name,
            code: updatedCourse.code,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`Erreur serveur : ${response.status}`);
      }
      const savedCourse = await response.json();
      setCourses((prev) =>
        prev.map((c) =>
          c._id === savedCourse.course._id ? savedCourse.course : c
        )
      );
      setEditingCourse(null);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du cours :", error);
      setError(error.message);
    }
  };
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
