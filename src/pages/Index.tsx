import { useState } from "react";
import CVForm from "@/components/CVForm";
import CVPreview from "@/components/CVPreview";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Target } from "lucide-react";

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

const Index = () => {
  const [previewData, setPreviewData] = useState<CVData | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const { toast } = useToast();

  const handlePreview = (data: CVData) => {
    setPreviewData(data);
    setShowPreview(true);
    toast({
      title: "Aperçu généré",
      description: "Votre CV a été généré avec succès.",
    });
  };

  const handleGenerate = (data: CVData) => {
    // Simulate PDF generation
    toast({
      title: "PDF en cours de génération",
      description: "Votre CV PDF sera téléchargé sous peu.",
    });
    
    // Here you would implement the actual LaTeX to PDF conversion
    console.log("Generating PDF with data:", data);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-white shadow-elegant">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Générateur CV Finance</h1>
              <p className="text-white/80 text-sm">Créez votre CV professionnel en quelques clics</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
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

          {/* Preview Section */}
          <div className="space-y-6">
            <div className="sticky top-8">
              {showPreview && previewData ? (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-finance-navy flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Aperçu de votre CV
                  </h2>
                  <CVPreview data={previewData} />
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
    </div>
  );
};

export default Index;
