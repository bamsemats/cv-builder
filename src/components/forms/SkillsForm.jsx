import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

const SkillsForm = ({ skills, onUpdate, onAdd, onRemove }) => {
  const [errors, setErrors] = useState({});

  const validate = (id, value) => {
    let error = "";
    if (!value.trim()) {
      error = "Skill name is required.";
    }

    setErrors(prev => ({
      ...prev,
      [id]: error
    }));
  };

  const handleChange = (id, field, value) => {
    if (field === "name") {
      validate(id, value);
    }
    onUpdate("skills", id, field, value);
  };

  const handleAddNew = () => {
    const newSkill = {
      name: "",
      level: "Intermediate",
    };
    onAdd("skills", newSkill);
  };

  return (
    <div className="form-section">
      <div className="section-header">
        <h3>Skills</h3>
        <button className="btn-icon add-btn" onClick={handleAddNew}>
          <Plus size={18} />
        </button>
      </div>

      <div className="form-list">
        {skills.map((skill) => (
          <div key={skill.id} className="form-item skill-item-row">
            <div className="input-group">
              <input
                type="text"
                placeholder="Skill *"
                value={skill.name}
                onChange={(e) => handleChange(skill.id, "name", e.target.value)}
                className={errors[skill.id] ? "input-error" : ""}
              />
              {errors[skill.id] && <span className="error-message">{errors[skill.id]}</span>}
            </div>
            
            <select
              value={skill.level}
              onChange={(e) => handleChange(skill.id, "level", e.target.value)}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
            
            <button 
              className="btn-icon delete-btn" 
              onClick={() => onRemove("skills", skill.id)}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsForm;
