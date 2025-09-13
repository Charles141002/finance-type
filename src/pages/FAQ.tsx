import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HelpCircle, Search, FileText, Shield, Download, CreditCard } from "lucide-react";

const faqCategories = [
  {
    title: "Utilisation générale",
    icon: HelpCircle,
    items: [
      {
        question: "Comment créer mon premier CV ?",
        answer: "C'est très simple ! Rendez-vous sur notre générateur, remplissez les différentes sections (informations personnelles, expérience, formation, compétences), puis cliquez sur 'Aperçu' pour voir le résultat. Une fois satisfait, cliquez sur 'Générer PDF' pour télécharger votre CV."
      },
      {
        question: "Puis-je modifier mon CV après l'avoir créé ?",
        answer: "Oui, vous pouvez modifier votre CV à tout moment. Il suffit de retourner sur le générateur, faire vos modifications et générer un nouveau PDF. Vos données ne sont pas sauvegardées sur nos serveurs pour des raisons de confidentialité."
      },
      {
        question: "Combien de CV puis-je créer ?",
        answer: "Il n'y a aucune limite au nombre de CV que vous pouvez créer avec notre générateur. Vous pouvez créer autant de versions que nécessaire pour vos différentes candidatures."
      }
    ]
  },
  {
    title: "Fonctionnalités techniques",
    icon: FileText,
    items: [
      {
        question: "Pourquoi utilisez-vous LaTeX ?",
        answer: "LaTeX est le standard de facto pour la création de documents professionnels de haute qualité. Il garantit une typographie parfaite, une mise en page cohérente et un rendu professionnel que les recruteurs en finance apprécient particulièrement."
      },
      {
        question: "Le générateur fonctionne-t-il hors ligne ?",
        answer: "La génération LaTeX se fait côté client dans votre navigateur, ce qui signifie que vos données ne quittent jamais votre ordinateur. Cependant, vous avez besoin d'une connexion internet pour accéder au générateur initialement."
      },
      {
        question: "Quels formats de sortie sont disponibles ?",
        answer: "Actuellement, nous générons des CV au format PDF haute qualité. Ce format est universellement accepté par les recruteurs et garantit que votre mise en page sera préservée sur tous les appareils."
      }
    ]
  },
  {
    title: "Sécurité et confidentialité",
    icon: Shield,
    items: [
      {
        question: "Mes données sont-elles stockées sur vos serveurs ?",
        answer: "Non, absolument pas. Toutes vos données restent dans votre navigateur et ne sont jamais envoyées sur nos serveurs. C'est un choix délibéré pour garantir votre confidentialité totale."
      },
      {
        question: "Puis-je faire confiance à la sécurité du site ?",
        answer: "Oui, notre site utilise le chiffrement HTTPS et nous ne collectons aucune donnée personnelle. Votre confidentialité est notre priorité absolue, particulièrement importante dans le secteur financier."
      },
      {
        question: "Que faire si j'ai des informations sensibles dans mon CV ?",
        answer: "Comme vos données ne quittent jamais votre appareil, vous pouvez utiliser notre générateur en toute sécurité même avec des informations sensibles. Nous recommandons toutefois de ne pas inclure de données ultra-confidentielles dans un CV."
      }
    ]
  },
  {
    title: "Support et assistance",
    icon: Download,
    items: [
      {
        question: "Mon PDF ne se télécharge pas, que faire ?",
        answer: "Vérifiez d'abord que votre navigateur autorise les téléchargements depuis notre site. Si le problème persiste, essayez avec un autre navigateur (Chrome, Firefox, Safari) ou contactez notre support."
      },
      {
        question: "Le rendu de mon CV n'est pas correct",
        answer: "Assurez-vous d'avoir rempli tous les champs obligatoires et vérifiez qu'il n'y a pas de caractères spéciaux problématiques. Si le problème persiste, contactez-nous en décrivant précisément le problème."
      },
      {
        question: "Puis-je obtenir de l'aide pour optimiser mon CV ?",
        answer: "Notre générateur inclut les meilleures pratiques pour les CV finance. Pour des conseils personnalisés, contactez notre équipe qui inclut d'anciens recruteurs du secteur financier."
      }
    ]
  }
];

export default function FAQ() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-finance-navy mb-6">
            Questions fréquentes
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Trouvez rapidement les réponses à toutes vos questions sur l'utilisation 
            de notre générateur de CV finance.
          </p>
        </div>

        {/* Quick Search */}
        <Card className="shadow-card border-border/50 mb-12">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 text-center">
              <Search className="h-5 w-5 text-finance-navy" />
              <span className="text-finance-navy font-medium">
                Conseil : Utilisez Ctrl+F pour rechercher un mot-clé spécifique dans cette page
              </span>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Categories */}
        <div className="space-y-12">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-finance-light rounded-lg">
                  <category.icon className="h-6 w-6 text-finance-navy" />
                </div>
                <h2 className="text-2xl font-bold text-finance-navy">{category.title}</h2>
              </div>
              
              <Card className="shadow-card border-border/50">
                <CardContent className="pt-6">
                  <Accordion type="single" collapsible className="w-full">
                    {category.items.map((item, itemIndex) => (
                      <AccordionItem key={itemIndex} value={`${categoryIndex}-${itemIndex}`}>
                        <AccordionTrigger className="text-left font-medium text-finance-navy hover:text-finance-blue">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <Card className="mt-16 shadow-elegant border-border/50 bg-gradient-primary text-white">
          <CardContent className="pt-6 text-center">
            <h3 className="text-2xl font-bold mb-4">Vous ne trouvez pas votre réponse ?</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Notre équipe support est là pour vous aider. N'hésitez pas à nous contacter 
              pour toute question spécifique ou assistance personnalisée.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                asChild
              >
                <a href="/contact">Nous contacter</a>
              </Button>
              <Button 
                variant="outline" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                asChild
              >
                <a href="mailto:support@cvfinance.com">support@cvfinance.com</a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Tips */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card className="shadow-card border-border/50 text-center">
            <CardContent className="pt-6">
              <div className="mx-auto w-12 h-12 bg-finance-light rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-finance-navy" />
              </div>
              <h3 className="font-semibold text-finance-navy mb-2">Template optimisé</h3>
              <p className="text-sm text-muted-foreground">
                Notre template est spécialement conçu pour le secteur financier
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-border/50 text-center">
            <CardContent className="pt-6">
              <div className="mx-auto w-12 h-12 bg-finance-light rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-finance-navy" />
              </div>
              <h3 className="font-semibold text-finance-navy mb-2">100% sécurisé</h3>
              <p className="text-sm text-muted-foreground">
                Vos données ne quittent jamais votre navigateur
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-border/50 text-center">
            <CardContent className="pt-6">
              <div className="mx-auto w-12 h-12 bg-finance-light rounded-lg flex items-center justify-center mb-4">
                <Download className="h-6 w-6 text-finance-navy" />
              </div>
              <h3 className="font-semibold text-finance-navy mb-2">PDF instantané</h3>
              <p className="text-sm text-muted-foreground">
                Génération PDF haute qualité en quelques secondes
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}