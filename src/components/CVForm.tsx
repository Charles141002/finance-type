import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User, Briefcase, GraduationCap, Award, Eye, Download } from "lucide-react";

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

interface CVFormProps {
  onPreview: (data: CVData) => void;
  onGenerate: (data: CVData) => void;
}

export default function CVForm({ onPreview, onGenerate }: CVFormProps) {
  const [cvData, setCvData] = useState<CVData>({
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
    },
    experience: [{ company: "", position: "", period: "", description: "" }],
    education: [{ institution: "", degree: "", period: "", details: "" }],
    skills: {
      technical: "",
      languages: "",
      certifications: "",
    },
  });

  const updatePersonalInfo = (field: keyof CVData["personalInfo"], value: string) => {
    setCvData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const updateExperience = (index: number, field: keyof CVData["experience"][0], value: string) => {
    setCvData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const addExperience = () => {
    setCvData(prev => ({
      ...prev,
      experience: [...prev.experience, { company: "", position: "", period: "", description: "" }]
    }));
  };

  const updateEducation = (index: number, field: keyof CVData["education"][0], value: string) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const addEducation = () => {
    setCvData(prev => ({
      ...prev,
      education: [...prev.education, { institution: "", degree: "", period: "", details: "" }]
    }));
  };

  const updateSkills = (field: keyof CVData["skills"], value: string) => {
    setCvData(prev => ({
      ...prev,
      skills: { ...prev.skills, [field]: value }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <Card className="shadow-card border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-finance-navy">
            <User className="h-5 w-5" />
            Informations personnelles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="text-sm font-medium">Prénom</Label>
              <Input
                id="firstName"
                value={cvData.personalInfo.firstName}
                onChange={(e) => updatePersonalInfo("firstName", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-sm font-medium">Nom</Label>
              <Input
                id="lastName"
                value={cvData.personalInfo.lastName}
                onChange={(e) => updatePersonalInfo("lastName", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                value={cvData.personalInfo.email}
                onChange={(e) => updatePersonalInfo("email", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-sm font-medium">Téléphone</Label>
              <Input
                id="phone"
                value={cvData.personalInfo.phone}
                onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="location" className="text-sm font-medium">Localisation</Label>
              <Input
                id="location"
                value={cvData.personalInfo.location}
                onChange={(e) => updatePersonalInfo("location", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="linkedin" className="text-sm font-medium">LinkedIn</Label>
              <Input
                id="linkedin"
                value={cvData.personalInfo.linkedin}
                onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Experience */}
      <Card className="shadow-card border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-finance-navy">
            <Briefcase className="h-5 w-5" />
            Expérience professionnelle
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {cvData.experience.map((exp, index) => (
            <div key={index} className="space-y-4">
              {index > 0 && <Separator className="my-6" />}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`company-${index}`} className="text-sm font-medium">Entreprise</Label>
                  <Input
                    id={`company-${index}`}
                    value={exp.company}
                    onChange={(e) => updateExperience(index, "company", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor={`position-${index}`} className="text-sm font-medium">Poste</Label>
                  <Input
                    id={`position-${index}`}
                    value={exp.position}
                    onChange={(e) => updateExperience(index, "position", e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor={`period-${index}`} className="text-sm font-medium">Période</Label>
                <Input
                  id={`period-${index}`}
                  value={exp.period}
                  onChange={(e) => updateExperience(index, "period", e.target.value)}
                  placeholder="Ex: Jan 2022 - Présent"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor={`description-${index}`} className="text-sm font-medium">Description</Label>
                <Textarea
                  id={`description-${index}`}
                  value={exp.description}
                  onChange={(e) => updateExperience(index, "description", e.target.value)}
                  rows={3}
                  className="mt-1"
                />
              </div>
            </div>
          ))}
          <Button onClick={addExperience} variant="outline" className="w-full">
            Ajouter une expérience
          </Button>
        </CardContent>
      </Card>

      {/* Education */}
      <Card className="shadow-card border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-finance-navy">
            <GraduationCap className="h-5 w-5" />
            Formation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {cvData.education.map((edu, index) => (
            <div key={index} className="space-y-4">
              {index > 0 && <Separator className="my-6" />}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`institution-${index}`} className="text-sm font-medium">Institution</Label>
                  <Input
                    id={`institution-${index}`}
                    value={edu.institution}
                    onChange={(e) => updateEducation(index, "institution", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor={`degree-${index}`} className="text-sm font-medium">Diplôme</Label>
                  <Input
                    id={`degree-${index}`}
                    value={edu.degree}
                    onChange={(e) => updateEducation(index, "degree", e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor={`edu-period-${index}`} className="text-sm font-medium">Période</Label>
                <Input
                  id={`edu-period-${index}`}
                  value={edu.period}
                  onChange={(e) => updateEducation(index, "period", e.target.value)}
                  placeholder="Ex: 2018 - 2022"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor={`edu-details-${index}`} className="text-sm font-medium">Détails</Label>
                <Textarea
                  id={`edu-details-${index}`}
                  value={edu.details}
                  onChange={(e) => updateEducation(index, "details", e.target.value)}
                  rows={2}
                  className="mt-1"
                />
              </div>
            </div>
          ))}
          <Button onClick={addEducation} variant="outline" className="w-full">
            Ajouter une formation
          </Button>
        </CardContent>
      </Card>

      {/* Skills */}
      <Card className="shadow-card border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-finance-navy">
            <Award className="h-5 w-5" />
            Compétences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="technical" className="text-sm font-medium">Compétences techniques</Label>
            <Textarea
              id="technical"
              value={cvData.skills.technical}
              onChange={(e) => updateSkills("technical", e.target.value)}
              placeholder="Ex: Python, R, SQL, Excel, Bloomberg Terminal..."
              rows={2}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="languages" className="text-sm font-medium">Langues</Label>
            <Textarea
              id="languages"
              value={cvData.skills.languages}
              onChange={(e) => updateSkills("languages", e.target.value)}
              placeholder="Ex: Français (natif), Anglais (courant), Espagnol (intermédiaire)"
              rows={2}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="certifications" className="text-sm font-medium">Certifications</Label>
            <Textarea
              id="certifications"
              value={cvData.skills.certifications}
              onChange={(e) => updateSkills("certifications", e.target.value)}
              placeholder="Ex: CFA Level I, FRM, Bloomberg Market Concepts..."
              rows={2}
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4">
        <Button 
          onClick={() => onPreview(cvData)} 
          variant="preview" 
          className="flex-1"
          size="lg"
        >
          <Eye className="h-4 w-4" />
          Aperçu
        </Button>
        <Button 
          onClick={() => onGenerate(cvData)} 
          variant="generate" 
          className="flex-1"
          size="lg"
        >
          <Download className="h-4 w-4" />
          Générer PDF
        </Button>
      </div>
    </div>
  );
}