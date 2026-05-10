import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { ChevronRight, ArrowRight, Camera, Mail, Check, Eye, UserMinus, Ghost, Menu, ArrowLeft } from 'lucide-react';
import { cn } from './utils';

// --- Components ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
      scrolled || !isHome ? "bg-[#FFFCF9]/90 backdrop-blur-md py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="font-serif text-xl md:text-2xl font-semibold tracking-tight group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          ENVIE<span className="font-light italic ml-1 text-rust transition-all group-hover:ml-2">Content Studio</span>
        </Link>
        
        <div className="hidden md:flex gap-8 items-center">
          {isHome ? (
            <>
              {['Problème', 'Offres', 'Autorité'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  className="text-sm uppercase tracking-widest font-bold hover:text-rust transition-colors"
                >
                  {item}
                </a>
              ))}
            </>
          ) : (
            <Link to="/" className="text-sm uppercase tracking-widest font-bold hover:text-rust transition-colors flex items-center gap-2">
              <ArrowLeft size={14} /> Retour
            </Link>
          )}
          <Link 
            to="/partenariat-studio"
            className="bg-[#3D0C11] text-[#FFFCF9] px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all animate-shine"
          >
            REPRENDRE LE CONTRÔLE
          </Link>
        </div>

        <button className="md:hidden text-[#3D0C11]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-[#FFFCF9] border-b border-[#3D0C11]/5 p-6 flex flex-col gap-6 md:hidden shadow-xl"
          >
            {isHome ? (
              ['Problème', 'Offres', 'Autorité'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg uppercase tracking-widest font-bold"
                >
                  {item}
                </a>
              ))
            ) : (
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-lg uppercase tracking-widest font-bold">Retour</Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Line */}
      {isHome && (
        <motion.div 
          className="absolute bottom-0 left-0 h-[2px] bg-rust origin-left z-[51]"
          style={{ scaleX: scrollYProgress, width: '100%' }}
        />
      )}
      
      {/* Visual divider */}
      {(scrolled || !isHome) && <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#3D0C11]/5" />}
    </nav>
  );
};

const RotatingText = () => {
  const items = ["des likes", "des vues", "rien", "zéro client"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[1.1em] overflow-hidden inline-block align-baseline lg:min-w-[450px] md:min-w-[380px] sm:min-w-[300px] min-w-[220px]">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-0 italic font-serif text-rust whitespace-nowrap"
        >
          {items[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center pt-24 px-6 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#FFFCF9] via-[#FFFCF9] to-[#F5E6E8] opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] aspect-square bg-rust/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-3xl md:text-8xl font-serif leading-tight mb-8">
            Ton Instagram te ramène <br />
            <RotatingText />
          </h1>
          
          <div className="space-y-6 mb-12">
            <p className="text-lg md:text-2xl font-light text-[#3D0C11]/70 max-w-2xl mx-auto leading-relaxed">
              Tu postes. Tu espères. <span className="text-[#3D0C11] font-bold italic underline decoration-rust">Tu échoues.</span>
            </p>
            <p className="text-base md:text-xl font-light text-[#3D0C11]/60 max-w-xl mx-auto italic">
              "Instagram n'est pas cassé. <br />
              C'est ta manière de le regarder qui l'est."
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto bg-[#3D0C11] text-[#FFFCF9] px-10 py-5 rounded-full text-base md:text-lg font-bold tracking-widest shadow-xl transition-all flex items-center justify-center gap-3 animate-shine"
              onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
            >
              REPRENDRE LE CONTRÔLE <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto border-2 border-[#3D0C11] text-[#3D0C11] px-10 py-5 rounded-full text-base md:text-lg font-bold tracking-widest hover:bg-[#3D0C11] hover:text-[#FFFCF9] transition-all"
              onClick={() => document.getElementById('offres')?.scrollIntoView({ behavior: 'smooth' })}
            >
              LE DIAGNOSTIC — 50€
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Problem = () => {
  const cards = [
    { icon: UserMinus, text: "Tu postes mais personne n’achète" },
    { icon: Eye, text: "Tu as des vues mais pas de clients" },
    { icon: Ghost, text: "Tu consommes du contenu mais tu n’avances pas" }
  ];

  return (
    <section id="probleme" className="py-20 md:py-32 px-6 bg-[#3D0C11] text-[#FFFCF9] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full max-w-[800px] aspect-square bg-[#A44A3F]/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-6xl font-serif mb-8 leading-tight"
            >
              Le regard business. <br />
              <span className="italic">Pas la cosmétique.</span>
            </motion.h2>
            
            <p className="text-lg md:text-2xl font-light text-[#FFFCF9]/70 leading-relaxed max-w-lg mb-8 md:mb-12">
              Tout le monde te bombarde de "hacks" et de tendances. Pendant ce temps, ton business stagne.
            </p>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-6 md:p-8 border border-[#FFFCF9]/10 bg-[#FFFCF9]/5 rounded-2xl backdrop-blur-sm"
            >
              <h3 className="text-xl md:text-2xl font-serif mb-4 italic">La vérité crue :</h3>
              <p className="text-base md:text-lg font-light text-[#FFFCF9]/80 leading-relaxed">
                "Instagram est un levier d'acquisition ultra-puissant, pas un carnet de notes. Si ça ne vend pas, c'est que ton système est obsolète."
              </p>
            </motion.div>
          </div>

          <div className="grid gap-4 md:gap-6">
            {cards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className="group flex items-center gap-5 md:gap-6 p-6 md:p-8 bg-[#FFFCF9]/5 border border-[#FFFCF9]/10 rounded-2xl md:rounded-3xl hover:bg-[#FFFCF9]/10 transition-all cursor-default"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-rust/20 flex items-center justify-center text-rust group-hover:scale-110 transition-transform flex-shrink-0">
                  <card.icon size={20} />
                </div>
                <span className="text-lg md:text-xl font-medium tracking-wide leading-tight">{card.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Offers = () => {
  const offers = [
    {
      title: "Le Diagnostic",
      price: "50€",
      description: "Le diagnostic stratégique de votre présence Instagram.",
      path: "/diagnostic"
    },
    {
      title: "La Session Boussole",
      price: "400€",
      description: "Le pivot stratégique. 90 minutes pour arrêter de pédaler.",
      path: "/session-boussole",
      popular: true
    },
    {
      title: "Le Partenariat Studio",
      price: "1000€/mois",
      description: "L'excellence embarquée. Je deviens ton bras droit stratégique.",
      path: "/partenariat-studio"
    }
  ];

  return (
    <section id="offres" className="py-20 md:py-32 px-6 bg-[#FFFCF9]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-24">
          <h2 className="text-3xl md:text-7xl font-serif mb-6">Le Système Envie</h2>
          <p className="text-sm md:text-xl text-[#3D0C11]/50 tracking-widest uppercase font-bold">Standard Luxe. Résultats Business.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {offers.map((offer, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "relative p-8 md:p-10 rounded-[32px] md:rounded-[40px] flex flex-col h-full transition-all duration-500",
                offer.popular 
                  ? "bg-[#3D0C11] text-[#FFFCF9] shadow-3xl z-10 scale-100 lg:scale-105" 
                  : "bg-white border border-[#3D0C11]/5 hover:border-rust/30 hover:shadow-xl"
              )}
            >
              <h3 className="text-2xl md:text-3xl font-serif mb-2 italic">{offer.title}</h3>
              <div className="text-2xl md:text-3xl font-sans font-bold mb-4 text-rust">{offer.price}</div>
              <p className={cn("text-base md:text-lg mb-8 leading-relaxed font-light", offer.popular ? "text-[#FFFCF9]/80" : "text-[#3D0C11]/60")}>
                {offer.description}
              </p>

              <div className="mt-auto">
                <Link to={offer.path} className={cn(
                  "inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase group",
                  offer.popular ? "text-rust hover:text-[#FFFCF9]" : "text-rust hover:text-[#3D0C11]"
                )}>
                  DÉCOUVRIR L'OFFRE <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Authority = () => {
  return (
    <section id="autorité" className="py-20 md:py-32 px-6 bg-[#F5E6E8]/30 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="md:col-span-12 lg:col-span-5 relative">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="aspect-[4/5] max-w-sm mx-auto lg:max-w-none bg-[#3D0C11] rounded-2xl md:rounded-3xl overflow-hidden relative group shadow-2xl"
            >
               <div className="w-full h-full flex items-center justify-center bg-rust/5 italic font-serif text-4xl text-rust opacity-20">
                 PHOTO @ENVIE
               </div>
               <img 
                 src="/fleur_faure.jpg" 
                 alt="Fleur Faure" 
                 className="absolute inset-0 w-full h-full object-contain transition-all duration-1000"
                 onError={(e) => (e.currentTarget.style.display = 'none')}
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#3D0C11] via-transparent to-transparent opacity-60" />
               
               <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
                  <h4 className="text-2xl md:text-3xl font-serif italic text-[#FFFCF9]">Fleur Faure.</h4>
                  <p className="text-[#FFFCF9]/60 text-xs md:text-sm tracking-widest uppercase font-bold mt-1">Founder @ Envie</p>
               </div>
            </motion.div>
          </div>

          <div className="md:col-span-12 lg:col-span-7 lg:pl-16 text-center lg:text-left">
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-5xl font-serif mb-8 md:mb-12 leading-tight">
                Ancienne cycliste professionnelle. <br />
                PMO Airbus Helicopters. <br />
                Co-CEO d’une marque pour restaurants étoilés.
              </h2>
              
              <div className="space-y-6 md:space-y-8 text-lg md:text-xl font-light text-[#3D0C11]/70 leading-relaxed">
                <p>
                  J’ai passé des années à avancer seule. À chercher la performance dans la rigueur absolue, puis dans la vision stratégique.
                  <span className="text-[#3D0C11] font-medium block mt-4 italic">“Personne pour pédaler à ma place.”</span>
                </p>
                <p>
                  Aujourd'hui, j'utilise cette exigence pour transformer des comptes Instagram en véritables leviers de croissance.
                  Pas de promesses creuses, pas de raccourcis. Juste un système clair, une exécution précise et un standard qui ne transige pas.
                </p>
              </div>

              <div className="mt-12 md:mt-16 flex flex-wrap justify-center lg:justify-start gap-8 md:gap-12 items-center">
                <div className="text-center">
                  <div className="text-2xl md:text-4xl font-serif text-rust leading-none">STRATÉGIE</div>
                  <div className="text-[10px] uppercase tracking-widest font-bold mt-2 opacity-50">Business First</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-4xl font-serif text-rust leading-none">SYSTÈME</div>
                  <div className="text-[10px] uppercase tracking-widest font-bold mt-2 opacity-50">Content Engine</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-4xl font-serif text-rust leading-none">LUXE</div>
                  <div className="text-[10px] uppercase tracking-widest font-bold mt-2 opacity-50">Standard Élevé</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CTAFinal = () => {
  return (
    <section id="cta" className="py-24 md:py-40 px-6 bg-[#3D0C11] text-[#FFFCF9] text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,_#A44A3F_0%,_transparent_50%)] opacity-30" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-8xl font-serif mb-10 md:mb-12 italic">
            Reprenez la main sur votre stratégie.
          </h2>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = "/partenariat-studio"}
            className="w-full sm:w-auto bg-[#FFFCF9] text-[#3D0C11] px-10 md:px-16 py-5 md:py-7 rounded-full text-lg md:text-2xl font-bold tracking-[0.2em] shadow-2xl hover:shadow-rust/20 transition-all mb-12 animate-shine"
          >
            REPRENDRE LE CONTRÔLE
          </motion.button>
          
          <div className="flex justify-center gap-8 md:gap-10">
            <a href="#" className="hover:text-rust transition-colors"><Camera /></a>
            <a href="#" className="hover:text-rust transition-colors"><Mail /></a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#FFFCF9] py-16 md:py-20 px-6 border-t border-[#3D0C11]/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <div className="font-serif text-2xl md:text-3xl font-semibold mb-2">ENVIE</div>
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-30">Content Studio © 2026</p>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-end gap-6 md:gap-8 text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold opacity-50">
            <a href="/legal.html" className="hover:opacity-100 transition-opacity">Mentions Légales</a>
            <a href="/privacy.html" className="hover:opacity-100 transition-opacity">Confidentialité</a>
            <a href="/cgv.html" className="hover:opacity-100 transition-opacity">CGV</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const CookieBanner = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) setTimeout(() => setShow(true), 2000);
  }, []);

  if (!show) return null;

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-sm z-[100] bg-[#3D0C11] text-[#FFFCF9] p-6 md:p-8 rounded-[24px] md:rounded-[32px] shadow-3xl border border-[#FFFCF9]/10"
    >
      <h4 className="font-serif text-lg md:text-xl mb-3">Expérience Premium</h4>
      <p className="text-[10px] md:text-xs font-light tracking-wide text-[#FFFCF9]/70 leading-relaxed mb-6">
        Nous utilisons des cookies pour sublimer votre navigation et comprendre comment vous interagissez avec notre studio.
      </p>
      <div className="flex gap-3 md:gap-4">
        <button 
          onClick={() => { localStorage.setItem('cookie-consent', 'true'); setShow(false); }}
          className="flex-1 bg-[#FFFCF9] text-[#3D0C11] py-3 rounded-full text-[9px] md:text-[10px] font-bold tracking-widest hover:bg-rust hover:text-[#FFFCF9] transition-all"
        >
          ACCEPTER
        </button>
        <button 
          onClick={() => setShow(false)}
          className="px-5 md:px-6 py-3 border border-[#FFFCF9]/20 rounded-full text-[9px] md:text-[10px] font-bold tracking-widest hover:bg-[#FFFCF9]/5"
        >
          REFUSER
        </button>
      </div>
    </motion.div>
  );
};

// --- Landing Page Components ---

const FormInput = ({ label, name, type = "text", required = true, placeholder }: any) => (
  <div className="flex flex-col gap-2 mb-6 text-left">
    <label htmlFor={name} className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#3D0C11]/40 ml-4">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      required={required}
      placeholder={placeholder}
      className="w-full bg-white border border-[#3D0C11]/5 rounded-full px-6 py-4 text-base focus:outline-none focus:border-rust transition-all placeholder:text-[#3D0C11]/20 font-light"
    />
  </div>
);

const FormTextArea = ({ label, name, required = true, placeholder }: any) => (
  <div className="flex flex-col gap-2 mb-6 text-left">
    <label htmlFor={name} className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#3D0C11]/40 ml-4">
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      required={required}
      placeholder={placeholder}
      rows={4}
      className="w-full bg-white border border-[#3D0C11]/5 rounded-[24px] px-6 py-4 text-base focus:outline-none focus:border-rust transition-all placeholder:text-[#3D0C11]/20 font-light resize-none"
    />
  </div>
);

const PremiumNetlifyForm = ({ name, fields, buttonText = "ENVOYER", successMessage = "C’est reçu." }: { name: string, fields: React.ReactNode, buttonText?: string, successMessage?: string }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });
      
      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="py-20 text-center"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 bg-rust/10 text-rust rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <Check size={40} />
        </motion.div>
        <h3 className="text-3xl md:text-5xl font-serif italic mb-4">{successMessage}</h3>
        <p className="text-[#3D0C11]/60 font-light italic">Nous revenons vers vous sous 48h.</p>
      </motion.div>
    );
  }

  return (
    <form 
      name={name}
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto"
    >
      <input type="hidden" name="form-name" value={name} />
      <p className="hidden">
        <label>Honeypot: <input name="bot-field" /></label>
      </p>
      
      {fields}
      
      <div className="mt-12">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={status === 'loading'}
          className={cn(
            "w-full bg-[#3D0C11] text-[#FFFCF9] py-5 rounded-full text-sm font-bold tracking-[0.3em] shadow-xl transition-all relative overflow-hidden flex justify-center items-center gap-3",
            status === 'loading' ? 'opacity-70 cursor-not-allowed' : 'animate-shine'
          )}
        >
          {status === 'loading' ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            buttonText
          )}
        </motion.button>
        
        {status === 'error' && (
          <p className="text-rust text-[10px] font-bold mt-4 tracking-widest text-center uppercase">Une erreur est survenue. Veuillez réessayer.</p>
        )}
      </div>
    </form>
  );
};

const LandingHero = ({ title, subtitle, kicker }: { title: React.ReactNode, subtitle: string, kicker: string }) => (
  <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl aspect-video bg-rust/5 blur-[120px] pointer-events-none" />
    <div className="max-w-7xl mx-auto text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-rust mb-6 block">{kicker}</span>
        <h1 className="text-4xl md:text-8xl font-serif leading-[1.1] mb-8 max-w-5xl mx-auto">
          {title}
        </h1>
        <p className="text-lg md:text-2xl font-light text-[#3D0C11]/60 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </motion.div>
    </div>
  </section>
);

const LandingProblem = ({ questions, text }: { questions: string[], text: string }) => (
  <section className="py-20 md:py-32 px-6 bg-[#3D0C11] text-[#FFFCF9]">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 md:gap-32 items-center">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-6xl font-serif mb-8 leading-tight italic">
          Pourquoi tu es <br /> encore là ?
        </h2>
        <div className="space-y-6">
          {questions.map((q, i) => (
            <div key={i} className="flex gap-4 items-start border-l border-rust/30 pl-6 py-2">
              <p className="text-lg md:text-xl font-light text-[#FFFCF9]/80 italic">"{q}"</p>
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="p-8 md:p-12 bg-[#FFFCF9]/5 border border-[#FFFCF9]/10 rounded-[40px] backdrop-blur-md"
      >
        <p className="text-xl md:text-3xl font-serif leading-relaxed mb-8">
          {text}
        </p>
        <div className="w-12 h-px bg-rust" />
      </motion.div>
    </div>
  </section>
);

const LandingGrid = ({ title, items, dark = false }: { title: string, items: any[], dark?: boolean }) => (
  <section className={cn("py-20 md:py-32 px-6", dark ? "bg-[#3D0C11] text-[#FFFCF9]" : "bg-[#FFFCF9] text-[#3D0C11]")}>
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-6xl font-serif mb-16 md:mb-24 text-center">{title}</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className={cn(
              "p-8 md:p-10 rounded-[32px] border transition-all duration-500",
              dark ? "bg-[#FFFCF9]/5 border-[#FFFCF9]/10 hover:bg-[#FFFCF9]/10" : "bg-white border-[#3D0C11]/5 hover:shadow-2xl"
            )}
          >
            <div className="text-rust text-xs font-bold tracking-widest uppercase mb-6">0{i+1} /</div>
            <h3 className="text-2xl md:text-3xl font-serif mb-4 italic">{item.title}</h3>
            <p className={cn("text-base md:text-lg font-light leading-relaxed", dark ? "text-[#FFFCF9]/60" : "text-[#3D0C11]/60")}>
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const LandingStandard = ({ title, text }: { title: string, text: string }) => (
  <section className="py-20 md:py-32 px-6 bg-[#F5E6E8]/30 overflow-hidden relative">
    <div className="absolute top-0 right-0 p-12 text-[15vw] font-serif italic text-rust/5 leading-none pointer-events-none select-none">standard.</div>
    <div className="max-w-4xl mx-auto text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="text-xs font-bold tracking-[0.4em] uppercase text-rust mb-8 block">NIVEAU D'EXIGENCE</span>
        <h2 className="text-3xl md:text-6xl font-serif mb-10 leading-tight">{title}</h2>
        <p className="text-lg md:text-2xl font-light text-[#3D0C11]/70 leading-relaxed italic">
          {text}
        </p>
      </motion.div>
    </div>
  </section>
);

const LandingCTA = ({ title, subtitle, buttonText, onClick }: { title: string, subtitle: string, buttonText: string, onClick?: () => void }) => (
  <section className="py-24 md:py-40 px-6 bg-[#3D0C11] text-[#FFFCF9] text-center relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_#A44A3F_0%,_transparent_50%)] opacity-20" />
    <div className="max-w-4xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-7xl font-serif mb-8 italic">{title}</h2>
        <p className="text-lg md:text-xl font-light text-[#FFFCF9]/60 mb-12 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClick}
          className="w-full sm:w-auto bg-[#FFFCF9] text-[#3D0C11] px-12 md:px-20 py-6 md:py-8 rounded-full text-xl md:text-2xl font-bold tracking-[0.2em] shadow-2xl transition-all animate-shine"
        >
          {buttonText}
        </motion.button>
      </motion.div>
    </div>
  </section>
);

// --- Page Implementations ---

const DiagnosticPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleOrder = () => {
    window.location.href = "https://buy.stripe.com/8x200j5lNdZdfL96Jydwc00";
  };

  return (
    <div className="bg-[#FFFCF9]">
      <LandingHero 
        kicker="DIAGNOSTIC STRATÉGIQUE"
        title={<>Votre Instagram est un actif <span className="italic">à auditer.</span></>}
        subtitle="Identification des points de friction, analyse de conversion et directives de repositionnement. Livré sous 48h."
      />
      
      <LandingProblem 
        questions={[
          "Je produis beaucoup mais le CA ne suit pas",
          "Pourquoi mes vues ne deviennent pas des clients ?",
          "Mon identité visuelle est soignée mais elle ne vend pas"
        ]}
        text="L'esthétique sans direction stratégique est un coût. Le Diagnostic est la première brique de votre système de conversion."
      />

      <LandingGrid 
        title="Le contenu du Diagnostic"
        items={[
          { title: "Structure & SEO", description: "Vérification des piliers de confiance. Votre profil doit servir de vitrine business immédiate." },
          { title: "Friction de Conversion", description: "Nous identifions précisément où vos prospects quittent le parcours client." },
          { title: "Directives PDF", description: "Votre plan d'action en 5 étapes clés. Des décisions à prendre dès maintenant." }
        ]}
      />

      <LandingStandard 
        title="La précision comme exigence."
        text="Je traite chaque audit avec une lucidité totale. Le luxe ici, c'est la netteté du diagnostic et la rapidité d'exécution."
      />

      <div id="form-section">
        <LandingCTA 
          title="Prêt pour le diagnostic ?"
          subtitle="Accédez à la plateforme de paiement sécurisée. Votre diagnostic sera prêt sous 48h."
          buttonText="COMMANDER LE DIAGNOSTIC — 50€"
          onClick={handleOrder}
        />
      </div>
    </div>
  );
};

const DiagnosticMerciPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="bg-[#FFFCF9] pt-32 pb-20 md:pt-48 md:pb-32 px-6">
      <div className="max-w-4xl mx-auto text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-20 h-20 bg-rust/10 text-rust rounded-full flex items-center justify-center mx-auto mb-10">
            <Check size={40} />
          </div>
          <h1 className="text-4xl md:text-7xl font-serif mb-6 italic">Paiement reçu.</h1>
          <p className="text-lg md:text-2xl font-light text-[#3D0C11]/60 mb-8 max-w-2xl mx-auto leading-relaxed italic">
            Votre diagnostic entre maintenant en phase d’analyse.
          </p>
          <p className="text-base md:text-xl font-light text-[#3D0C11]/50 italic">
            Le diagnostic sera livré sous 48h à l’adresse email renseignée lors du paiement.
          </p>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="max-w-xl mx-auto border-t border-[#3D0C11]/5 pt-20"
      >
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-serif mb-4 italic">Configurez votre diagnostic.</h2>
          <p className="text-[#3D0C11]/50 font-light italic">Ces informations permettront une analyse chirurgicale de votre compte.</p>
        </div>
        <PremiumNetlifyForm 
          name="diagnostic"
          buttonText="ENVOYER LES INFORMATIONS"
          fields={
            <>
              <FormInput label="Prénom" name="prenom" placeholder="Votre prénom" />
              <FormInput label="Email" name="email" type="email" placeholder="votre@email.com" />
              <FormInput label="Instagram" name="instagram" placeholder="@votre_compte" />
              <FormInput label="Activité" name="activite" placeholder="Votre secteur d'activité" />
              <FormTextArea label="Principal blocage" name="blocage" placeholder="Qu'est-ce qui vous empêche de vendre aujourd'hui ?" />
            </>
          }
        />
      </motion.div>
    </div>
  );
};

const SessionBoussolePage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="bg-[#FFFCF9]">
      <LandingHero 
        kicker="PIVOT STRATÉGIQUE"
        title={<>90 minutes pour reprendre la <span className="italic">direction.</span></>}
        subtitle="Une immersion stratégique pour déconstruire vos blocages et rebâtir un système d'acquisition sain."
      />

      <LandingProblem 
        questions={[
          "Je ne sais plus comment orienter mon contenu",
          "Mes offres manquent de clarté et de force",
          "Instagram me demande trop d'énergie pour peu de retour"
        ]}
        text="Pas besoin d'en faire plus. Il faut faire plus juste. La Session Boussole est le moment où vous reprenez le contrôle de votre narration business."
      />

      <LandingGrid 
        dark
        title="Levier par levier"
        items={[
          { title: "Simplification", description: "Nous éliminons le superflu. Vos offres sont recalibrées pour devenir évidentes pour votre cible." },
          { title: "Positionnement", description: "Nous trouvons votre angle d'autorité. Celui qui vous sort de la masse des coaching génériques." },
          { title: "Système de Vente", description: "Vous repartez avec une structure narrative claire pour transformer vos abonnés en clients." }
        ]}
      />

      <section className="py-20 md:py-40 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-[0.4em] uppercase text-rust mb-6 block">RÉSERVATION</span>
            <h2 className="text-3xl md:text-6xl font-serif mb-8 italic">Figer le pivot.</h2>
            <p className="text-[#3D0C11]/60 text-lg md:text-xl font-light italic max-w-xl mx-auto">
              Nous limitons les sessions à deux par semaine pour garantir une immersion et une lucidité maximale.
            </p>
          </div>
          <PremiumNetlifyForm 
            name="session-boussole"
            buttonText="RÉSERVER MA SESSION — 400€"
            fields={
              <>
                <div className="grid md:grid-cols-2 gap-x-6">
                  <FormInput label="Prénom" name="prenom" placeholder="Votre prénom" />
                  <FormInput label="Email" name="email" type="email" placeholder="votre@email.com" />
                </div>
                <FormInput label="Instagram" name="instagram" placeholder="@votre_compte" />
                <FormInput label="Activité" name="activite" placeholder="Quel est votre métier ?" />
                <FormInput label="CA Actuel" name="ca" placeholder="Chiffre d'affaires mensuel moyen" />
                <FormTextArea label="Objectif" name="objectif" placeholder="Quel est votre objectif principal dans 3 mois ?" />
                <FormTextArea label="Pourquoi maintenant ?" name="raison" placeholder="Quel est l'élément déclencheur de cet appel ?" />
              </>
            }
          />
        </div>
      </section>

      <LandingCTA 
        title="Une décision stratégique."
        subtitle="Le coût de l'inaction est souvent supérieur à celui d'une direction claire."
        buttonText="INITIER LE PIVOT — 400€"
        onClick={() => {
            document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />
    </div>
  );
};

const PartenariatStudioPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="bg-[#FFFCF9]">
      <LandingHero 
        kicker="PARTENARIAT EXCLUSIF"
        title={<>L'excellence <span className="italic">à vos côtés.</span></>}
        subtitle="Instagram devient un levier quand il est structuré comme un système stratégique. Pas un simple carnet de notes."
      />

      <LandingProblem 
        questions={[
          "Je veux déléguer mais sans perdre l'âme de ma marque",
          "Mes visuels sont corrects, mais ils manquent d'autorité stratégique",
          "Je n'ai plus le temps de piloter ma stratégie d'acquisition"
        ]}
        text="Instagram est une extension de votre cabinet ou de votre entreprise. Ce partenariat demande une synchronisation parfaite entre vision de marque et exécution business."
      />

      <LandingGrid 
        title="Direction & Exécution"
        items={[
          { title: "Pilotage Stratégique", description: "Je cadre et je valide la direction narrative de votre écosystème social mensuel." },
          { title: "Système de Contenu", description: "Mise en place d'une structure de production premium pour maintenir un standard haut." },
          { title: "Focus Autorité", description: "Nous ne cherchons pas le volume, mais la précision de l'impact sur vos prospects qualifiés." }
        ]}
      />

      <LandingStandard 
        title="Sélection stratégique."
        text="Le Partenariat Studio demande un vrai fit stratégique. Nous travaillons mieux quand le niveau d’exigence est clair et partagé dès le départ."
      />

      <section className="py-20 md:py-40 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-[0.4em] uppercase text-rust mb-6 block">CANDIDATURE</span>
            <h2 className="text-3xl md:text-6xl font-serif mb-8 italic">Postuler au Studio</h2>
            <p className="text-[#3D0C11]/60 text-lg md:text-xl font-light italic max-w-xl mx-auto">
              Si votre profil correspond aux standards du studio, nous fixerons un appel de qualification sous 48h.
            </p>
          </div>
          <PremiumNetlifyForm 
            name="partenariat-studio"
            buttonText="SOUMETTRE MA CANDIDATURE"
            fields={
              <>
                <div className="grid md:grid-cols-2 gap-x-6">
                  <FormInput label="Prénom" name="prenom" placeholder="Votre prénom" />
                  <FormInput label="Email" name="email" type="email" placeholder="votre@email.com" />
                </div>
                <FormInput label="Instagram" name="instagram" placeholder="@votre_compte" />
                <FormInput label="Entreprise" name="entreprise" placeholder="Nom de votre structure" />
                <FormInput label="Offre principale" name="offre" placeholder="Que vendez-vous ?" />
                <FormInput label="Budget Communication" name="budget" placeholder="Budget mensuel alloué" />
                <FormTextArea label="Problématique actuelle" name="problematique" placeholder="Quel est votre plus gros défi aujourd'hui ?" />
                <FormTextArea label="Pourquoi ENVIE ?" name="pourquoi_envie" placeholder="En quoi ce partenariat fait-il sens pour vous ?" />
              </>
            }
          />
        </div>
      </section>

      <LandingCTA 
        title="Le luxe, c'est la structure."
        subtitle="Reprenez la main sur votre image de marque et votre acquisition client."
        buttonText="REJOINDRE LE STUDIO"
        onClick={() => {
            document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />
    </div>
  );
};


const Home = () => (
  <>
    <Hero />
    <Problem />
    <Offers />
    <Authority />
    <CTAFinal />
  </>
);

export default function App() {
  return (
    <Router>
      <div className="relative selection:bg-rust selection:text-[#FFFCF9]">
        <div className="noise-overlay" />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/diagnostic" element={<DiagnosticPage />} />
            <Route path="/diagnostic-merci" element={<DiagnosticMerciPage />} />
            <Route path="/session-boussole" element={<SessionBoussolePage />} />
            <Route path="/partenariat-studio" element={<PartenariatStudioPage />} />
          </Routes>
        </main>
        <Footer />
        {/* Mobile Sticky CTA */}
        <AnimatePresence>
          <Routes>
            <Route path="/" element={
              <div className="md:hidden fixed bottom-6 left-6 right-6 z-50">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-[#3D0C11] text-[#FFFCF9] py-4 rounded-full text-sm font-bold tracking-[0.2em] shadow-2xl flex justify-center items-center gap-2 animate-shine"
                  onClick={() => {
                    window.location.href = "/diagnostic";
                  }}
                >
                  MON DIAGNOSTIC <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            } />
          </Routes>
        </AnimatePresence>
        <CookieBanner />
      </div>
    </Router>
  );
}
