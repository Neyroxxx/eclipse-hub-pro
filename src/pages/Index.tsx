import { useState, useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import Navigation from '@/components/Navigation';
import AdminPanel from '@/components/AdminPanel';
import GamingSection from '@/components/GamingSection';
import EventsSection from '@/components/EventsSection';
import ShopSection from '@/components/ShopSection';
import RulesModal from '@/components/RulesModal';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { Button } from '@/components/ui/button';
import { Moon, Sparkles, Users, Trophy } from 'lucide-react';

const Index = () => {
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide loading screen after 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Setup scroll animations
    const observeElements = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        },
        { threshold: 0.1 }
      );

      const elements = document.querySelectorAll('.fade-in-up, .scale-in');
      elements.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    };

    if (!isLoading) {
      observeElements();
    }

    return () => clearTimeout(timer);
  }, [isLoading]);

  const translations = {
    fr: {
      welcome: 'Bienvenue sur',
      subtitle: 'Communauté Gaming d\'Élite',
      description: 'Rejoins notre serveur Discord exclusif et découvre une expérience gaming unique avec des événements réguliers, des récompenses IRL et une communauté passionnée.',
      joinDiscord: 'Rejoindre Discord',
      discover: 'Découvrir',
      members: 'Membres actifs',
      events: 'Événements mensuels',
      games: 'Jeux disponibles',
    },
    en: {
      welcome: 'Welcome to',
      subtitle: 'Elite Gaming Community',
      description: 'Join our exclusive Discord server and discover a unique gaming experience with regular events, IRL rewards and a passionate community.',
      joinDiscord: 'Join Discord',
      discover: 'Discover',
      members: 'Active members',
      events: 'Monthly events',
      games: 'Available games',
    }
  };

  const t = translations[language];

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen">
      {/* Admin Panel */}
      <AdminPanel />

      {/* Navigation */}
      <Navigation language={language} onLanguageChange={setLanguage} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary))_0%,transparent_50%)] opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--primary-glow))_0%,transparent_50%)] opacity-10" />

        <div className="relative z-10 text-center max-w-6xl mx-auto">
          {/* Main Title */}
          <div className="space-y-8 fade-in-up">
            <div className="space-y-4">
              <p className="text-xl text-muted-foreground">{t.welcome}</p>
              <h1 className="text-6xl md:text-8xl font-bold gradient-text eclipse-text-glow">
                HOKKAIDO ECLIPSE
              </h1>
              <div className="flex items-center justify-center space-x-3">
                <Moon className="w-8 h-8 text-primary" />
                <p className="text-2xl md:text-3xl font-semibold text-muted-foreground">
                  {t.subtitle}
                </p>
                <Sparkles className="w-8 h-8 text-accent" />
              </div>
            </div>

            {/* Description */}
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
              <Button
                onClick={() => {
                  window.open('https://discord.gg/BSxeKTsX5V', '_blank');
                  const clicks = parseInt(localStorage.getItem('discordClicks') || '0') + 1;
                  localStorage.setItem('discordClicks', clicks.toString());
                }}
                className="eclipse-button text-lg px-8 py-4 h-auto"
              >
                <Users className="w-6 h-6 mr-3" />
                {t.joinDiscord}
              </Button>
              
              <Button
                onClick={() => document.getElementById('gaming')?.scrollIntoView({ behavior: 'smooth' })}
                variant="outline"
                className="text-lg px-8 py-4 h-auto border-primary/30 hover:border-primary/60 hover:bg-primary/10"
              >
                <Trophy className="w-6 h-6 mr-3" />
                {t.discover}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
              <div className="eclipse-card p-6 text-center scale-in">
                <div className="text-4xl font-bold gradient-text mb-2">80+</div>
                <div className="text-muted-foreground">{t.members}</div>
              </div>
              <div className="eclipse-card p-6 text-center scale-in" style={{ animationDelay: '200ms' }}>
                <div className="text-4xl font-bold gradient-text mb-2">12+</div>
                <div className="text-muted-foreground">{t.events}</div>
              </div>
              <div className="eclipse-card p-6 text-center scale-in" style={{ animationDelay: '400ms' }}>
                <div className="text-4xl font-bold gradient-text mb-2">6</div>
                <div className="text-muted-foreground">{t.games}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Main Sections */}
      <GamingSection language={language} />
      <EventsSection language={language} />
      <ShopSection language={language} />

      {/* Rules Section */}
      <section id="rules" className="py-24 px-6 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto text-center">
          <div className="space-y-8 fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">
              {language === 'fr' ? 'Règlement' : 'Rules'}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {language === 'fr' 
                ? 'Consulte notre règlement complet pour une expérience optimale dans la communauté.'
                : 'Check our complete rules for an optimal experience in the community.'
              }
            </p>
            <RulesModal language={language} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer language={language} />

      {/* Scroll to Top */}
      <ScrollToTop />
    </div>
  );
};

export default Index;
