export interface CVData {
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

export function generateLatexTemplate(data: CVData): string {
  const { personalInfo, experience, education, skills } = data;

  return `\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage{geometry}
\\usepackage{enumitem}
\\usepackage{titlesec}
\\usepackage{xcolor}
\\usepackage{hyperref}

% Configuration de la page
\\geometry{margin=2cm}

% Configuration des titres
\\titleformat{\\section}{\\large\\bfseries}{}{0em}{}[\\vspace{-0.5em}\\rule{\\textwidth}{0.5pt}\\vspace{0.5em}]
\\titleformat{\\subsection}{\\normalsize\\bfseries}{}{0em}{}

% Configuration des listes
\\setlist[itemize]{leftmargin=*,noitemsep,topsep=0pt}

% Configuration des liens
\\hypersetup{
    colorlinks=true,
    linkcolor=black,
    urlcolor=black
}

\\begin{document}

% En-tête avec nom et informations personnelles
\\begin{center}
    {\\Large\\textbf{${personalInfo.firstName.toUpperCase()} ${personalInfo.lastName.toUpperCase()}}}\\\\[0.5em]
    \\href{mailto:${personalInfo.email}}{${personalInfo.email}} $|$ ${personalInfo.phone} $|$ ${personalInfo.location}\\\\[0.2em]
    \\href{${personalInfo.linkedin}}{LinkedIn: ${personalInfo.linkedin}}
\\end{center}

\\vspace{1em}

% Section Expérience Professionnelle
\\section{EXPÉRIENCE PROFESSIONNELLE}
${experience.map(exp => `
\\subsection{${exp.position} - ${exp.company}}
\\textit{${exp.period}}\\\\[0.3em]
${exp.description.split('\n').map(line => line.trim()).filter(line => line).join('\\\\')}
`).join('\n')}

% Section Formation
\\section{FORMATION}
${education.map(edu => `
\\subsection{${edu.degree} - ${edu.institution}}
\\textit{${edu.period}}\\\\[0.3em]
${edu.details.split('\n').map(line => line.trim()).filter(line => line).join('\\\\')}
`).join('\n')}

% Section Compétences
\\section{COMPÉTENCES}

\\textbf{Techniques:} ${skills.technical}

\\textbf{Langues:} ${skills.languages}

\\textbf{Certifications:} ${skills.certifications}

\\end{document}`;
}
