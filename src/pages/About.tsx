import { Card, CardContent } from "@/components/ui/card";
import { Target, Users, Award, TrendingUp, Shield, Zap } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-finance-navy mb-6">
            À propos de CV Finance
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Notre mission est de vous aider à créer des CV professionnels parfaitement adaptés 
            au secteur financier, en utilisant les meilleures pratiques du recrutement en finance.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="shadow-card border-border/50 bg-gradient-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-finance-light rounded-lg">
                  <Target className="h-6 w-6 text-finance-navy" />
                </div>
                <h2 className="text-2xl font-bold text-finance-navy">Notre Mission</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Démocratiser l'accès aux opportunités dans la finance en fournissant des outils 
                de création de CV qui respectent les standards élevés du secteur. Nous croyons 
                qu'un CV bien conçu peut faire la différence dans une candidature.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-border/50 bg-gradient-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-finance-light rounded-lg">
                  <TrendingUp className="h-6 w-6 text-finance-navy" />
                </div>
                <h2 className="text-2xl font-bold text-finance-navy">Notre Vision</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Devenir la référence mondiale pour la création de CV dans le secteur financier, 
                en offrant des solutions innovantes qui s'adaptent aux évolutions du marché 
                et aux attentes des recruteurs.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Pourquoi nous choisir */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-finance-navy text-center mb-12">
            Pourquoi choisir CV Finance ?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-card border-border/50">
              <CardContent className="pt-6 text-center">
                <div className="mx-auto w-12 h-12 bg-finance-light rounded-lg flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-finance-navy" />
                </div>
                <h3 className="text-xl font-semibold text-finance-navy mb-3">
                  Expertise Finance
                </h3>
                <p className="text-muted-foreground">
                  Nos templates sont conçus spécifiquement pour le secteur financier, 
                  respectant les codes et attentes des recruteurs.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card border-border/50">
              <CardContent className="pt-6 text-center">
                <div className="mx-auto w-12 h-12 bg-finance-light rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-finance-navy" />
                </div>
                <h3 className="text-xl font-semibold text-finance-navy mb-3">
                  Technologie LaTeX
                </h3>
                <p className="text-muted-foreground">
                  Utilisation de LaTeX pour une qualité typographique professionnelle 
                  et une mise en page parfaite.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card border-border/50">
              <CardContent className="pt-6 text-center">
                <div className="mx-auto w-12 h-12 bg-finance-light rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-finance-navy" />
                </div>
                <h3 className="text-xl font-semibold text-finance-navy mb-3">
                  Sécurité & Confidentialité
                </h3>
                <p className="text-muted-foreground">
                  Vos données restent privées et sécurisées. Nous ne stockons aucune 
                  information personnelle sur nos serveurs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats */}
        <Card className="shadow-elegant border-border/50 bg-gradient-primary text-white">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-finance-accent mb-2">10,000+</div>
                <div className="text-white/80">CV générés</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-finance-accent mb-2">95%</div>
                <div className="text-white/80">Taux de satisfaction</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-finance-accent mb-2">500+</div>
                <div className="text-white/80">Entreprises partenaires</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-finance-accent mb-2">24/7</div>
                <div className="text-white/80">Support disponible</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Équipe */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-finance-navy text-center mb-12">
            Notre Équipe
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="shadow-card border-border/50 text-center">
              <CardContent className="pt-6">
                <div className="w-20 h-20 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-finance-navy mb-2">
                  Experts RH Finance
                </h3>
                <p className="text-muted-foreground">
                  Notre équipe comprend d'anciens recruteurs de grandes banques 
                  d'investissement et cabinets de conseil.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card border-border/50 text-center">
              <CardContent className="pt-6">
                <div className="w-20 h-20 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-finance-navy mb-2">
                  Développeurs Experts
                </h3>
                <p className="text-muted-foreground">
                  Des ingénieurs spécialisés dans les technologies web modernes 
                  et la génération de documents LaTeX.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card border-border/50 text-center">
              <CardContent className="pt-6">
                <div className="w-20 h-20 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-finance-navy mb-2">
                  Designers UX/UI
                </h3>
                <p className="text-muted-foreground">
                  Des créatifs passionnés par l'expérience utilisateur et 
                  la beauté des interfaces professionnelles.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}