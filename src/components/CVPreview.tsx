import { forwardRef } from "react";

interface CVData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
  };
  experience: Array<{
    company: string;
    position: string;
    period: string;
    description: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    period: string;
    details: string;
  }>;
  skills: {
    technical: string;
    languages: string;
    certifications: string;
  };
}

interface CVPreviewProps {
  data: CVData;
}

const CVPreview = forwardRef<HTMLDivElement, CVPreviewProps>(({ data }, ref) => {
  const { personalInfo, experience, education, skills } = data;

  return (
    <div 
      ref={ref}
      style={{
        fontFamily: 'serif',
        backgroundColor: 'white',
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        fontSize: '11pt',
        lineHeight: '1.2',
        color: '#000000',
        boxSizing: 'border-box',
        minHeight: 'auto',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}
    >
      {/* En-tête centré */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{
          fontSize: '18pt',
          fontWeight: 'bold',
          marginBottom: '8px'
        }}>
          {personalInfo.firstName} {personalInfo.lastName}
        </div>
        
        <div style={{
          fontSize: '11pt',
          marginBottom: '8px'
        }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.email && personalInfo.phone && <span> • </span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span> • {personalInfo.location}</span>}
          {personalInfo.linkedin && <span> • {personalInfo.linkedin}</span>}
        </div>
      </div>

      {/* Séparateur */}
      <div style={{
        borderTop: '1px solid #000000',
        marginBottom: '15px'
      }}></div>

      {/* Section Formations */}
      {education.some(edu => edu.institution || edu.degree) && (
        <div style={{ marginBottom: '20px' }}>
          <div style={{
            fontSize: '13pt',
            fontWeight: 'bold',
            marginBottom: '8px'
          }}>
            FORMATIONS
          </div>
          
          {education.map((edu, index) => (
            edu.institution || edu.degree ? (
              <div key={index} style={{ marginBottom: '10px' }}>
                <div style={{
                  fontSize: '11pt',
                  marginBottom: '4px'
                }}>
                  <span style={{ fontWeight: 'bold' }}>{edu.institution}</span>
                  {edu.degree && <span> — {edu.degree}</span>}
                  {edu.period && (
                    <span style={{ 
                      float: 'right', 
                      fontStyle: 'italic',
                      fontWeight: 'normal'
                    }}>
                      {edu.period}
                    </span>
                  )}
                </div>
                {edu.details && (
                  <div style={{
                    fontSize: '10pt',
                    marginLeft: '15px',
                    marginTop: '4px'
                  }}>
                    {edu.details}
                  </div>
                )}
              </div>
            ) : null
          ))}
        </div>
      )}

      {/* Séparateur */}
      <div style={{
        borderTop: '1px solid #000000',
        marginBottom: '15px'
      }}></div>

      {/* Section Expériences */}
      {experience.some(exp => exp.company || exp.position) && (
        <div style={{ marginBottom: '20px' }}>
          <div style={{
            fontSize: '13pt',
            fontWeight: 'bold',
            marginBottom: '8px'
          }}>
            EXPÉRIENCES PROFESSIONNELLES
          </div>
          
          {experience.map((exp, index) => (
            exp.company || exp.position ? (
              <div key={index} style={{ marginBottom: '15px' }}>
                <div style={{
                  fontSize: '11pt',
                  marginBottom: '4px'
                }}>
                  <span style={{ fontWeight: 'bold' }}>{exp.company}</span>
                  {exp.position && <span> — {exp.position}</span>}
                  {exp.period && (
                    <span style={{ 
                      float: 'right', 
                      fontStyle: 'italic',
                      fontWeight: 'normal'
                    }}>
                      {exp.period}
                    </span>
                  )}
                </div>
                {exp.description && (
                  <div style={{
                    fontSize: '10pt',
                    marginLeft: '15px',
                    marginTop: '4px',
                    lineHeight: '1.3'
                  }}>
                    {exp.description}
                  </div>
                )}
              </div>
            ) : null
          ))}
        </div>
      )}

      {/* Séparateur */}
      <div style={{
        borderTop: '1px solid #000000',
        marginBottom: '15px'
      }}></div>

      {/* Section Compétences */}
      {(skills.technical || skills.languages || skills.certifications) && (
        <div style={{ marginBottom: '20px' }}>
          <div style={{
            fontSize: '13pt',
            fontWeight: 'bold',
            marginBottom: '8px'
          }}>
            COMPÉTENCES, LANGUES ET ACTIVITÉS
          </div>
          
          <div style={{ fontSize: '10pt', lineHeight: '1.3' }}>
            {skills.languages && (
              <div style={{ marginBottom: '4px' }}>
                <span style={{ fontWeight: 'bold' }}>Langues :</span> {skills.languages}
              </div>
            )}
            {skills.technical && (
              <div style={{ marginBottom: '4px' }}>
                <span style={{ fontWeight: 'bold' }}>Programmation :</span> {skills.technical}
              </div>
            )}
            {skills.certifications && (
              <div style={{ marginBottom: '4px' }}>
                <span style={{ fontWeight: 'bold' }}>Certifications :</span> {skills.certifications}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

CVPreview.displayName = "CVPreview";

export default CVPreview;