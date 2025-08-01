import { Heart, ExternalLink } from 'lucide-react';

interface FooterProps {
  language: 'fr' | 'en';
}

const Footer = ({ language }: FooterProps) => {
  const translations = {
    fr: {
      owners: 'Owners',
      community: 'Communauté',
      discord: 'Rejoindre Discord',
      comingSoon: 'Un shop de cheat arrive bientôt',
      madeWith: 'Fait avec',
      for: 'pour',
      rights: 'Tous droits réservés'
    },
    en: {
      owners: 'Owners',
      community: 'Community',
      discord: 'Join Discord',
      comingSoon: 'A cheat shop is coming soon',
      madeWith: 'Made with',
      for: 'for',
      rights: 'All rights reserved'
    }
  };

  const t = translations[language];

  return (
    <footer className="bg-gradient-to-t from-background to-muted py-16 px-6 border-t border-border">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Branding */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center eclipse-glow">
                🌘
              </div>
              <div>
                <h3 className="text-xl font-bold gradient-text">HOKKAIDO ECLIPSE</h3>
                <p className="text-sm text-muted-foreground">Elite Gaming Community</p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {language === 'fr' 
                ? 'Une communauté gaming d\'élite dédiée aux joueurs passionnés. Rejoins-nous pour vivre des expériences uniques !'
                : 'An elite gaming community dedicated to passionate players. Join us for unique experiences!'
              }
            </p>
          </div>

          {/* Owners */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold flex items-center space-x-2">
              <span>👑</span>
              <span>{t.owners}</span>
            </h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 p-3 rounded-lg bg-secondary/30">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center text-sm font-bold text-white">
                  N
                </div>
                <span className="font-medium">Neyroxx2.o</span>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg bg-secondary/30">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent to-yellow-500 flex items-center justify-center text-sm font-bold text-background">
                  F
                </div>
                <span className="font-medium">_flyz.</span>
              </div>
            </div>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold flex items-center space-x-2">
              <span>🌍</span>
              <span>{t.community}</span>
            </h4>
            <div className="space-y-3">
              <a
                href="https://discord.gg/BSxeKTsX5V"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 p-3 rounded-lg bg-gradient-to-r from-primary/10 to-primary-glow/10 border border-primary/20 hover:border-primary/40 transition-all group"
                onClick={() => {
                  const clicks = parseInt(localStorage.getItem('discordClicks') || '0') + 1;
                  localStorage.setItem('discordClicks', clicks.toString());
                }}
              >
                <span className="text-primary">📱</span>
                <span className="font-medium">{t.discord}</span>
                <ExternalLink className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
              </a>
              
              <div className="p-3 rounded-lg bg-gradient-to-r from-accent/10 to-yellow-500/10 border border-accent/20">
                <div className="flex items-center space-x-2 mb-1">
                  <span>👀</span>
                  <span className="font-medium text-accent">{t.comingSoon}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {language === 'fr' ? 'Restez connectés...' : 'Stay tuned...'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>{t.madeWith}</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>{t.for}</span>
              <span className="font-semibold gradient-text">HOKKAIDO ECLIPSE</span>
            </div>
            
            <div className="text-sm text-muted-foreground">
              © 2024 HOKKAIDO ECLIPSE. {t.rights}.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;