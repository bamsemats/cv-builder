import React from "react";
import { Settings, Layout, Palette } from "lucide-react";

const SettingsForm = ({ settings, onUpdate }) => {
  const layouts = [
    { id: "modern", name: "Modern (Sidebar)", icon: <Layout size={16} /> },
    { id: "minimalist", name: "Minimalist (Single)", icon: <Layout size={16} /> },
    { id: "executive", name: "Executive (Traditional)", icon: <Layout size={16} /> },
  ];

  const colors = [
    { name: "Sky Blue", primary: "#3b82f6", secondary: "#1e293b" },
    { name: "Emerald", primary: "#10b981", secondary: "#064e3b" },
    { name: "Rose", primary: "#f43f5e", secondary: "#4c0519" },
    { name: "Slate", primary: "#405D87", secondary: "#0f172a" },
    { name: "Amber", primary: "#f59e0b", secondary: "#451a03" },
  ];

  const fonts = [
    { name: "Inter (Modern)", value: "'Inter', sans-serif" },
    { name: "Montserrat (Clean)", value: "'Montserrat', sans-serif" },
    { name: "Playfair (Classic)", value: "'Playfair Display', serif" },
    { name: "Lora (Elegant)", value: "'Lora', serif" },
    { name: "Roboto (Tech)", value: "'Roboto', sans-serif" },
  ];

  return (
    <div className="form-section">
      <div className="section-header">
        <h3><Settings size={18} /> CV Settings</h3>
      </div>
      
      <div className="settings-grid">
        <div className="setting-item">
          <label>Layout Style</label>
          <div className="layout-options">
            {layouts.map((l) => (
              <button
                key={l.id}
                className={`layout-btn ${settings.layout === l.id ? "active" : ""}`}
                onClick={() => onUpdate("layout", l.id)}
              >
                {l.icon} {l.name}
              </button>
            ))}
          </div>
        </div>

        <div className="setting-item">
          <label>Typography</label>
          <select 
            value={settings.fontFamily} 
            onChange={(e) => onUpdate("fontFamily", e.target.value)}
          >
            {fonts.map((f) => (
              <option key={f.name} value={f.value} style={{ fontFamily: f.value }}>
                {f.name}
              </option>
            ))}
          </select>
        </div>

        <div className="setting-item">
          <label>Color Preset</label>
          <div className="color-presets">
            {colors.map((c) => (
              <button
                key={c.name}
                className="color-btn"
                style={{ backgroundColor: c.primary }}
                onClick={() => {
                  onUpdate("primaryColor", c.primary);
                  onUpdate("secondaryColor", c.secondary);
                }}
                title={c.name}
              />
            ))}
          </div>
        </div>

        <div className="setting-item">
          <label>Custom Colors</label>
          <div className="custom-colors">
            <div className="color-picker-wrap">
              <span>Primary</span>
              <input 
                type="color" 
                value={settings.primaryColor} 
                onChange={(e) => onUpdate("primaryColor", e.target.value)}
              />
            </div>
            <div className="color-picker-wrap">
              <span>Secondary</span>
              <input 
                type="color" 
                value={settings.secondaryColor} 
                onChange={(e) => onUpdate("secondaryColor", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsForm;
