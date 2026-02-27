import React, { useState } from "react";
import { defaultCV } from "./constants/defaultCV";
import "./App.css";

function App() {
  const [cvData, setCvData] = useState(defaultCV);

  // Handlers for state updates
  const handlePersonalUpdate = (field, value) => {
    setCvData((prev) => ({
      ...prev,
      personal: { ...prev.personal, [field]: value },
    }));
  };

  const handleListUpdate = (type, id, field, value) => {
    setCvData((prev) => ({
      ...prev,
      [type]: prev[type].map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addListItem = (type, newItem) => {
    setCvData((prev) => ({
      ...prev,
      [type]: [...prev[type], { ...newItem, id: `${type}-${Date.now()}` }],
    }));
  };

  const removeListItem = (type, id) => {
    setCvData((prev) => ({
      ...prev,
      [type]: prev[type].filter((item) => item.id !== id),
    }));
  };

  const handleImageUpdate = (imageData) => {
    setCvData((prev) => ({
      ...prev,
      personal: { ...prev.personal, image: imageData },
    }));
  };

  return (
    <div className="app-container">
      {/* Control Panel (Dark Theme) */}
      <aside className="control-panel">
        <header className="panel-header">
          <h1>CV Architect</h1>
          <p>Professional CV Builder</p>
        </header>
        
        <div className="form-sections">
          {/* We'll add form components here */}
          <section className="form-section">
            <h3>Personal Information</h3>
            <input 
              type="text" 
              placeholder="Full Name" 
              value={cvData.personal.fullName}
              onChange={(e) => handlePersonalUpdate("fullName", e.target.value)}
            />
            {/* More fields to come */}
          </section>
        </div>

        <div className="panel-actions">
          <button className="btn-export">Export PDF</button>
        </div>
      </aside>

      {/* Preview Pane (Light Theme) */}
      <main className="preview-pane">
        <div className="preview-container" id="cv-preview">
          {/* We'll add the CV template here */}
          <div className="cv-paper modern">
             <header className="cv-header">
               <h1>{cvData.personal.fullName}</h1>
               <p className="cv-title">{cvData.personal.title}</p>
             </header>
             <section className="cv-section">
               <h2>Experience</h2>
               {cvData.experience.map(exp => (
                 <div key={exp.id} className="cv-entry">
                   <h3>{exp.position} at {exp.company}</h3>
                   <p>{exp.startDate} - {exp.endDate}</p>
                 </div>
               ))}
             </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
