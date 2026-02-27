import React from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

const ExecutiveTemplate = ({ data }) => {
  const { personal, experience, education, skills, settings } = data;

  const bgSecondaryStyle = { backgroundColor: settings.secondaryColor };
  const borderPrimaryStyle = { borderBottomColor: settings.primaryColor };

  return (
    <div className="cv-paper executive-layout" style={{ fontFamily: settings.fontFamily }}>
      <header className="exec-header" style={bgSecondaryStyle}>
        <div className="exec-header-flex">
          <div className="exec-header-info">
            <h1 className="exec-name">{personal.fullName}</h1>
            <p className="exec-title">{personal.title}</p>
          </div>
          {personal.image && (
            <div className="exec-image-container">
              <img src={personal.image} alt="Profile" className="exec-profile-img" />
            </div>
          )}
        </div>
        <div className="exec-contact-strip">
          {personal.email && (
            <span className="exec-contact-item"><Mail size={12} /> {personal.email}</span>
          )}
          {personal.phone && (
            <span className="exec-contact-item"><Phone size={12} /> {personal.phone}</span>
          )}
          {personal.address && (
            <span className="exec-contact-item"><MapPin size={12} /> {personal.address}</span>
          )}
          {personal.website && (
            <span className="exec-contact-item"><Globe size={12} /> {personal.website}</span>
          )}
        </div>
      </header>

      <main className="exec-content">
        <section className="exec-section">
          <h2 className="exec-section-title" style={borderPrimaryStyle}>Professional Summary</h2>
          <p className="exec-summary">{personal.summary}</p>
        </section>

        <section className="exec-section">
          <h2 className="exec-section-title" style={borderPrimaryStyle}>Experience</h2>
          {experience.map(exp => (
            <div key={exp.id} className="exec-entry">
              <div className="exec-entry-header">
                <div className="exec-role-info">
                   <h3 className="exec-role">{exp.position}</h3>
                   <p className="exec-company">{exp.company} | {exp.location}</p>
                </div>
                <span className="exec-period">{exp.startDate} - {exp.endDate}</span>
              </div>
              <p className="exec-desc">{exp.description}</p>
            </div>
          ))}
        </section>

        <section className="exec-section">
          <h2 className="exec-section-title" style={borderPrimaryStyle}>Education</h2>
          {education.map(edu => (
            <div key={edu.id} className="exec-entry">
              <div className="exec-entry-header">
                <div className="exec-role-info">
                   <h3 className="exec-role">{edu.degree}</h3>
                   <p className="exec-company">{edu.school} | {edu.location}</p>
                </div>
                <span className="exec-period">{edu.startDate} - {edu.endDate}</span>
              </div>
              <p className="exec-desc">{edu.description}</p>
            </div>
          ))}
        </section>

        <section className="exec-section">
          <h2 className="exec-section-title" style={borderPrimaryStyle}>Skills & Core Competencies</h2>
          <div className="exec-skills-grid">
            {skills.map(skill => (
              <div key={skill.id} className="exec-skill-item">
                <span className="exec-skill-dot" style={{ backgroundColor: settings.primaryColor }}></span>
                <span className="exec-skill-name">{skill.name}</span>
                <span className="exec-skill-level">({skill.level})</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ExecutiveTemplate;
