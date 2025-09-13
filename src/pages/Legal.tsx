import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, User, Mail, Phone, MapPin, Globe } from "lucide-react";

export default function Legal() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-finance-navy mb-6">
            Mentions légales
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Informations légales concernant CV Finance et l'éditeur du site web.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Editor Information */}
          <Card className="shadow-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-finance-navy">
                <Building className="h-5 w-5" />
                Éditeur du site
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-finance-navy mb-3">Société</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p><strong>Raison sociale :</strong> CV Finance SAS</p>
                    <p><strong>Forme juridique :</strong> Société par Actions Simplifiée</p>
                    <p><strong>Capital social :</strong> 10 000 €</p>
                    <p><strong>SIRET :</strong> 123 456 789 00012</p>
                    <p><strong>RCS :</strong> Paris B 123 456 789</p>
                    <p><strong>Code APE :</strong> 6201Z</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-finance-navy mb-3">Coordonnées</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-finance-blue mt-1" />
                      <div className="text-muted-foreground">
                        123 Rue de la Bourse<br />
                        75002 Paris<br />
                        France
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-finance-blue" />
                      <span className="text-muted-foreground">+33 1 23 45 67 89</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-finance-blue" />
                      <span className="text-muted-foreground">contact@cvfinance.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Legal Representative */}
          <Card className="shadow-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-finance-navy">
                <User className="h-5 w-5" />
                Représentant légal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-muted-foreground">
                <p><strong>Président :</strong> Jean Dupont</p>
                <p><strong>Fonction :</strong> Président de CV Finance SAS</p>
                <p><strong>Email :</strong> direction@cvfinance.com</p>
              </div>
            </CardContent>
          </Card>

          {/* Hosting */}
          <Card className="shadow-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-finance-navy">
                <Globe className="h-5 w-5" />
                Hébergement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-finance-navy mb-3">Hébergeur</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p><strong>Société :</strong> Lovable Technologies Inc.</p>
                  <p><strong>Adresse :</strong> 123 Tech Street, San Francisco, CA 94105, USA</p>
                  <p><strong>Site web :</strong> <a href="https://lovable.dev" className="text-finance-blue hover:text-finance-navy">lovable.dev</a></p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-finance-navy mb-3">Infrastructure</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p><strong>CDN :</strong> Cloudflare</p>
                  <p><strong>Certificat SSL :</strong> Let's Encrypt</p>
                  <p><strong>Localisation des serveurs :</strong> Union Européenne</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card className="shadow-card border-border/50">
            <CardHeader>
              <CardTitle className="text-finance-navy">Propriété intellectuelle</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                L'ensemble du contenu de ce site (textes, images, vidéos, structure, etc.) est la propriété 
                exclusive de CV Finance SAS, sauf mention contraire.
              </p>
              
              <h3 className="font-semibold text-finance-navy">Droits réservés :</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Marque "CV Finance" et logo associé</li>
                <li>Design et interface utilisateur</li>
                <li>Code source et algorithmes</li>
                <li>Templates de CV et mise en page</li>
                <li>Contenu éditorial et textes</li>
              </ul>

              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>Utilisation :</strong> Toute reproduction, même partielle, est interdite 
                  sans autorisation écrite préalable de CV Finance SAS.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Taxes */}
          <Card className="shadow-card border-border/50">
            <CardHeader>
              <CardTitle className="text-finance-navy">Informations fiscales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-muted-foreground">
                <p><strong>Numéro TVA :</strong> FR 12 123456789</p>
                <p><strong>Assujetti à la TVA :</strong> Oui</p>
                <p><strong>Régime fiscal :</strong> Régime réel normal</p>
              </div>

              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <p className="text-green-800 text-sm">
                  <strong>Service gratuit :</strong> CV Finance est actuellement proposé gratuitement. 
                  Aucune facturation n'est effectuée.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Professional Insurance */}
          <Card className="shadow-card border-border/50">
            <CardHeader>
              <CardTitle className="text-finance-navy">Assurance professionnelle</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-muted-foreground">
                <p><strong>Assureur :</strong> AXA Entreprises</p>
                <p><strong>Police :</strong> RC Professionnelle n° 123456789</p>
                <p><strong>Couverture :</strong> 1 000 000 € par sinistre</p>
                <p><strong>Validité :</strong> Du 01/01/2024 au 31/12/2024</p>
              </div>
            </CardContent>
          </Card>

          {/* Dispute Resolution */}
          <Card className="shadow-card border-border/50">
            <CardHeader>
              <CardTitle className="text-finance-navy">Règlement des litiges</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="font-semibold text-finance-navy">Médiation</h3>
              <p className="text-muted-foreground">
                En cas de litige, vous pouvez recourir à une procédure de médiation conventionnelle 
                ou tout autre mode alternatif de règlement des différends.
              </p>
              
              <h3 className="font-semibold text-finance-navy">Juridiction compétente</h3>
              <p className="text-muted-foreground">
                En cas d'échec de la médiation, les tribunaux de Paris sont seuls compétents 
                pour connaître de tout litige relatif à l'utilisation du site.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="shadow-elegant border-border/50 bg-gradient-primary text-white">
            <CardContent className="pt-6">
              <h3 className="font-bold text-xl mb-4">Contact pour questions légales</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>legal@cvfinance.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+33 1 23 45 67 89</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-1" />
                  <span>123 Rue de la Bourse, 75002 Paris, France</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Last Update */}
          <Card className="shadow-card border-border/50 bg-muted/30">
            <CardContent className="pt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Mentions légales mises à jour le 13 septembre 2024
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}