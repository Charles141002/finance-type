export function getCvCss(fontScale: number = 1): string {
  const fs10 = 10 * fontScale; // base body font size in pt
  const fs12 = 12 * fontScale;
  const fs18 = 18 * fontScale;
  const gap8 = 8 * fontScale;
  const gap4 = 4 * fontScale;
  const gap2 = 2 * fontScale;
  const indent1 = 16 * fontScale;
  const indent2 = 22 * fontScale;

  return `
  /* Page and typography */
  @page { size: A4; margin: 15mm; }
  .cv { font-family: 'Times New Roman', Times, serif; font-size: ${fs10}pt; line-height: 1.25; color: #000; }
  .cv h1, .cv h2, .cv h3, .cv h4, .cv p { margin: 0; padding: 0; }
  .cv a { color: inherit; text-decoration: underline; }

  /* Header */
  .cv .cv-header { text-align: center; margin-bottom: ${gap8}px; }
  .cv .cv-name { font-size: ${fs18}pt; font-weight: 700; }
  .cv .cv-contact { text-align: center; font-size: ${fs10}pt; margin-top: ${gap2}px; }
  .cv .cv-intro { text-align: center; font-style: italic; margin-bottom: ${gap8}px; }

  /* Sections */
  .cv .cv-section { margin-top: ${gap8}px; }
  .cv .cv-section-title { font-size: ${fs12}pt; text-transform: uppercase; margin: 0 0 ${gap4}px 0; padding-bottom: ${gap2}px; border-bottom: 0.5pt solid #000; }

  /* Subsections */
  .cv .cv-subsection { margin-bottom: ${gap4}px; }
  .cv .cv-subsection-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: ${gap2}px; column-gap: ${gap4}px; }
  .cv .cv-subsection-title { font-size: ${fs10}pt; font-weight: 600; }
  .cv .cv-subsection-subtitle { font-size: ${fs10}pt; margin-top: ${Math.max(1 * fontScale, 1)}px; }
  .cv .cv-subsection-period { font-size: ${fs10}pt; font-style: italic; white-space: nowrap; }

  /* Text and bullets */
  .cv .cv-text { font-size: ${fs10}pt; margin-bottom: ${gap2}px; }
  .cv .cv-bullet { position: relative; padding-left: ${indent1}px; }
  .cv .cv-bullet::before { content: "–"; position: absolute; left: 0; top: 0; }
  .cv .cv-bullet--level2 { padding-left: ${indent2}px; }
  .cv .cv-bullet--level2::before { content: "•"; }

  /* Divider */
  .cv hr.cv-divider { border: 0; border-top: 0.5pt solid #000; margin: ${gap8}px 0; }
  `;
}

export default getCvCss;

