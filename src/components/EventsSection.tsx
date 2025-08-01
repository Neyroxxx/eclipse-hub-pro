import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Calendar, Trophy, Gift, Zap, Crown, Users, Target, Clock, RefreshCw } from 'lucide-react';
import { useDraftbotLeaderboard } from '@/hooks/useDraftbotLeaderboard';

interface EventsSectionProps {
  language: 'fr' | 'en';
}

const EventsSection = ({ language }: EventsSectionProps) => {
  const [timeUntilReset, setTimeUntilReset] = useState('');
  const { leaderboard, loading, error, refresh } = useDraftbotLeaderboard();

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const nextReset = new Date();
      
      // Set to 27th of current month at midnight
      nextReset.setDate(27);
      nextReset.setHours(0, 0, 0, 0);
      
      // If we've passed the 27th this month, set to next month
      if (now > nextReset) {
        nextReset.setMonth(nextReset.getMonth() + 1);
      }
      
      const timeDiff = nextReset.getTime() - now.getTime();
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeUntilReset(`${days}j ${hours}h ${minutes}m`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  const translations = {
    fr: {
      title: 'Événements Réguliers',
      subtitle: 'Participe aux événements et gagne des récompenses exclusives !',
      countdown: 'Temps avant reset',
      leaderboard: 'Classement Mensuel',
      rewards: 'Récompenses IRL',
      xpEvents: 'Événements XP',
      requirements: 'Conditions',
      prizes: 'Prix',
      topPlayers: 'Top Joueurs',
      level: 'Niveau',
      rank: 'Rang',
      eventTypes: {
        xp: 'Boost XP x2',
        lottery: 'Loterie Discord',
        competition: 'Compétition',
        special: 'Événement Spécial'
      },
      rewardTiers: [
        { level: '40-69', reward: 'Carte 10€', color: 'from-green-500 to-emerald-600' },
        { level: '70-199', reward: 'Carte 20€', color: 'from-blue-500 to-cyan-600' },
        { level: '200+', reward: 'Carte 50€', color: 'from-purple-500 to-pink-600' }
      ],
      rules: [
        'Objectif : être TOP 2 du classement mensuel',
        'Minimum : Niveau 40 requis',
        'Anti-spam/vocal obligatoire',
        'Boosters : classement séparé',
        'Gagnant des 2 : récompense x2',
        'Reset tous les 27 du mois à minuit',
        'Owners exclus du classement'
      ]
    },
    en: {
      title: 'Regular Events',
      subtitle: 'Participate in events and win exclusive rewards!',
      countdown: 'Time until reset',
      leaderboard: 'Monthly Leaderboard',
      rewards: 'IRL Rewards',
      xpEvents: 'XP Events',
      requirements: 'Requirements',
      prizes: 'Prizes',
      topPlayers: 'Top Players',
      level: 'Level',
      rank: 'Rank',
      eventTypes: {
        xp: 'XP Boost x2',
        lottery: 'Discord Lottery',
        competition: 'Competition',
        special: 'Special Event'
      },
      rewardTiers: [
        { level: '40-69', reward: '€10 Card', color: 'from-green-500 to-emerald-600' },
        { level: '70-199', reward: '€20 Card', color: 'from-blue-500 to-cyan-600' },
        { level: '200+', reward: '€50 Card', color: 'from-purple-500 to-pink-600' }
      ],
      rules: [
        'Objective: be TOP 2 of monthly ranking',
        'Minimum: Level 40 required',
        'Anti-spam/voice mandatory',
        'Boosters: separate ranking',
        'Winner of both: x2 reward',
        'Reset every 27th at midnight',
        'Owners excluded from ranking'
      ]
    }
  };

  const t = translations[language];


  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'from-yellow-400 to-yellow-600';
      case 2: return 'from-gray-300 to-gray-500';
      case 3: return 'from-orange-400 to-orange-600';
      default: return 'from-primary to-primary-glow';
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return '👑';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '🏆';
    }
  };

  return (
    <section id="events" className="py-24 px-6 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16 fade-in-up">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Calendar className="w-8 h-8 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">{t.title}</h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Countdown & Reset Info */}
          <Card className="eclipse-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-primary" />
                <span>{t.countdown}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="text-4xl font-bold gradient-text eclipse-text-glow">
                  {timeUntilReset}
                </div>
                <p className="text-muted-foreground">
                  {language === 'fr' ? 'Jusqu\'au reset mensuel (27 du mois)' : 'Until monthly reset (27th of month)'}
                </p>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-primary to-primary-glow h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${(new Date().getDate() / 27) * 100}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reward Tiers */}
          <Card className="eclipse-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Gift className="w-5 h-5 text-accent" />
                <span>{t.rewards}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {t.rewardTiers.map((tier, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${tier.color}`} />
                      <span className="font-medium">{t.level} {tier.level}</span>
                    </div>
                    <Badge className="gradient-accent-text bg-accent/10 border-accent/20">
                      {tier.reward}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Leaderboard */}
        <Card className="eclipse-card mb-12">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-accent" />
                <span>{t.leaderboard}</span>
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="eclipse-badge">
                  {language === 'fr' ? 'Temps réel' : 'Real-time'}
                </Badge>
                <Button 
                  onClick={refresh} 
                  variant="ghost" 
                  size="sm"
                  disabled={loading}
                  className="opacity-60 hover:opacity-100"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading && leaderboard.length === 0 ? (
              <div className="flex items-center justify-center py-8">
                <RefreshCw className="w-6 h-6 animate-spin text-primary" />
                <span className="ml-2 text-muted-foreground">
                  {language === 'fr' ? 'Chargement du classement...' : 'Loading leaderboard...'}
                </span>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-8 text-destructive">
                {error}
              </div>
            ) : (
              <div className="space-y-4">
                {leaderboard.slice(0, 10).map((player) => (
                  <div
                    key={player.rank}
                    className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                      player.rank <= 3 ? 'eclipse-glow' : 'bg-secondary/30'
                    }`}
                    style={{
                      background: player.rank <= 3 ? `linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))` : undefined
                    }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{getRankIcon(player.rank)}</span>
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${getRankColor(player.rank)} flex items-center justify-center text-white font-bold`}>
                          {player.rank}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-lg">{player.name}</span>
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">
                          {t.level} {player.level} • {player.totalXp.toLocaleString()} XP
                        </div>
                        <div className="w-48 bg-muted rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-primary to-primary-glow h-2 rounded-full transition-all"
                            style={{ width: `${(player.currentXp / (player.currentXp + player.nextLevelXp)) * 100}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {player.currentXp}/{player.currentXp + player.nextLevelXp} XP {language === 'fr' ? 'au prochain niveau' : 'to next level'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Event Rules */}
        <Card className="eclipse-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-primary" />
              <span>{t.requirements}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {t.rules.map((rule, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-secondary/30">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-sm leading-relaxed">{rule}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default EventsSection;