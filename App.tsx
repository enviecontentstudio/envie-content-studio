
import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Target, 
  RefreshCcw,
  Plus
} from 'lucide-react';

// --- Constants ---
const PRIMARY_CTA_URL = "https://tally.so/r/XXXXXX";
const BRAND_NAME = "ENVIE CONTENT STUDIO";

const FAQ_DATA = [
  {
    q: "C’est quoi un audit gratuit ?",
    a: "C’est un appel de 15 minutes où nous analysons votre compte actuel, vos points de blocage et les opportunités immédiates pour transformer votre audience en clients."
  },
  {
    q: "En combien de temps je vois des résultats ?",
    a: "L'optimisation du profil et de la stratégie apporte une clarté immédiate. Les premiers leads qualifiés arrivent généralement entre le 1er et le 2ème mois de collaboration régulière."
  },
  {
    q: "Je dois fournir quoi ?",
    a: "Nous avons besoin de vos accès, de vos visuels bruts si vous en avez, et surtout de votre expertise métier. Nous nous occupons de tout le reste : stratégie, scripts, montage et publication."
  },
  {
    q: "Puis-je arrêter quand je veux ?",
    a: "Nos offres sont sans engagement après les 3 premiers mois (période nécessaire pour installer une stratégie solide). La flexibilité est au cœur de notre studio."
  },
  {
    q: "Vous gérez aussi la publicité ?",
    a: "Oui, via notre offre 'UGC & Ads'. Nous créons des contenus spécifiquement pensés pour convertir en publicité payante sur Instagram et TikTok."
  }
];

// --- Components ---

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 apple-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-bold tracking-tight text-lg uppercase">{BRAND_NAME}</span>
        <div className="hidden md:flex items-center gap-8">
          <a href="#offers" className="text-sm font-medium hover:text-violet-600 transition-colors">Offres</a>
          <a href="#process" className="text-sm font-medium hover:text-violet-600 transition-colors">Process</a>
          <a href={PRIMARY_CTA_URL} target="_blank" rel="noopener noreferrer" className="bg-black text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition-all active:scale-95">
            Audit Gratuit
          </a>
        </div>
      </div>
    </nav>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
          {BRAND_NAME}
        </h1>
        <p className="text-xl md:text-2xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          Instagram qui ramène des clients, pas juste des likes.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a 
            href={PRIMARY_CTA_URL} 
            className="w-full sm:w-auto bg-violet-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-violet-700 transition-all active:scale-95 shadow-lg shadow-violet-200"
          >
            Demander un audit gratuit
          </a>
          <a 
            href="#offers" 
            className="w-full sm:w-auto border border-gray-200 bg-white px-8 py-4 rounded-full text-lg font-semibold hover:border-gray-400 transition-all"
          >
            Voir les offres
          </a>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-gray-400 text-sm font-medium uppercase tracking-widest">
          <span>Process clair</span>
          <span className="hidden sm:inline">•</span>
          <span>Contenu qui convertit</span>
          <span className="hidden sm:inline">•</span>
          <span>Suivi mensuel</span>
        </div>
      </div>
    </section>
  );
};

const Problem: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 md:p-16 rounded-[2rem] shadow-sm">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Si ton Instagram…</h2>
          <ul className="space-y-6 mb-12">
            {[
              "Ne génère pas de messages",
              "Ne crée pas de réservations",
              "Te fait perdre du temps"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4 text-xl md:text-2xl text-gray-600">
                <span className="w-2 h-2 rounded-full bg-violet-500" />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-2xl md:text-3xl font-semibold text-violet-600 leading-tight">
            {BRAND_NAME} transforme ton compte en vrai outil business.
          </p>
        </div>
      </div>
    </section>
  );
};

const Benefits: React.FC = () => {
  const benefits = [
    {
      title: "Clarté",
      desc: "Un feed cohérent qui attire ton client idéal.",
      icon: <Target className="w-8 h-8 text-violet-600" />
    },
    {
      title: "Régularité",
      desc: "On gère le contenu. Tu valides.",
      icon: <RefreshCcw className="w-8 h-8 text-violet-600" />
    },
    {
      title: "Conversion",
      desc: "Des posts pensés pour faire passer à l’action.",
      icon: <Sparkles className="w-8 h-8 text-violet-600" />
    }
  ];

  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-3 gap-12">
        {benefits.map((benefit, i) => (
          <div key={i} className="space-y-4">
            <div className="mb-6">{benefit.icon}</div>
            <h3 className="text-2xl font-bold">{benefit.title}</h3>
            <p className="text-gray-500 text-lg leading-relaxed">{benefit.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const PricingCard: React.FC<{ 
  name: string; 
  price: string; 
  features: string[]; 
  popular?: boolean 
}> = ({ name, price, features, popular }) => {
  return (
    <div className={`relative p-8 rounded-[2rem] border transition-all ${popular ? 'border-violet-600 bg-white scale-105 z-10 shadow-xl' : 'border-gray-100 bg-white'}`}>
      {popular && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-violet-600 text-white text-xs font-bold uppercase tracking-widest py-1 px-4 rounded-full">
          Plus populaire
        </span>
      )}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2 uppercase tracking-tight">{name}</h3>
        <div className="text-3xl font-bold">{price}</div>
      </div>
      <ul className="space-y-4 mb-10">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-3 text-gray-600 text-sm leading-snug">
            <CheckCircle2 className="w-5 h-5 text-violet-500 shrink-0" />
            {f}
          </li>
        ))}
      </ul>
      <a 
        href={PRIMARY_CTA_URL}
        className={`block text-center py-4 px-6 rounded-full font-bold transition-all ${popular ? 'bg-violet-600 text-white hover:bg-violet-700' : 'bg-black text-white hover:bg-gray-800'}`}
      >
        Demander un audit gratuit
      </a>
    </div>
  );
};

const Offers: React.FC = () => {
  return (
    <section id="offers" className="py-24 px-6 bg-gray-50 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Investis dans ta croissance.</h2>
          <p className="text-gray-500 text-lg">Trois façons de collaborer avec {BRAND_NAME}.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 items-start">
          <PricingCard 
            name="Starter"
            price="490€ / mois"
            features={[
              "8 posts",
              "4 reels",
              "Stratégie de contenu",
              "Captions optimisées",
              "Recherche hashtags"
            ]}
          />
          <PricingCard 
            name="Growth"
            price="990€ / mois"
            popular={true}
            features={[
              "12–16 posts",
              "8 reels",
              "Stratégie avancée",
              "Reporting mensuel détaillé",
              "Optimisation continue",
              "Sourcing sons tendances"
            ]}
          />
          <PricingCard 
            name="UGC & Ads"
            price="dès 900€"
            features={[
              "Vidéos UGC haute qualité",
              "Contenus publicitaires",
              "Assets web sur mesure",
              "Landing pages conversion",
              "Scénarisation spécifique Ads"
            ]}
          />
        </div>
      </div>
    </section>
  );
};

const Transformation: React.FC = () => {
  return (
    <section className="py-24 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center tracking-tight">Avant / Après</h2>
      <div className="grid md:grid-cols-2 gap-px bg-gray-200 rounded-[2rem] overflow-hidden border border-gray-200 shadow-sm">
        <div className="bg-white p-10 md:p-12">
          <h3 className="text-lg font-bold uppercase text-gray-400 tracking-widest mb-8">Avant</h3>
          <ul className="space-y-6">
            {["Posts irréguliers", "Identité floue", "Peu de demandes"].map((item, i) => (
              <li key={i} className="flex items-center gap-4 text-lg text-gray-500 line-through decoration-gray-300">
                <Plus className="w-5 h-5 rotate-45 text-red-300 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-10 md:p-12 border-t md:border-t-0 md:border-l border-gray-100">
          <h3 className="text-lg font-bold uppercase text-violet-500 tracking-widest mb-8">Après</h3>
          <ul className="space-y-6">
            {["Feed cohérent", "Offre claire", "CTA et parcours client"].map((item, i) => (
              <li key={i} className="flex items-center gap-4 text-lg font-medium text-gray-900">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-8 text-center text-sm text-gray-400 italic">
        Les résultats varient selon le secteur et la régularité.
      </p>
    </section>
  );
};

const Process: React.FC = () => {
  const steps = [
    { title: "Audit", desc: "Analyse de tes forces et blocages." },
    { title: "Plan", desc: "Définition de la ligne éditoriale." },
    { title: "Production & optimisation", desc: "Création, post et analyse des KPIs." }
  ];

  return (
    <section id="process" className="py-24 px-6 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-16 tracking-tight">Le chemin vers la conversion.</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, i) => (
            <div key={i} className="relative group">
              <div className="text-6xl font-black text-white/10 mb-6 group-hover:text-violet-500 transition-colors duration-500">
                0{i + 1}
              </div>
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-gray-400 text-lg leading-relaxed">{step.desc}</p>
              {i < steps.length - 1 && (
                <ArrowRight className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 text-gray-700 w-8 h-8" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 max-w-3xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center tracking-tight">Questions fréquentes</h2>
      <div className="space-y-4">
        {FAQ_DATA.map((item, i) => (
          <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden">
            <button 
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-lg pr-4">{item.q}</span>
              {openIndex === i ? <ChevronUp className="shrink-0" /> : <ChevronDown className="shrink-0" />}
            </button>
            {openIndex === i && (
              <div className="p-6 pt-0 text-gray-500 leading-relaxed border-t border-gray-50 bg-gray-50/30">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="py-20 px-6 border-t border-gray-100">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="space-y-4 max-w-xs">
          <span className="font-bold uppercase tracking-tight text-xl">{BRAND_NAME}</span>
          <p className="text-gray-500 text-sm leading-relaxed">
            Un studio de création dédié aux entreprises ambitieuses qui veulent transformer leur Instagram en moteur de croissance.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-12 md:gap-24">
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-gray-400">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>Audit gratuit</li>
              <li>Gestion mensuelle</li>
              <li>Production UGC</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-gray-400">Social</h4>
            <ul className="space-y-2 text-sm">
              <li>Instagram</li>
              <li>TikTok</li>
              <li>LinkedIn</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-gray-50 text-center md:text-left">
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} {BRAND_NAME}. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

const FinalCTA: React.FC = () => {
  return (
    <section className="py-32 px-6 bg-violet-50">
      <div className="max-w-3xl mx-auto text-center space-y-10">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
          Prête à transformer ton Instagram en clients ?
        </h2>
        <a 
          href={PRIMARY_CTA_URL}
          className="inline-block bg-black text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-gray-800 transition-all active:scale-95 shadow-xl shadow-gray-200"
        >
          Demander mon audit gratuit
        </a>
      </div>
    </section>
  );
};

const StickyCTA: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after 500px scroll
      setVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="md:hidden fixed bottom-6 left-6 right-6 z-[100] animate-in fade-in slide-in-from-bottom-4 duration-500">
      <a 
        href={PRIMARY_CTA_URL}
        className="block w-full text-center bg-violet-600 text-white py-4 px-6 rounded-2xl font-bold shadow-2xl shadow-violet-500/30 active:scale-95 transition-all"
      >
        Demander mon audit gratuit
      </a>
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Problem />
      <Benefits />
      <Offers />
      <Transformation />
      <Process />
      <FAQ />
      <FinalCTA />
      <Footer />
      <StickyCTA />
    </div>
  );
}
