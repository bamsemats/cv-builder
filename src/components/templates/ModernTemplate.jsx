import React from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

const ModernTemplate = ({ data }) => {
  const { personal, experience, education, skills, settings } = data;

  const primaryStyle = { color: settings.primaryColor };
  const bgSecondaryStyle = { backgroundColor: settings.secondaryColor };

  return (
    <div className="cv-paper modern-layout" style={{ fontFamily: settings.fontFamily }}>
      <div className="modern-grid">
        <aside className="modern-sidebar" style={bgSecondaryStyle}>
          {personal.image && (
            <div className="modern-image-container">
              <img src={personal.image} alt="Profile" className="modern-profile-img" />
            </div>
          )}
          
          <div className="sidebar-content">
            <section className="sidebar-section">
              <h2 className="sidebar-title">Contact</h2>
              <div className="modern-contact-list">
                {personal.email && (
                  <div className="modern-contact-item">
                    <Mail size={12} /> <span>{personal.email}</span>
                  </div>
                )}
                {personal.phone && (
                  <div className="modern-contact-item">
                    <Phone size={12} /> <span>{personal.phone}</span>
                  </div>
                )}
                {personal.address && (
                  <div className="modern-contact-item">
                    <MapPin size={12} /> <span>{personal.address}</span>
                  </div>
                )}
                {personal.website && (
                  <div className="modern-contact-item">
                    <Globe size={12} /> <span>{personal.website}</span>
                  </div>
                )}
              </div>
            </section>

            <section className="sidebar-section">
              <h2 className="sidebar-title">Expertise</h2>
              <div className="modern-skills-list">
                {skills.map(skill => (
                  <div key={skill.id} className="modern-skill-item">
                    <span className="modern-skill-name">{skill.name}</span>
                    <div className="modern-skill-bar-bg">
                      <div 
                        className="modern-skill-bar-fill" 
                        style={{ 
                          backgroundColor: settings.primaryColor,
                          width: skill.level === "Expert" ? "100%" : 
                                 skill.level === "Advanced" ? "80%" :
                                 skill.level === "Intermediate" ? "60%" : "40%"
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </aside>

        <main className="modern-main">
          <header className="modern-header">
            <h1 style={primaryStyle}>{personal.fullName}</h1>
            <p className="modern-job-title">{personal.title}</p>
          </header>

          <div className="modern-content">
            <section className="modern-section">
              <h2 className="section-title" style={{ color: settings.primaryColor, borderBottom: `2px solid ${settings.primaryColor}20` }}>About Me</h2>
              <p className="modern-summary">{personal.summary}</p>
            </section>

            <section className="modern-section">
              <h2 className="section-title" style={{ color: settings.primaryColor, borderBottom: `2px solid ${settings.primaryColor}20` }}>Experience</h2>
              {experience.map(exp => (
                <div key={exp.id} className="modern-entry">
                  <div className="entry-header">
                    <h3 className="entry-role">{exp.position}</h3>
                    <span className="entry-period">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <p className="entry-location">{exp.company} | {exp.location}</p>
                  <p className="entry-description">{exp.description}</p>
                </div>
              ))}
            </section>

            <section className="modern-section">
              <h2 className="section-title" style={{ color: settings.primaryColor, borderBottom: `2px solid ${settings.primaryColor}20` }}>Education</h2>
              {education.map(edu => (
                <div key={edu.id} className="modern-entry">
                  <div className="entry-header">
                    <h3 className="entry-role">{edu.degree}</h3>
                    <span className="entry-period">{edu.startDate} - {edu.endDate}</span>
                  </div>
                  <p className="entry-location">{edu.school} | {edu.location}</p>
                  <p className="entry-description">{edu.description}</p>
                </div>
              ))}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ModernTemplate;
