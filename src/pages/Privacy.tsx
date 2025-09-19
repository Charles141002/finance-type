export default function Privacy() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="gradient-accent rounded-2xl p-8 shadow-floating inline-block">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent mb-4">
              Politique de Confidentialité
            </h1>
            <p className="text-lg text-muted-foreground">
              Dernière mise à jour : Novembre 2024
            </p>
          </div>
        </div>

        <div className="glass rounded-2xl p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              1. Collecte des données
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Finance Type collecte uniquement les informations que vous saisissez volontairement 
              dans le formulaire de création de CV (nom, prénom, email, expérience professionnelle, 
              formation, compétences). Ces données sont utilisées exclusivement pour générer votre CV.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              2. Utilisation des données
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Vos données personnelles sont utilisées uniquement pour :
            </p>
            <ul className="mt-3 text-muted-foreground space-y-2">
              <li>• Générer votre CV au format PDF</li>
              <li>• Afficher l'aperçu de votre CV</li>
              <li>• Améliorer notre service (données anonymisées)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              3. Stockage et sécurité
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Vos données ne sont stockées que temporairement dans votre navigateur pendant votre session. 
              Nous ne sauvegardons aucune information personnelle sur nos serveurs. Une fois votre 
              navigateur fermé, toutes vos données sont automatiquement supprimées.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              4. Cookies
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Finance Type utilise uniquement des cookies techniques nécessaires au fonctionnement 
              du site. Aucun cookie de suivi ou publicitaire n'est utilisé.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              5. Vos droits
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de 
              suppression de vos données personnelles. Pour exercer ces droits, contactez-nous 
              via notre page de contact.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              6. Contact
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Pour toute question concernant cette politique de confidentialité, vous pouvez 
              nous contacter via notre formulaire de contact.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}