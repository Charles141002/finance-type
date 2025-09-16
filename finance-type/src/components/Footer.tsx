import { Link } from "react-router-dom";
import { FileText, Mail, Shield, FileCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-finance-light rounded-lg">
                <FileText className="h-5 w-5 text-finance-navy" />
              </div>
              <span className="text-lg font-bold text-finance-navy">CV Finance</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Créez des CV professionnels adaptés au secteur financier avec notre générateur avancé.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-finance-navy transition-smooth">
                  Générateur de CV
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-finance-navy transition-smooth">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-muted-foreground hover:text-finance-navy transition-smooth">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-finance-navy transition-smooth">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:support@cvfinance.com" className="text-sm text-muted-foreground hover:text-finance-navy transition-smooth flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  Support
                </a>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-muted-foreground hover:text-finance-navy transition-smooth">
                  Questions fréquentes
                </Link>
              </li>
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Informations légales</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-finance-navy transition-smooth flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-finance-navy transition-smooth flex items-center gap-1">
                  <FileCheck className="h-3 w-3" />
                  CGU
                </Link>
              </li>
              <li>
                <Link to="/legal" className="text-sm text-muted-foreground hover:text-finance-navy transition-smooth">
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 CV Finance. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}