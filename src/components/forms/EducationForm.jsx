import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

const EducationForm = ({ education, onUpdate, onAdd, onRemove }) => {
  const [errors, setErrors] = useState({});

  const validate = (id, field, value) => {
    let error = "";
    if ((field === "school" || field === "degree") && !value.trim()) {
      error = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
    }

    setErrors(prev => ({
      ...prev,
      [`${id}-${field}`]: error
    }));
  };

  const handleChange = (id, field, value) => {
    validate(id, field, value);
    onUpdate("education", id, field, value);
  };

  const handleAddNew = () => {
    const newEdu = {
      school: "",
      degree: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    onAdd("education", newEdu);
  };

  return (
    <div className="form-section">
      <div className="section-header">
        <h3>Education</h3>
        <button className="btn-icon add-btn" onClick={handleAddNew}>
          <Plus size={18} />
        </button>
      </div>

      <div className="form-list">
        {education.map((edu) => (
          <div key={edu.id} className="form-item">
            <div className="form-item-header">
              <span>{edu.school || "New Education"}</span>
              <button 
                className="btn-icon delete-btn" 
                onClick={() => onRemove("education", edu.id)}
              >
                <Trash2 size={16} />
              </button>
            </div>
            
            <div className="form-grid">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="School/University *"
                  value={edu.school}
                  onChange={(e) => handleChange(edu.id, "school", e.target.value)}
                  className={errors[`${edu.id}-school`] ? "input-error" : ""}
                />
                {errors[`${edu.id}-school`] && <span className="error-message">{errors[`${edu.id}-school`]}</span>}
              </div>

              <div className="input-group">
                <input
                  type="text"
                  placeholder="Degree/Major *"
                  value={edu.degree}
                  onChange={(e) => handleChange(edu.id, "degree", e.target.value)}
                  className={errors[`${edu.id}-degree`] ? "input-error" : ""}
                />
                {errors[`${edu.id}-degree`] && <span className="error-message">{errors[`${edu.id}-degree`]}</span>}
              </div>

              <div className="date-range">
                <input
                  type="text"
                  placeholder="Start Date"
                  value={edu.startDate}
                  onChange={(e) => handleChange(edu.id, "startDate", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="End Date"
                  value={edu.endDate}
                  onChange={(e) => handleChange(edu.id, "endDate", e.target.value)}
                />
              </div>

              <div className="input-group">
                <input
                  type="text"
                  placeholder="Location"
                  value={edu.location}
                  onChange={(e) => handleChange(edu.id, "location", e.target.value)}
                />
              </div>

              <div className="input-group full-width">
                <textarea
                  placeholder="Details/Honors"
                  value={edu.description}
                  onChange={(e) => handleChange(edu.id, "description", e.target.value)}
                  rows="2"
                ></textarea>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationForm;
