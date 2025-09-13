import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Lock, UserCheck, Database, AlertTriangle } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-finance-navy mb-6">
            Politique de confidentialité
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Votre confidentialité est notre priorité. Découvrez comment nous protégeons 
            vos données et respectons votre vie privée.
          </p>
          <div className="mt-6 text-sm text-muted-foreground">
            Dernière mise à jour : 13 septembre 2024
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Introduction */}
          <Card className="shadow-elegant border-border/50 bg-gradient-primary text-white">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6" />
                <h2 className="text-xl font-bold">Notre engagement</h2>
              </div>
              <p className="text-white/90 leading-relaxed">
                CV Finance s'engage à protéger et respecter votre vie privée. Cette politique 
                explique comment nous traitons vos informations personnelles lorsque vous utilisez 
                notre générateur de CV en ligne.
              </p>
            </CardContent>
          </Card>

          {/* No Data Collection */}
          <Card className="shadow-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-finance-navy">
                <Database className="h-5 w-5" />
                Collecte de données
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-green-800 font-semibold mb-2">
                  <UserCheck className="h-4 w-4" />
                  Point important
                </div>
                <p className="text-green-700">
                  <strong>Nous ne collectons AUCUNE donnée personnelle.</strong> Toutes les informations 
                  que vous saisissez dans notre générateur de CV restent dans votre navigateur 
                  et ne sont jamais transmises à nos serveurs.
                </p>
              </div>
              
              <h3 className="font-semibold text-finance-navy">Données que nous ne collectons PAS :</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Nom, prénom, adresse email</li>
                <li>Numéro de téléphone et adresse</li>
                <li>Informations professionnelles ou éducatives</li>
                <li>Compétences et certifications</li>
                <li>Contenu de votre CV</li>
                <li>Fichiers PDF générés</li>
              </ul>

              <h3 className="font-semibold text-finance-navy">Données techniques limitées :</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Adresse IP (pour la sécurité du site)</li>
                <li>Type de navigateur et version</li>
                <li>Pages visitées (analytiques anonymes)</li>
                <li>Temps passé sur le site</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Processing */}
          <Card className="shadow-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-finance-navy">
                <Lock className="h-5 w-5" />
                Comment fonctionnent nos services
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Notre générateur de CV utilise une technologie côté client (dans votre navigateur) 
                pour traiter vos informations :
              </p>
              
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-finance-light rounded-full flex items-center justify-center text-finance-navy text-sm font-bold">1</div>
                  <p className="text-muted-foreground">Vous saisissez vos informations dans le formulaire</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-finance-light rounded-full flex items-center justify-center text-finance-navy text-sm font-bold">2</div>
                  <p className="text-muted-foreground">Les données sont traitées localement par votre navigateur</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-finance-light rounded-full flex items-center justify-center text-finance-navy text-sm font-bold">3</div>
                  <p className="text-muted-foreground">Le PDF est généré directement sur votre appareil</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-finance-light rounded-full flex items-center justify-center text-finance-navy text-sm font-bold">4</div>
                  <p className="text-muted-foreground">Aucune donnée n'est envoyée à nos serveurs</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cookies */}
          <Card className="shadow-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-finance-navy">
                <Eye className="h-5 w-5" />
                Cookies et technologies similaires
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Nous utilisons uniquement des cookies essentiels au fonctionnement du site :
              </p>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-finance-navy">Cookies techniques (obligatoires)</h4>
                  <p className="text-sm text-muted-foreground">
                    Nécessaires au fonctionnement du site et à la sécurité de votre session.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-finance-navy">Cookies analytiques (anonymes)</h4>
                  <p className="text-sm text-muted-foreground">
                    Pour comprendre l'utilisation du site de manière anonyme et améliorer l'expérience.
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>Aucun cookie de tracking publicitaire</strong> n'est utilisé sur notre site.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card className="shadow-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-finance-navy">
                <AlertTriangle className="h-5 w-5" />
                Sécurité des données
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Nous mettons en œuvre plusieurs mesures de sécurité :
              </p>
              
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Chiffrement HTTPS :</strong> Toutes les communications sont chiffrées</li>
                <li><strong>Traitement local :</strong> Vos données ne quittent jamais votre appareil</li>
                <li><strong>Pas de stockage :</strong> Aucune sauvegarde de vos informations personnelles</li>
                <li><strong>Sécurité des serveurs :</strong> Infrastructure protégée contre les intrusions</li>
                <li><strong>Mises à jour régulières :</strong> Correction des vulnérabilités de sécurité</li>
              </ul>
            </CardContent>
          </Card>

          {/* Rights */}
          <Card className="shadow-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-finance-navy">
                <UserCheck className="h-5 w-5" />
                Vos droits
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Bien que nous ne stockions aucune donnée personnelle, vous conservez tous vos droits :
              </p>
              
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Droit d'accès :</strong> Demander quelles données nous avons (aucune)</li>
                <li><strong>Droit de rectification :</strong> Corriger vos données (gérées localement)</li>
                <li><strong>Droit à l'effacement :</strong> Supprimer vos données (effacez votre cache)</li>
                <li><strong>Droit à la portabilité :</strong> Exporter vos données (sauvegardez votre PDF)</li>
                <li><strong>Droit d'opposition :</strong> Vous opposer au traitement (arrêtez d'utiliser le site)</li>
              </ul>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="shadow-card border-border/50">
            <CardHeader>
              <CardTitle className="text-finance-navy">Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Pour toute question concernant cette politique de confidentialité :
              </p>
              <div className="space-y-2 text-sm">
                <p><strong>Email :</strong> privacy@cvfinance.com</p>
                <p><strong>Adresse :</strong> 123 Rue de la Bourse, 75002 Paris, France</p>
              </div>
            </CardContent>
          </Card>

          {/* Updates */}
          <Card className="shadow-card border-border/50 bg-muted/30">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-finance-navy mb-2">Modifications de cette politique</h3>
              <p className="text-sm text-muted-foreground">
                Nous nous réservons le droit de modifier cette politique de confidentialité. 
                Toute modification sera publiée sur cette page avec la date de mise à jour. 
                Nous vous encourageons à consulter régulièrement cette page.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}