import React from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

const ExecutiveTemplate = ({ data }) => {
  const { personal, experience, education, skills, settings } = data;

  const bgSecondaryStyle = { backgroundColor: settings.secondaryColor };
  const borderPrimaryStyle = { borderBottom: `2px solid ${settings.primaryColor}` };

  return (
    <div className="cv-paper executive-layout" style={{ fontFamily: settings.fontFamily }}>
      <header className="exec-header" style={{ ...bgSecondaryStyle, padding: '4rem 3rem 3rem 3rem', position: 'relative' }}>
        <div className="exec-header-flex" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
          <div className="exec-header-info" style={{ flex: 1 }}>
            <h1 className="exec-name" style={{ fontSize: '3.5rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0, color: 'white', lineHeight: '1' }}>{personal.fullName}</h1>
            <p className="exec-title" style={{ fontSize: '1.5rem', opacity: '0.8', fontWeight: '300', letterSpacing: '0.2em', color: 'white', textTransform: 'uppercase', marginTop: '0.75rem' }}>{personal.title}</p>
          </div>
          {personal.image && (
            <div className="exec-image-container" style={{ width: '140px', height: '140px', borderRadius: '4px', overflow: 'hidden', border: '5px solid rgba(255,255,255,0.15)', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
              <img src={personal.image} alt="Profile" className="exec-profile-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}
        </div>
        <div className="exec-contact-strip" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', fontWeight: '500' }}>
          {personal.email && (
            <span className="exec-contact-item" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}><Mail size={14} style={{ color: settings.primaryColor }} /> {personal.email}</span>
          )}
          {personal.phone && (
            <span className="exec-contact-item" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}><Phone size={14} style={{ color: settings.primaryColor }} /> {personal.phone}</span>
          )}
          {personal.address && (
            <span className="exec-contact-item" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}><MapPin size={14} style={{ color: settings.primaryColor }} /> {personal.address}</span>
          )}
          {personal.website && (
            <span className="exec-contact-item" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}><Globe size={14} style={{ color: settings.primaryColor }} /> {personal.website}</span>
          )}
        </div>
      </header>

      <main className="exec-content" style={{ padding: '3.5rem 3rem' }}>
        <section className="exec-section" style={{ marginBottom: '3.5rem' }}>
          <h2 className="exec-section-title" style={{ ...borderPrimaryStyle, fontSize: '1.1rem', textTransform: 'uppercase', fontWeight: '800', letterSpacing: '0.15em', marginBottom: '1.5rem', paddingBottom: '0.4rem', color: '#0f172a' }}>Executive Profile</h2>
          <p className="exec-summary" style={{ fontSize: '1.05rem', color: '#334155', lineHeight: '1.8', fontStyle: 'italic', borderLeft: `3px solid ${settings.primaryColor}20`, paddingLeft: '1.5rem' }}>{personal.summary}</p>
        </section>

        <section className="exec-section" style={{ marginBottom: '3.5rem' }}>
          <h2 className="exec-section-title" style={{ ...borderPrimaryStyle, fontSize: '1.1rem', textTransform: 'uppercase', fontWeight: '800', letterSpacing: '0.15em', marginBottom: '2rem', paddingBottom: '0.4rem', color: '#0f172a' }}>Professional Experience</h2>
          {experience.map(exp => (
            <div key={exp.id} className="exec-entry" style={{ marginBottom: '2.5rem', position: 'relative' }}>
              <div className="exec-entry-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <div className="exec-role-info">
                   <h3 className="exec-role" style={{ fontSize: '1.25rem', fontWeight: '800', textTransform: 'uppercase', color: '#1e293b', margin: 0 }}>{exp.position}</h3>
                   <p className="exec-company" style={{ fontSize: '1.05rem', fontWeight: '600', color: settings.primaryColor, marginTop: '0.25rem' }}>{exp.company} • {exp.location}</p>
                </div>
                <span className="exec-period" style={{ fontSize: '0.95rem', fontWeight: '700', color: '#64748b' }}>{exp.startDate} — {exp.endDate}</span>
              </div>
              <p className="exec-desc" style={{ fontSize: '1rem', color: '#475569', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>{exp.description}</p>
            </div>
          ))}
        </section>

        <section className="exec-section" style={{ marginBottom: '3.5rem' }}>
          <h2 className="exec-section-title" style={{ ...borderPrimaryStyle, fontSize: '1.1rem', textTransform: 'uppercase', fontWeight: '800', letterSpacing: '0.15em', marginBottom: '2rem', paddingBottom: '0.4rem', color: '#0f172a' }}>Academic Background</h2>
          {education.map(edu => (
            <div key={edu.id} className="exec-entry" style={{ marginBottom: '1.5rem' }}>
              <div className="exec-entry-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                <div className="exec-role-info">
                   <h3 className="exec-role" style={{ fontSize: '1.15rem', fontWeight: '800', textTransform: 'uppercase', color: '#1e293b', margin: 0 }}>{edu.degree}</h3>
                   <p className="exec-company" style={{ fontSize: '1rem', fontWeight: '600', color: settings.primaryColor, marginTop: '0.2rem' }}>{edu.school} • {edu.location}</p>
                </div>
                <span className="exec-period" style={{ fontSize: '0.9rem', fontWeight: '700', color: '#64748b' }}>{edu.startDate} — {edu.endDate}</span>
              </div>
            </div>
          ))}
        </section>

        <section className="exec-section">
          <h2 className="exec-section-title" style={{ ...borderPrimaryStyle, fontSize: '1.1rem', textTransform: 'uppercase', fontWeight: '800', letterSpacing: '0.15em', marginBottom: '2rem', paddingBottom: '0.4rem', color: '#0f172a' }}>Skills & Expertise</h2>
          <div className="exec-skills-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {skills.map(skill => (
              <div key={skill.id} className="exec-skill-item" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem', fontWeight: '600', color: '#334155' }}>
                <span className="exec-skill-dot" style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: settings.primaryColor }}></span>
                <span className="exec-skill-name">{skill.name}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ExecutiveTemplate;
