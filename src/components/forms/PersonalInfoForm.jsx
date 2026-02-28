import React, { useState } from "react";
import ImageUpload from "./ImageUpload";

const PersonalInfoForm = ({ personal, onUpdate }) => {
  const [errors, setErrors] = useState({});

  const validate = (name, value) => {
    let error = "";
    
    if (name === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        error = "Please enter a valid email address.";
      }
    }
    
    if (name === "fullName" && !value.trim()) {
      error = "Full Name is required.";
    }

    if (name === "phone" && value) {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      if (!phoneRegex.test(value)) {
        error = "Invalid phone number format.";
      }
    }

    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    validate(name, value);
    onUpdate(name, value);
  };

  const handleImageUpdate = (imageData) => {
    onUpdate("image", imageData);
  };

  return (
    <div className="form-section">
      <div className="section-header">
        <h3>Personal Information</h3>
      </div>
      <ImageUpload 
        image={personal.image} 
        onImageUpdate={handleImageUpdate} 
      />
      <div className="form-grid">
        <div className="input-group">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name *"
            value={personal.fullName}
            onChange={handleChange}
            className={errors.fullName ? "input-error" : ""}
          />
          {errors.fullName && <span className="error-message">{errors.fullName}</span>}
        </div>
        
        <div className="input-group">
          <input
            type="text"
            name="title"
            placeholder="Professional Title"
            value={personal.title}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder="Email Address *"
            value={personal.email}
            onChange={handleChange}
            className={errors.email ? "input-error" : ""}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="input-group">
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={personal.phone}
            onChange={handleChange}
            className={errors.phone ? "input-error" : ""}
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>

        <div className="input-group">
          <input
            type="text"
            name="address"
            placeholder="Location (City, Country)"
            value={personal.address}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <input
            type="text"
            name="website"
            placeholder="Website/Portfolio URL"
            value={personal.website}
            onChange={handleChange}
          />
        </div>

        <div className="input-group full-width">
          <textarea
            name="summary"
            placeholder="Professional Summary"
            value={personal.summary}
            onChange={handleChange}
            rows="4"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
