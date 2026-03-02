import React from "react";
import { Mail, Phone, MapPin, Globe, GraduationCap } from "lucide-react";

const AcademicTemplate = ({ data }) => {
  const { personal, experience, education, skills, settings } = data;

  const primaryStyle = { color: settings.primaryColor };
  const borderStyle = { borderBottom: `1px solid ${settings.primaryColor}30` };

  return (
    <div className="cv-paper academic-layout" style={{ fontFamily: settings.fontFamily, padding: '4rem' }}>
      <header className="acad-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 0.5rem 0', color: '#1a1a1a' }}>{personal.fullName}</h1>
        <p style={{ fontSize: '1.1rem', color: settings.primaryColor, fontWeight: '600', marginBottom: '1.5rem' }}>{personal.title}</p>
        
        <div className="acad-contact" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.9rem', color: '#666' }}>
          {personal.email && <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Mail size={14} /> {personal.email}</span>}
          {personal.phone && <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Phone size={14} /> {personal.phone}</span>}
          {personal.address && <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><MapPin size={14} /> {personal.address}</span>}
          {personal.website && <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Globe size={14} /> {personal.website}</span>}
        </div>
      </header>

      <section className="acad-section" style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ ...borderStyle, fontSize: '1rem', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.1em', paddingBottom: '0.3rem', marginBottom: '1rem', color: '#333' }}>Education</h2>
        {education.map(edu => (
          <div key={edu.id} className="acad-entry" style={{ marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', color: '#1a1a1a' }}>
              <span>{edu.school}</span>
              <span style={{ color: '#666', fontWeight: '500' }}>{edu.startDate} — {edu.endDate}</span>
            </div>
            <div style={{ fontStyle: 'italic', color: settings.primaryColor, marginBottom: '0.3rem' }}>{edu.degree}</div>
            <p style={{ fontSize: '0.95rem', color: '#555', margin: 0 }}>{edu.description}</p>
          </div>
        ))}
      </section>

      <section className="acad-section" style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ ...borderStyle, fontSize: '1rem', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.1em', paddingBottom: '0.3rem', marginBottom: '1rem', color: '#333' }}>Professional Experience</h2>
        {experience.map(exp => (
          <div key={exp.id} className="acad-entry" style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', color: '#1a1a1a' }}>
              <span>{exp.company}</span>
              <span style={{ color: '#666', fontWeight: '500' }}>{exp.startDate} — {exp.endDate}</span>
            </div>
            <div style={{ fontWeight: '600', color: '#444', marginBottom: '0.4rem' }}>{exp.position}</div>
            <p style={{ fontSize: '0.95rem', color: '#555', margin: 0, whiteSpace: 'pre-wrap' }}>{exp.description}</p>
          </div>
        ))}
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
        <section className="acad-section">
          <h2 style={{ ...borderStyle, fontSize: '1rem', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.1em', paddingBottom: '0.3rem', marginBottom: '1rem', color: '#333' }}>Skills</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {skills.map(skill => (
              <span key={skill.id} style={{ backgroundColor: '#f3f4f6', padding: '0.3rem 0.7rem', borderRadius: '4px', fontSize: '0.85rem', color: '#444' }}>
                {skill.name}
              </span>
            ))}
          </div>
        </section>

        <section className="acad-section">
          <h2 style={{ ...borderStyle, fontSize: '1rem', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.1em', paddingBottom: '0.3rem', marginBottom: '1rem', color: '#333' }}>Summary</h2>
          <p style={{ fontSize: '0.95rem', color: '#555', margin: 0, lineHeight: '1.6' }}>{personal.summary}</p>
        </section>
      </div>
    </div>
  );
};

export default AcademicTemplate;
