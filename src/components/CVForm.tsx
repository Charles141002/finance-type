import React, { useState } from 'react';
import { Button } from './ui/button';
import { Eye, Download } from 'lucide-react';

interface CVData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  degree: string;
  school: string;
  graduationYear: string;
  skills: string;
}

interface CVFormProps {
  onPreview: () => void;
  onGeneratePDF: () => void;
  onDataChange: (data: CVData) => void;
}

export default function CVForm({ onPreview, onGeneratePDF, onDataChange }: CVFormProps) {
  const [formData, setFormData] = useState<CVData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    company: '',
    startDate: '',
    endDate: '',
    description: '',
    degree: '',
    school: '',
    graduationYear: '',
    skills: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedData = {
      ...formData,
      [name]: value
    };
    setFormData(updatedData);
    onDataChange(updatedData);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-6">
        <div className="gradient-accent rounded-2xl p-8 shadow-floating">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent mb-4">
            Générateur de CV Finance
          </h1>
          <p className="text-lg text-muted-foreground">
            Créez un CV professionnel adapté au secteur financier en quelques minutes
          </p>
        </div>
      </div>

      <form className="space-y-8">
        {/* Informations personnelles */}
        <div className="glass rounded-2xl p-8 hover-lift">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
            Informations personnelles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-3 text-foreground">Prénom</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="input-elegant w-full p-4 rounded-xl text-foreground placeholder:text-muted-foreground"
                placeholder="Votre prénom"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-3 text-foreground">Nom</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="input-elegant w-full p-4 rounded-xl text-foreground placeholder:text-muted-foreground"
                placeholder="Votre nom"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-3 text-foreground">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input-elegant w-full p-4 rounded-xl text-foreground placeholder:text-muted-foreground"
                placeholder="votre.email@exemple.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-3 text-foreground">Téléphone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="input-elegant w-full p-4 rounded-xl text-foreground placeholder:text-muted-foreground"
                placeholder="+33 1 23 45 67 89"
              />
            </div>
          </div>
        </div>

        {/* Expérience professionnelle */}
        <div className="glass rounded-2xl p-8 hover-lift">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
            Expérience professionnelle
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-3 text-foreground">Poste</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                className="input-elegant w-full p-4 rounded-xl text-foreground placeholder:text-muted-foreground"
                placeholder="Analyste financier, Trader, etc."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-3 text-foreground">Entreprise</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="input-elegant w-full p-4 rounded-xl text-foreground placeholder:text-muted-foreground"
                placeholder="Nom de l'entreprise"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-3 text-foreground">Date de début</label>
                <input
                  type="text"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="input-elegant w-full p-4 rounded-xl text-foreground placeholder:text-muted-foreground"
                  placeholder="MM/AAAA"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-3 text-foreground">Date de fin</label>
                <input
                  type="text"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="input-elegant w-full p-4 rounded-xl text-foreground placeholder:text-muted-foreground"
                  placeholder="MM/AAAA ou Présent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-3 text-foreground">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={5}
                className="input-elegant w-full p-4 rounded-xl text-foreground placeholder:text-muted-foreground resize-none"
                placeholder="Décrivez vos responsabilités, réalisations et compétences développées..."
              />
            </div>
          </div>
        </div>

        {/* Formation */}
        <div className="glass rounded-2xl p-8 hover-lift">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
            Formation
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-3 text-foreground">Diplôme</label>
              <input
                type="text"
                name="degree"
                value={formData.degree}
                onChange={handleInputChange}
                className="input-elegant w-full p-4 rounded-xl text-foreground placeholder:text-muted-foreground"
                placeholder="Master en Finance, MBA, etc."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-3 text-foreground">École/Université</label>
              <input
                type="text"
                name="school"
                value={formData.school}
                onChange={handleInputChange}
                className="input-elegant w-full p-4 rounded-xl text-foreground placeholder:text-muted-foreground"
                placeholder="HEC, ESSEC, Dauphine, etc."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-3 text-foreground">Année d'obtention</label>
              <input
                type="text"
                name="graduationYear"
                value={formData.graduationYear}
                onChange={handleInputChange}
                className="input-elegant w-full p-4 rounded-xl text-foreground placeholder:text-muted-foreground"
                placeholder="2024"
              />
            </div>
          </div>
        </div>

        {/* Compétences */}
        <div className="glass rounded-2xl p-8 hover-lift">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
            Compétences
          </h2>
          <div>
            <label className="block text-sm font-semibold mb-3 text-foreground">Compétences techniques</label>
            <textarea
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              rows={5}
              placeholder="Excel avancé, Python, SQL, Bloomberg Terminal, VBA, Tableau, PowerBI, Analyse financière, Modélisation, Risk Management..."
              className="input-elegant w-full p-4 rounded-xl text-foreground placeholder:text-muted-foreground resize-none"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 pt-4">
          <Button 
            type="button" 
            variant="glass" 
            size="lg"
            className="flex-1 shadow-elegant"
            onClick={onPreview}
          >
            <Eye className="w-5 h-5 mr-2" />
            Aperçu du CV
          </Button>
          <Button 
            type="button" 
            variant="elegant"
            size="lg"
            className="flex-1 shadow-floating"
            onClick={onGeneratePDF}
          >
            <Download className="w-5 h-5 mr-2" />
            Générer PDF
          </Button>
        </div>
      </form>
    </div>
  );
}