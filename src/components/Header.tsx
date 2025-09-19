import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="glass border-b border-white/20 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 gradient-primary rounded-xl shadow-glow group-hover:shadow-floating transition-all duration-300"></div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              Finance Type
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-muted-foreground hover:text-primary font-medium transition-all duration-300 relative group">
              Accueil
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/about" className="text-muted-foreground hover:text-primary font-medium transition-all duration-300 relative group">
              À propos
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/faq" className="text-muted-foreground hover:text-primary font-medium transition-all duration-300 relative group">
              FAQ
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/contact" className="text-muted-foreground hover:text-primary font-medium transition-all duration-300 relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          <Button asChild variant="elegant" className="shadow-elegant">
            <Link to="/">
              <Sparkles className="w-4 h-4 mr-2" />
              Créer mon CV
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}