export default function About() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="gradient-accent rounded-2xl p-8 shadow-floating inline-block">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent mb-4">
              À propos de Finance Type
            </h1>
            <p className="text-lg text-muted-foreground">
              L'outil de création de CV conçu spécialement pour les professionnels de la finance
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="glass rounded-2xl p-8 hover-lift">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              Notre Mission
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Nous simplifions la création de CV pour les professionnels de la finance en proposant 
              un générateur automatique qui produit des documents élégants et conformes aux standards 
              du secteur financier.
            </p>
          </div>

          <div className="glass rounded-2xl p-8 hover-lift">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              Pourquoi Finance Type ?
            </h2>
            <ul className="text-muted-foreground space-y-2">
              <li>• Design sobre et professionnel</li>
              <li>• Export PDF de qualité</li>
              <li>• Interface intuitive</li>
              <li>• Gratuit et sans inscription</li>
            </ul>
          </div>
        </div>

        <div className="glass rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
            Notre Histoire
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Finance Type a été créé par deux étudiants passionnés de finance qui ont identifié 
            le besoin d'un outil simple et efficace pour créer des CV adaptés au monde financier. 
            Frustrés par la complexité des logiciels existants, ils ont développé cette solution 
            gratuite et accessible à tous.
          </p>
        </div>
      </div>
    </div>
  );
}