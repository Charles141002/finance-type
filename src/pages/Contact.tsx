import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Message envoyé !",
      description: "Nous vous répondrons dans les plus brefs délais.",
    });
    
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-finance-navy mb-6">
            Contactez-nous
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Une question ? Un problème ? Notre équipe est là pour vous aider. 
            N'hésitez pas à nous contacter, nous vous répondrons rapidement.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-finance-navy">
                <MessageSquare className="h-5 w-5" />
                Envoyez-nous un message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium">Nom complet</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="subject" className="text-sm font-medium">Sujet</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleChange("subject", e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="message" className="text-sm font-medium">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    required
                    rows={6}
                    className="mt-1"
                    placeholder="Décrivez votre demande en détail..."
                  />
                </div>
                
                <Button type="submit" variant="finance" className="w-full" size="lg">
                  <Send className="h-4 w-4" />
                  Envoyer le message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="space-y-6">
              <Card className="shadow-card border-border/50">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-finance-light rounded-lg">
                      <Mail className="h-6 w-6 text-finance-navy" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-finance-navy mb-2">Email</h3>
                      <p className="text-muted-foreground">support@cvfinance.com</p>
                      <p className="text-muted-foreground">contact@cvfinance.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card border-border/50">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-finance-light rounded-lg">
                      <Phone className="h-6 w-6 text-finance-navy" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-finance-navy mb-2">Téléphone</h3>
                      <p className="text-muted-foreground">+33 1 23 45 67 89</p>
                      <p className="text-sm text-muted-foreground">Lun-Ven, 9h-18h</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card border-border/50">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-finance-light rounded-lg">
                      <MapPin className="h-6 w-6 text-finance-navy" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-finance-navy mb-2">Adresse</h3>
                      <p className="text-muted-foreground">
                        123 Rue de la Bourse<br />
                        75002 Paris, France
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card border-border/50">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-finance-light rounded-lg">
                      <Clock className="h-6 w-6 text-finance-navy" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-finance-navy mb-2">Horaires</h3>
                      <div className="text-muted-foreground space-y-1">
                        <p>Lundi - Vendredi : 9h00 - 18h00</p>
                        <p>Samedi : 10h00 - 16h00</p>
                        <p>Dimanche : Fermé</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* FAQ Quick Links */}
            <Card className="shadow-elegant border-border/50 bg-gradient-primary text-white">
              <CardContent className="pt-6">
                <h3 className="font-bold text-xl mb-4">Questions fréquentes</h3>
                <p className="text-white/90 mb-4">
                  Consultez notre FAQ pour des réponses rapides aux questions les plus courantes.
                </p>
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
                  <a href="/faq">Voir la FAQ</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Response Time */}
        <Card className="mt-12 shadow-card border-border/50 bg-gradient-card">
          <CardContent className="pt-6 text-center">
            <h3 className="text-xl font-semibold text-finance-navy mb-4">
              Temps de réponse
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-2xl font-bold text-finance-blue mb-2">&lt; 2h</div>
                <div className="text-sm text-muted-foreground">Questions urgentes</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-finance-blue mb-2">&lt; 24h</div>
                <div className="text-sm text-muted-foreground">Support technique</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-finance-blue mb-2">&lt; 48h</div>
                <div className="text-sm text-muted-foreground">Demandes générales</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}