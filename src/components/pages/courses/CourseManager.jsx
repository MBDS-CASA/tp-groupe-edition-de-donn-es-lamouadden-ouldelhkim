// src/components/pages/courses/CourseManager.jsx

import React, { useState, useEffect } from "react";
import Course from "./Course";
import FormulaireCourse from "./FormulaireCourse";

const CourseManager = () => {
  const [courses, setCourses] = useState([]);    
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
        console.log("Données complètes chargées :", jsonData); 
        const uniqueCourses = Array.from(
          new Set(jsonData.map(note => JSON.stringify({ unique_id: note.unique_id, courseName: note.course })))
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

  if (loading) { 
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log("Données passées au composant Course :", courses); 

  return (
    <div>
      {}
      <FormulaireCourse data={courses} onAddCourse={addCourse} />

      {}
      <Course data={courses} />
    </div>
  );
};

export default CourseManager;
