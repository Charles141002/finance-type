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

interface CVPreviewProps {
  formData: CVData;
}

export default function CVPreview({ formData }: CVPreviewProps) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8 text-center">
        <div className="gradient-accent rounded-2xl p-6 shadow-floating inline-block">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent mb-2">
            Aperçu de votre CV
          </h2>
          <p className="text-muted-foreground text-lg">Prévisualisation du rendu LaTeX professionnel</p>
        </div>
      </div>

      <div className="glass rounded-2xl shadow-floating p-12 min-h-[800px] hover-lift">
        {/* Header */}
        <div className="text-center mb-12 border-b border-gray-200 pb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            {formData.firstName} {formData.lastName}
          </h1>
          <div className="text-gray-600 text-lg space-y-2">
            <p className="font-medium">{formData.email} • {formData.phone}</p>
          </div>
        </div>

        {/* Experience */}
        {formData.position && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-primary/20 pb-3 tracking-wide">
              EXPÉRIENCE PROFESSIONNELLE
            </h2>
            <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-gray-900 text-lg">{formData.position}</h3>
                <span className="text-primary font-semibold text-sm bg-white px-3 py-1 rounded-full shadow-sm">
                  {formData.startDate} - {formData.endDate}
                </span>
              </div>
              <p className="text-primary font-semibold mb-3 text-lg">{formData.company}</p>
              {formData.description && (
                <p className="text-gray-700 leading-relaxed">
                  {formData.description}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Education */}
        {formData.degree && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-primary/20 pb-3 tracking-wide">
              FORMATION
            </h2>
            <div className="mb-6 bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-gray-900 text-lg">{formData.degree}</h3>
                <span className="text-emerald-700 font-semibold text-sm bg-white px-3 py-1 rounded-full shadow-sm">
                  {formData.graduationYear}
                </span>
              </div>
              <p className="text-emerald-700 font-semibold text-lg">{formData.school}</p>
            </div>
          </div>
        )}

        {/* Skills */}
        {formData.skills && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-primary/20 pb-3 tracking-wide">
              COMPÉTENCES
            </h2>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
              <p className="text-gray-700 leading-relaxed text-lg">{formData.skills}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}