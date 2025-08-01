import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Gamepad2, Users, Zap, Crown } from 'lucide-react';

interface GamingSectionProps {
  language: 'fr' | 'en';
}

const GamingSection = ({ language }: GamingSectionProps) => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards(prev => [...prev, index]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('.gaming-card');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const translations = {
    fr: {
      title: 'Zone Gaming',
      subtitle: 'Découvre nos serveurs de jeu et rejoins la communauté !',
      players: 'joueurs',
      active: 'Actif',
      popular: 'Populaire',
      new: 'Nouveau',
      games: [
        {
          name: 'Fortnite',
          description: 'Combats épiques et builds stratégiques',
          players: '25+',
          status: 'Actif',
          color: 'from-blue-500 to-purple-600',
          icon: '🏗️'
        },
        {
          name: 'GTA Online',
          description: 'Roleplay immersif et missions coopératives',
          players: '30+',
          status: 'Populaire',
          color: 'from-green-500 to-emerald-600',
          icon: '🚗'
        },
        {
          name: 'Minecraft',
          description: 'Survie, construction et aventures sans fin',
          players: '20+',
          status: 'Actif',
          color: 'from-emerald-500 to-green-600',
          icon: '⛏️'
        },
        {
          name: 'Valorant',
          description: 'FPS tactique et stratégies d\'équipe',
          players: '15+',
          status: 'Nouveau',
          color: 'from-red-500 to-pink-600',
          icon: '🎯'
        },
        {
          name: 'Among Us',
          description: 'Déduction sociale et trahison entre amis',
          players: '10+',
          status: 'Actif',
          color: 'from-purple-500 to-indigo-600',
          icon: '👨‍🚀'
        },
        {
          name: 'Fall Guys',
          description: 'Mini-jeux délirants et compétitions amusantes',
          players: '12+',
          status: 'Actif',
          color: 'from-yellow-500 to-orange-600',
          icon: '🏃‍♂️'
        }
      ]
    },
    en: {
      title: 'Gaming Zone',
      subtitle: 'Discover our game servers and join the community!',
      players: 'players',
      active: 'Active',
      popular: 'Popular',
      new: 'New',
      games: [
        {
          name: 'Fortnite',
          description: 'Epic battles and strategic builds',
          players: '25+',
          status: 'Active',
          color: 'from-blue-500 to-purple-600',
          icon: '🏗️'
        },
        {
          name: 'GTA Online',
          description: 'Immersive roleplay and cooperative missions',
          players: '30+',
          status: 'Popular',
          color: 'from-green-500 to-emerald-600',
          icon: '🚗'
        },
        {
          name: 'Minecraft',
          description: 'Survival, building and endless adventures',
          players: '20+',
          status: 'Active',
          color: 'from-emerald-500 to-green-600',
          icon: '⛏️'
        },
        {
          name: 'Valorant',
          description: 'Tactical FPS and team strategies',
          players: '15+',
          status: 'New',
          color: 'from-red-500 to-pink-600',
          icon: '🎯'
        },
        {
          name: 'Among Us',
          description: 'Social deduction and betrayal among friends',
          players: '10+',
          status: 'Active',
          color: 'from-purple-500 to-indigo-600',
          icon: '👨‍🚀'
        },
        {
          name: 'Fall Guys',
          description: 'Crazy mini-games and fun competitions',
          players: '12+',
          status: 'Active',
          color: 'from-yellow-500 to-orange-600',
          icon: '🏃‍♂️'
        }
      ]
    }
  };

  const t = translations[language];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Populaire':
      case 'Popular':
        return 'bg-accent text-accent-foreground';
      case 'Nouveau':
      case 'New':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <section id="gaming" className="py-24 px-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16 fade-in-up">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Gamepad2 className="w-8 h-8 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">{t.title}</h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.games.map((game, index) => (
            <Card
              key={game.name}
              data-index={index}
              className={`gaming-card eclipse-card group cursor-pointer transition-all duration-500 hover:scale-105 hover:eclipse-glow ${
                visibleCards.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                {/* Game Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${game.color} flex items-center justify-center text-2xl shadow-lg`}>
                      {game.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{game.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>{game.players} {t.players}</span>
                      </div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(game.status)}>
                    {game.status}
                  </Badge>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {game.description}
                </p>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <div className={`flex-1 py-2 px-4 rounded-lg bg-gradient-to-r ${game.color} text-white text-center font-semibold transition-all group-hover:shadow-lg`}>
                    <Zap className="w-4 h-4 inline-block mr-2" />
                    {language === 'fr' ? 'Rejoindre' : 'Join'}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Community Stats */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 eclipse-card p-6 rounded-2xl">
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">80+</div>
              <div className="text-sm text-muted-foreground">{language === 'fr' ? 'Membres' : 'Members'}</div>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">6</div>
              <div className="text-sm text-muted-foreground">{language === 'fr' ? 'Jeux' : 'Games'}</div>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">24/7</div>
              <div className="text-sm text-muted-foreground">{language === 'fr' ? 'En ligne' : 'Online'}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GamingSection;