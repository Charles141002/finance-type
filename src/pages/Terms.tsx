export default function Terms() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="gradient-accent rounded-2xl p-8 shadow-floating inline-block">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent mb-4">
              Conditions Générales d'Utilisation
            </h1>
            <p className="text-lg text-muted-foreground">
              Dernière mise à jour : Novembre 2024
            </p>
          </div>
        </div>

        <div className="glass rounded-2xl p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              1. Objet
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Les présentes conditions générales d'utilisation (CGU) régissent l'utilisation 
              du service Finance Type, générateur gratuit de CV pour professionnels de la finance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              2. Accès au service
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              L'accès au service Finance Type est gratuit et ne nécessite aucune inscription. 
              Le service est accessible 24h/24 et 7j/7, sous réserve des opérations de maintenance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              3. Utilisation du service
            </h2>
            <p className="text-muted-foreground leading-relaxed">L'utilisateur s'engage à :</p>
            <ul className="mt-3 text-muted-foreground space-y-2">
              <li>• Utiliser le service de manière conforme à sa destination</li>
              <li>• Ne pas porter atteinte au fonctionnement du service</li>
              <li>• Fournir des informations exactes et véridiques</li>
              <li>• Respecter les droits de propriété intellectuelle</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              4. Propriété intellectuelle
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Les templates, designs et codes source de Finance Type sont protégés par le droit 
              d'auteur. Les CV générés appartiennent à l'utilisateur qui les a créés.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              5. Limitation de responsabilité
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Finance Type ne peut être tenu responsable des dommages directs ou indirects 
              résultant de l'utilisation du service. Le service est fourni "en l'état" 
              sans garantie d'aucune sorte.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              6. Modification des CGU
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Finance Type se réserve le droit de modifier les présentes CGU à tout moment. 
              Les modifications sont applicables dès leur publication sur le site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              7. Droit applicable
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Les présentes CGU sont soumises au droit français. Tout litige sera soumis 
              à la compétence des tribunaux français.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}