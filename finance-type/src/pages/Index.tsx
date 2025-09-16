import { useState, useRef } from "react";
import CVForm from "@/components/CVForm";
import CVPreview from "@/components/CVPreview";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Target } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { generateLatexTemplate, CVData } from "@/lib/latexTemplate";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";


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


  const handleGenerate = async () => {
    if (!cvRef.current) return;

    const canvas = await html2canvas(cvRef.current, { scale: 5});
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("CV.pdf");
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