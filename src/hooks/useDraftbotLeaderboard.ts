import { useState, useEffect } from 'react';

interface LeaderboardUser {
  name: string;
  level: number;
  totalXp: number;
  currentXp: number;
  nextLevelXp: number;
  rank: number;
}

export const useDraftbotLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simuler les données basées sur l'API Draftbot
      // En réalité, nous aurions besoin d'un proxy pour éviter les erreurs CORS
      const mockData: LeaderboardUser[] = [
        { name: 'Neyroxx2.o', level: 14, totalXp: 11300, currentXp: 1200, nextLevelXp: 541, rank: 1 },
        { name: '🇩🇿🇩🇿🇩🇿', level: 13, totalXp: 8900, currentXp: 452, nextLevelXp: 1100, rank: 2 },
        { name: 'Luzog', level: 10, totalXp: 5000, currentXp: 331, nextLevelXp: 769, rank: 3 },
        { name: 'Tortank', level: 8, totalXp: 3200, currentXp: 316, nextLevelXp: 504, rank: 4 },
        { name: 'Gikfreeg45', level: 5, totalXp: 1300, currentXp: 136, nextLevelXp: 339, rank: 5 },
        { name: 'ⁱᵃᵐ\\|ZNX𒆜', level: 4, totalXp: 847, currentXp: 77, nextLevelXp: 303, rank: 6 },
        { name: 'MiniSiYT', level: 3, totalXp: 733, currentXp: 258, nextLevelXp: 37, rank: 7 },
        { name: 'Ɓasţieŋ', level: 3, totalXp: 685, currentXp: 210, nextLevelXp: 85, rank: 8 },
        { name: 'SM951', level: 2, totalXp: 410, currentXp: 155, nextLevelXp: 65, rank: 9 },
        { name: 'lien inconnu', level: 2, totalXp: 390, currentXp: 135, nextLevelXp: 85, rank: 10 }
      ];

      // Ajouter un petit délai pour simuler une vraie requête
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setLeaderboard(mockData);
    } catch (err) {
      setError('Erreur lors du chargement du classement');
      console.error('Erreur leaderboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    
    // Rafraîchir toutes les 30 secondes
    const interval = setInterval(fetchLeaderboard, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return { leaderboard, loading, error, refresh: fetchLeaderboard };
};