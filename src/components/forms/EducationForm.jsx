import React from "react";
import { Plus, Trash2 } from "lucide-react";

const EducationForm = ({ education, onUpdate, onAdd, onRemove }) => {
  const handleChange = (id, field, value) => {
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
              <input
                type="text"
                placeholder="School/University"
                value={edu.school}
                onChange={(e) => handleChange(edu.id, "school", e.target.value)}
              />
              <input
                type="text"
                placeholder="Degree/Major"
                value={edu.degree}
                onChange={(e) => handleChange(edu.id, "degree", e.target.value)}
              />
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
              <input
                type="text"
                placeholder="Location"
                value={edu.location}
                onChange={(e) => handleChange(edu.id, "location", e.target.value)}
              />
              <textarea
                placeholder="Details/Honors"
                value={edu.description}
                onChange={(e) => handleChange(edu.id, "description", e.target.value)}
                rows="2"
              ></textarea>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationForm;
