import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, Gift } from 'lucide-react';

interface RulesModalProps {
  language: 'fr' | 'en';
}

const RulesModal = ({ language }: RulesModalProps) => {
  const translations = {
    fr: {
      title: 'Règlement HOKKAIDO ECLIPSE',
      viewRules: 'Voir le Règlement',
      sections: {
        general: 'Règles Générales',
        events: 'Événements & Classements',
        shop: 'Boutique & Loterie',
        sanctions: 'Sanctions',
        secret: 'Secret'
      },
      content: {
        general: [
          '• Respect mutuel obligatoire entre tous les membres',
          '• Pas de spam dans les channels textuels ou vocaux',
          '• Utilisation des channels appropriés pour chaque type de contenu',
          '• Pas de contenu NSFW ou inapproprié',
          '• Les pseudonymes doivent être lisibles et appropriés',
          '• Pas de pub pour d\'autres serveurs sans autorisation'
        ],
        events: [
          '• Event mensuel : être TOP 2 du classement pour gagner',
          '• Niveau minimum : 40 requis pour participer',
          '• Anti-spam/vocal obligatoire pour validation',
          '• Classement séparé pour les membres avec rôles boost',
          '• Gagnant des deux classements : récompense doublée',
          '• Reset automatique tous les 27 du mois à minuit',
          '• Owners exclus du classement pour équité',
          '• Récompenses selon niveau : 40-69 (10€), 70-199 (20€), 200+ (50€)'
        ],
        shop: [
          '• Rôles XP valides pendant 2 mois après achat',
          '• Shadow Member : +10% XP (2€)',
          '• Lunar VIP : +25% XP (5€)',
          '• Solar Elite : +50% XP (8€)',
          '• Loterie : 10 places max par tirage',
          '• Tirage public dès que le quota est atteint',
          '• Tickets illimités pour la loterie',
          '• 5% des fonds gardés, le reste pour récompenses/events',
          '• Paiement uniquement via @Neyroxx2.o'
        ],
        sanctions: [
          '• Avertissement pour première infraction mineure',
          '• Mute temporaire pour récidive ou infraction modérée',
          '• Kick pour infractions graves ou récidives multiples',
          '• Ban définitif pour infractions très graves',
          '• Exclusion des events en cas de tricherie/spam',
          '• Remboursement impossible sauf cas exceptionnels'
        ],
        secret: [
          '🎁 SECRET : Le premier à DM @Neyroxx2.o avec le code "ECLIPSE_REWARD" recevra une récompense cachée !',
          '• Cette récompense n\'est valable qu\'une seule fois',
          '• Premier arrivé, premier servi',
          '• La récompense sera envoyée dans les 24h'
        ]
      }
    },
    en: {
      title: 'HOKKAIDO ECLIPSE Rules',
      viewRules: 'View Rules',
      sections: {
        general: 'General Rules',
        events: 'Events & Rankings',
        shop: 'Shop & Lottery',
        sanctions: 'Sanctions',
        secret: 'Secret'
      },
      content: {
        general: [
          '• Mutual respect required between all members',
          '• No spam in text or voice channels',
          '• Use appropriate channels for each type of content',
          '• No NSFW or inappropriate content',
          '• Usernames must be readable and appropriate',
          '• No advertising other servers without permission'
        ],
        events: [
          '• Monthly event: be TOP 2 of ranking to win',
          '• Minimum level: 40 required to participate',
          '• Anti-spam/voice mandatory for validation',
          '• Separate ranking for members with boost roles',
          '• Winner of both rankings: doubled reward',
          '• Automatic reset every 27th at midnight',
          '• Owners excluded from ranking for fairness',
          '• Rewards by level: 40-69 (€10), 70-199 (€20), 200+ (€50)'
        ],
        shop: [
          '• XP roles valid for 2 months after purchase',
          '• Shadow Member: +10% XP (€2)',
          '• Lunar VIP: +25% XP (€5)',
          '• Solar Elite: +50% XP (€8)',
          '• Lottery: 10 max places per draw',
          '• Public draw as soon as quota is reached',
          '• Unlimited tickets for lottery',
          '• 5% of funds kept, rest for rewards/events',
          '• Payment only via @Neyroxx2.o'
        ],
        sanctions: [
          '• Warning for first minor infraction',
          '• Temporary mute for repeat or moderate infraction',
          '• Kick for serious infractions or multiple repeats',
          '• Permanent ban for very serious infractions',
          '• Event exclusion for cheating/spam',
          '• Refunds impossible except exceptional cases'
        ],
        secret: [
          '🎁 SECRET: First to DM @Neyroxx2.o with code "ECLIPSE_REWARD" will receive a hidden reward!',
          '• This reward is only valid once',
          '• First come, first served',
          '• Reward will be sent within 24h'
        ]
      }
    }
  };

  const t = translations[language];

  const sectionIcons = {
    general: '⚖️',
    events: '🏆',
    shop: '🛒',
    sanctions: '⚠️',
    secret: '🎁'
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="eclipse-button">
          <FileText className="w-4 h-4 mr-2" />
          {t.viewRules}
        </Button>
      </DialogTrigger>
      <DialogContent className="eclipse-card max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-2xl gradient-text">
            <FileText className="w-6 h-6" />
            <span>{t.title}</span>
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-8">
            {/* General Rules */}
            <section>
              <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                <span>{sectionIcons.general}</span>
                <span>{t.sections.general}</span>
              </h3>
              <div className="space-y-2">
                {t.content.general.map((rule, index) => (
                  <div key={index} className="p-3 rounded-lg bg-secondary/30 text-sm">
                    {rule}
                  </div>
                ))}
              </div>
            </section>

            {/* Events & Rankings */}
            <section>
              <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                <span>{sectionIcons.events}</span>
                <span>{t.sections.events}</span>
              </h3>
              <div className="space-y-2">
                {t.content.events.map((rule, index) => (
                  <div key={index} className="p-3 rounded-lg bg-secondary/30 text-sm">
                    {rule}
                  </div>
                ))}
              </div>
            </section>

            {/* Shop & Lottery */}
            <section>
              <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                <span>{sectionIcons.shop}</span>
                <span>{t.sections.shop}</span>
              </h3>
              <div className="space-y-2">
                {t.content.shop.map((rule, index) => (
                  <div key={index} className="p-3 rounded-lg bg-secondary/30 text-sm">
                    {rule}
                  </div>
                ))}
              </div>
            </section>

            {/* Sanctions */}
            <section>
              <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                <span>{sectionIcons.sanctions}</span>
                <span>{t.sections.sanctions}</span>
              </h3>
              <div className="space-y-2">
                {t.content.sanctions.map((rule, index) => (
                  <div key={index} className="p-3 rounded-lg bg-secondary/30 text-sm">
                    {rule}
                  </div>
                ))}
              </div>
            </section>

            {/* Secret */}
            <section className="border-2 border-primary/30 rounded-xl p-6 bg-gradient-to-r from-primary/5 to-primary-glow/5">
              <h3 className="text-xl font-bold mb-4 flex items-center space-x-2 gradient-text">
                <span>{sectionIcons.secret}</span>
                <span>{t.sections.secret}</span>
              </h3>
              <div className="space-y-2">
                {t.content.secret.map((rule, index) => (
                  <div key={index} className="p-3 rounded-lg bg-primary/10 text-sm border border-primary/20">
                    {rule}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default RulesModal;