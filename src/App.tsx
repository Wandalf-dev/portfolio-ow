import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Menu, 
  X, 
  Code, 
  Database, 
  Terminal, 
  ExternalLink, 
  Cpu, 
  Layers, 
  Send
} from 'lucide-react';
import { 
  FaReact, FaVuejs, FaBootstrap, FaHtml5, FaCss3Alt, FaPhp, FaNodeJs, FaPython, 
  FaGitAlt, FaFigma, FaLinux, FaTrello, FaTasks, FaFilm 
} from 'react-icons/fa';
import { 
  SiTypescript, SiTailwindcss, SiMysql, SiPostgresql, SiVercel, SiFilezilla, SiJavascript 
} from 'react-icons/si';
import axios from 'axios';

// --- UTILS ---

// Composant icône personnalisé pour avoir le slash bien visible : </>
const CodeSlashIcon = ({ size = 24, className = "", strokeWidth = 2.5 }: { size?: number; className?: string; strokeWidth?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth={strokeWidth} 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
    <line x1="13.5" y1="3" x2="10.5" y2="21" />
  </svg>
);

// Composant utilitaire pour l'animation d'apparition au scroll
// Simple et réutilisable pour n'importe quelle section
interface RevealOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const RevealOnScroll = ({ children, delay = 0, className = "" }: RevealOnScrollProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Se déclenche quand l'élément est visible à 10%
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // On arrête d'observer une fois affiché (animation unique)
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      // L'état isVisible contrôle l'opacité et la position Y
      className={`transition-all duration-700 ease-out transform ${className} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Composant pour l'arrière-plan étoilé (statique et léger)
const StarBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
    {/* Fond sombre profond */}
    <div className="absolute inset-0 bg-[#050814]"></div>
    
    {/* Dégradé radial subtil pour simuler une nébuleuse lointaine */}
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-900/10 rounded-full blur-[120px]"></div>
    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-900/10 rounded-full blur-[120px]"></div>

    {/* Étoiles générées via SVG pour la légèreté */}
    <svg className="absolute inset-0 w-full h-full opacity-30">
      <pattern id="stars" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
        <circle cx="10" cy="10" r="1" fill="white" opacity="0.5"/>
        <circle cx="50" cy="80" r="1.5" fill="white" opacity="0.3"/>
        <circle cx="120" cy="40" r="1" fill="white" opacity="0.6"/>
        <circle cx="160" cy="140" r="0.8" fill="white" opacity="0.4"/>
        <circle cx="190" cy="10" r="1.2" fill="white" opacity="0.5"/>
      </pattern>
      <rect width="100%" height="100%" fill="url(#stars)" />
    </svg>
  </div>
);

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await axios.post('http://localhost:3001/api/send-email', {
        name: formData.name,
        email: formData.email,
        message: formData.message
      });
      
      if (response.data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Gestion du scroll pour le header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', href: '#home' },
    { name: 'Projets', href: '#projects' },
    { name: 'Compétences', href: '#skills' },
    { name: 'À propos', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="min-h-screen text-slate-300 font-sans selection:bg-orange-500/30 selection:text-orange-200 relative overflow-x-hidden">
      <StarBackground />

      {/* --- HEADER --- */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
          scrolled 
            ? 'bg-[#050814]/90 backdrop-blur-md border-white/5 py-3 md:py-4 shadow-lg shadow-orange-900/5' 
            : 'bg-transparent border-transparent py-4 md:py-6'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 max-w-6xl flex justify-between items-center">
          <div className="text-xl md:text-2xl font-bold tracking-tighter text-white flex items-center gap-2 group cursor-pointer">
            <span className="group-hover:text-orange-400 transition-colors">PortFolio.</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium text-slate-400 hover:text-orange-400 transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-slate-300 hover:text-orange-400 transition-transform active:scale-90 p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#0b0e1a]/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-6 shadow-2xl overflow-hidden">
            {navLinks.map((link, index) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-xl font-medium text-slate-300 hover:text-orange-400 pl-4 border-l-2 border-transparent hover:border-orange-500 transition-all py-1 transform opacity-0 animate-[slideInFromLeft_0.3s_ease-out_forwards]"
                style={{ animationDelay: `${index * 80}ms` }}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </header>

      <main className="relative z-10">
        
        {/* --- HERO SECTION --- */}
        <section id="home" className="min-h-screen flex flex-col justify-center pt-24 pb-12 md:pt-20 md:pb-10 container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <RevealOnScroll className="space-y-8 md:space-y-10 order-2 md:order-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs md:text-sm font-medium hover:bg-orange-500/20 transition-colors cursor-default mx-auto md:mx-0">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                Disponible pour des missions
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight">
                Développeur <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-600">Full-Stack</span>
              </h1>
              
              <p className="text-base md:text-lg text-slate-400 max-w-lg leading-relaxed mx-auto md:mx-0">
                Je conçois des expériences numériques robustes et élégantes.
                À la frontière entre l'ingénierie logicielle et le design interactif.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a href="#contact" className="px-8 py-3 bg-orange-600 hover:bg-orange-500 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-[0_0_25px_rgba(234,88,12,0.4)] hover:-translate-y-1 active:translate-y-0 text-center">
                  Me contacter
                </a>
                <a href="#projects" className="px-8 py-3 border border-slate-700 hover:border-orange-500 text-slate-300 hover:text-orange-400 font-medium rounded-lg transition-all duration-300 hover:bg-orange-500/10 hover:-translate-y-1 active:translate-y-0 text-center">
                  Voir mes projets
                </a>
              </div>
            </RevealOnScroll>

            {/* Visual Illustration - Dev Sun */}
            <RevealOnScroll delay={200} className="flex justify-center items-center relative order-1 md:order-2 -mt-8 md:mt-0 pb-12 md:pb-0">
               {/* Background Atmosphere Glow */}
               <div className="absolute w-64 md:w-80 h-64 md:h-80 bg-orange-600/20 blur-[100px] rounded-full animate-pulse"></div>
               
               {/* Outer Orbit Ring */}
               <div className="absolute w-[280px] md:w-96 h-[280px] md:h-96 border border-white/5 rounded-full animate-[spin_30s_linear_infinite]">
                  {/* Tiny Satellite */}
                  <div className="absolute top-1/2 -right-1.5 w-3 h-3 bg-slate-400 rounded-full"></div>
               </div>

               {/* Inner Orbit Ring */}
               <div className="absolute w-56 md:w-72 h-56 md:h-72 border border-orange-500/20 rounded-full animate-[spin_20s_linear_infinite_reverse]">
                  {/* Orbiting Electron/Planet */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-orange-400 rounded-full shadow-[0_0_15px_rgba(251,146,60,0.8)]"></div>
               </div>
               
               {/* The Sun / Core */}
               <div className="relative w-32 md:w-48 h-32 md:h-48 rounded-full flex items-center justify-center group">
                 {/* Sun Body with Gradient */}
                 <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-orange-600 to-red-700 rounded-full shadow-[0_0_50px_rgba(234,88,12,0.5)] animate-pulse"></div>
                 
                 {/* Sun Surface Detail (Pseudo-noise) */}
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 rounded-full mix-blend-overlay"></div>

                 {/* Dev Element: The Core Code Symbol with Slash */}
                 <div className="relative z-10 transform transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6">
                   <CodeSlashIcon size={48} className="md:w-16 md:h-16 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" strokeWidth={2.5} />
                 </div>
               </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* --- SKILLS SECTION --- */}
        <section id="skills" className="py-16 md:py-24 container mx-auto px-6 md:px-12 max-w-6xl">
          <RevealOnScroll className="mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center gap-3">
              <Cpu className="text-orange-500" /> Compétences
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-transparent rounded-full"></div>
          </RevealOnScroll>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Frontend Card */}
            <RevealOnScroll delay={100} className="h-full">
              <div className="h-full bg-[#0b0e1a] border border-white/5 p-6 md:p-8 rounded-2xl hover:border-orange-500/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-900/10 group">
                <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-500/10 transition-colors duration-300">
                  <Layers className="text-orange-400 w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Frontend</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: 'React', icon: <FaReact className="text-blue-400" /> },
                    { name: 'Vue.js', icon: <FaVuejs className="text-green-500" /> },
                    { name: 'Bootstrap', icon: <FaBootstrap className="text-purple-600" /> },
                    { name: 'TypeScript', icon: <SiTypescript className="text-blue-600" /> },
                    { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-cyan-400" /> },
                    { name: 'HTML', icon: <FaHtml5 className="text-orange-500" /> },
                    { name: 'CSS', icon: <FaCss3Alt className="text-blue-500" /> },
                    { name: 'JS', icon: <SiJavascript className="text-yellow-400" /> }
                  ].map(skill => (
                    <span key={skill.name} className="px-3 py-1 bg-slate-900 text-slate-400 text-xs md:text-sm rounded border border-slate-800 hover:border-orange-500/30 transition-colors flex items-center gap-2">
                      {skill.icon}
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </RevealOnScroll>

            {/* Backend Card */}
            <RevealOnScroll delay={200} className="h-full">
              <div className="h-full bg-[#0b0e1a] border border-white/5 p-6 md:p-8 rounded-2xl hover:border-orange-500/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-900/10 group">
                <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-500/10 transition-colors duration-300">
                  <Database className="text-orange-400 w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Backend</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: 'PHP', icon: <FaPhp className="text-indigo-400" /> },
                    { name: 'Node.js', icon: <FaNodeJs className="text-green-500" /> },
                    { name: 'MySQL', icon: <SiMysql className="text-blue-400" /> },
                    { name: 'Python', icon: <FaPython className="text-yellow-300" /> },
                    { name: 'PostgreSQL', icon: <SiPostgresql className="text-blue-300" /> }
                  ].map(skill => (
                    <span key={skill.name} className="px-3 py-1 bg-slate-900 text-slate-400 text-xs md:text-sm rounded border border-slate-800 hover:border-orange-500/30 transition-colors flex items-center gap-2">
                      {skill.icon}
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </RevealOnScroll>

            {/* Tools Card */}
            <RevealOnScroll delay={300} className="h-full">
              <div className="h-full bg-[#0b0e1a] border border-white/5 p-6 md:p-8 rounded-2xl hover:border-orange-500/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-900/10 group">
                <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-500/10 transition-colors duration-300">
                  <Terminal className="text-orange-400 w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Outils & Design</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: 'Git', icon: <FaGitAlt className="text-orange-600" /> },
                    { name: 'Figma', icon: <FaFigma className="text-pink-500" /> },
                    { name: 'FileZilla', icon: <SiFilezilla className="text-red-700" /> },
                    { name: 'Vercel', icon: <SiVercel className="text-white" /> },
                    { name: 'Linux', icon: <FaLinux className="text-yellow-500" /> },
                    { name: 'Agile', icon: <FaTasks className="text-blue-400" /> },
                    { name: 'Trello', icon: <FaTrello className="text-blue-600" /> },
                    { name: 'Lottie', icon: <FaFilm className="text-teal-400" /> }
                  ].map(skill => (
                    <span key={skill.name} className="px-3 py-1 bg-slate-900 text-slate-400 text-xs md:text-sm rounded border border-slate-800 hover:border-orange-500/30 transition-colors flex items-center gap-2">
                      {skill.icon}
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* --- PROJECTS SECTION --- */}
        <section id="projects" className="py-16 md:py-24 bg-[#080a12]/50 container mx-auto px-6 md:px-12 max-w-6xl">
          <RevealOnScroll className="mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center gap-3">
              <Code className="text-orange-500" /> Projets Récents
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-transparent rounded-full"></div>
          </RevealOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { 
                title: "InnovShop", 
                desc: "Site e-commerce innovant avec marketplace intégrée.",
                stack: ["React", "Symfony", "TypeScript", "PHP", "JS", "MySQL", "Tailwind CSS"],
                color: "bg-blue-900",
                imageUrl: "/HJczyxRkXT.png",
                demoLink: "https://innovshopp.alwaysdata.net/",
                githubLink: "https://github.com/Wandalf-dev/InnovShopp.git"
              },
              { 
                title: "DupontCare", 
                desc: "Plateforme de gestion de rendez-vous dentaire avec planning dynamique.",
                stack: ["PHP", "JS", "CSS", "HTML"],
                color: "bg-orange-900",
                imageUrl: "/74QwSDgoNO.png",
                demoLink: "https://dupontcare.wuaze.com/index.php",
                githubLink: "https://github.com/Wandalf-dev/CabinetDupont.git"
              },
              { 
                title: "AgencEco", 
                desc: "Site vitrine d'agence écologique mettant en avant des projets durables.",
                stack: ["HTML", "JS", "CSS"],
                color: "bg-emerald-900",
                imageUrl: "/OqvulqpAJi.png",
                demoLink: "https://agenc-eco.alwaysdata.net/",
                githubLink: "https://github.com/Wandalf-dev/agenceco-website.git"
              }
            ].map((project, index) => (
              <RevealOnScroll key={index} delay={index * 150} className="h-full">
                <div className="group bg-[#0b0e1a] border border-white/5 rounded-xl overflow-hidden hover:border-orange-500/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-900/10 h-full flex flex-col">
                  {/* Project Image */}
                  <div className={`h-40 md:h-48 ${project.color} relative overflow-hidden flex-shrink-0`}>
                    {project.imageUrl ? (
                      <>
                        <img 
                          src={project.imageUrl} 
                          alt={project.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500"></div>
                      </>
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500"></div>
                        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#0b0e1a] to-transparent"></div>
                        <div className="flex items-center justify-center h-full">
                          <Terminal className="w-12 h-12 text-white/50 group-hover:text-white/90 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-3" />
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="p-5 md:p-6 flex flex-col flex-grow">
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">{project.title}</h3>
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">{project.desc}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.stack.map(tech => (
                        <span key={tech} className="text-xs px-2 py-1 rounded bg-white/5 text-slate-300 border border-white/5">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-4 mt-auto">
                      <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-white flex items-center gap-1 hover:text-orange-400 transition-colors">
                        Demo <ExternalLink size={14} />
                      </a>
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-slate-400 flex items-center gap-1 hover:text-white transition-colors">
                        GitHub <Github size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
          
          <div className="mt-12 text-center">
             <RevealOnScroll delay={300}>
               <a href="https://github.com/Wandalf-dev" className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors font-medium group hover:tracking-wide duration-300">
                 Voir plus sur GitHub 
                 <span className="group-hover:translate-x-1 transition-transform">→</span>
               </a>
             </RevealOnScroll>
          </div>
        </section>

        {/* --- ABOUT SECTION --- */}
        <section id="about" className="py-16 md:py-24 container mx-auto px-6 md:px-12 max-w-6xl">
          <RevealOnScroll>
            <div className="bg-[#0b0e1a] border border-white/5 rounded-2xl p-6 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12 relative overflow-hidden hover:border-orange-500/20 transition-colors duration-500">
              {/* Decorative bg blob */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl pointer-events-none"></div>

              <div className="md:w-1/3 relative">
                <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-[#1a1e2e] shadow-2xl relative z-10 mx-auto transform hover:scale-105 transition-transform duration-500">
                  <img 
                    src="/67506752363__658731F0-BE4B-4CFE-8610-E1652F445A9D.fullsizerender.JPG" 
                    alt="Profile" 
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                {/* Orbit ring around avatar */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 md:w-72 md:h-72 border border-orange-500/20 rounded-full animate-[spin_30s_linear_infinite]"></div>
              </div>

              <div className="md:w-2/3 text-center md:text-left space-y-4 md:space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white">Explorateur du Web</h2>
                <p className="text-sm md:text-base text-slate-400 leading-relaxed">
                  Je suis un développeur junior passionné par la création d'interfaces intuitives et performantes. 
                  Comme un astronaute prépare sa mission, j'accorde une importance capitale à la préparation 
                  et à la qualité du code.
                </p>
                <p className="text-sm md:text-base text-slate-400 leading-relaxed">
                  Mon approche combine rigueur technique et sensibilité créative. Je suis à l'aise 
                  aussi bien en autonomie sur des problèmes complexes qu'au sein d'un équipage pour 
                  faire décoller des projets ambitieux.
                </p>
                {/* <div className="pt-4">
                   <button className="text-orange-400 border-b border-orange-400/30 pb-1 hover:border-orange-400 transition-all">
                     En savoir plus sur mon parcours
                   </button>
                </div> */}
              </div>
            </div>
          </RevealOnScroll>
        </section>

        {/* --- CONTACT SECTION --- */}
        <section id="contact" className="py-16 md:py-24 container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <RevealOnScroll className="space-y-6 md:space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Initialisons la communication</h2>
                <p className="text-sm md:text-base text-slate-400">
                  Un projet en tête ? Une question sur mon stack technique ? 
                  Ou simplement envie de discuter d'exploration spatiale ? 
                  N'hésitez pas à m'envoyer un signal.
                </p>
              </div>

              <div className="space-y-4">
                <a href="mailto:contact@freelance-lm.fr" className="flex items-center gap-4 p-4 bg-[#0b0e1a] border border-white/5 rounded-lg hover:border-orange-500/30 transition-all group hover:scale-[1.02] hover:bg-white/5">
                  <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
                    <Mail size={20} />
                  </div>
                  <span className="text-slate-300 group-hover:text-white transition-colors break-all">contact@freelance-lm.fr</span>
                </a>
                
                <div className="flex gap-4">
                  <a href="https://www.linkedin.com/in/lou-marche-90b988249/" className="flex-1 flex items-center justify-center gap-3 p-4 bg-[#0b0e1a] border border-white/5 rounded-lg hover:border-orange-500/30 hover:bg-white/5 hover:scale-[1.02] transition-all text-slate-300 hover:text-white">
                    <Linkedin size={20} /> LinkedIn
                  </a>
                  <a href="https://github.com/Wandalf-dev" className="flex-1 flex items-center justify-center gap-3 p-4 bg-[#0b0e1a] border border-white/5 rounded-lg hover:border-orange-500/30 hover:bg-white/5 hover:scale-[1.02] transition-all text-slate-300 hover:text-white">
                    <Github size={20} /> GitHub
                  </a>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={200}>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400 ml-1">Nom</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      minLength={3}
                      className="w-full bg-[#0b0e1a] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 transition-all"
                      placeholder="Voyageur"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-slate-400 ml-1">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      className="w-full bg-[#0b0e1a] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 transition-all"
                      placeholder="email@galaxie.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-slate-400 ml-1">Message</label>
                  <textarea 
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    minLength={10}
                    className="w-full bg-[#0b0e1a] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 transition-all resize-none"
                    placeholder="J'ai une mission pour vous..."
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold rounded-lg shadow-[0_0_20px_rgba(234,88,12,0.2)] hover:shadow-[0_0_30px_rgba(234,88,12,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Envoi en cours...</span>
                  ) : (
                    <>
                      <Send size={18} /> Envoyer le message
                    </>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-center animate-in fade-in slide-in-from-bottom-2">
                    Message reçu 5/5 ! Je vous recontacte très vite.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-center animate-in fade-in slide-in-from-bottom-2">
                    Houston, on a un problème. Réessayez ou envoyez un mail direct.
                  </div>
                )}
              </form>
            </RevealOnScroll>
          </div>
        </section>

      </main>

      {/* --- FOOTER --- */}
      <footer className="border-t border-white/5 bg-[#020305] py-8 relative z-10">
        <div className="container mx-auto px-6 text-center md:flex md:justify-between md:items-center max-w-6xl">
          <div className="mb-4 md:mb-0">
            <span className="text-slate-500 text-sm">
              © {new Date().getFullYear()} Portfolio. Conçu pour l'exploration.
            </span>
          </div>
          <div className="flex justify-center gap-6">
             <a href="#" className="text-slate-600 hover:text-orange-500 transition-colors hover:scale-110 transform"><Github size={18} /></a>
             <a href="#" className="text-slate-600 hover:text-orange-500 transition-colors hover:scale-110 transform"><Linkedin size={18} /></a>
             <a href="#" className="text-slate-600 hover:text-orange-500 transition-colors hover:scale-110 transform"><Mail size={18} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;