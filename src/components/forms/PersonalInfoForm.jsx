import React from "react";
import ImageUpload from "./ImageUpload";

const PersonalInfoForm = ({ personal, onUpdate }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdate(name, value);
  };

  const handleImageUpdate = (imageData) => {
    onUpdate("image", imageData);
  };

  return (
    <div className="form-section">
      <h3>Personal Information</h3>
      <ImageUpload 
        image={personal.image} 
        onImageUpdate={handleImageUpdate} 
      />
      <div className="form-grid">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={personal.fullName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="title"
          placeholder="Professional Title"
          value={personal.title}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={personal.email}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={personal.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Location (City, Country)"
          value={personal.address}
          onChange={handleChange}
        />
        <input
          type="text"
          name="website"
          placeholder="Website/Portfolio URL"
          value={personal.website}
          onChange={handleChange}
        />
        <textarea
          name="summary"
          placeholder="Professional Summary"
          value={personal.summary}
          onChange={handleChange}
          rows="4"
        ></textarea>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
