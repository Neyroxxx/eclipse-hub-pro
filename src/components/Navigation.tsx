import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Globe, Menu, X } from 'lucide-react';

interface NavigationProps {
  language: 'fr' | 'en';
  onLanguageChange: (lang: 'fr' | 'en') => void;
}

const Navigation = ({ language, onLanguageChange }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const translations = {
    fr: {
      gaming: 'Gaming',
      events: 'Événements',
      shop: 'Shop & Support',
      rules: 'Règlement',
      discord: 'Discord',
    },
    en: {
      gaming: 'Gaming',
      events: 'Events',
      shop: 'Shop & Support',
      rules: 'Rules',
      discord: 'Discord',
    }
  };

  const t = translations[language];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'eclipse-card backdrop-blur-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center eclipse-glow">
              <Moon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">HOKKAIDO ECLIPSE</h1>
              <p className="text-xs text-muted-foreground">Elite Gaming Community</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('gaming')}
              className="text-foreground hover:text-primary transition-colors"
            >
              {t.gaming}
            </button>
            <button
              onClick={() => scrollToSection('events')}
              className="text-foreground hover:text-primary transition-colors"
            >
              {t.events}
            </button>
            <button
              onClick={() => scrollToSection('shop')}
              className="text-foreground hover:text-primary transition-colors"
            >
              {t.shop}
            </button>
            <button
              onClick={() => scrollToSection('rules')}
              className="text-foreground hover:text-primary transition-colors"
            >
              {t.rules}
            </button>
          </div>

          {/* Language & Discord */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onLanguageChange('fr')}
                className={`text-2xl transition-all ${language === 'fr' ? 'scale-110 eclipse-glow' : 'opacity-60 hover:opacity-100'}`}
              >
                🇫🇷
              </button>
              <button
                onClick={() => onLanguageChange('en')}
                className={`text-2xl transition-all ${language === 'en' ? 'scale-110 eclipse-glow' : 'opacity-60 hover:opacity-100'}`}
              >
                🇬🇧
              </button>
            </div>

            {/* Discord Button */}
            <Button
              onClick={() => {
                window.open('https://discord.gg/BSxeKTsX5V', '_blank');
                // Track click in local storage for admin panel
                const clicks = parseInt(localStorage.getItem('discordClicks') || '0') + 1;
                localStorage.setItem('discordClicks', clicks.toString());
              }}
              className="eclipse-button hidden md:flex"
            >
              {t.discord}
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('gaming')}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                {t.gaming}
              </button>
              <button
                onClick={() => scrollToSection('events')}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                {t.events}
              </button>
              <button
                onClick={() => scrollToSection('shop')}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                {t.shop}
              </button>
              <button
                onClick={() => scrollToSection('rules')}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                {t.rules}
              </button>
              <Button
                onClick={() => {
                  window.open('https://discord.gg/BSxeKTsX5V', '_blank');
                  const clicks = parseInt(localStorage.getItem('discordClicks') || '0') + 1;
                  localStorage.setItem('discordClicks', clicks.toString());
                  setIsMobileMenuOpen(false);
                }}
                className="eclipse-button w-full"
              >
                {t.discord}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;