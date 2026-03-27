'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Utensils, 
  Calendar, 
  MapPin, 
  Phone, 
  Clock, 
  Instagram, 
  Facebook, 
  ChevronRight, 
  Star,
  Tag,
  Beer,
  Menu as MenuIcon,
  X,
  Leaf
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

// --- Mock Data ---
const MENU_ITEMS: MenuItem[] = [
  { id: '1', name: 'Vitlöksbrod', description: 'Vitlöksbröd med ost & örter.', price: 65, category: 'Forratter', image: '/Website/vitlok.jpg' },
  { id: '2', name: 'Carciofi Fritti', description: 'Panerade & friterade kronärtskockor, serveras med rostad paprikaaioli, pesto & parmesan.', price: 125, category: 'Forratter', image: '/Website/carciofi.jpg' },
  { id: '3', name: 'Bosco Arancini', description: 'Friterade risottobollar (3st) med karljohansvamp & champinjoner, serveras med tryffelcrème & parmesan.', price: 135, category: 'Forratter', image: '/Website/bosco.jpg' },
  { id: '4', name: 'Charkbricka', description: 'Ett urval av italienska charkuterier. Marinerad kronärtskocka, rostad paprika marinerade oliver & grissini.', price: 175, category: 'Forratter', image: '/Website/chark.avif' },
  { id: '5', name: 'Bruschetta', description: 'Rostat hembakt surdegsbröd med tomater, vitlök, olivolja, chili & basilika.', price: 85, category: 'Forratter', image: '/Website/bruschetta.jpeg' },
  { id: '6', name: 'Insalata Caprese', description: 'Tomat & buffelmozzarella med olivolja, svartpeppar & basilika.', price: 125, category: 'Forratter', image: '/Website/caprese.jpg' },
  { id: '7', name: 'Calamari Fritti', description: 'Små fina bläckfiskringar mjölade & friterade. Serveras med rostad paprikaaioli & citron.', price: 145, category: 'Forratter', image: '/Website/calamari.jpg' },
  { id: '8', name: 'Funghi Trifolati', description: 'Champinjoner frästa i olivolja, vitlök, chili, vitt vin & persilja.', price: 95, category: 'Forratter', image: '/Website/funghi' },
  
  { id: '9', name: 'Zingara Linguine (stark)', description: 'Bacon stekt i chili, olivolja, vitlök, basilika & oregano som sedan sjuder i vår tomatsås. Toppas med riven pecorino.', price: 189, category: 'Pasta', image: '/Website/zingara.avif' },
  { id: '10', name: 'La casa bianca Fettuccine', description: 'Rökt skinka, champinjoner, vitlök, chili, vitt vin, vår tomatsås & grädde. Toppas med riven parmesan.', price: 179, category: 'Pasta', image: '/Website/casa.jpg' },
  { id: '11', name: 'Ventriciana Penne (stark)', description: 'Stark salami, chili, vitlök, vår tomatsås & rostad paprika. Toppas med riven parmesan.', price: 185, category: 'Pasta', image: '/Website/ventriciana.jpg' },
  { id: '12', name: 'Alfredo con pollo Fettuccine', description: 'En krämig parmesansås med vitlök, lök, svartpeppar, grädde, champinjoner & kycklingfile. Toppas med riven parmesan & basilika.', price: 185, category: 'Pasta', image: '/Website/alfredo.jpg' },
  { id: '13', name: 'Fileto di manzo Penne', description: 'Oxfilé, champinjoner, lök, vitlök, rostad paprika, kalvfond & grädde. Toppas med riven parmesan & basilika.', price: 245, category: 'Pasta', image: '/Website/fileto.webp' },
  { id: '14', name: 'Salsiccia nduja Penne', description: 'Salsiccia, Nduja, rostad lök, vitlök, paprikavitvinssås. Toppas med ruccola & riven pecorino.', price: 185, category: 'Pasta', image: '/Website/salsiccianduja.jpg?v=2' },
  { id: '15', name: 'Bolognese guancia Fettuccine', description: 'En klassisk bolognese gjord på oxkind, san marzano tomater, färska örter, lök, vitlök, selleri, morot & rött vin. Toppas med riven parmesan & basilika.', price: 185, category: 'Pasta', image: '/Website/bolognese.jpg?v=2' },
  { id: '16', name: 'Cannelloni', description: 'Karljohansvamp, ricotta, grädde & san marzano tomater. Gratineras med mozzarella. Toppas med ruccola & riven parmesan.', price: 189, category: 'Pasta', image: '/Website/cannelloni.avif' },
  { id: '17', name: 'Nduja al cozze Linguine', description: 'Nduja, blåmusslor, lök, vitlök, vitt vin, vår tomatsås & persilja. Toppas med pangrattato.', price: 189, category: 'Pasta', image: '/Website/ndujacozze.jpg' },
  { id: '18', name: 'Frutti di Mare Linguine', description: 'Handskalade räkor, blåmusslor, bläckfisk, vitt vin, vitlök, persilja & vår tomatsås. Toppas med pangrattato.', price: 198, category: 'Pasta', image: '/Website/frutti.jpg' },
  { id: '19', name: 'Mare Russo al vodka Penne (stark)', description: 'Handskalade räkor, vår tomatsås, grädde, chili, parmesan & vodka. Toppas med pangrattato.', price: 198, category: 'Pasta', image: '/Website/marerusso.webp' },

  { id: '20', name: 'Marinara', description: 'Förmodligen den första pizzan i världen, ett bevis på att less is more. San marzano tomater med färska örter, olivolja, tunt hyvlad vitlök, confiterade tomater, basilika. Toppas generöst med pecorino.', price: 155, category: 'Pizza', image: '/Website/marinara.webp?v=2' },
  { id: '21', name: 'Margareta', description: 'San marzano tomater med färska örter, fior di latte, västerbottenSost, basilika & olivolja.', price: 165, category: 'Pizza', image: '/Website/margareta.webp' },
  { id: '22', name: 'Capricciosa', description: 'San marzano tomater med färska örter, fior di latte, skinka, champinjoner, kronärtskocka, oliver, olivolja, svartpeppar & basilika.', price: 185, category: 'Pizza', image: '/Website/capricciosa.jpg' },
  { id: '23', name: 'Salsiccia', description: 'San marzano tomater med färska örter, fior di latte, västerbottensost, salsiccia & karamelliserad lök. Toppas med confiterade tomater & basilikapesto.', price: 185, category: 'Pizza', image: '/Website/salsiccia.jpg' },
  { id: '24', name: 'Diavola (hot as hell)', description: 'San marzano tomater med färska örter, fior di latte, salami picante. Toppas med färsk jalapeno, chiliflakes & chiliolja.', price: 195, category: 'Pizza', image: '/Website/diavola.jpg' },
  { id: '25', name: 'Prosciutto di Parma', description: 'San marzano tomater med färska örter, fior di latte & västerbottensost. Toppas med parmaskinka, ruccola, parmesan, olivolja & svartpeppar.', price: 205, category: 'Pizza', image: '/Website/parma.jpg' },
  { id: '26', name: 'Pancetta & Bacon', description: 'San marzano tomater med färska örter, fior di latte, västerbottensost & pancetta. Toppas med sötstark bacon-chilisylt, färsk jalapeno & basilika.', price: 195, category: 'Pizza', image: '/Website/pancetta.jpg?v=2' },
  { id: '27', name: 'Calzonish', description: 'Pizzadegen bakas dubbel med olivolja & fior di latte. Fylls sedan med tomater, ruccola, skivad prosciutto cotto, salami ventricina, mortadella, buffelmozzarella, olivolja & svartpeppar samt riven parmesan.', price: 185, category: 'Pizza', image: '/Website/calzonish.jpg' },
  { id: '28', name: 'Geting (stark)', description: 'Creme fraiche, fior di latte, parmesan, salami ventricina, nduja. Toppas med chilihonung, rosmarin, timjan & picklad rödlök.', price: 189, category: 'Pizza', image: '/Website/geting.jpg?v=2' },
  { id: '29', name: 'Mortadella Bronte', description: 'Pistagecreme med creme fraiche, fior di latte. Toppas med mortadella, rostade pistagenötter, buffelmozzarella, olivolja & basilika.', price: 195, category: 'Pizza', image: '/Website/mortadella.jpg' },
  { id: '30', name: 'Gamberetti', description: 'Creme fraiche, fior di latte, västerbottensost. Toppas med handskalade räkor, vitlöksolja, persilja & citron.', price: 195, category: 'Pizza', image: '/Website/gamberetti.webp' },
  { id: '31', name: 'Ostdröm', description: 'Creme fraiche, parmesan, fior di latte, gorgonzola & västerbottensost. Toppas med riven parmesan.', price: 185, category: 'Pizza', image: '/Website/ostrdrom.jpg' },
  { id: '32', name: 'Caesar', description: 'Creme fraiche, fior di latte, parmesan, kycklingfilé rostad med vitlök, rosmarin & svartpeppar. Toppas med krispig sallad, picklad rödlök, caesardressing & riven parmesan.', price: 185, category: 'Pizza', image: '/Website/caesar.webp' },
  { id: '33', name: 'Barbabietola Chevre', description: 'Creme fraiche, fior di latte, rostade rödbetor & chevre. Toppas med ruccola, svartpeppar, balsamicoglaze & smörpoppade pumpakärnor.', price: 195, category: 'Pizza', image: '/Website/barbabietola.jpg' },
  { id: '34', name: 'Tartufo', description: 'Tryffelkräm, fior di latte, västerbottenssost & potatis. Toppas med färska champinjoner, vispat tryffel- parmesansmör, honung & färsk rosmarin.', price: 215, category: 'Pizza', image: '/Website/tartufo.jpg' },
  { id: '35', name: 'Prosciutto di parma Fikon', description: 'Creme fraiche, fior di latte & västerbottensost. Toppas med fikonmarmelad, parmaskinka, radiccio sallad, poppade solroskärnor & riven pecorino.', price: 205, category: 'Pizza', image: '/Website/fikon.png' },
  
  { id: '36', name: 'Caesarsallad', description: 'Romansallad, lök, paprika, kyckling, krutonger & bacon, Serveras med parmesan & caesardressing.', price: 185, category: 'Sallad / dips', image: '/Website/caesarsallad.avif' },
  { id: '37', name: 'Räksallad', description: 'Romansallad, tomater, rostad paprika, lök, oliver, handskalade räkor, citron, dill & balsamico dressing.', price: 195, category: 'Sallad / dips', image: '/Website/raksallad.jpg' },
  { id: '38', name: 'Tomatsås', description: 'Krämig dipp med smak av svart tryffel.', price: 35, category: 'Sallad / dips', image: '/Website/marinaradip.jpg' },
  { id: '39', name: 'Caesardressing', description: 'Klassisk vitlöksdipp gjord på färsk vitlök & örter.', price: 35, category: 'Sallad / dips', image: '/Website/caesardip.jpg' },
  { id: '40', name: 'Rostad paprikaaioli', description: 'Hemgjord basilikapesto med pinjenötter & parmesan.', price: 35, category: 'Sallad / dips', image: '/Website/paprikaaioli.webp' },
  { id: '41', name: 'Tryffelmajonnäs', description: 'Krämig dipp med smak av svart tryffel.', price: 35, category: 'Sallad / dips', image: '/Website/tryffelmayo.jpg' },
  { id: '42', name: 'Salt karamellsås', description: 'Klassisk vitlöksdipp gjord på färsk vitlök & örter.', price: 35, category: 'Sallad / dips', image: '/Website/saltkaramell.jpg' },
  { id: '43', name: 'Chokladfudge', description: 'Hemgjord basilikapesto med pinjenötter & parmesan.', price: 35, category: 'Sallad / dips', image: '/Website/fudge.jpg' },
  { id: '44', name: 'Chilihonung', description: 'Hemgjord basilikapesto med pinjenötter & parmesan.', price: 35, category: 'Sallad / dips', image: '/Website/chilihonung.jpg' },

  { id: '45', name: 'Biscoffspread & Nutella Calzone', description: 'Fylld med biscoffspread & nutella, Toppas med salt karamellsås, chokladfudge, pärlsocker, florsocker & pistagenötter.', price: 175, category: 'Dolci', image: '/Website/biscoff.jpg?v=2' },
  { id: '46', name: 'Cinnabon Pizza', description: 'Smör vispat med mascarpone, vanilj, crème fraîche, socker, kanel & kardemumma. Toppas med cream cheese frosting & salt karamellsås.', price: 175, category: 'Dolci', image: '/Website/cinnabon.webp' },
  { id: '47', name: 'Tiramisu', description: 'Vår variant av den klassiska desserten. ”Pigga upp mig”.', price: 95, category: 'Dolci', image: '/Website/tiramijpgpng' },
  { id: '48', name: 'Mörk chokladmousse', description: 'Mörk chokladmousse med olivolja, flingsalt & pistagenötter.', price: 95, category: 'Dolci', image: '/Website/chokladmousse.webp' },
  { id: '49', name: 'Vaniljglass', description: 'Vaniljglass, serveras med chokladfudge.', price: 75, category: 'Dolci', image: '/Website/vaniljglass.jpg' },
  { id: '50', name: 'Chokladtryffel', description: 'Med chili & salt.', price: 45, category: 'Dolci', image: '/Website/chokladtryffel.jpg' },
  { id: '51', name: 'Till Papa ❤️', description: 'Dubbel espresso, 3 cl Don papa rom & Chokladtryffel med chili & salt.', price: 165, category: 'Dolci', image: '/Website/tillpapa.jpg' },
  { id: '52', name: 'Äppelpaj', description: 'Smaksatt med kanel, citron, nejlika & kardemumma. Serveras ljummen med en kula vaniljglass.', price: 95, category: 'Dolci', image: '/Website/appelpaj.jpg' },
];

const CATEGORIES = ['Forratter', 'Pasta', 'Pizza', 'Sallad / dips', 'Dolci'];

// --- Components ---

const Navbar = ({ onScrollTo }: { onScrollTo: (id: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Meny', id: 'menu', key: 'nav-menu' },
    { name: 'Om', id: 'about', key: 'nav-about' },
    { name: 'Avhämtning', id: 'takeaway', key: 'nav-takeaway' },
    { name: 'Bokning', id: 'reservations', key: 'nav-booking' },
    { name: 'Kontakt', id: 'contact', key: 'nav-contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-brand-ink/95 backdrop-blur-lg py-4 shadow-2xl border-b border-white/5' : 'bg-brand-ink/20 backdrop-blur-sm py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <button 
          onClick={() => onScrollTo('hero')} 
          className="text-2xl md:text-3xl font-serif italic text-brand-cream tracking-tighter drop-shadow-md transition-all duration-300 hover:bg-gradient-to-r hover:from-[#008C45] hover:via-[#F4F5F0] hover:to-[#CD212A] hover:bg-clip-text hover:text-transparent"
        >
          L&apos;Osteria Cavallo Nero
        </button>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map(link => (
            <button 
              key={link.key} 
              onClick={() => onScrollTo(link.id)}
              className="text-sm uppercase tracking-widest text-brand-cream font-bold transition-all duration-300 drop-shadow-sm hover:bg-gradient-to-r hover:from-[#008C45] hover:via-[#F4F5F0] hover:to-[#CD212A] hover:bg-clip-text hover:text-transparent"
            >
              {link.name}
            </button>
          ))}
          <button 
            onClick={() => onScrollTo('reservations')}
            className="bg-brand-gold text-brand-ink px-8 py-2.5 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white transition-all shadow-lg"
          >
            Boka Nu
          </button>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <button onClick={() => setIsMobileMenuOpen(true)} className="text-brand-cream">
            <MenuIcon size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-brand-ink z-[60] flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-2xl font-serif italic text-brand-cream transition-all duration-300 hover:bg-gradient-to-r hover:from-[#008C45] hover:via-[#F4F5F0] hover:to-[#CD212A] hover:bg-clip-text hover:text-transparent">L&apos;Osteria Cavallo Nero</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-brand-cream"><X size={32} /></button>
            </div>
            <div className="flex flex-col gap-8">
              {navLinks.map(link => (
                <button 
                  key={link.key} 
                  onClick={() => { onScrollTo(link.id); setIsMobileMenuOpen(false); }}
                  className="text-3xl font-serif text-brand-cream text-left transition-all duration-300 hover:bg-gradient-to-r hover:from-[#008C45] hover:via-[#F4F5F0] hover:to-[#CD212A] hover:bg-clip-text hover:text-transparent"
                >
                  {link.name}
                </button>
              ))}
              <button 
                onClick={() => { onScrollTo('reservations'); setIsMobileMenuOpen(false); }}
                className="bg-brand-gold text-brand-ink py-4 rounded-xl font-bold uppercase tracking-widest text-center mt-4"
              >
                Book a Table
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default function Page() {
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [dateError, setDateError] = useState<string | null>(null);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '17:00',
    guests: '2 Personer',
    occasion: ''
  });

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) {
      setBookingData({ ...bookingData, date: '' });
      setDateError(null);
      return;
    }

    // Date strings from input are YYYY-MM-DD. 
    // Creating a Date object from this string can sometimes shift the day due to timezone.
    // We split and use UTC to be safe.
    const [year, month, day] = value.split('-').map(Number);
    const selectedDate = new Date(Date.UTC(year, month - 1, day));
    const dayOfWeek = selectedDate.getUTCDay(); // 0=Sun, 1=Mon, 2=Tue...

    if (dayOfWeek === 1 || dayOfWeek === 2) {
      setDateError("Vi har stängt måndagar & tisdagar");
      setBookingData({ ...bookingData, date: '' });
    } else {
      setDateError(null);
      setBookingData({ ...bookingData, date: value });
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStatus('loading');

    try {
      const response = await fetch('https://formspree.io/f/xykbyjgr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        setBookingStatus('success');
        setBookingData({
          name: '',
          email: '',
          phone: '',
          date: '',
          time: '17:00',
          guests: '2 Personer',
          occasion: ''
        });
      } else {
        setBookingStatus('error');
      }
    } catch (error) {
      console.error('Formspree error:', error);
      setBookingStatus('error');
    }
  };

  const [activeCategory, setActiveCategory] = useState('Forratter');

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-brand-cream min-h-screen selection:bg-brand-gold selection:text-brand-ink">
      <Navbar 
        onScrollTo={scrollTo}
      />

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/Website/main.webp" 
            alt="Restaurant Interior" 
            fill
            className="object-cover scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-ink/40 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-ink/60" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12 bg-brand-gold/50" />
              <span className="text-brand-gold uppercase tracking-[0.4em] text-xs font-bold block">Etablerat 2025 • Svinninge</span>
              <div className="h-px w-12 bg-brand-gold/50" />
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-brand-cream italic leading-tight mb-8 drop-shadow-2xl">
              L&apos;Arte della <br /> <span className="text-brand-gold not-italic">Cucina</span> Italiana
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => scrollTo('reservations')}
                className="w-full md:w-auto bg-brand-gold text-brand-ink px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white transition-all shadow-xl"
              >
                Boka Bord
              </button>
              <button 
                onClick={() => scrollTo('menu')}
                className="w-full md:w-auto border border-brand-cream/30 backdrop-blur-md text-brand-cream px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-brand-cream hover:text-brand-ink transition-all"
              >
                Se Meny
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-brand-cream opacity-50"
        >
          <div className="w-px h-12 bg-brand-cream mx-auto mb-2" />
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        </motion.div>

        {/* Italian Flag Line */}
        <div className="absolute bottom-0 left-0 w-full h-1 flex border-y border-brand-ink/40">
          <div className="flex-1 bg-[#008C45]" />
          <div className="flex-1 bg-[#F4F5F0]" />
          <div className="flex-1 bg-[#CD212A]" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-40 px-6 relative bg-marble">
        <div className="absolute top-0 left-0 w-full h-full bg-brand-cream/80 pointer-events-none" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-stretch relative z-10">
          <div className="relative min-h-[400px] lg:min-h-full">
            {/* Italian Flag Outline */}
            <div className="absolute inset-0 -m-[3px] rounded-[calc(1.5rem+3px)] bg-gradient-to-r from-[#008C45] via-[#F4F5F0] to-[#CD212A] z-0" />
            <Image 
              src="/Website/thomas%20stefan.png" 
              alt="Stefan Ekeberg och Thomas Steinwender" 
              fill
              className="rounded-3xl shadow-2xl relative z-10 object-cover contrast-[1.05] brightness-[1.02] saturate-[1.05]"
            />
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-brand-olive/10 rounded-full blur-3xl -z-0" />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl -z-0" />
          </div>
          <div className="space-y-8 flex flex-col justify-center">
            <div className="flex items-center gap-3">
              <Leaf className="text-brand-olive" size={18} />
              <span className="text-brand-olive uppercase tracking-widest text-xs font-bold">Vår Historia</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-serif leading-tight">En passion för smaker, <br /> <span className="italic text-brand-balsamic">rotad i tradition.</span></h2>
            <p className="text-lg text-brand-ink/70 leading-relaxed font-light">
              Grundat i hjärtat av Svinninge 2025 av Stefan Ekeberg och Thomas Steinwender, är L&apos;Osteria Cavallo Nero mer än bara en restaurang—det är en hyllning till den italienska livsstilen. Vi hämtar våra ingredienser från småskaliga italienska producenter och lokala ekologiska gårdar för att säkerställa att varje tugga berättar en historia om kvalitet och passion.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div className="border-l-2 border-brand-gold/30 pl-6">
                <p className="text-4xl font-serif text-brand-olive mb-1">20+</p>
                <p className="text-[10px] uppercase tracking-widest font-bold opacity-50">Years of Excellence</p>
              </div>
              <div className="border-l-2 border-brand-gold/30 pl-6">
                <p className="text-4xl font-serif text-brand-olive mb-1">100%</p>
                <p className="text-[10px] uppercase tracking-widest font-bold opacity-50">kvalitetsingredienser</p>
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <a 
                href="https://www.instagram.com/osteria_cavallo_nero/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white shadow-lg hover:scale-110 transition-all duration-300"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://www.facebook.com/p/Losteria-cavallo-NERO-61570226656925/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full flex items-center justify-center bg-[#1877F2] text-white shadow-lg hover:scale-110 transition-all duration-300"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Italian Flag Line */}
        <div className="absolute bottom-0 left-0 w-full h-1 flex border-y border-brand-ink/40">
          <div className="flex-1 bg-[#008C45]" />
          <div className="flex-1 bg-[#F4F5F0]" />
          <div className="flex-1 bg-[#CD212A]" />
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 bg-tile relative">
        <div className="absolute inset-0 bg-white/90 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-8 bg-brand-gold" />
              <span className="text-brand-gold uppercase tracking-widest text-xs font-bold">La Carta</span>
              <div className="h-px w-8 bg-brand-gold" />
            </div>
            <h2 className="text-5xl md:text-6xl font-serif mb-6 italic">Explore the Menu</h2>
            <div className="flex flex-wrap justify-center gap-4 md:gap-10">
              {CATEGORIES.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs uppercase tracking-[0.2em] font-bold pb-2 transition-all border-b-2 ${activeCategory === cat ? 'border-brand-balsamic text-brand-balsamic' : 'border-transparent text-brand-ink/30 hover:text-brand-ink'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <AnimatePresence mode="wait">
              {MENU_ITEMS.filter(item => item.category === activeCategory).map(item => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  whileHover={{ y: -10 }}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-2xl aspect-[4/5] mb-6 shadow-lg transition-all duration-500 group-hover:shadow-2xl border border-brand-ink/5">
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="flex justify-between items-baseline mb-3 border-b border-brand-ink/10 pb-2">
                    <h3 className="text-xl font-serif group-hover:text-brand-balsamic transition-colors">{item.name}</h3>
                    <span className="font-serif text-brand-balsamic font-bold">{item.price}:-</span>
                  </div>
                  <p className="text-sm text-brand-ink/50 leading-relaxed italic font-light">{item.description}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Italian Flag Line */}
        <div className="absolute bottom-0 left-0 w-full h-1 flex border-y border-brand-ink/40">
          <div className="flex-1 bg-[#008C45]" />
          <div className="flex-1 bg-[#F4F5F0]" />
          <div className="flex-1 bg-[#CD212A]" />
        </div>
      </section>

      {/* Weekly Offers Section */}
      <section className="py-24 bg-brand-cream border-y border-brand-ink/5 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-brand-olive uppercase tracking-widest text-xs font-bold mb-4 block">Veckans Erbjudanden</span>
            <h2 className="text-4xl md:text-5xl font-serif">Något speciellt varje dag</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Wednesday Pizzabuffet */}
            <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-brand-ink/5 flex flex-col items-center text-center space-y-6 hover:shadow-xl transition-all duration-500">
              <div className="w-16 h-16 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                <Utensils size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-serif mb-2">Pizzabuffé</h3>
                <p className="text-sm text-brand-ink/60 leading-relaxed italic mb-4">
                  Varje onsdag dukar vi upp vår populära pizzabuffé med våra 4 mest sålda pizzor.
                </p>
                <div className="space-y-1">
                  <p className="font-bold text-lg">Vuxen: 165 kr</p>
                  <p className="font-bold text-lg">Barn: 75 kr</p>
                </div>
              </div>
            </div>

            {/* Takeaway Deal */}
            <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-brand-ink/5 flex flex-col items-center text-center space-y-6 hover:shadow-xl transition-all duration-500">
              <div className="w-16 h-16 rounded-2xl bg-brand-olive/10 flex items-center justify-center text-brand-olive">
                <Tag size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-serif mb-2">Takeaway Deal</h3>
                <p className="text-sm text-brand-ink/60 leading-relaxed italic mb-4">
                  Gör vardagen lite godare på onsdagar och torsdagar.
                </p>
                <p className="text-xl font-bold text-brand-olive uppercase tracking-widest">Köp 4 betala för 3</p>
                <p className="text-xs opacity-40 mt-2">Gäller vid avhämtning av pizza.</p>
              </div>
            </div>

            {/* Friday Fredagsöl */}
            <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-brand-ink/5 flex flex-col items-center text-center space-y-6 hover:shadow-xl transition-all duration-500">
              <div className="w-16 h-16 rounded-2xl bg-brand-ink/5 flex items-center justify-center text-brand-ink">
                <Beer size={32} className="text-brand-gold" />
              </div>
              <div>
                <h3 className="text-2xl font-serif mb-2">Fredagsöl</h3>
                <p className="text-sm text-brand-ink/60 leading-relaxed italic mb-4">
                  Fira in helgen hos oss med en kall Falcon på fat.
                </p>
                <p className="text-3xl font-serif text-brand-ink">49 kr</p>
                <p className="text-xs uppercase tracking-widest opacity-50 mt-2">Varje fredag</p>
              </div>
            </div>
          </div>
        </div>

        {/* Italian Flag Line */}
        <div className="absolute bottom-0 left-0 w-full h-1 flex border-y border-brand-ink/40">
          <div className="flex-1 bg-[#008C45]" />
          <div className="flex-1 bg-[#F4F5F0]" />
          <div className="flex-1 bg-[#CD212A]" />
        </div>
      </section>

      {/* Takeaway Section */}
      <section id="takeaway" className="py-24 px-6 bg-tile relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-cream/95 pointer-events-none" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-brand-gold" />
              <span className="text-brand-gold uppercase tracking-widest text-xs font-bold block">Asporto</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif">Njut av L&apos;Osteria <br /> <span className="italic text-brand-balsamic">hemma hos dig.</span></h2>
            <p className="text-brand-ink/70 text-lg leading-relaxed max-w-xl font-light">
              Vi erbjuder avhämtning på hela vår meny. För att beställa, vänligen ring oss. Betalning sker via Swish och vi påbörjar din beställning först efter mottagen betalning.
            </p>
            
            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-brand-balsamic/10 flex items-center justify-center text-brand-balsamic group-hover:bg-brand-balsamic group-hover:text-brand-cream transition-all">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest opacity-50 mb-1">Ring oss</p>
                  <a href="tel:0760056643" className="text-2xl font-serif hover:text-brand-balsamic transition-colors">076-005 66 43</a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-brand-gold/10 blur-3xl rounded-full opacity-50"></div>
            <div className="relative bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl border border-brand-ink/5 text-center space-y-6">
              <p className="text-sm uppercase tracking-widest font-bold text-brand-ink/40">Skanna för att betala</p>
              <div className="relative aspect-square max-w-[300px] mx-auto bg-brand-cream rounded-2xl overflow-hidden flex items-center justify-center p-4 border-2 border-dashed border-brand-ink/10">
                <Image 
                  src="/Website/swish.webp" 
                  alt="Swish QR Code" 
                  fill
                  className="object-contain p-4"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="pt-4">
                <p className="text-2xl font-serif italic">Swish</p>
                <p className="text-xs opacity-50 mt-1">Enkelt. Snabbt. Säkert.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Italian Flag Line */}
        <div className="absolute bottom-0 left-0 w-full h-1 flex border-y border-brand-ink/40">
          <div className="flex-1 bg-[#008C45]" />
          <div className="flex-1 bg-[#F4F5F0]" />
          <div className="flex-1 bg-[#CD212A]" />
        </div>
      </section>

      {/* Reservations Section */}
      <section id="reservations" className="py-24 md:py-40 bg-brand-ink text-brand-cream overflow-hidden relative" style={{ colorScheme: 'dark' }}>
        <div className="absolute inset-0 bg-marble opacity-5 pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
          <Image 
            src="https://images.unsplash.com/photo-1550966842-2849a220276c?auto=format&fit=crop&w=1000&q=80" 
            alt="Table Setting" 
            fill
            className="object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-brand-gold" />
              <span className="text-brand-gold uppercase tracking-widest text-xs font-bold block">Prenotazioni</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif mb-12">Säkra ditt bord <br /> <span className="italic text-brand-gold">för en oförglömlig kväll.</span></h2>
            
            {bookingStatus === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-brand-gold/10 border border-brand-gold/20 p-8 rounded-2xl text-center"
              >
                <div className="w-16 h-16 bg-brand-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="text-brand-ink" size={32} />
                </div>
                <h3 className="text-3xl font-serif mb-4 text-brand-gold">Tack för din bokning!</h3>
                <p className="text-brand-cream/70 leading-relaxed max-w-md mx-auto">
                  Vi har mottagit din förfrågan och kommer att skicka en bekräftelse till din e-post inom kort. Vi ser fram emot att välkomna dig!
                </p>
                <button 
                  onClick={() => setBookingStatus('idle')}
                  className="mt-8 text-brand-gold font-bold uppercase tracking-widest text-xs hover:text-white transition-colors"
                >
                  Gör en ny bokning
                </button>
              </motion.div>
            ) : (
              <form className="space-y-6" onSubmit={handleBookingSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest opacity-50">Namn</label>
                    <input 
                      required
                      type="text" 
                      name="name"
                      value={bookingData.name}
                      onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                      placeholder="Ditt fullständiga namn"
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-brand-gold outline-none transition-colors" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest opacity-50">Telefon</label>
                    <input 
                      required
                      type="tel" 
                      name="phone"
                      value={bookingData.phone}
                      onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                      placeholder="070-000 00 00"
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-brand-gold outline-none transition-colors" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest opacity-50">E-post</label>
                  <input 
                    required
                    type="email" 
                    name="email"
                    value={bookingData.email}
                    onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                    placeholder="din.email@exempel.se"
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-brand-gold outline-none transition-colors" 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest opacity-50">Datum</label>
                    <input 
                      required
                      type="date" 
                      name="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={bookingData.date}
                      onChange={handleDateChange}
                      className={`w-full bg-white/5 border ${dateError ? 'border-red-500' : 'border-white/10'} rounded-xl p-4 focus:border-brand-gold outline-none transition-colors`} 
                    />
                    {dateError && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest">{dateError}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest opacity-50">Tid</label>
                    <select 
                      name="time"
                      value={bookingData.time}
                      onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-brand-gold outline-none transition-colors appearance-none"
                    >
                      <option className="bg-brand-ink text-brand-cream">17:00</option>
                      <option className="bg-brand-ink text-brand-cream">19:00</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest opacity-50">Antal gäster</label>
                    <select 
                      name="guests"
                      value={bookingData.guests}
                      onChange={(e) => setBookingData({ ...bookingData, guests: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-brand-gold outline-none transition-colors appearance-none"
                    >
                      <option className="bg-brand-ink text-brand-cream">2 Personer</option>
                      <option className="bg-brand-ink text-brand-cream">4 Personer</option>
                      <option className="bg-brand-ink text-brand-cream">6 Personer</option>
                      <option className="bg-brand-ink text-brand-cream">8+ Personer</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest opacity-50">Speciellt tillfälle (Valfritt)</label>
                  <input 
                    type="text" 
                    name="occasion"
                    value={bookingData.occasion}
                    onChange={(e) => setBookingData({ ...bookingData, occasion: e.target.value })}
                    placeholder="Jubileum, födelsedag, etc." 
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-brand-gold outline-none transition-colors" 
                  />
                </div>
                <button 
                  type="submit"
                  disabled={bookingStatus === 'loading'}
                  className="w-full bg-brand-gold text-brand-ink py-5 rounded-xl font-bold uppercase tracking-widest hover:bg-brand-cream transition-all shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {bookingStatus === 'loading' ? 'Skickar...' : 'Boka Bord'}
                </button>
                {bookingStatus === 'error' && (
                  <p className="text-red-500 text-center text-sm font-bold">Något gick fel. Försök igen senare eller ring oss.</p>
                )}
                <div className="mt-6 p-4 bg-brand-olive border border-brand-olive rounded-xl text-center">
                  <p className="text-xs font-bold text-brand-cream uppercase tracking-widest">För sällskap större än 10 personer, vänligen ring oss direkt.</p>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Italian Flag Line */}
        <div className="absolute bottom-0 left-0 w-full h-1 flex border-y border-brand-ink/40">
          <div className="flex-1 bg-[#008C45]" />
          <div className="flex-1 bg-[#F4F5F0]" />
          <div className="flex-1 bg-[#CD212A]" />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-6">
            <div className="p-4 bg-brand-olive/5 rounded-2xl inline-block text-brand-olive">
              <MapPin size={24} />
            </div>
            <h4 className="text-2xl font-serif">Plats</h4>
            <p className="text-brand-ink/60 leading-relaxed">
              Hästängsuddsvägen 2C, <br />
              184 94 Åkersberga
            </p>
            <a 
              href="https://www.google.com/maps/search/?api=1&query=Hästängsuddsvägen+2C,+184+94+Åkersberga"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-gold text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all"
            >
              Hitta hit <ChevronRight size={14} />
            </a>
          </div>

          <div className="space-y-6">
            <div className="p-4 bg-brand-olive/5 rounded-2xl inline-block text-brand-olive">
              <Clock size={24} />
            </div>
            <h4 className="text-2xl font-serif">Öppettider</h4>
            <div className="text-brand-ink/60 space-y-1">
              <div className="flex justify-between">
                <span>Mån - Tis</span>
                <span>Stängt</span>
              </div>
              <div className="flex justify-between">
                <span>Ons, Tor, Sön</span>
                <span>17:00 - 21:00</span>
              </div>
              <div className="flex justify-between">
                <span>Fre, Lör</span>
                <span>17:00 - 22:00</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-4 bg-brand-olive/5 rounded-2xl inline-block text-brand-olive">
              <Phone size={24} />
            </div>
            <h4 className="text-2xl font-serif">Kontakt</h4>
            <div className="text-brand-ink/60 space-y-1">
              <a href="tel:0760056643" className="block hover:text-brand-gold transition-colors">076-005 66 43</a>
              <a href="mailto:thomas@losteriacavallonero.se" className="block hover:text-brand-gold transition-colors underline underline-offset-4">thomas@losteriacavallonero.se</a>
            </div>
            <div className="flex gap-4 pt-2">
              <a 
                href="https://www.instagram.com/osteria_cavallo_nero/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white shadow-md hover:scale-110 transition-all duration-300"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://www.facebook.com/p/Losteria-cavallo-NERO-61570226656925/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-[#1877F2] text-white shadow-md hover:scale-110 transition-all duration-300"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>
        </div>
        
        {/* Italian Flag Line above footer */}
        <div className="absolute bottom-0 left-0 w-full h-1 flex border-y border-brand-ink/40">
          <div className="flex-1 bg-[#008C45]" />
          <div className="flex-1 bg-[#F4F5F0]" />
          <div className="flex-1 bg-[#CD212A]" />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-ink text-brand-cream/40 py-12 px-6 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <span className="text-2xl font-serif italic text-brand-cream mb-2 block transition-all duration-300 hover:bg-gradient-to-r hover:from-[#008C45] hover:via-[#F4F5F0] hover:to-[#CD212A] hover:bg-clip-text hover:text-transparent">L&apos;Osteria Cavallo Nero</span>
            <p className="text-xs uppercase tracking-widest">© 2026 L&apos;Osteria Cavallo Nero. Alla rättigheter förbehållna.</p>
          </div>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest font-bold">
            <button className="transition-all duration-300 hover:bg-gradient-to-r hover:from-[#008C45] hover:via-[#F4F5F0] hover:to-[#CD212A] hover:bg-clip-text hover:text-transparent">Integritetspolicy</button>
            <button className="transition-all duration-300 hover:bg-gradient-to-r hover:from-[#008C45] hover:via-[#F4F5F0] hover:to-[#CD212A] hover:bg-clip-text hover:text-transparent">Användarvillkor</button>
            <button className="transition-all duration-300 hover:bg-gradient-to-r hover:from-[#008C45] hover:via-[#F4F5F0] hover:to-[#CD212A] hover:bg-clip-text hover:text-transparent">Tillgänglighet</button>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-brand-ink/90 backdrop-blur-lg border-t border-white/10 p-4 flex gap-4 z-40">
        <button 
          onClick={() => scrollTo('reservations')}
          className="flex-1 bg-brand-gold text-brand-ink py-4 rounded-xl font-bold uppercase tracking-widest text-xs"
        >
          Boka
        </button>
      </div>
    </div>
  );
}
