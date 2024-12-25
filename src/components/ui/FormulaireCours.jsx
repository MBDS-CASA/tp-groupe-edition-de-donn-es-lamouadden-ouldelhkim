import React, { useState } from "react";

const FormulaireCours = () => {
  const [course, setCourse] = useState("");
  const addCourse = () => {
    console.log(course);
  };

  const handleChange = (e) => {
    setCourse(e.target.value);
  };
  return (
    <form>
      <input
        name="course"
        onChange={handleChange}
        value={course}
        type="text"
        placeholder="add course"
      />
      <button type="button" onClick={addCourse}>
        Add cours
      </button>
    </form>
  );
};

export default FormulaireCours;
