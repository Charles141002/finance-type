import { Button } from '../components/ui/button';
import { Mail, MessageSquare, Globe } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="gradient-accent rounded-2xl p-8 shadow-floating inline-block">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent mb-4">
              Contactez-nous
            </h1>
            <p className="text-lg text-muted-foreground">
              Une question ? Un problème ? N'hésitez pas à nous contacter
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass rounded-2xl p-8 hover-lift">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              Formulaire de contact
            </h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-3 text-foreground">Nom</label>
                <input
                  type="text"
                  className="input-elegant w-full p-4 rounded-xl text-foreground placeholder:text-muted-foreground"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-3 text-foreground">Email</label>
                <input
                  type="email"
                  className="input-elegant w-full p-4 rounded-xl text-foreground placeholder:text-muted-foreground"  
                  placeholder="votre.email@exemple.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-3 text-foreground">Message</label>
                <textarea
                  rows={5}
                  className="input-elegant w-full p-4 rounded-xl text-foreground placeholder:text-muted-foreground resize-none"
                  placeholder="Votre message..."
                />
              </div>
              <Button variant="elegant" size="lg" className="w-full shadow-floating">
                <Mail className="w-5 h-5 mr-2" />
                Envoyer le message
              </Button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="glass rounded-2xl p-8 hover-lift">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center shadow-glow">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-3">Support rapide</h3>
              <p className="text-muted-foreground text-center">
                Nous répondons généralement sous 24h
              </p>
            </div>

            <div className="glass rounded-2xl p-8 hover-lift">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center shadow-glow">
                  <Globe className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-3">Communauté</h3>
              <p className="text-muted-foreground text-center">
                Rejoignez notre communauté de professionnels de la finance
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}