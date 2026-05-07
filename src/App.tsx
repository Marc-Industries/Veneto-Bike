/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Bike, 
  Calendar, 
  MapPin, 
  Clock, 
  ChevronRight, 
  CheckCircle2, 
  ArrowRight, 
  Camera, 
  Users, 
  Award, 
  Mail, 
  Navigation,
  Star,
  Map,
  ShieldCheck,
  Compass,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

// --- Types ---

interface ProgramDay {
  day: number;
  title: string;
  description: string;
  distance?: string;
  details: string[];
}

interface Place {
  name: string;
  description: string;
  image: string;
}

// --- Data ---

const PROGRAM: ProgramDay[] = [
  {
    day: 1,
    title: "Bassano del Grappa – Baza wyprawy",
    description: "Przyjazd do serca Veneto i zakwaterowanie u podnóża Alp.",
    details: ["Transfer z Polski do Bassano del Grappa", "Zakwaterowanie w hotelu i odprawa techniczna", "Powitalna kolacja w historycznym centrum"],
  },
  {
    day: 2,
    title: "Perła Wzgórz – Asolo",
    description: "Szlakiem Prosecco przez malownicze pagórki i winnice.",
    distance: "45 km",
    details: ["Podjazd do średniowiecznego Asolo", "Degustacja lokalnych specjałów w winnicy", "Nagrywanie pierwszych ujęć z trasy"],
  },
  {
    day: 3,
    title: "Treviso – Miasto Historii",
    description: "Szybka trasa wzdłuż rzeki w stronę kolebki Tiramisu.",
    distance: "60 km",
    details: ["Przejazd przez urokliwe kanały Treviso", "Pauza na Piazza dei Signori", "Analiza techniki jazdy i wieczorna integracja"],
  },
  {
    day: 4,
    title: "Woda i Historia – Venezia",
    description: "Magia laguny i wyjątkowe zakończenie dnia w sercu kanałów.",
    distance: "50 km",
    details: ["Dojazd rowerowy w okolice laguny", "Gra miejska w labiryncie weneckich uliczek", "Rejs łodzią po Canale Grande"],
  },
  {
    day: 5,
    title: "Serce Regionu – Wille Veneto",
    description: "Odkrywanie renesansowej architektury i ukrytych perełek.",
    distance: "55 km",
    details: ["Trasa śladem wille Palladiańskich", "Przejazd przez historyczne miasteczka regionu", "Regeneracja przed finałowym etapem"],
  },
  {
    day: 6,
    title: "Monte Grappa – Królewski Etap",
    description: "Legendarny podjazd i finałowe wyzwanie na szczycie.",
    distance: "30 km (górski)",
    details: ["Zdobądź szczyt Monte Grappa (1775 m)", "Opcjonalnie: Lot paralotnią dla chętnych", "Uroczysta kolacja pożegnalna"],
  },
  {
    day: 7,
    title: "Powrót do Polski",
    description: "Ostatnie espresso i bezpieczna podróż do domu.",
    details: ["Pakowanie sprzętu i rowerów", "Wspólne pamiątkowe zdjęcie grupy", "Transfer powrotny (Trasa do Polski)"],
  },
];

const PLACES: Place[] = [
  { name: "Bassano del Grappa", description: "Nasza baza u podnóża Alp, słynąca z historycznego drewnianego mostu i unikalnej atmosfery.", image: "https://www.veneto.info/wp-content/uploads/sites/114/bassano-del-grappa-hd.jpg" },
  { name: "Asolo", description: "Miasto stu horyzontów, perła architektury renesansowej położona na malowniczych wzgórzach.", image: "https://ita.travel/user/blogimg/leto/asolo_veneto_aerial-view.jpg" },
  { name: "Treviso", description: "Urokliwe kanały, historyczne mury i kolebka najsłynniejszego włoskiego deseru – tiramisu.", image: "https://italien.expert/wp-content/uploads/2025/03/Treviso-Venetien-Italien-Foto-%C2%A9-Italien.expert-by-Canva.com-9.jpg" },
  { name: "Venezia", description: "Jedno z najbardziej unikalnych miast świata. Finał trasy z rejsem łodzią po kanałach.", image: "https://www.beescover.com/wp-content/uploads/2020/03/cosa-vedere-a-venezia-1195x800.jpg" },
  { name: "Monte Grappa", description: "Monumentalny szczyt (1775 m n.p.m.) – święta góra kolarzy z panoramą sięgającą Adriatyku.", image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjb_Cc_gHpI4ibDX77N4UG_csmrdcwmxRiFF73LPPl1Yy59OZeUM9VkT8cwPKFIgrDPpTfc853BdGNkVM6HLd3QXAoURMqeJr7P_fXk614uwbv_SwNI-v6MrHBikevDp5jIUVpkf4bPFz6A/s1600/Montegrappa.jpg" },
];

const ATTRACTIONS = [
  { icon: Navigation, title: "Gra Miejska", desc: "Unikalne wyzwanie w labiryncie weneckich uliczek." },
  { icon: Camera, title: "Film z Wyprawy", desc: "Profesjonalnie zmontowana pamiątka dla każdego." },
  { icon: Zap, title: "Monte Grappa", desc: "Zdobądź szczyt i przełam własne bariery." },
  { icon: Users, title: "Integracja", desc: "Wieczory przy włoskim winie i sporcie." },
];

// --- Components ---

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="mb-12 text-center">
    {subtitle && <span className="text-accent-green font-display font-medium uppercase tracking-[0.2em] text-xs mb-2 block">{subtitle}</span>}
    <h2 className="text-4xl md:text-5xl font-bold text-primary-navy">{children}</h2>
    <div className="w-16 h-1 bg-accent-yellow mx-auto mt-4" />
  </div>
);

export default function App() {
  const [activeDay, setActiveDay] = useState(1);
  const [formData, setFormData] = useState({ name: '', surname: '', email: '', fitness: 'medium', message: '' });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-premium-white overflow-x-hidden selection:bg-accent-green/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-morphism px-6 py-4 flex justify-between items-center bg-primary-navy/90 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Bike className="text-accent-yellow w-8 h-8" />
          <span className="font-display font-bold text-white text-xl tracking-tight uppercase">Veneto Bike Adventure</span>
        </div>
        <div className="hidden md:flex gap-8 text-white/80 font-medium text-sm">
          {['O nas', 'Program', 'Trasy', 'Cennik', 'Kontakt'].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollTo(item.toLowerCase().replace(' ', '-'))}
              className="hover:text-accent-yellow transition-colors uppercase tracking-wider"
            >
              {item}
            </button>
          ))}
        </div>
        <button 
          onClick={() => scrollTo('kontakt')}
          className="bg-accent-green hover:bg-emerald-500 text-white px-6 py-2 rounded-full font-bold text-sm transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/20 uppercase"
        >
          Zarezerwuj
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&q=80&w=2670" 
            alt="Hero background" 
            className="w-full h-full object-cover scale-110 brightness-[0.5]"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent-green/20 backdrop-blur-sm border border-accent-green/30 text-accent-green font-bold text-xs mb-6 uppercase tracking-widest">
              Premium Cycling Experience 2026
            </span>
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
              Veneto<br />
              <span className="text-accent-yellow">Bike Adventure</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed mb-10">
              7 dni intensywnej wyprawy rowerowej przez serce północnych Włoch. 
              Sportowa pasja, luksusowe trasy i niezapomniane emocje.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
              <button 
                onClick={() => scrollTo('kontakt')}
                className="bg-accent-yellow text-primary-navy px-12 py-5 rounded-full font-black text-lg hover:shadow-2xl hover:shadow-yellow-500/30 transition-all transform hover:-translate-y-1 group uppercase flex items-center gap-3"
              >
                Zarezerwuj miejsce
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => scrollTo('program')}
                className="text-white border-2 border-white/30 px-12 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-primary-navy transition-all uppercase"
              >
                Zobacz program
              </button>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
          <Clock className="w-6 h-6" />
        </div>
      </section>

      {/* About Us */}
      <section id="o-nas" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 text-accent-green uppercase font-bold text-sm tracking-widest">
                <ShieldCheck className="w-5 h-5" />
                Organizatorzy i Wizja
              </div>
              <h2 className="text-5xl font-bold leading-tight">
                Profesjonalny projekt<br />
                <span className="text-slate-400">Sportowo-Turystyczny</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Veneto Bike Adventure to inicjatywa, która łączy miłość do kolarstwa z pasją do odkrywania nowych kultur. 
                Nasze wyprawy to nie tylko kilometry w nogach, ale przede wszystkim profesjonalna logistyka, 
                bezpieczeństwo i wspólnota ludzi o podobnych celach.
              </p>
              
              <div className="relative pt-8">
                <div className="absolute inset-0 bg-accent-yellow/10 blur-3xl rounded-full scale-110 -z-10" />
                <div className="rounded-[2rem] overflow-hidden shadow-xl border border-slate-100">
                  <img 
                    src="https://web.telegram.org/0439a276-eb4e-4a64-bcbc-8ad89bf96090" 
                    alt="Veneto Bike Team" 
                    className="w-full h-auto object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200" 
                  alt="Cyclist in action" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -top-8 -right-8 w-48 h-48 bg-accent-yellow/20 rounded-full blur-3xl z-0" />
              <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-accent-green/10 rounded-full blur-3xl z-0" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Program */}
      <section id="program" className="py-24 bg-primary-navy text-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle subtitle="7 Dni Przygody">Plan Wyprawy</SectionTitle>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {PROGRAM.map((item) => (
              <button
                key={item.day}
                onClick={() => setActiveDay(item.day)}
                className={cn(
                  "px-6 py-3 rounded-full font-bold text-sm transition-all uppercase tracking-widest",
                  activeDay === item.day 
                    ? "bg-accent-yellow text-primary-navy scale-110" 
                    : "bg-white/5 text-white/50 hover:bg-white/10"
                )}
              >
                Dzień {item.day}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDay}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <h3 className="text-4xl font-bold">{PROGRAM[activeDay - 1].title}</h3>
                  <p className="text-xl text-white/60 font-light italic">{PROGRAM[activeDay - 1].description}</p>
                  {PROGRAM[activeDay - 1].distance && (
                    <div className="inline-flex items-center gap-2 bg-accent-green/20 text-accent-green px-4 py-1 rounded-full text-sm font-bold">
                      <Navigation className="w-4 h-4" />
                      {PROGRAM[activeDay - 1].distance}
                    </div>
                  )}
                </div>

                <div className="grid gap-4">
                  {PROGRAM[activeDay - 1].details.map((detail, idx) => (
                    <div key={idx} className="flex items-center gap-4 bg-white/5 p-5 rounded-xl border border-white/10">
                      <div className="bg-accent-yellow/20 p-2 rounded-lg">
                        <CheckCircle2 className="text-accent-yellow w-5 h-5" />
                      </div>
                      <span className="text-lg">{detail}</span>
                    </div>
                  ))}
                </div>

                <div className="p-6 border border-white/10 rounded-2xl bg-white/5">
                  <h4 className="flex items-center gap-2 text-accent-yellow font-bold uppercase text-xs mb-4 tracking-widest">
                    <Clock className="w-4 h-4" /> Harmonogram dnia
                  </h4>
                  <ul className="grid grid-cols-2 gap-4 text-sm text-white/50">
                    <li>08:00 – Śniadanie</li>
                    <li>09:30 – Start trasy</li>
                    <li>13:30 – Obiad lokalny</li>
                    <li>19:00 – Wspólna kolacja</li>
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="relative">
              <div className="aspect-square rounded-[2rem] overflow-hidden">
                <img 
                  src={[
                    "https://www.veneto.info/wp-content/uploads/sites/114/bassano-del-grappa-hd.jpg",
                    "https://ita.travel/user/blogimg/leto/asolo_veneto_aerial-view.jpg",
                    "https://italien.expert/wp-content/uploads/2025/03/Treviso-Venetien-Italien-Foto-%C2%A9-Italien.expert-by-Canva.com-9.jpg",
                    "https://www.beescover.com/wp-content/uploads/2020/03/cosa-vedere-a-venezia-1195x800.jpg",
                    "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1200",
                    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjb_Cc_gHpI4ibDX77N4UG_csmrdcwmxRiFF73LPPl1Yy59OZeUM9VkT8cwPKFIgrDPpTfc853BdGNkVM6HLd3QXAoURMqeJr7P_fXk614uwbv_SwNI-v6MrHBikevDp5jIUVpkf4bPFz6A/s1600/Montegrappa.jpg",
                    "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&q=80&w=1200"
                  ][activeDay - 1]} 
                  alt="Route preview" 
                  className="w-full h-full object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary-navy via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Places & Routes */}
      <section id="trasy" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle subtitle="Region Veneto">Kluczowe Miejsca</SectionTitle>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PLACES.map((place, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200"
              >
                <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                  <img src={place.image} alt={place.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                </div>
                <div className="p-8">
                  <h4 className="text-2xl font-bold mb-3">{place.name}</h4>
                  <p className="text-slate-500 line-clamp-3 leading-relaxed">{place.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Attractions */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-primary-navy rounded-[3rem] p-10 md:p-16 text-white overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative z-10">
                <span className="text-accent-yellow font-bold uppercase tracking-widest text-xs mb-4 block">Coś więcej niż kolarstwo</span>
                <h2 className="text-5xl font-bold mb-8">Atrakcje i Integracja</h2>
                <div className="grid sm:grid-cols-2 gap-10">
                  {ATTRACTIONS.map((attr, idx) => (
                    <div key={idx} className="space-y-4">
                      <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                        <attr.icon className="text-accent-yellow w-6 h-6" />
                      </div>
                      <h4 className="text-xl font-bold">{attr.title}</h4>
                      <p className="text-white/50 text-sm">{attr.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hidden lg:block relative group">
                <div className="absolute inset-0 bg-accent-yellow/20 blur-3xl rounded-full scale-75 group-hover:scale-90 transition-transform duration-700" />
                <img 
                  src="https://i.ibb.co/V03H1V7j/Gemini-Generated-Image-xopmjxopmjxopmjx.png" 
                  alt="Atrakcje Veneto" 
                  className="relative z-10 w-full h-auto rounded-2xl shadow-2xl border border-white/10" 
                  referrerPolicy="no-referrer" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="cennik" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle subtitle="Wszystko w cenie">Koszt Wyprawy</SectionTitle>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-[2.5rem] p-12 shadow-2xl shadow-slate-200 border border-slate-100 flex flex-col md:flex-row items-center gap-16 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-accent-yellow" />
              <div className="md:w-1/2 space-y-6">
                <div>
                  <span className="text-accent-green font-bold text-xs uppercase tracking-widest bg-accent-green/10 px-4 py-1.5 rounded-full">Oferta Limitowana</span>
                  <div className="flex items-baseline gap-2 mt-4">
                    <span className="text-5xl font-black text-primary-navy">3500</span>
                    <span className="text-2xl font-bold text-slate-400">PLN</span>
                  </div>
                </div>
                <p className="text-slate-500 font-medium">Uczciwa cena za profesjonalnie przygotowaną wyprawę rowerową bez ukrytych kosztów.</p>
                <div className="flex items-center gap-2 text-primary-navy/40 font-bold uppercase text-[10px] tracking-wide bg-slate-50 border border-slate-100 p-4 rounded-xl">
                  <Users className="w-4 h-4" />
                  Max 20 uczestników
                </div>
              </div>
              <div className="md:w-1/2">
                <ul className="space-y-4">
                  {[
                    "Transport Polska–Włochy–Polska",
                    "6 noclegów w hotelu premium",
                    "Śniadania i kolacje (kuchnia regionalna)",
                    "Profesjonalny wynajem rowerów",
                    "Ubezpieczenie sportowe wysokiej klasy",
                    "Opieka 2 przewodników na trasie",
                    "Pełen program atrakcji i nagrania"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                      <div className="w-5 h-5 rounded-full bg-accent-green flex items-center justify-center shrink-0">
                        <CheckCircle2 className="text-white w-3 h-3" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle subtitle="Trasa Wyprawy">Gdzie Jedziemy?</SectionTitle>
          <div className="bg-slate-900 rounded-[2.5rem] h-[500px] relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-6 p-12">
                <div className="inline-flex gap-8 items-center text-white/50 font-display text-sm uppercase tracking-[0.3em]">
                  <span>Sucha Beskidzka</span>
                  <ArrowRight className="w-4 h-4 text-accent-yellow" />
                  <span className="text-white">Veneto (Włochy)</span>
                </div>
                <h3 className="text-4xl font-bold text-white max-w-xl mx-auto">Ponad 1200 km pasji łączącej dwa kraje</h3>
                <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-6 opacity-80">
                  <div className="text-center">
                    <div className="text-accent-yellow font-black text-2xl">Start</div>
                    <div className="text-white/40 text-xs uppercase">Sucha Beskidzka</div>
                  </div>
                  <div className="text-center">
                    <div className="text-accent-yellow font-black text-2xl">Baza</div>
                    <div className="text-white/40 text-xs uppercase">Bassano del Grappa</div>
                  </div>
                  <div className="text-center">
                    <div className="text-accent-yellow font-black text-2xl">Cześć I</div>
                    <div className="text-white/40 text-xs uppercase">Venice / Treviso</div>
                  </div>
                  <div className="text-center">
                    <div className="text-accent-yellow font-black text-2xl">Finał</div>
                    <div className="text-white/40 text-xs uppercase">Monte Grappa</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Simple Map Visualization */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
               <Map className="w-full h-full p-20" />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle subtitle="Wspomnienia i emocje">Galeria Wyprawy</SectionTitle>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {[
              "https://venetosegreto.com/wp-content/uploads/2023/05/treviso.webp",
              "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800",
              "https://www.montelloeprealpitrevigianedicorsa.run/wp-content/uploads/2021/04/IMG-20200516-WA0014.jpg",
              "https://permontagnepersentieri.wordpress.com/wp-content/uploads/2017/12/massiccio-del-grappa.jpg",
              "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800",
              "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=800",
            ].map((img, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="rounded-2xl overflow-hidden shadow-lg border border-white"
              >
                <img src={img} alt={`Gallery item ${idx}`} className="w-full hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Booking */}
      <section id="kontakt" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 -z-0 hidden lg:block" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20">
            <div className="space-y-12">
              <SectionTitle subtitle="Zacznij Przygodę">Zarezerwuj Miejsce</SectionTitle>
              <div className="space-y-8">
                <div className="flex gap-6 items-start">
                  <div className="w-14 h-14 bg-accent-yellow/10 rounded-2xl flex items-center justify-center shrink-0">
                    <Mail className="text-accent-yellow w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Masz pytania?</h4>
                    <p className="text-slate-500">Napisz do nas bezpośrednio na kontakt@venetobike.pl lub zadzwoń do organizatora.</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-14 h-14 bg-accent-green/10 rounded-2xl flex items-center justify-center shrink-0">
                    <Compass className="text-accent-green w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Nasza Baza</h4>
                    <p className="text-slate-500">Bassano del Grappa, Włochy<br />Spotykamy się w Suchej Beskidzkiej.</p>
                  </div>
                </div>
              </div>
            </div>

            <form className="bg-white p-10 rounded-[2rem] shadow-2xl border border-slate-100 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Imię</label>
                  <input type="text" className="w-full px-5 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-accent-green outline-none transition-all" placeholder="Twoje imię" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Nazwisko</label>
                  <input type="text" className="w-full px-5 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-accent-green outline-none transition-all" placeholder="Twoje nazwisko" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">E-mail</label>
                <input type="email" className="w-full px-5 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-accent-green outline-none transition-all" placeholder="twoj@email.com" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Poziom Kondycji</label>
                <select className="w-full px-5 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-accent-green outline-none transition-all appearance-none cursor-pointer">
                  <option value="beginner">Amator (do 30km dziennie)</option>
                  <option value="medium">Aktywny (50-70km dziennie)</option>
                  <option value="pro">Pro (ponad 70km i góry)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Wiadomość</label>
                <textarea className="w-full px-5 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-accent-green outline-none transition-all min-h-[120px]" placeholder="Opowiedz nam o swoim doświadczeniu..." />
              </div>
              <button className="w-full bg-primary-navy text-white py-6 rounded-xl font-bold uppercase tracking-widest hover:bg-slate-800 transition-all transform hover:scale-[1.02] active:scale-95 shadow-xl shadow-slate-900/10 mt-4">
                Wstępna rezerwacja
              </button>
              <p className="text-center text-[10px] text-slate-400 mt-4 uppercase font-medium">Przesłanie formularza nie stanowi wiążącej umowy.</p>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-navy text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 border-b border-white/10 pb-16">
            <div className="col-span-2">
               <div className="flex items-center gap-2 mb-6">
                <Bike className="text-accent-yellow w-10 h-10" />
                <span className="font-display font-black text-2xl uppercase">Veneto Bike Adventure</span>
              </div>
              <p className="text-white/40 max-w-sm leading-relaxed">
                Jesteśmy zespołem pasjonatów, którzy od lat organizują wyprawy łączące sportową rywalizację z turystycznym duchem odkrycia. Dołącz do nas w 2026 roku.
              </p>
            </div>
            <div>
              <h5 className="font-bold uppercase text-xs tracking-widest mb-6">Nawigacja</h5>
              <ul className="space-y-4 text-white/60">
                <li><button onClick={() => scrollTo('o-nas')} className="hover:text-accent-yellow transition-colors">O nas</button></li>
                <li><button onClick={() => scrollTo('program')} className="hover:text-accent-yellow transition-colors">Program</button></li>
                <li><button onClick={() => scrollTo('cennik')} className="hover:text-accent-yellow transition-colors">Cennik</button></li>
                <li><button onClick={() => scrollTo('kontakt')} className="hover:text-accent-yellow transition-colors">Rezerwacja</button></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold uppercase text-xs tracking-widest mb-6">Kontakt</h5>
              <div className="space-y-2 text-white/50 text-sm">
                <p>E-mail: kontakt@venetobike.pl</p>
                <p>Start: Sucha Beskidzka, PL</p>
                <p>Meta: Bassano del Grappa, IT</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center mt-10 gap-4">
            <p className="text-white/20 text-[10px] uppercase tracking-widest">© 2026 Veneto Bike Adventure. Wszelkie prawa zastrzeżone.</p>
            <div className="flex gap-6 opacity-30">
               <Camera className="w-5 h-5" />
               <Zap className="w-5 h-5" />
               <Award className="w-5 h-5" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
