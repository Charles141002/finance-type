import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Linkedin, User, Briefcase, GraduationCap, Award } from "lucide-react";

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

export default function CVPreview({ data }: CVPreviewProps) {
  const { personalInfo, experience, education, skills } = data;

  return (
    <Card className="shadow-elegant border-border/50 bg-gradient-card">
      <CardHeader className="bg-gradient-primary text-white rounded-t-lg">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <div className="flex flex-wrap justify-center gap-4 text-sm opacity-90">
            {personalInfo.email && (
              <div className="flex items-center gap-1">
                <Mail className="h-3 w-3" />
                {personalInfo.email}
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                {personalInfo.phone}
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {personalInfo.location}
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-1">
                <Linkedin className="h-3 w-3" />
                {personalInfo.linkedin}
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Experience Section */}
        {experience.some(exp => exp.company || exp.position) && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="h-5 w-5 text-finance-navy" />
              <h2 className="text-lg font-semibold text-finance-navy border-b border-finance-light pb-1 flex-1">
                EXPÉRIENCE PROFESSIONNELLE
              </h2>
            </div>
            <div className="space-y-4">
              {experience.map((exp, index) => (
                exp.company || exp.position ? (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-foreground">{exp.position}</h3>
                        <p className="text-finance-blue font-medium">{exp.company}</p>
                      </div>
                      <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                        {exp.period}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-sm text-muted-foreground leading-relaxed pl-4 border-l-2 border-finance-light">
                        {exp.description}
                      </p>
                    )}
                    {index < experience.length - 1 && exp.company && <Separator className="my-4" />}
                  </div>
                ) : null
              ))}
            </div>
          </section>
        )}

        {/* Education Section */}
        {education.some(edu => edu.institution || edu.degree) && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="h-5 w-5 text-finance-navy" />
              <h2 className="text-lg font-semibold text-finance-navy border-b border-finance-light pb-1 flex-1">
                FORMATION
              </h2>
            </div>
            <div className="space-y-4">
              {education.map((edu, index) => (
                edu.institution || edu.degree ? (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-foreground">{edu.degree}</h3>
                        <p className="text-finance-blue font-medium">{edu.institution}</p>
                      </div>
                      <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                        {edu.period}
                      </span>
                    </div>
                    {edu.details && (
                      <p className="text-sm text-muted-foreground leading-relaxed pl-4 border-l-2 border-finance-light">
                        {edu.details}
                      </p>
                    )}
                    {index < education.length - 1 && edu.institution && <Separator className="my-4" />}
                  </div>
                ) : null
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {(skills.technical || skills.languages || skills.certifications) && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Award className="h-5 w-5 text-finance-navy" />
              <h2 className="text-lg font-semibold text-finance-navy border-b border-finance-light pb-1 flex-1">
                COMPÉTENCES
              </h2>
            </div>
            <div className="space-y-3">
              {skills.technical && (
                <div>
                  <h4 className="font-medium text-foreground mb-1">Compétences techniques</h4>
                  <p className="text-sm text-muted-foreground">{skills.technical}</p>
                </div>
              )}
              {skills.languages && (
                <div>
                  <h4 className="font-medium text-foreground mb-1">Langues</h4>
                  <p className="text-sm text-muted-foreground">{skills.languages}</p>
                </div>
              )}
              {skills.certifications && (
                <div>
                  <h4 className="font-medium text-foreground mb-1">Certifications</h4>
                  <p className="text-sm text-muted-foreground">{skills.certifications}</p>
                </div>
              )}
            </div>
          </section>
        )}
      </CardContent>
    </Card>
  );
}