import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: "Finance Type est-il vraiment gratuit ?",
    answer: "Oui, Finance Type est entièrement gratuit. Vous pouvez créer et télécharger vos CV sans aucun frais, sans inscription obligatoire."
  },
  {
    question: "Puis-je modifier mon CV après l'avoir créé ?",
    answer: "Actuellement, vous pouvez modifier votre CV en remplissant à nouveau le formulaire. Nous travaillons sur une fonctionnalité de sauvegarde."
  },
  {
    question: "Dans quels formats puis-je exporter mon CV ?",
    answer: "Pour le moment, l'export se fait uniquement en PDF. Ce format garantit une présentation professionnelle et une compatibilité universelle."
  },
  {
    question: "Le design est-il adapté au secteur financier ?",
    answer: "Absolument ! Notre design a été spécialement conçu pour répondre aux standards du secteur financier : sobre, élégant et professionnel."
  },
  {
    question: "Mes données są-elles sécurisées ?",
    answer: "Vos données ne sont stockées que temporairement pour générer votre CV. Nous ne sauvegardons aucune information personnelle sur nos serveurs."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="gradient-accent rounded-2xl p-8 shadow-floating inline-block">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent mb-4">
              Questions Fréquentes
            </h1>
            <p className="text-lg text-muted-foreground">
              Trouvez rapidement des réponses à vos questions
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="glass rounded-2xl overflow-hidden hover-lift">
              <button
                className="w-full p-6 text-left flex justify-between items-center hover:bg-white/90 transition-colors"
                onClick={() => toggleAccordion(index)}
              >
                <h3 className="text-lg font-semibold text-foreground pr-4">
                  {faq.question}
                </h3>
                <ChevronDown 
                  className={`w-5 h-5 text-muted-foreground transition-transform ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="glass rounded-2xl p-8 inline-block">
            <h2 className="text-xl font-bold mb-3 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              Vous ne trouvez pas votre réponse ?
            </h2>
            <p className="text-muted-foreground mb-4">
              N'hésitez pas à nous contacter, nous serons ravis de vous aider
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 gradient-primary text-white rounded-xl hover:shadow-glow transition-all duration-300"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}