import { useState, useRef } from "react";
import CVForm from "@/components/CVForm";
import CVPreview from "@/components/CVPreview";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Target } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { generateLatexTemplate, CVData } from "@/lib/latexTemplate";


const Index = () => {
  const [previewData, setPreviewData] = useState<CVData | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const { toast } = useToast();
  const cvRef = useRef<HTMLDivElement>(null);

  const handlePreview = (data: CVData) => {
    setPreviewData(data);
    setShowPreview(true);
    toast({
      title: "Aperçu généré",
      description: "Votre CV a été généré avec succès.",
    });
  };

  const handleGenerate = async (data: CVData) => {
    try {
      toast({
        title: "Génération PDF en cours",
        description: "Votre CV PDF est en cours de génération...",
      });

      // Créer une nouvelle fenêtre pour le PDF
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        throw new Error('Impossible d\'ouvrir une nouvelle fenêtre');
      }

      // Générer le template LaTeX
      const latexTemplate = generateLatexTemplate(data);
      
      // Importer Paged.js dynamiquement
      const Paged = await import("pagedjs");
      
      // Créer le HTML avec le style LaTeX
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>CV - ${data.personalInfo.firstName} ${data.personalInfo.lastName}</title>
          <style>
            @page {
              size: A4;
              margin: 2cm;
            }
            
            body {
              font-family: "Times New Roman", serif;
              font-size: 11pt;
              line-height: 1.2;
              color: #000;
              margin: 0;
              padding: 0;
            }
            
            .cv-container {
              max-width: 100%;
              margin: 0 auto;
            }
            
            .header {
              text-align: center;
              margin-bottom: 2em;
            }
            
            .name {
              font-size: 16pt;
              font-weight: bold;
              text-transform: uppercase;
              margin-bottom: 0.5em;
            }
            
            .contact-info {
              font-size: 10pt;
              margin-bottom: 0.2em;
            }
            
            .section {
              margin-bottom: 1.5em;
            }
            
            .section-title {
              font-size: 13pt;
              font-weight: bold;
              text-transform: uppercase;
              border-bottom: 0.5pt solid #000;
              margin-bottom: 0.5em;
              padding-bottom: 0.2em;
            }
            
            .subsection {
              margin-bottom: 0.8em;
            }
            
            .subsection-title {
              font-size: 11pt;
              font-weight: bold;
              margin-bottom: 0.3em;
            }
            
            .period {
              font-style: italic;
              font-size: 10pt;
              margin-bottom: 0.3em;
            }
            
            .description {
              font-size: 10pt;
              line-height: 1.3;
            }
            
            .skills-section {
              margin-bottom: 0.5em;
            }
            
            .skills-label {
              font-weight: bold;
              font-size: 10pt;
            }
            
            .skills-content {
              font-size: 10pt;
              margin-left: 1em;
            }
            
            a {
              color: #000;
              text-decoration: none;
            }
            
            a:hover {
              text-decoration: underline;
            }
          </style>
        </head>
        <body>
          <div class="cv-container">
            <div class="header">
              <div class="name">${data.personalInfo.firstName.toUpperCase()} ${data.personalInfo.lastName.toUpperCase()}</div>
              <div class="contact-info">
                <a href="mailto:${data.personalInfo.email}">${data.personalInfo.email}</a> | 
                ${data.personalInfo.phone} | 
                ${data.personalInfo.location}
              </div>
              <div class="contact-info">
                <a href="${data.personalInfo.linkedin}">LinkedIn: ${data.personalInfo.linkedin}</a>
              </div>
            </div>
            
            <div class="section">
              <div class="section-title">Expérience Professionnelle</div>
              ${data.experience.map(exp => `
                <div class="subsection">
                  <div class="subsection-title">${exp.position} - ${exp.company}</div>
                  <div class="period">${exp.period}</div>
                  <div class="description">${exp.description.split('\n').map(line => line.trim()).filter(line => line).join('<br>')}</div>
                </div>
              `).join('')}
            </div>
            
            <div class="section">
              <div class="section-title">Formation</div>
              ${data.education.map(edu => `
                <div class="subsection">
                  <div class="subsection-title">${edu.degree} - ${edu.institution}</div>
                  <div class="period">${edu.period}</div>
                  <div class="description">${edu.details.split('\n').map(line => line.trim()).filter(line => line).join('<br>')}</div>
                </div>
              `).join('')}
            </div>
            
            <div class="section">
              <div class="section-title">Compétences</div>
              <div class="skills-section">
                <span class="skills-label">Techniques:</span>
                <span class="skills-content">${data.skills.technical}</span>
              </div>
              <div class="skills-section">
                <span class="skills-label">Langues:</span>
                <span class="skills-content">${data.skills.languages}</span>
              </div>
              <div class="skills-section">
                <span class="skills-label">Certifications:</span>
                <span class="skills-content">${data.skills.certifications}</span>
              </div>
            </div>
          </div>
        </body>
        </html>
      `;
      
      // Écrire le contenu dans la fenêtre
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      
      // Attendre que le contenu soit chargé
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Utiliser Paged.js pour générer le PDF
      const paged = new Paged.Previewer();
      await paged.preview(htmlContent, [], printWindow.document.body);
      
      // Déclencher l'impression
      printWindow.print();
      
      // Fermer la fenêtre après impression
      setTimeout(() => {
        printWindow.close();
      }, 1000);
      
      toast({
        title: "PDF généré avec succès",
        description: "Votre CV a été téléchargé.",
      });
      
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Erreur lors de la génération",
        description: `Une erreur est survenue: ${error instanceof Error ? error.message : 'Erreur inconnue'}`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card className="bg-card border-border/50 shadow-card">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Target className="h-5 w-5 text-finance-navy" />
                    <h2 className="text-xl font-semibold text-finance-navy">
                      Remplissez vos informations
                    </h2>
                  </div>
                  <CVForm onPreview={handlePreview} onGenerate={handleGenerate} />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <div className="sticky top-8">
                {showPreview && previewData ? (
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-finance-navy flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Aperçu de votre CV
                    </h2>
                    <CVPreview ref={cvRef} data={previewData} />
                  </div>
                ) : (
                  <Card className="shadow-card border-border/50 bg-gradient-card">
                    <CardContent className="pt-6">
                      <div className="text-center py-12">
                        <div className="mx-auto w-16 h-16 bg-finance-light rounded-full flex items-center justify-center mb-4">
                          <FileText className="h-8 w-8 text-finance-navy" />
                        </div>
                        <h3 className="text-lg font-medium text-finance-navy mb-2">
                          Aperçu de votre CV
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          Remplissez le formulaire et cliquez sur "Aperçu" pour voir votre CV
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;