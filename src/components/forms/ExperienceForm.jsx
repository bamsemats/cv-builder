import React from "react";
import { Plus, Trash2 } from "lucide-react";

const ExperienceForm = ({ experience, onUpdate, onAdd, onRemove }) => {
  const handleChange = (id, field, value) => {
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
              <input
                type="text"
                placeholder="Company"
                value={exp.company}
                onChange={(e) => handleChange(exp.id, "company", e.target.value)}
              />
              <input
                type="text"
                placeholder="Job Title"
                value={exp.position}
                onChange={(e) => handleChange(exp.id, "position", e.target.value)}
              />
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
              <input
                type="text"
                placeholder="Location"
                value={exp.location}
                onChange={(e) => handleChange(exp.id, "location", e.target.value)}
              />
              <textarea
                placeholder="Description/Achievements"
                value={exp.description}
                onChange={(e) => handleChange(exp.id, "description", e.target.value)}
                rows="3"
              ></textarea>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceForm;
