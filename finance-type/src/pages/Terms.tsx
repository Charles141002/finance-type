import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileCheck, AlertCircle, Scale, Users, Shield, Zap } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-finance-navy mb-6">
            Conditions générales d'utilisation
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Les conditions qui régissent l'utilisation de notre générateur de CV finance. 
            Veuillez les lire attentivement.
          </p>
          <div className="mt-6 text-sm text-muted-foreground">
            Dernière mise à jour : 13 septembre 2024
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Acceptance */}
          <Card className="shadow-elegant border-border/50 bg-gradient-primary text-white">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <FileCheck className="h-6 w-6" />
                <h2 className="text-xl font-bold">Acceptation des conditions</h2>
              </div>
              <p className="text-white/90 leading-relaxed">
                En accédant et en utilisant CV Finance, vous acceptez d'être lié par ces conditions 
                générales d'utilisation. Si vous n'acceptez pas ces conditions, vous ne devez pas 
                utiliser notre service.
              </p>
            </CardContent>
          </Card>

          {/* Service Description */}
          <Card className="shadow-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-finance-navy">
                <Zap className="h-5 w-5" />
                Description du service
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                CV Finance est un générateur de CV en ligne spécialement conçu pour le secteur financier. 
                Notre service permet de :
              </p>
              
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Créer des CV professionnels avec un template optimisé pour la finance</li>
                <li>Générer des documents PDF de haute qualité en utilisant LaTeX</li>
                <li>Prévisualiser votre CV avant génération</li>
                <li>Télécharger le CV final au format PDF</li>
              </ul>

              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>Service gratuit :</strong> CV Finance est actuellement proposé gratuitement 
                  à tous les utilisateurs.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* User Obligations */}
          <Card className="shadow-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-finance-navy">
                <Users className="h-5 w-5" />
                Obligations de l'utilisateur
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">En utilisant notre service, vous vous engagez à :</p>
              
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Fournir des informations exactes et véridiques dans votre CV</li>
                <li>Ne pas utiliser le service à des fins illégales ou non autorisées</li>
                <li>Ne pas tenter de compromettre la sécurité ou la disponibilité du service</li>
                <li>Respecter les droits de propriété intellectuelle</li>
                <li>Ne pas créer de contenus offensants, diffamatoires ou inappropriés</li>
                <li>Ne pas utiliser le service pour du spam ou des activités malveillantes</li>
              </ul>

              <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-orange-800 font-semibold mb-2">
                  <AlertCircle className="h-4 w-4" />
                  Important
                </div>
                <p className="text-orange-700 text-sm">
                  Vous êtes seul responsable du contenu de votre CV et de son utilisation. 
                  Nous ne vérifions pas l'exactitude des informations fournies.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card className="shadow-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-finance-navy">
                <Shield className="h-5 w-5" />
                Propriété intellectuelle
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="font-semibold text-finance-navy">Nos droits :</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Le code source, le design et les templates de CV Finance sont notre propriété</li>
                <li>La marque "CV Finance" et tous les éléments associés sont protégés</li>
                <li>La technologie de génération LaTeX développée est notre propriété intellectuelle</li>
              </ul>

              <h3 className="font-semibold text-finance-navy">Vos droits :</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Vous conservez tous les droits sur le contenu de votre CV</li>
                <li>Le PDF généré vous appartient entièrement</li>
                <li>Vous pouvez utiliser, modifier et distribuer votre CV comme vous le souhaitez</li>
              </ul>
            </CardContent>
          </Card>

          {/* Limitations */}
          <Card className="shadow-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-finance-navy">
                <Scale className="h-5 w-5" />
                Limitation de responsabilité
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">CV Finance ne peut être tenu responsable :</p>
              
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Des erreurs ou omissions dans le contenu de votre CV</li>
                <li>Des conséquences de l'utilisation de votre CV (embauche, refus, etc.)</li>
                <li>Des problèmes techniques temporaires ou interruptions de service</li>
                <li>De la perte de données due à des problèmes techniques de votre côté</li>
                <li>Des dommages indirects ou consécutifs liés à l'utilisation du service</li>
              </ul>

              <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                <p className="text-red-800 text-sm">
                  <strong>Utilisation à vos risques :</strong> Le service est fourni "en l'état" 
                  sans garantie d'aucune sorte. Vous utilisez le service à vos propres risques.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Availability */}
          <Card className="shadow-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-finance-navy">
                <Zap className="h-5 w-5" />
                Disponibilité du service
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Nous nous efforçons de maintenir le service disponible 24h/24 et 7j/7, mais :
              </p>
              
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Des maintenances programmées peuvent interrompre temporairement le service</li>
                <li>Des problèmes techniques peuvent causer des interruptions non planifiées</li>
                <li>Nous nous réservons le droit de modifier ou d'arrêter le service</li>
                <li>Un préavis de 30 jours sera donné en cas d'arrêt définitif du service</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data and Privacy */}
          <Card className="shadow-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-finance-navy">
                <Shield className="h-5 w-5" />
                Données et confidentialité
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <p className="text-green-800 text-sm">
                  <strong>Engagement de confidentialité :</strong> Nous ne collectons, ne stockons 
                  et ne partageons aucune donnée personnelle. Toutes les informations restent 
                  dans votre navigateur.
                </p>
              </div>
              
              <p className="text-muted-foreground">
                Pour plus de détails, consultez notre 
                <a href="/privacy" className="text-finance-blue hover:text-finance-navy font-medium"> 
                  Politique de Confidentialité
                </a>.
              </p>
            </CardContent>
          </Card>

          {/* Modifications */}
          <Card className="shadow-card border-border/50">
            <CardHeader>
              <CardTitle className="text-finance-navy">Modifications des conditions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Nous nous réservons le droit de modifier ces conditions à tout moment :
              </p>
              
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Les modifications seront publiées sur cette page</li>
                <li>La date de dernière mise à jour sera mise à jour</li>
                <li>Les modifications importantes feront l'objet d'une notification</li>
                <li>Votre utilisation continue du service constitue une acceptation des nouvelles conditions</li>
              </ul>
            </CardContent>
          </Card>

          {/* Governing Law */}
          <Card className="shadow-card border-border/50">
            <CardHeader>
              <CardTitle className="text-finance-navy">Droit applicable et juridiction</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Ces conditions sont régies par le droit français. Tout litige sera soumis 
                à la compétence exclusive des tribunaux de Paris, France.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="shadow-card border-border/50">
            <CardHeader>
              <CardTitle className="text-finance-navy">Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Pour toute question concernant ces conditions d'utilisation :
              </p>
              <div className="space-y-2 text-sm">
                <p><strong>Email :</strong> legal@cvfinance.com</p>
                <p><strong>Adresse :</strong> 123 Rue de la Bourse, 75002 Paris, France</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}