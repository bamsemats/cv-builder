import React from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

const ModernTemplate = ({ data }) => {
  const { personal, experience, education, skills, settings } = data;

  const primaryStyle = { color: settings.primaryColor };
  const bgSecondaryStyle = { backgroundColor: settings.secondaryColor };
  
  // Helper for slightly lighter/darker shades if needed, or using opacity
  const sidebarSectionStyle = { 
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: '1.5rem',
    borderRadius: '12px',
    marginBottom: '1.5rem'
  };

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
            <section style={sidebarSectionStyle}>
              <h2 className="sidebar-title" style={{ color: 'rgba(255,255,255,0.9)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Contact</h2>
              <div className="modern-contact-list">
                {personal.email && (
                  <div className="modern-contact-item" style={{ color: 'rgba(255,255,255,0.8)' }}>
                    <Mail size={14} style={{ color: settings.primaryColor }} /> <span>{personal.email}</span>
                  </div>
                )}
                {personal.phone && (
                  <div className="modern-contact-item" style={{ color: 'rgba(255,255,255,0.8)' }}>
                    <Phone size={14} style={{ color: settings.primaryColor }} /> <span>{personal.phone}</span>
                  </div>
                )}
                {personal.address && (
                  <div className="modern-contact-item" style={{ color: 'rgba(255,255,255,0.8)' }}>
                    <MapPin size={14} style={{ color: settings.primaryColor }} /> <span>{personal.address}</span>
                  </div>
                )}
                {personal.website && (
                  <div className="modern-contact-item" style={{ color: 'rgba(255,255,255,0.8)' }}>
                    <Globe size={14} style={{ color: settings.primaryColor }} /> <span>{personal.website}</span>
                  </div>
                )}
              </div>
            </section>

            <section style={sidebarSectionStyle}>
              <h2 className="sidebar-title" style={{ color: 'rgba(255,255,255,0.9)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Expertise</h2>
              <div className="modern-skills-list">
                {skills.map(skill => (
                  <div key={skill.id} className="modern-skill-item">
                    <span className="modern-skill-name" style={{ color: 'rgba(255,255,255,0.85)' }}>{skill.name}</span>
                    <div className="modern-skill-bar-bg" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
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
            <h1 style={{ ...primaryStyle, fontSize: '3rem', lineHeight: '1.1' }}>{personal.fullName}</h1>
            <p className="modern-job-title" style={{ color: '#64748b', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.5rem' }}>{personal.title}</p>
          </header>

          <div className="modern-content">
            <section className="modern-section">
              <h2 className="section-title" style={{ color: '#1e293b', borderLeft: `4px solid ${settings.primaryColor}`, paddingLeft: '1rem', background: `${settings.primaryColor}08`, padding: '0.5rem 1rem' }}>Profile</h2>
              <p className="modern-summary" style={{ color: '#475569' }}>{personal.summary}</p>
            </section>

            <section className="modern-section">
              <h2 className="section-title" style={{ color: '#1e293b', borderLeft: `4px solid ${settings.primaryColor}`, paddingLeft: '1rem', background: `${settings.primaryColor}08`, padding: '0.5rem 1rem' }}>Experience</h2>
              {experience.map(exp => (
                <div key={exp.id} className="modern-entry" style={{ borderLeft: '1px solid #e2e8f0', paddingLeft: '1.5rem', marginLeft: '0.5rem' }}>
                  <div className="entry-header">
                    <h3 className="entry-role" style={{ color: '#0f172a' }}>{exp.position}</h3>
                    <span className="entry-period" style={{ backgroundColor: '#f1f5f9', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem' }}>{exp.startDate} — {exp.endDate}</span>
                  </div>
                  <p className="entry-location" style={{ color: settings.primaryColor, fontSize: '0.9rem', marginBottom: '0.75rem' }}>{exp.company} • {exp.location}</p>
                  <p className="entry-description" style={{ color: '#475569' }}>{exp.description}</p>
                </div>
              ))}
            </section>

            <section className="modern-section">
              <h2 className="section-title" style={{ color: '#1e293b', borderLeft: `4px solid ${settings.primaryColor}`, paddingLeft: '1rem', background: `${settings.primaryColor}08`, padding: '0.5rem 1rem' }}>Education</h2>
              {education.map(edu => (
                <div key={edu.id} className="modern-entry" style={{ borderLeft: '1px solid #e2e8f0', paddingLeft: '1.5rem', marginLeft: '0.5rem' }}>
                  <div className="entry-header">
                    <h3 className="entry-role" style={{ color: '#0f172a' }}>{edu.degree}</h3>
                    <span className="entry-period" style={{ backgroundColor: '#f1f5f9', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem' }}>{edu.startDate} — {edu.endDate}</span>
                  </div>
                  <p className="entry-location" style={{ color: settings.primaryColor, fontSize: '0.9rem', marginBottom: '0.75rem' }}>{edu.school} • {edu.location}</p>
                  <p className="entry-description" style={{ color: '#475569' }}>{edu.description}</p>
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
