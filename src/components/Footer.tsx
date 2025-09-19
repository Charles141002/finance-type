import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="glass border-t border-white/20 mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 gradient-primary rounded-xl shadow-glow"></div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                Finance Type
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Générateur de CV professionnel pour le secteur financier. 
              Créez des CV élégants et impactants en quelques minutes.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold mb-6 text-foreground">Produit</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">
                  Générateur CV
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-6 text-foreground">Entreprise</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-6 text-foreground">Légal</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">
                  CGU
                </Link>
              </li>
              <li>
                <Link to="/legal" className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-12 pt-8 text-center">
          <p className="text-muted-foreground">
            © 2024 Finance Type. Tous droits réservés. Fait avec ❤️ pour les professionnels de la finance.
          </p>
        </div>
      </div>
    </footer>
  );
}