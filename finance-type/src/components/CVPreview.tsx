import React, { useRef, useEffect, useState } from "react";
import { jsPDF } from "jspdf";

const CvPreview: React.FC = () => {
  const cvRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(12);
  const [lineHeight, setLineHeight] = useState(1.2);

  // Ajustement dynamique du CV pour tenir sur une page
  useEffect(() => {
    const adjustCv = () => {
      if (!cvRef.current) return;

      let fs = 12;
      let lh = 1.2;
      const maxHeight = 1122; // approx A4 height in px (96dpi)

      while (cvRef.current.scrollHeight > maxHeight && fs > 7) {
        fs -= 0.5;
        lh -= 0.02;
        cvRef.current.style.fontSize = `${fs}pt`;
        cvRef.current.style.lineHeight = `${lh}`;
      }

      setFontSize(fs);
      setLineHeight(lh);
    };

    adjustCv();
    window.addEventListener("resize", adjustCv);
    return () => window.removeEventListener("resize", adjustCv);
  }, []);

  const generatePdf = async () => {
    if (!cvRef.current) return;

    const pdf = new jsPDF("p", "mm", "a4");
    await pdf.html(cvRef.current, {
      callback: (doc) => doc.save("CV.pdf"),
      x: 10,
      y: 10,
      html2canvas: { scale: 0.8 },
    });
  };

  return (
    <div>
      <button
        onClick={generatePdf}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Télécharger le CV
      </button>

      <div
        ref={cvRef}
        style={{
          fontFamily: "'Times New Roman', serif",
          fontSize: `${fontSize}pt`,
          lineHeight: lineHeight,
          margin: "20mm",
          width: "170mm",
        }}
      >
        {/* Entête */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1 style={{ fontSize: "22pt", fontWeight: "bold" }}>Charles Pelong</h1>
          <h2 style={{ fontSize: "16pt", fontStyle: "italic" }}>Développeur Data</h2>
        </div>

        <hr style={{ margin: "8px 0" }} />

        {/* Contenu en colonnes */}
        <div style={{ display: "flex", gap: "20px" }}>
          {/* Colonne gauche */}
          <div style={{ flex: 1 }}>
            <h3 style={{ textDecoration: "underline" }}>Informations</h3>
            <p>Email: charles@example.com</p>
            <p>Téléphone: +33 6 12 34 56 78</p>
            <p>LinkedIn: linkedin.com/in/charles</p>
            <p>Github: github.com/charlespelong</p>

            <h3 style={{ textDecoration: "underline", marginTop: "10px" }}>Compétences</h3>
            <ul>
              <li>Python</li>
              <li>React</li>
              <li>SQL</li>
              <li>Machine Learning</li>
              <li>Docker</li>
            </ul>
          </div>

          {/* Colonne droite */}
          <div style={{ flex: 2 }}>
            <h3 style={{ textDecoration: "underline" }}>Expériences</h3>
            <div style={{ marginBottom: "10px" }}>
              <p style={{ fontWeight: "bold" }}>Sopra Steria Next – Stage Data Scientist</p>
              <p style={{ fontStyle: "italic" }}>2024 – 2025</p>
              <p>Analyse des performances et optimisation des processus via Python, Power BI et Excel.</p>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <p style={{ fontWeight: "bold" }}>JCDecaux – Stage Analyste Data</p>
              <p style={{ fontStyle: "italic" }}>2023 – 2024</p>
              <p>Création de dashboards et rapports pour le suivi de KPIs.</p>
            </div>

            <h3 style={{ textDecoration: "underline" }}>Éducation</h3>
            <div>
              <p style={{ fontWeight: "bold" }}>École d’ingénieur X – Master 2 Data Science</p>
              <p style={{ fontStyle: "italic" }}>2022 – 2024</p>
              <p>Formation en Machine Learning, Big Data et développement logiciel.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CvPreview;
