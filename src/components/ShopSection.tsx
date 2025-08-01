import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Heart, Ticket, Crown, Zap, Gift, DollarSign, Info, Trophy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShopSectionProps {
  language: 'fr' | 'en';
}

const ShopSection = ({ language }: ShopSectionProps) => {
  const [selectedLotteryAmount, setSelectedLotteryAmount] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [participantName, setParticipantName] = useState('');
  const [buyerUsername, setBuyerUsername] = useState('');
  const { toast } = useToast();

  const translations = {
    fr: {
      title: 'Shop & Support',
      subtitle: 'Soutiens la communauté et obtiens des avantages exclusifs !',
      support: 'Soutien & Dons',
      lottery: 'Loterie Mensuelle',
      roles: 'Boutique Eclipse (Rôles XP)',
      supportDesc: 'Aide-nous à maintenir et améliorer la communauté',
      lotteryDesc: 'Participe à notre loterie mensuelle pour gagner des cartes cadeaux',
      rolesDesc: 'Obtiens des rôles premium avec bonus XP et avantages exclusifs',
      donate: 'Faire un don',
      participate: 'Participer',
      buy: 'Acheter',
      entries: 'Entrées',
      maxPlaces: '10 places max par tirage',
      publicDraw: 'Tirage dès que complet (public)',
      unlimitedTickets: 'Tickets illimités',
      payment: 'Paiement via @Neyroxx2.o',
      commission: '5% des fonds gardés, le reste sert aux récompenses/events',
      validFor: 'Valide 2 mois',
      boostChances: 'Booste les chances dans les tirages & classements',
      monthlyEvent: 'Event mensuel — Récompenses IRL',
      enterName: 'Entrez votre nom Discord',
      enterUsername: 'Entrez votre nom d\'utilisateur',
      purchaseSuccess: 'Achat enregistré avec succès !',
      lotterySuccess: 'Participation à la loterie enregistrée !',
      pleaseFillFields: 'Veuillez remplir tous les champs',
      lotteryEntries: [
        { price: '1,30€', reward: 'Carte 10€' },
        { price: '3,30€', reward: 'Carte 30€' },
        { price: '5,50€', reward: 'Carte 50€' },
        { price: '8,50€', reward: 'Carte 80€' },
        { price: '10,70€', reward: 'Carte 100€' }
      ],
      eclipseRoles: [
        { name: 'Shadow Member', bonus: '+10% XP', price: '2€', description: 'Accès aux channels exclusifs' },
        { name: 'Lunar VIP', bonus: '+25% XP', price: '5€', description: 'Privilèges VIP + couleurs custom' },
        { name: 'Solar Elite', bonus: '+50% XP', price: '8€', description: 'Statut élite + tous les avantages' }
      ]
    },
    en: {
      title: 'Shop & Support',
      subtitle: 'Support the community and get exclusive benefits!',
      support: 'Support & Donations',
      lottery: 'Monthly Lottery',
      roles: 'Eclipse Shop (XP Roles)',
      supportDesc: 'Help us maintain and improve the community',
      lotteryDesc: 'Participate in our monthly lottery to win gift cards',
      rolesDesc: 'Get premium roles with XP bonus and exclusive benefits',
      donate: 'Donate',
      participate: 'Participate',
      buy: 'Buy',
      entries: 'Entries',
      maxPlaces: '10 max places per draw',
      publicDraw: 'Draw as soon as complete (public)',
      unlimitedTickets: 'Unlimited tickets',
      payment: 'Payment via @Neyroxx2.o',
      commission: '5% of funds kept, rest goes to rewards/events',
      validFor: 'Valid for 2 months',
      boostChances: 'Boosts chances in draws & rankings',
      monthlyEvent: 'Monthly event — IRL Rewards',
      enterName: 'Enter your Discord name',
      enterUsername: 'Enter your username',
      purchaseSuccess: 'Purchase recorded successfully!',
      lotterySuccess: 'Lottery participation recorded!',
      pleaseFillFields: 'Please fill all fields',
      lotteryEntries: [
        { price: '€1.30', reward: '€10 Card' },
        { price: '€3.30', reward: '€30 Card' },
        { price: '€5.50', reward: '€50 Card' },
        { price: '€8.50', reward: '€80 Card' },
        { price: '€10.70', reward: '€100 Card' }
      ],
      eclipseRoles: [
        { name: 'Shadow Member', bonus: '+10% XP', price: '€2', description: 'Access to exclusive channels' },
        { name: 'Lunar VIP', bonus: '+25% XP', price: '€5', description: 'VIP privileges + custom colors' },
        { name: 'Solar Elite', bonus: '+50% XP', price: '€8', description: 'Elite status + all benefits' }
      ]
    }
  };

  const t = translations[language];

  const handleDonation = () => {
    window.open('https://paypal.me/Neyr0xx2o', '_blank');
    // Track PayPal clicks
    const clicks = parseInt(localStorage.getItem('paypalClicks') || '0') + 1;
    localStorage.setItem('paypalClicks', clicks.toString());
  };

  const handleLotteryParticipation = () => {
    if (!participantName || !selectedLotteryAmount) {
      toast({
        title: t.pleaseFillFields,
        variant: 'destructive'
      });
      return;
    }

    // Save lottery participation
    const participants = JSON.parse(localStorage.getItem('lotteryParticipants') || '[]');
    const newParticipant = {
      id: Date.now().toString(),
      name: participantName,
      amount: parseFloat(selectedLotteryAmount.replace('€', '').replace(',', '.')),
      date: new Date().toISOString(),
      ticketNumber: participants.length + 1
    };
    
    participants.push(newParticipant);
    localStorage.setItem('lotteryParticipants', JSON.stringify(participants));

    toast({
      title: t.lotterySuccess,
      description: `Ticket #${newParticipant.ticketNumber} - ${selectedLotteryAmount}`
    });

    setParticipantName('');
    setSelectedLotteryAmount('');
  };

  const handleRolePurchase = () => {
    if (!buyerUsername || !selectedRole) {
      toast({
        title: t.pleaseFillFields,
        variant: 'destructive'
      });
      return;
    }

    // Save role purchase
    const purchases = JSON.parse(localStorage.getItem('rolesPurchased') || '[]');
    const roleData = t.eclipseRoles.find(r => r.name === selectedRole);
    const newPurchase = {
      id: Date.now().toString(),
      username: buyerUsername,
      role: selectedRole,
      date: new Date().toISOString(),
      price: parseFloat(roleData?.price.replace('€', '') || '0')
    };
    
    purchases.push(newPurchase);
    localStorage.setItem('rolesPurchased', JSON.stringify(purchases));

    toast({
      title: t.purchaseSuccess,
      description: `${selectedRole} - ${roleData?.price}`
    });

    setBuyerUsername('');
    setSelectedRole('');
  };

  return (
    <section id="shop" className="py-24 px-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16 fade-in-up">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <ShoppingCart className="w-8 h-8 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">{t.title}</h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Support & Donations */}
          <Card className="eclipse-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-red-500" />
                <span>{t.support}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{t.supportDesc}</p>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span className="font-semibold">PayPal</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {language === 'fr' ? 'Soutiens directement la communauté' : 'Support the community directly'}
                  </p>
                  <Button onClick={handleDonation} className="w-full eclipse-button">
                    <DollarSign className="w-4 h-4 mr-2" />
                    {t.donate}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Lottery */}
          <Card className="eclipse-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Ticket className="w-5 h-5 text-accent" />
                <span>{t.lottery}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{t.lotteryDesc}</p>
              
              {/* Lottery Entries */}
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center space-x-2">
                  <Ticket className="w-4 h-4" />
                  <span>{t.entries} :</span>
                </h4>
                <div className="space-y-2">
                  {t.lotteryEntries.map((entry, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedLotteryAmount === entry.price
                          ? 'border-primary bg-primary/10 eclipse-glow'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedLotteryAmount(entry.price)}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{entry.price}</span>
                        <Badge variant="outline">{entry.reward}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lottery Info */}
              <div className="space-y-1 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Info className="w-3 h-3" />
                  <span>{t.maxPlaces}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Info className="w-3 h-3" />
                  <span>{t.publicDraw}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Info className="w-3 h-3" />
                  <span>{t.unlimitedTickets}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Info className="w-3 h-3" />
                  <span>{t.payment}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Info className="w-3 h-3" />
                  <span>{t.commission}</span>
                </div>
              </div>

              {/* Participation Form */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full eclipse-button">
                    <Ticket className="w-4 h-4 mr-2" />
                    {t.participate}
                  </Button>
                </DialogTrigger>
                <DialogContent className="eclipse-card">
                  <DialogHeader>
                    <DialogTitle>{t.lottery}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder={t.enterName}
                      value={participantName}
                      onChange={(e) => setParticipantName(e.target.value)}
                    />
                    <div className="space-y-2">
                      {t.lotteryEntries.map((entry, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg border cursor-pointer transition-all ${
                            selectedLotteryAmount === entry.price
                              ? 'border-primary bg-primary/10'
                              : 'border-border hover:border-primary/50'
                          }`}
                          onClick={() => setSelectedLotteryAmount(entry.price)}
                        >
                          <div className="flex justify-between items-center">
                            <span>{entry.price}</span>
                            <Badge variant="outline">{entry.reward}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button onClick={handleLotteryParticipation} className="w-full eclipse-button">
                      {t.participate}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Eclipse Roles */}
          <Card className="eclipse-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Crown className="w-5 h-5 text-primary" />
                <span>{t.roles}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{t.rolesDesc}</p>
              
              {/* Roles */}
              <div className="space-y-3">
                {t.eclipseRoles.map((role, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedRole === role.name
                        ? 'border-primary bg-primary/10 eclipse-glow'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedRole(role.name)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{role.name}</h4>
                        <p className="text-sm text-muted-foreground">{role.description}</p>
                      </div>
                      <Badge className="gradient-accent-text">{role.price}</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium text-accent">{role.bonus}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Role Benefits */}
              <div className="space-y-1 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Gift className="w-3 h-3" />
                  <span>{t.validFor}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Crown className="w-3 h-3" />
                  <span>{t.boostChances}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Trophy className="w-3 h-3" />
                  <span>{t.monthlyEvent}</span>
                </div>
              </div>

              {/* Purchase Form */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full eclipse-button">
                    <Crown className="w-4 h-4 mr-2" />
                    {t.buy}
                  </Button>
                </DialogTrigger>
                <DialogContent className="eclipse-card">
                  <DialogHeader>
                    <DialogTitle>{t.roles}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder={t.enterUsername}
                      value={buyerUsername}
                      onChange={(e) => setBuyerUsername(e.target.value)}
                    />
                    <div className="space-y-2">
                      {t.eclipseRoles.map((role, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg border cursor-pointer transition-all ${
                            selectedRole === role.name
                              ? 'border-primary bg-primary/10'
                              : 'border-border hover:border-primary/50'
                          }`}
                          onClick={() => setSelectedRole(role.name)}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="font-medium">{role.name}</span>
                              <div className="text-sm text-muted-foreground">{role.bonus}</div>
                            </div>
                            <Badge className="gradient-accent-text">{role.price}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button onClick={handleRolePurchase} className="w-full eclipse-button">
                      {t.buy}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ShopSection;