export default function Legal() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="gradient-accent rounded-2xl p-8 shadow-floating inline-block">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent mb-4">
              Mentions Légales
            </h1>
            <p className="text-lg text-muted-foreground">
              Informations légales relatives au site Finance Type
            </p>
          </div>
        </div>

        <div className="glass rounded-2xl p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              1. Éditeur du site
            </h2>
            <div className="text-muted-foreground leading-relaxed space-y-2">
              <p><strong>Nom :</strong> Finance Type</p>
              <p><strong>Statut :</strong> Projet étudiant</p>
              <p><strong>Email :</strong> contact@financetype.fr</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              2. Hébergement
            </h2>
            <div className="text-muted-foreground leading-relaxed space-y-2">
              <p><strong>Hébergeur :</strong> Lovable</p>
              <p><strong>Adresse :</strong> Lovable.dev</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              3. Propriété intellectuelle
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              L'ensemble des contenus présents sur le site Finance Type (textes, images, 
              graphismes, logo, icônes, sons, logiciels) constitue une œuvre protégée par 
              les lois françaises et internationales sur la propriété intellectuelle.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              4. Données personnelles
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Conformément à la loi "Informatique et Libertés" du 6 janvier 1978 modifiée 
              et au Règlement Général sur la Protection des Données (RGPD), vous disposez 
              d'un droit d'accès, de rectification et de suppression des données vous concernant.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              5. Cookies
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Le site Finance Type utilise uniquement des cookies techniques nécessaires 
              à son bon fonctionnement. Aucun cookie de suivi n'est utilisé.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              6. Limitation de responsabilité
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Les informations contenues sur ce site sont données à titre indicatif et 
              sont susceptibles d'évoluer. Finance Type ne saurait être tenu responsable 
              des erreurs ou omissions qui pourraient s'y glisser.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              7. Droit applicable
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Les présentes mentions légales sont régies par le droit français. 
              En cas de litige et à défaut d'accord amiable, le litige sera porté 
              devant les tribunaux français selon les règles de compétence en vigueur.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}