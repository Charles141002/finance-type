import React, { useState } from 'react';
import CVForm from '../components/CVForm';
import CVPreview from '../components/CVPreview';

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

export default function Index() {
  const [currentView, setCurrentView] = useState<'form' | 'preview'>('form');
  const [cvData, setCvData] = useState<CVData>({
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

  const handlePreview = () => {
    setCurrentView('preview');
  };

  const handleGeneratePDF = () => {
    // TODO: Implement PDF generation
    alert('Génération PDF - à implémenter');
  };

  const handleBackToForm = () => {
    setCurrentView('form');
  };

  const handleDataChange = (data: CVData) => {
    setCvData(data);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      {currentView === 'form' ? (
        <CVForm 
          onPreview={handlePreview}
          onGeneratePDF={handleGeneratePDF}
          onDataChange={handleDataChange}
        />
      ) : (
        <div>
          <CVPreview formData={cvData} />
          <div className="text-center mt-8">
            <button
              onClick={handleBackToForm}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Retour au formulaire
            </button>
          </div>
        </div>
      )}
    </div>
  );
}