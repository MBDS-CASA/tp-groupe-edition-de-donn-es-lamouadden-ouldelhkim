import React, { useState, useEffect } from "react";

const FormulaireEtudiant = ({ data, onAddStudent, editingStudent, onModifyStudent }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
  });

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        firstname: editingStudent.firstname,
        lastname: editingStudent.lastname,
      });
    } else {
      setFormData({
        firstname: "",
        lastname: "",
      });
    }
  }, [editingStudent]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingStudent) {
      onModifyStudent({
        id: editingStudent.id,
        firstname: formData.firstname,
        lastname: formData.lastname,
      });
    } else {
      const newStudent = {
        unique_id: data.length + 1,
        course: "New Course",
        student: {
          firstname: formData.firstname,
          lastname: formData.lastname,
          id: Date.now(),
        },
        date: new Date().toISOString().split("T")[0],
        grade: null,
      };
      onAddStudent(newStudent);
    }
    setFormData({ firstname: "", lastname: "" });
  };

  return (
    <div>
      <h1>{editingStudent ? "Edit Student" : "Add Student"}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Firstname:
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Lastname:
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <button type="submit">{editingStudent ? "Save Changes" : "Add Student"}</button>
      </form>
    </div>
  );
};

export default FormulaireEtudiant;
