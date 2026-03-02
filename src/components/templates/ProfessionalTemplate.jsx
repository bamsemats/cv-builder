import React from "react";
import { Mail, Phone, MapPin, Globe, Award } from "lucide-react";

const ProfessionalTemplate = ({ data }) => {
  const { personal, experience, education, skills, settings } = data;

  const primaryStyle = { color: settings.primaryColor };
  const accentBg = { backgroundColor: `${settings.primaryColor}10` };

  return (
    <div className="cv-paper professional-layout" style={{ fontFamily: settings.fontFamily }}>
      <header className="prof-header" style={{ padding: '4rem 4rem 2rem 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '3rem', fontWeight: '800', color: '#111', margin: 0, letterSpacing: '-0.02em' }}>{personal.fullName}</h1>
          <p style={{ fontSize: '1.25rem', color: settings.primaryColor, fontWeight: '600', marginTop: '0.25rem' }}>{personal.title}</p>
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1.5rem', fontSize: '0.85rem', color: '#555' }}>
            {personal.email && <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Mail size={14} style={primaryStyle} /> {personal.email}</span>}
            {personal.phone && <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Phone size={14} style={primaryStyle} /> {personal.phone}</span>}
          </div>
        </div>
        {personal.image && (
          <div className="prof-image-wrap" style={{ width: '130px', height: '130px', borderRadius: '12px', overflow: 'hidden', border: `1px solid #eee` }}>
            <img src={personal.image} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}
      </header>

      <div className="prof-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 2.8fr', borderTop: '1px solid #eee' }}>
        <aside className="prof-sidebar" style={{ borderRight: '1px solid #eee', padding: '2rem 4rem 4rem 4rem' }}>
          <section style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#888', marginBottom: '1rem' }}>Location</h3>
            <p style={{ fontSize: '0.9rem', color: '#444', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={14} /> {personal.address}</p>
          </section>

          <section style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#888', marginBottom: '1rem' }}>Skills</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {skills.map(skill => (
                <div key={skill.id}>
                  <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#333', marginBottom: '0.25rem' }}>{skill.name}</div>
                  <div style={{ height: '3px', width: '100%', backgroundColor: '#eee', borderRadius: '2px' }}>
                    <div style={{ 
                      height: '100%', 
                      width: skill.level === "Expert" ? "100%" : skill.level === "Advanced" ? "80%" : skill.level === "Intermediate" ? "60%" : "40%", 
                      backgroundColor: settings.primaryColor,
                      borderRadius: '2px'
                    }}></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </aside>

        <main className="prof-main" style={{ padding: '2rem 4rem 4rem 2rem' }}>
          <section style={{ marginBottom: '3rem' }}>
            <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#888', marginBottom: '1.25rem' }}>About Me</h3>
            <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#444' }}>{personal.summary}</p>
          </section>

          <section style={{ marginBottom: '3rem' }}>
            <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#888', marginBottom: '1.5rem' }}>Experience</h3>
            {experience.map(exp => (
              <div key={exp.id} className="prof-entry" style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#111', margin: 0 }}>{exp.position}</h4>
                  <span style={{ fontSize: '0.85rem', fontWeight: '600', color: settings.primaryColor }}>{exp.startDate} — {exp.endDate}</span>
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: '600', color: '#666', marginBottom: '0.75rem' }}>{exp.company} | {exp.location}</div>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#555', whiteSpace: 'pre-wrap' }}>{exp.description}</p>
              </div>
            ))}
          </section>

          <section>
            <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#888', marginBottom: '1.5rem' }}>Education</h3>
            {education.map(edu => (
              <div key={edu.id} className="prof-entry" style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.3rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#111', margin: 0 }}>{edu.degree}</h4>
                  <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#888' }}>{edu.startDate} — {edu.endDate}</span>
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#666' }}>{edu.school}</div>
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
};

export default ProfessionalTemplate;
