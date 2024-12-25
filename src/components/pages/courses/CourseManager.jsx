import React, { useState, useEffect } from "react";
import Course from "./Course";
import FormulaireCourse from "./FormulaireCourse";

const CourseManager = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((jsonData) => {
        console.log("Données complètes chargées :", jsonData);

        const uniqueCourses = Array.from(
          new Set(jsonData.map(note => JSON.stringify({ 
            unique_id: note.unique_id, 
            courseName: note.course,
            description: note.description || "" 
          })))
        ).map(course => JSON.parse(course));

        console.log("Cours uniques extraits :", uniqueCourses);
        setCourses(uniqueCourses);
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
    setCourses((prev) => [...prev, newCourse]);
  };

  const deleteCourse = (uniqueId) => {
    console.log("Supprimer le cours :", uniqueId);
    setCourses((prev) => prev.filter(course => course.unique_id !== uniqueId));
  };

  const updateCourse = (updatedCourse) => {
    console.log("Mettre à jour le cours :", updatedCourse);
    setCourses((prev) => 
      prev.map(course => 
        course.unique_id === updatedCourse.unique_id ? updatedCourse : course
      )
    );
    setEditingCourse(null);
  };

  const startEditing = (course) => {
    console.log("Commencer l'édition du cours :", course);
    setEditingCourse(course);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
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