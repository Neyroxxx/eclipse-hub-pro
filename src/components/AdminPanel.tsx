import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, Trash2, RefreshCw, BarChart3, Users, CreditCard, Calendar } from 'lucide-react';

interface AdminData {
  discordClicks: number;
  paypalClicks: number;
  lotteryParticipants: Array<{
    id: string;
    name: string;
    amount: number;
    date: string;
    ticketNumber: number;
  }>;
  rolesPurchased: Array<{
    id: string;
    username: string;
    role: string;
    date: string;
    price: number;
  }>;
}

const AdminPanel = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [code, setCode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminData, setAdminData] = useState<AdminData>({
    discordClicks: 0,
    paypalClicks: 0,
    lotteryParticipants: [],
    rolesPurchased: []
  });

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = () => {
    const discordClicks = parseInt(localStorage.getItem('discordClicks') || '0');
    const paypalClicks = parseInt(localStorage.getItem('paypalClicks') || '0');
    const lotteryParticipants = JSON.parse(localStorage.getItem('lotteryParticipants') || '[]');
    const rolesPurchased = JSON.parse(localStorage.getItem('rolesPurchased') || '[]');

    setAdminData({
      discordClicks,
      paypalClicks,
      lotteryParticipants,
      rolesPurchased
    });
  };

  const handleCodeSubmit = () => {
    if (code === 'hokaistaff') {
      setIsAuthenticated(true);
      loadAdminData();
    } else {
      alert('Code incorrect');
    }
  };

  const resetMonthlyData = () => {
    if (confirm('Êtes-vous sûr de vouloir effectuer le reset mensuel ?')) {
      localStorage.removeItem('lotteryParticipants');
      localStorage.removeItem('rolesPurchased');
      loadAdminData();
    }
  };

  const totalLotteryRevenue = adminData.lotteryParticipants.reduce((sum, p) => sum + p.amount, 0);
  const totalRoleRevenue = adminData.rolesPurchased.reduce((sum, r) => sum + r.price, 0);

  if (!isVisible) {
    return (
      <div className="fixed top-4 left-4 z-50">
        <Button
          onClick={() => setIsVisible(true)}
          variant="outline"
          size="sm"
          className="opacity-50 hover:opacity-100 transition-opacity"
        >
          <Eye className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="fixed top-4 left-4 z-50 eclipse-card p-6 w-80">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Admin Access</h3>
            <Button
              onClick={() => setIsVisible(false)}
              variant="ghost"
              size="sm"
            >
              <EyeOff className="w-4 h-4" />
            </Button>
          </div>
          <Input
            type="password"
            placeholder="Code secret..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleCodeSubmit()}
          />
          <Button onClick={handleCodeSubmit} className="w-full eclipse-button">
            Accéder
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-4 left-4 z-50 eclipse-card p-6 w-96 max-h-[80vh] overflow-y-auto">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold gradient-text">Admin Dashboard</h3>
          </div>
          <div className="flex space-x-2">
            <Button onClick={loadAdminData} variant="ghost" size="sm">
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button onClick={() => setIsVisible(false)} variant="ghost" size="sm">
              <EyeOff className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="eclipse-card">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Discord</p>
                  <p className="text-xl font-bold">{adminData.discordClicks}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="eclipse-card">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CreditCard className="w-4 h-4 text-accent" />
                <div>
                  <p className="text-sm text-muted-foreground">PayPal</p>
                  <p className="text-xl font-bold">{adminData.paypalClicks}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Summary */}
        <Card className="eclipse-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Revenus Estimés</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Loterie:</span>
              <span className="font-semibold gradient-accent-text">{totalLotteryRevenue.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Rôles:</span>
              <span className="font-semibold gradient-accent-text">{totalRoleRevenue.toFixed(2)}€</span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between">
              <span className="font-semibold">Total:</span>
              <span className="font-bold gradient-text">{(totalLotteryRevenue + totalRoleRevenue).toFixed(2)}€</span>
            </div>
          </CardContent>
        </Card>

        {/* Lottery Participants */}
        <Card className="eclipse-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center space-x-2">
              <span>Loterie ({adminData.lotteryParticipants.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {adminData.lotteryParticipants.length === 0 ? (
                <p className="text-sm text-muted-foreground">Aucune participation</p>
              ) : (
                adminData.lotteryParticipants.map((participant) => (
                  <div key={participant.id} className="flex justify-between items-center text-sm">
                    <div>
                      <span className="font-medium">{participant.name}</span>
                      <Badge variant="outline" className="ml-2">#{participant.ticketNumber}</Badge>
                    </div>
                    <span className="gradient-accent-text font-semibold">{participant.amount}€</span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Roles Purchased */}
        <Card className="eclipse-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Rôles Achetés ({adminData.rolesPurchased.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {adminData.rolesPurchased.length === 0 ? (
                <p className="text-sm text-muted-foreground">Aucun achat</p>
              ) : (
                adminData.rolesPurchased.map((purchase) => (
                  <div key={purchase.id} className="flex justify-between items-center text-sm">
                    <div>
                      <span className="font-medium">{purchase.username}</span>
                      <Badge variant="outline" className="ml-2">{purchase.role}</Badge>
                    </div>
                    <span className="gradient-accent-text font-semibold">{purchase.price}€</span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Reset Button */}
        <Button
          onClick={resetMonthlyData}
          variant="destructive"
          className="w-full"
        >
          <Calendar className="w-4 h-4 mr-2" />
          Reset Mensuel
        </Button>
      </div>
    </div>
  );
};

export default AdminPanel;