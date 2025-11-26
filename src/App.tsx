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

// Interface pour les étoiles
interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

// Interface pour les étoiles filantes
interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  angle: number;
}

// Composant pour l'arrière-plan étoilé animé
const StarBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const animationRef = useRef<number>(0);
  const lastShootingStarRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configuration
    const STAR_COUNT = 120;
    const PARALLAX_STRENGTH = 0.02;
    const SHOOTING_STAR_INTERVAL = 15000;

    // Redimensionner le canvas avec pixel ratio pour netteté
    const dpr = window.devicePixelRatio || 1;
    const resizeCanvas = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();

    // Générer les étoiles
    const generateStars = (): Star[] => {
      const stars: Star[] = [];
      const width = window.innerWidth;
      const height = window.innerHeight;
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5 + 0.3,
          opacity: Math.random() * 0.5 + 0.2,
          twinkleSpeed: Math.random() * 0.01 + 0.003,
          twinklePhase: Math.random() * Math.PI * 2
        });
      }
      return stars;
    };
    starsRef.current = generateStars();

    // Créer une étoile filante
    const createShootingStar = (): ShootingStar => {
      const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.5;
      return {
        x: Math.random() * window.innerWidth * 0.5,
        y: Math.random() * window.innerHeight * 0.3,
        length: Math.random() * 80 + 60,
        speed: Math.random() * 8 + 12,
        opacity: 1,
        angle
      };
    };

    // Gérer le mouvement de souris
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation principale
    const animate = (currentTime: number) => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      // Dessiner les étoiles
      starsRef.current.forEach((star) => {
        // Scintillement subtil
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = Math.sin(star.twinklePhase) * 0.2 + 0.8;

        // Parallaxe subtile
        const parallaxX = mouseRef.current.x * PARALLAX_STRENGTH * star.size * 15;
        const parallaxY = mouseRef.current.y * PARALLAX_STRENGTH * star.size * 15;

        const x = star.x + parallaxX;
        const y = star.y + parallaxY;
        const currentOpacity = star.opacity * twinkle;

        // Halo doux autour de l'étoile
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, star.size * 3);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity})`);
        gradient.addColorStop(0.4, `rgba(255, 255, 255, ${currentOpacity * 0.4})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.arc(x, y, star.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Point central net
        ctx.beginPath();
        ctx.arc(x, y, star.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.fill();
      });

      // Gérer les étoiles filantes
      if (currentTime - lastShootingStarRef.current > SHOOTING_STAR_INTERVAL) {
        shootingStarsRef.current.push(createShootingStar());
        lastShootingStarRef.current = currentTime;
      }

      // Dessiner les étoiles filantes
      shootingStarsRef.current = shootingStarsRef.current.filter((star) => {
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.opacity -= 0.01;

        if (star.opacity <= 0) return false;

        const tailX = star.x - Math.cos(star.angle) * star.length;
        const tailY = star.y - Math.sin(star.angle) * star.length;

        // Traînée
        const gradient = ctx.createLinearGradient(star.x, star.y, tailX, tailY);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
        gradient.addColorStop(0.3, `rgba(255, 200, 150, ${star.opacity * 0.5})`);
        gradient.addColorStop(1, 'rgba(255, 150, 100, 0)');

        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Tête
        ctx.beginPath();
        ctx.arc(star.x, star.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        return true;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    // Régénérer au resize
    const handleResize = () => {
      resizeCanvas();
      starsRef.current = generateStars();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Fond sombre */}
      <div className="absolute inset-0 bg-[#030508]"></div>

      {/* Nébuleuses */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-orange-600/8 rounded-full blur-[150px] animate-nebula-1"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/8 rounded-full blur-[150px] animate-nebula-2"></div>
      <div className="absolute top-[30%] right-[20%] w-[30%] h-[30%] bg-purple-600/5 rounded-full blur-[120px] animate-nebula-3"></div>

      {/* Canvas pour les étoiles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Grille subtile */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '100px 100px'
      }}></div>
    </div>
  );
};

// Composant pour le curseur personnalisé
const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTrailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const trail = cursorTrailRef.current;
    if (!cursor || !trail) return;

    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    };

    const animateTrail = () => {
      trailX += (mouseX - trailX) * 0.15;
      trailY += (mouseY - trailY) * 0.15;
      trail.style.left = `${trailX}px`;
      trail.style.top = `${trailY}px`;
      requestAnimationFrame(animateTrail);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animateTrail();

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-4 h-4 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div className="w-full h-full bg-white rounded-full"></div>
      </div>
      <div
        ref={cursorTrailRef}
        className="fixed w-8 h-8 pointer-events-none z-[9998] hidden md:block"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div className="w-full h-full border border-orange-500/50 rounded-full"></div>
      </div>
    </>
  );
};

// Composant pour la progress bar de scroll
const ScrollProgressBar = () => {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!progressRef.current) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      progressRef.current.style.transform = `scaleX(${scrollPercent})`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-transparent">
      <div
        ref={progressRef}
        className="h-full w-full origin-left bg-gradient-to-r from-orange-500 via-orange-400 to-amber-500 shadow-[0_0_10px_rgba(234,88,12,0.5)]"
        style={{ transform: 'scaleX(0)', willChange: 'transform' }}
      />
    </div>
  );
};

// Composant Back to Top
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 w-12 h-12 bg-orange-600 hover:bg-orange-500 text-white rounded-full shadow-lg shadow-orange-900/30 flex items-center justify-center z-50 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(234,88,12,0.5)] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      aria-label="Retour en haut"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 15l-6-6-6 6"/>
      </svg>
    </button>
  );
};

// Composant pour le Typing Effect
const TypingEffect = ({ words, className = "" }: { words: string[]; className?: string }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words]);

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse text-orange-400">|</span>
    </span>
  );
};

// Composant pour une orbite interactive
interface InteractiveOrbitProps {
  size: string;
  sizeMd: string;
  duration: number;
  borderClass: string;
  children: React.ReactNode;
}

const InteractiveOrbit = ({ size, sizeMd, duration, borderClass, children }: InteractiveOrbitProps) => {
  const [angle, setAngle] = useState(() => Math.random() * 360);
  const [isDragging, setIsDragging] = useState(false);
  const orbitRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  // Animation automatique
  useEffect(() => {
    if (isDragging) {
      lastTimeRef.current = 0;
      return;
    }

    const animate = (currentTime: number) => {
      if (lastTimeRef.current === 0) lastTimeRef.current = currentTime;
      const deltaTime = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;

      const speed = 360 / (duration * 1000);
      setAngle(prev => (prev + speed * deltaTime) % 360);

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isDragging, duration]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!orbitRef.current) return;

      const rect = orbitRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      // Calcul de l'angle (0° = haut, sens horaire)
      let newAngle = Math.atan2(deltaX, -deltaY) * (180 / Math.PI);
      if (newAngle < 0) newAngle += 360;

      setAngle(newAngle);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Touch events - ref pour le bouton draggable
  const planetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const planet = planetRef.current;
    if (!planet) return;

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    };

    planet.addEventListener('touchstart', handleTouchStart, { passive: false });

    return () => {
      planet.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (!orbitRef.current || !e.touches[0]) return;

      const touch = e.touches[0];
      const rect = orbitRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = touch.clientX - centerX;
      const deltaY = touch.clientY - centerY;

      let newAngle = Math.atan2(deltaX, -deltaY) * (180 / Math.PI);
      if (newAngle < 0) newAngle += 360;

      setAngle(newAngle);
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  return (
    <div
      ref={orbitRef}
      className={`absolute ${size} ${sizeMd} ${borderClass} rounded-full`}
      style={{ transform: `rotate(${angle}deg)` }}
    >
      <div
        ref={planetRef}
        className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isDragging ? 'cursor-grabbing scale-110' : 'cursor-grab'} transition-transform duration-150 select-none`}
        onMouseDown={handleMouseDown}
      >
        {children}
      </div>
    </div>
  );
};

// Composant pour l'effet Tilt 3D sur les cartes
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

const TiltCard = ({ children, className = "" }: TiltCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (card) {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
  };

  return (
    <div
      ref={cardRef}
      className={`transition-transform duration-200 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

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
      const response = await axios.post('/api/send-email', {
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
    <div className="min-h-screen text-slate-300 font-sans selection:bg-orange-500/30 selection:text-orange-200 relative overflow-x-hidden cursor-none md:cursor-none">
      <CustomCursor />
      <ScrollProgressBar />
      <BackToTop />
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
              <a href="https://www.malt.fr/profile/loumarche1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs md:text-sm font-medium hover:bg-orange-500/20 hover:border-orange-500/50 transition-colors cursor-pointer mx-auto md:mx-0">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                Disponible pour des missions
              </a>
              
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight">
                Développeur <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-500 to-orange-600 bg-[length:200%_auto] animate-gradient-x">
                  <TypingEffect words={["Full-Stack", "Frontend", "Backend", "Créatif"]} />
                </span>
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

            {/* Visual Illustration - Dev Solar System */}
            <RevealOnScroll delay={200} className="flex justify-center items-center relative order-1 md:order-2 -mt-8 md:mt-0 pb-12 md:pb-0">
               {/* Background Atmosphere Glow - Multi-layered */}
               <div className="absolute w-72 md:w-96 h-72 md:h-96 bg-orange-500/10 blur-[120px] rounded-full"></div>
               <div className="absolute w-56 md:w-72 h-56 md:h-72 bg-amber-500/15 blur-[80px] rounded-full animate-[pulse_4s_ease-in-out_infinite]"></div>

               {/* Orbit 3 - Outer (Node.js) */}
               <InteractiveOrbit
                 size="w-[320px] h-[320px]"
                 sizeMd="md:w-[400px] md:h-[400px]"
                 duration={35}
                 borderClass="border border-white/[0.03]"
               >
                 <div className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-[#0a0f0a] border border-green-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] transition-shadow duration-300">
                   <FaNodeJs className="text-green-500 text-lg md:text-xl pointer-events-none" />
                 </div>
               </InteractiveOrbit>

               {/* Orbit 2 - Middle (TypeScript) */}
               <InteractiveOrbit
                 size="w-[240px] h-[240px]"
                 sizeMd="md:w-[300px] md:h-[300px]"
                 duration={28}
                 borderClass="border border-blue-500/10"
               >
                 <div className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-[#0a0a14] border border-blue-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-shadow duration-300">
                   <SiTypescript className="text-blue-500 text-base md:text-lg pointer-events-none" />
                 </div>
               </InteractiveOrbit>

               {/* Orbit 1 - Inner (React) */}
               <InteractiveOrbit
                 size="w-[170px] h-[170px]"
                 sizeMd="md:w-[210px] md:h-[210px]"
                 duration={18}
                 borderClass="border border-cyan-500/10"
               >
                 <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#0a1214] border border-cyan-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-shadow duration-300">
                   <FaReact className="text-cyan-400 text-lg md:text-xl pointer-events-none animate-[spin_8s_linear_infinite]" />
                 </div>
               </InteractiveOrbit>

               {/* The Sun / Core */}
               <div className="relative w-28 md:w-36 h-28 md:h-36 rounded-full flex items-center justify-center group cursor-pointer">
                 {/* Outer glow ring */}
                 <div className="absolute -inset-3 md:-inset-4 bg-gradient-to-r from-orange-500/20 via-amber-500/10 to-orange-500/20 rounded-full blur-xl animate-[pulse_3s_ease-in-out_infinite]"></div>

                 {/* Sun corona effect */}
                 <div className="absolute -inset-1 bg-gradient-to-br from-orange-400/40 via-transparent to-amber-500/40 rounded-full animate-[spin_20s_linear_infinite]"></div>

                 {/* Sun Body with Gradient */}
                 <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-orange-500 to-orange-700 rounded-full shadow-[0_0_60px_rgba(251,146,60,0.5),inset_0_0_30px_rgba(0,0,0,0.3)]"></div>

                 {/* Sun highlight */}
                 <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-full"></div>

                 {/* Dev Element: The Core Code Symbol */}
                 <div className="relative z-10 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                   <CodeSlashIcon size={40} className="md:w-12 md:h-12 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.9)]" strokeWidth={2.5} />
                 </div>
               </div>

               {/* Floating particles */}
               <div className="absolute w-2 h-2 bg-orange-400/60 rounded-full top-[20%] right-[15%] animate-[float_6s_ease-in-out_infinite] shadow-[0_0_10px_rgba(251,146,60,0.6)]"></div>
               <div className="absolute w-1.5 h-1.5 bg-cyan-400/50 rounded-full bottom-[25%] left-[20%] animate-[float_8s_ease-in-out_infinite_1s] shadow-[0_0_8px_rgba(6,182,212,0.5)]"></div>
               <div className="absolute w-1 h-1 bg-blue-400/40 rounded-full top-[35%] left-[10%] animate-[float_7s_ease-in-out_infinite_2s] shadow-[0_0_6px_rgba(59,130,246,0.4)]"></div>
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
              <TiltCard className="h-full">
              <div className="h-full bg-[#0b0e1a]/80 backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-2xl hover:border-orange-500/40 transition-all duration-500 hover:shadow-[0_0_30px_rgba(234,88,12,0.1)] group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-500/10 transition-colors duration-300 relative z-10">
                  <Layers className="text-orange-400 w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4 relative z-10">Frontend</h3>
                <div className="flex flex-wrap gap-2 relative z-10">
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
                    <span key={skill.name} className="px-3 py-1 bg-slate-900/80 text-slate-400 text-xs md:text-sm rounded border border-slate-800 hover:border-orange-500/30 hover:bg-orange-500/5 transition-all duration-300 flex items-center gap-2">
                      {skill.icon}
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
              </TiltCard>
            </RevealOnScroll>

            {/* Backend Card */}
            <RevealOnScroll delay={200} className="h-full">
              <TiltCard className="h-full">
              <div className="h-full bg-[#0b0e1a]/80 backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-2xl hover:border-orange-500/40 transition-all duration-500 hover:shadow-[0_0_30px_rgba(234,88,12,0.1)] group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-500/10 transition-colors duration-300 relative z-10">
                  <Database className="text-orange-400 w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4 relative z-10">Backend</h3>
                <div className="flex flex-wrap gap-2 relative z-10">
                  {[
                    { name: 'PHP', icon: <FaPhp className="text-indigo-400" /> },
                    { name: 'Node.js', icon: <FaNodeJs className="text-green-500" /> },
                    { name: 'MySQL', icon: <SiMysql className="text-blue-400" /> },
                    { name: 'Python', icon: <FaPython className="text-yellow-300" /> },
                    { name: 'PostgreSQL', icon: <SiPostgresql className="text-blue-300" /> }
                  ].map(skill => (
                    <span key={skill.name} className="px-3 py-1 bg-slate-900/80 text-slate-400 text-xs md:text-sm rounded border border-slate-800 hover:border-orange-500/30 hover:bg-orange-500/5 transition-all duration-300 flex items-center gap-2">
                      {skill.icon}
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
              </TiltCard>
            </RevealOnScroll>

            {/* Tools Card */}
            <RevealOnScroll delay={300} className="h-full">
              <TiltCard className="h-full">
              <div className="h-full bg-[#0b0e1a]/80 backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-2xl hover:border-orange-500/40 transition-all duration-500 hover:shadow-[0_0_30px_rgba(234,88,12,0.1)] group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-500/10 transition-colors duration-300 relative z-10">
                  <Terminal className="text-orange-400 w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4 relative z-10">Outils & Design</h3>
                <div className="flex flex-wrap gap-2 relative z-10">
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
                    <span key={skill.name} className="px-3 py-1 bg-slate-900/80 text-slate-400 text-xs md:text-sm rounded border border-slate-800 hover:border-orange-500/30 hover:bg-orange-500/5 transition-all duration-300 flex items-center gap-2">
                      {skill.icon}
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
              </TiltCard>
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
                <TiltCard className="h-full">
                  <div className="group relative bg-[#0b0e1a]/80 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden h-full flex flex-col transition-all duration-500 hover:shadow-[0_0_30px_rgba(234,88,12,0.15)] hover:border-orange-500/30">
                    {/* Animated border gradient */}
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-[-2px] rounded-xl bg-gradient-to-r from-orange-500/50 via-amber-500/50 to-orange-500/50 animate-border-spin" style={{ padding: '2px' }}>
                        <div className="w-full h-full bg-[#0b0e1a] rounded-xl"></div>
                      </div>
                    </div>

                    {/* Project Image */}
                    <div className={`h-40 md:h-48 ${project.color} relative overflow-hidden flex-shrink-0`}>
                      {project.imageUrl ? (
                        <>
                          <img
                            src={project.imageUrl}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e1a] via-transparent to-transparent opacity-60"></div>
                          <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 transition-all duration-500"></div>
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

                    <div className="p-5 md:p-6 flex flex-col flex-grow relative z-10">
                      <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-amber-400 transition-all duration-300">{project.title}</h3>
                      <p className="text-slate-400 text-sm mb-4 line-clamp-2">{project.desc}</p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.stack.map(tech => (
                          <span key={tech} className="text-xs px-2 py-1 rounded bg-white/5 text-slate-300 border border-white/5 hover:border-orange-500/30 hover:bg-orange-500/5 transition-all duration-300">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 mt-auto">
                        <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-white flex items-center gap-1 hover:text-orange-400 transition-colors group/link">
                          Demo <ExternalLink size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                        </a>
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-slate-400 flex items-center gap-1 hover:text-white transition-colors">
                          GitHub <Github size={14} />
                        </a>
                      </div>
                    </div>
                  </div>
                </TiltCard>
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
                  <a href="https://www.malt.fr/profile/loumarche1" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-3 p-4 bg-[#0b0e1a] border border-white/5 rounded-lg hover:border-orange-500/30 hover:bg-white/5 hover:scale-[1.02] transition-all text-slate-300 hover:text-white">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm5.696 14.943c-1.273 2.203-3.88 3.522-6.044 3.522-1.665 0-2.792-.61-3.296-1.222l-.006.01-2.47 4.247H3.387l7.312-12.66c.504-.873 1.273-1.34 2.168-1.34.894 0 1.664.467 2.168 1.34l4.66 8.071v.032z"/>
                    </svg>
                    Malt
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
             <a href="https://github.com/Wandalf-dev" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-orange-500 transition-colors hover:scale-110 transform"><Github size={18} /></a>
             <a href="https://www.linkedin.com/in/lou-marche-90b988249/" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-orange-500 transition-colors hover:scale-110 transform"><Linkedin size={18} /></a>
             <a href="https://www.malt.fr/profile/loumarche1" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-orange-500 transition-colors hover:scale-110 transform" title="Malt">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                 <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm5.696 14.943c-1.273 2.203-3.88 3.522-6.044 3.522-1.665 0-2.792-.61-3.296-1.222l-.006.01-2.47 4.247H3.387l7.312-12.66c.504-.873 1.273-1.34 2.168-1.34.894 0 1.664.467 2.168 1.34l4.66 8.071v.032z"/>
               </svg>
             </a>
             <a href="mailto:contact@freelance-lm.fr" className="text-slate-600 hover:text-orange-500 transition-colors hover:scale-110 transform"><Mail size={18} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;