import React from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

const MinimalistTemplate = ({ data }) => {
  const { personal, experience, education, skills, settings } = data;

  const primaryStyle = { color: settings.primaryColor };
  const borderPrimaryStyle = { borderBottomColor: `${settings.primaryColor}30` };

  return (
    <div className="cv-paper minimalist-layout" style={{ fontFamily: settings.fontFamily }}>
      <header className="min-header">
        {personal.image && (
          <div className="min-profile-wrap">
            <img src={personal.image} alt="Profile" className="min-profile-img" />
          </div>
        )}
        <div className="min-header-info">
          <h1 className="min-name" style={primaryStyle}>{personal.fullName}</h1>
          <p className="min-title">{personal.title}</p>
          <div className="min-contact-row">
            {personal.email && (
              <span className="min-contact-item"><Mail size={12} /> {personal.email}</span>
            )}
            {personal.phone && (
              <span className="min-contact-item"><Phone size={12} /> {personal.phone}</span>
            )}
            {personal.address && (
              <span className="min-contact-item"><MapPin size={12} /> {personal.address}</span>
            )}
            {personal.website && (
              <span className="min-contact-item"><Globe size={12} /> {personal.website}</span>
            )}
          </div>
        </div>
      </header>

      <section className="min-section">
        <h2 className="min-section-title" style={borderPrimaryStyle}>Profile</h2>
        <p className="min-summary">{personal.summary}</p>
      </section>

      <div className="min-grid">
        <div className="min-main-col">
          <section className="min-section">
            <h2 className="min-section-title" style={borderPrimaryStyle}>Experience</h2>
            {experience.map(exp => (
              <div key={exp.id} className="min-entry">
                <div className="min-entry-header">
                  <h3 className="min-role">{exp.position}</h3>
                  <span className="min-period">{exp.startDate} - {exp.endDate}</span>
                </div>
                <p className="min-company">{exp.company}, {exp.location}</p>
                <p className="min-desc">{exp.description}</p>
              </div>
            ))}
          </section>

          <section className="min-section">
            <h2 className="min-section-title" style={borderPrimaryStyle}>Education</h2>
            {education.map(edu => (
              <div key={edu.id} className="min-entry">
                <div className="min-entry-header">
                  <h3 className="min-role">{edu.degree}</h3>
                  <span className="min-period">{edu.startDate} - {edu.endDate}</span>
                </div>
                <p className="min-company">{edu.school}, {edu.location}</p>
                <p className="min-desc">{edu.description}</p>
              </div>
            ))}
          </section>
        </div>

        <aside className="min-side-col">
          <section className="min-section">
            <h2 className="min-section-title" style={borderPrimaryStyle}>Skills</h2>
            <div className="min-skills-list">
              {skills.map(skill => (
                <div key={skill.id} className="min-skill-item">
                  <span className="min-skill-name">{skill.name}</span>
                  <span className="min-skill-level" style={{ color: settings.primaryColor }}>{skill.level}</span>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default MinimalistTemplate;
