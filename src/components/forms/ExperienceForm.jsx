import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

const ExperienceForm = ({ experience, onUpdate, onAdd, onRemove }) => {
  const [errors, setErrors] = useState({});

  const validate = (id, field, value) => {
    let error = "";
    if ((field === "company" || field === "position") && !value.trim()) {
      error = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
    }

    setErrors(prev => ({
      ...prev,
      [`${id}-${field}`]: error
    }));
  };

  const handleChange = (id, field, value) => {
    validate(id, field, value);
    onUpdate("experience", id, field, value);
  };

  const handleAddNew = () => {
    const newExp = {
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    };
    onAdd("experience", newExp);
  };

  return (
    <div className="form-section">
      <div className="section-header">
        <h3>Professional Experience</h3>
        <button className="btn-icon add-btn" onClick={handleAddNew}>
          <Plus size={18} />
        </button>
      </div>

      <div className="form-list">
        {experience.map((exp) => (
          <div key={exp.id} className="form-item">
            <div className="form-item-header">
              <span>{exp.company || "New Experience"}</span>
              <button 
                className="btn-icon delete-btn" 
                onClick={() => onRemove("experience", exp.id)}
              >
                <Trash2 size={16} />
              </button>
            </div>
            
            <div className="form-grid">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Company *"
                  value={exp.company}
                  onChange={(e) => handleChange(exp.id, "company", e.target.value)}
                  className={errors[`${exp.id}-company`] ? "input-error" : ""}
                />
                {errors[`${exp.id}-company`] && <span className="error-message">{errors[`${exp.id}-company`]}</span>}
              </div>

              <div className="input-group">
                <input
                  type="text"
                  placeholder="Job Title *"
                  value={exp.position}
                  onChange={(e) => handleChange(exp.id, "position", e.target.value)}
                  className={errors[`${exp.id}-position`] ? "input-error" : ""}
                />
                {errors[`${exp.id}-position`] && <span className="error-message">{errors[`${exp.id}-position`]}</span>}
              </div>

              <div className="date-range">
                <input
                  type="text"
                  placeholder="Start Date"
                  value={exp.startDate}
                  onChange={(e) => handleChange(exp.id, "startDate", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="End Date"
                  value={exp.endDate}
                  onChange={(e) => handleChange(exp.id, "endDate", e.target.value)}
                />
              </div>

              <div className="input-group">
                <input
                  type="text"
                  placeholder="Location"
                  value={exp.location}
                  onChange={(e) => handleChange(exp.id, "location", e.target.value)}
                />
              </div>

              <div className="input-group full-width">
                <textarea
                  placeholder="Description/Achievements"
                  value={exp.description}
                  onChange={(e) => handleChange(exp.id, "description", e.target.value)}
                  rows="3"
                ></textarea>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceForm;
