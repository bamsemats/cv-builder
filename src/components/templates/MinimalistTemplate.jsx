import React from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

const MinimalistTemplate = ({ data }) => {
  const { personal, experience, education, skills, settings } = data;

  const primaryStyle = { color: settings.primaryColor };
  const borderPrimaryStyle = { borderBottom: `2px solid #f1f5f9` };

  return (
    <div className="cv-paper minimalist-layout" style={{ fontFamily: settings.fontFamily, padding: '3rem' }}>
      <header className="min-header" style={{ marginBottom: '3.5rem', display: 'flex', gap: '2rem', alignItems: 'center' }}>
        {personal.image && (
          <div className="min-profile-wrap" style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', border: '3px solid #f8fafc', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
            <img src={personal.image} alt="Profile" className="min-profile-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}
        <div className="min-header-info" style={{ flex: 1 }}>
          <h1 className="min-name" style={{ ...primaryStyle, fontSize: '3.2rem', fontWeight: '800', letterSpacing: '-0.02em', margin: 0 }}>{personal.fullName}</h1>
          <p className="min-title" style={{ fontSize: '1.25rem', color: '#64748b', fontWeight: '500', marginBottom: '1rem' }}>{personal.title}</p>
          <div className="min-contact-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', color: '#94a3b8', fontSize: '0.85rem' }}>
            {personal.email && (
              <span className="min-contact-item" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Mail size={14} style={{ color: settings.primaryColor }} /> {personal.email}</span>
            )}
            {personal.phone && (
              <span className="min-contact-item" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Phone size={14} style={{ color: settings.primaryColor }} /> {personal.phone}</span>
            )}
            {personal.address && (
              <span className="min-contact-item" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><MapPin size={14} style={{ color: settings.primaryColor }} /> {personal.address}</span>
            )}
            {personal.website && (
              <span className="min-contact-item" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Globe size={14} style={{ color: settings.primaryColor }} /> {personal.website}</span>
            )}
          </div>
        </div>
      </header>

      <section className="min-section" style={{ marginBottom: '3rem' }}>
        <h2 className="min-section-title" style={{ ...borderPrimaryStyle, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: '700', color: '#94a3b8', marginBottom: '1.25rem', paddingBottom: '0.5rem' }}>Professional Profile</h2>
        <p className="min-summary" style={{ fontSize: '1rem', color: '#475569', lineHeight: '1.8', maxWidth: '90%' }}>{personal.summary}</p>
      </section>

      <div className="min-grid" style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '4rem' }}>
        <div className="min-main-col">
          <section className="min-section" style={{ marginBottom: '3rem' }}>
            <h2 className="min-section-title" style={{ ...borderPrimaryStyle, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: '700', color: '#94a3b8', marginBottom: '1.5rem', paddingBottom: '0.5rem' }}>Experience</h2>
            {experience.map(exp => (
              <div key={exp.id} className="min-entry" style={{ marginBottom: '2rem' }}>
                <div className="min-entry-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                  <h3 className="min-role" style={{ fontSize: '1.15rem', fontWeight: '700', color: '#1e293b' }}>{exp.position}</h3>
                  <span className="min-period" style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '600' }}>{exp.startDate} — {exp.endDate}</span>
                </div>
                <p className="min-company" style={{ fontSize: '0.95rem', fontWeight: '600', color: settings.primaryColor, marginBottom: '0.75rem' }}>{exp.company} • {exp.location}</p>
                <p className="min-desc" style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: '1.7' }}>{exp.description}</p>
              </div>
            ))}
          </section>

          <section className="min-section">
            <h2 className="min-section-title" style={{ ...borderPrimaryStyle, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: '700', color: '#94a3b8', marginBottom: '1.5rem', paddingBottom: '0.5rem' }}>Education</h2>
            {education.map(edu => (
              <div key={edu.id} className="min-entry" style={{ marginBottom: '1.5rem' }}>
                <div className="min-entry-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                  <h3 className="min-role" style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1e293b' }}>{edu.degree}</h3>
                  <span className="min-period" style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '600' }}>{edu.startDate} — {edu.endDate}</span>
                </div>
                <p className="min-company" style={{ fontSize: '0.95rem', fontWeight: '600', color: settings.primaryColor, marginBottom: '0.5rem' }}>{edu.school} • {edu.location}</p>
              </div>
            ))}
          </section>
        </div>

        <aside className="min-side-col">
          <section className="min-section">
            <h2 className="min-section-title" style={{ ...borderPrimaryStyle, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: '700', color: '#94a3b8', marginBottom: '1.5rem', paddingBottom: '0.5rem' }}>Core Skills</h2>
            <div className="min-skills-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {skills.map(skill => (
                <div key={skill.id} className="min-skill-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '0.75rem 1rem', borderRadius: '8px' }}>
                  <span className="min-skill-name" style={{ fontSize: '0.9rem', fontWeight: '600', color: '#475569' }}>{skill.name}</span>
                  <span className="min-skill-level" style={{ fontSize: '0.75rem', fontWeight: '700', color: settings.primaryColor, textTransform: 'uppercase' }}>{skill.level}</span>
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
