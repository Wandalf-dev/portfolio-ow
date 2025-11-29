import React, { useState, useEffect, useRef } from 'react';
import { Github, Mail, Linkedin, ExternalLink, Code2, Database, Layout, ChevronDown } from 'lucide-react';
import { SiSymfony, SiReact, SiTypescript, SiTailwindcss, SiMysql, SiDocker, SiGit, SiFigma, SiWordpress, SiHtml5, SiCss3, SiJavascript, SiPhp } from 'react-icons/si';
import { TbApi } from 'react-icons/tb';

const techIcons = {
  'React': SiReact,
  'Symfony': SiSymfony,
  'API Platform': TbApi,
  'API REST': TbApi,
  'HTML': SiHtml5,
  'CSS': SiCss3,
  'JS': SiJavascript,
  'PHP': SiPhp,
  'MySQL': SiMysql,
  'TypeScript': SiTypescript,
  'Tailwind': SiTailwindcss,
  'Docker': SiDocker,
  'Git': SiGit,
  'Figma': SiFigma,
  'WordPress': SiWordpress,
};

const MaltLogo = () => (
  <svg width="24" height="24" viewBox="0 0 512 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="m408.4 103.8c-32.5-32.4-67.1-11.4-88.8 10.2L114.8 318.8c-21.7 21.7-44.4 54.7-10.2 88.8c34.1 34.1 67 11.4 88.7-10.3l204.8-204.8c21.7-21.6 42.7-56.3 10.3-88.7zm-195.7-8.4 43.4 43.4 44.1-44.2c3-3 6-5.8 9.1-8.4c-4.6-23.3-17.9-44.4-53.3-44.4c-35.4 0-48.7 21.2-53.2 44.5c3.3 2.9 6.6 5.8 9.9 9.1zm87.5 322.1-44.1-44.1-43.4 43.3c-3.3 3.3-6.5 6.4-9.8 9.2c5 23.8 19 45.5 53.1 45.5c34.2 0 48.3-21.9 53.2-45.7c-3-2.6-6-5.2-9-8.2zm-105.9-217h-83.6c-30.7 0-70 9.7-70 55.5c0 34.3 21.9 48.3 45.8 53.2c2.8-3.2 107.8-108.7 107.8-108.7zm231.5 2.3c-2.6 3-107.9 108.8-107.9 108.8h82.4c30.7 0 70-7.3 70-55.6c0-35.3-21.1-48.6-44.5-53.2zm-204.1-29.7 14.9-14.9-43.3-43.4c-21.7-21.7-54.6-44.4-88.8-10.2c-25 25-19.4 49.4-6.2 69.1c4.1-.3 123.4-.6 123.4-.6zm68.7 165.9-15 15 44.2 44.1c21.7 21.7 56.3 42.7 88.7 10.3c24.2-24.2 18.7-49.7 5.3-70c-4.3.3-123.2.6-123.2.6z"/>
  </svg>
);

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [skillsInView, setSkillsInView] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState({});

  const cardsInView = Object.values(visibleCards).some(v => v);

  // Projets est visible si des cartes sont visibles
  const projectsVisible = cardsInView;

  // Compétences est visible si on est dans la section ET pas de cartes visibles ET pas Contact visible
  const skillsVisible = skillsInView && !cardsInView && !contactVisible;

  const roles = ["Full-Stack", "Backend", "Frontend", "Créatif"];

  const heroRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const contactRef = useRef(null);
  const cardRefs = useRef([]);

  const projects = [
    {
      id: 1,
      title: "InnovShop",
      description: "Site e-commerce innovant avec marketplace intégrée.",
      tech: ["React", "Symfony", "API Platform"],
      year: "2025",
      color: "#3b82f6",
      link: "#",
      image: "/HJczyxRkXT.png"
    },
    {
      id: 2,
      title: "AgencEco",
      description: "Site vitrine d'agence écologique mettant en avant des projets durables.",
      tech: ["HTML", "CSS", "JS", "API REST"],
      year: "2025",
      color: "#0ea5e9",
      link: "#",
      image: "/OqvulqpAJi.png"
    },
    {
      id: 3,
      title: "DupontCare",
      description: "Plateforme de gestion de rendez-vous dentaire avec planning dynamique.",
      tech: ["PHP", "JS", "MySQL", "CSS", "HTML"],
      year: "2025",
      color: "#64748b",
      link: "#",
      image: "/74QwSDgoNO.png"
    }
  ];

  const _skills = [
    { name: "PHP / Symfony", level: 95, icon: <Database size={20} /> },
    { name: "React / Next.js", level: 85, icon: <Code2 size={20} /> },
    { name: "TypeScript", level: 80, icon: <Code2 size={20} /> },
    { name: "Tailwind CSS", level: 95, icon: <Layout size={20} /> },
    { name: "SQL / Doctrine", level: 85, icon: <Database size={20} /> },
    { name: "WordPress", level: 90, icon: <Layout size={20} /> }
  ];

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Cycle through roles with fade effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setIsFading(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [roles.length]);

  useEffect(() => {
    if (!isLoaded) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-reveal');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '50px' });

    document.querySelectorAll('.reveal-hidden').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [isLoaded]);

  // Observer pour les cartes de projet - effet d'assombrissement individuel
  useEffect(() => {
    if (!isLoaded) return;

    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const cardId = entry.target.dataset.cardId;
        setVisibleCards(prev => ({
          ...prev,
          [cardId]: entry.isIntersecting
        }));
      });
    }, { threshold: 0.3, rootMargin: '-15% 0px -15% 0px' });

    cardRefs.current.forEach(ref => {
      if (ref) cardObserver.observe(ref);
    });

    return () => cardObserver.disconnect();
  }, [isLoaded]);

  // Observer pour la section Compétences
  useEffect(() => {
    if (!isLoaded) return;

    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => setSkillsInView(entry.isIntersecting));
    }, { threshold: 0.1, rootMargin: '0px 0px 0px 0px' });

    if (skillsRef.current) skillsObserver.observe(skillsRef.current);

    return () => skillsObserver.disconnect();
  }, [isLoaded]);

  // Observer pour la section Contact - déclenche quand on arrive vraiment dessus
  useEffect(() => {
    if (!isLoaded) return;

    const contactObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => setContactVisible(entry.isIntersecting));
    }, { threshold: 0.5, rootMargin: '-30% 0px 0px 0px' });

    if (contactRef.current) contactObserver.observe(contactRef.current);

    return () => contactObserver.disconnect();
  }, [isLoaded]);

  const scrollTo = (ref) => {
    const element = ref.current;
    if (element) {
      const offset = window.innerWidth < 768 ? 0 : 150;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-[#0f172a] text-slate-200 min-h-screen font-sans selection:bg-blue-500/30 selection:text-blue-200">

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-12 md:py-6 flex justify-between items-center backdrop-blur-md bg-[#0f172a]/80 border-b border-white/5">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`shrink-0 cursor-pointer transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
        >
          <img src="/logo.png" alt="Logo" className="h-10 md:h-16 w-auto md:-my-4" />
        </button>

        <div className={`flex gap-3 md:gap-10 text-xs md:text-sm font-light tracking-[0.1em] md:tracking-[0.2em] uppercase transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          {[
            { label: 'Projets', ref: projectsRef },
            { label: 'Compétences', ref: skillsRef },
            { label: 'Contact', ref: contactRef }
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => scrollTo(item.ref)}
              className="relative group py-2 cursor-pointer"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-full h-px bg-slate-200 scale-x-0 origin-right transition-transform duration-500 ease-[cubic-bezier(0.43,0.195,0.02,1)] group-hover:scale-x-100 group-hover:origin-left" />
            </button>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 relative overflow-hidden">
        <div className="max-w-5xl -mt-32 md:mt-0">
          <div className={`overflow-hidden mb-6`}>
            <div className={`flex items-center gap-4 text-slate-400 text-sm font-light tracking-[0.3em] uppercase transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <span className={`h-px bg-slate-500 transition-all duration-1000 delay-500 ${isLoaded ? 'w-16' : 'w-0'}`}></span>
              Lou Marche
            </div>
          </div>

          <h1
            className={`text-[11vw] md:text-[6vw] font-light leading-[0.9] tracking-[0.05em] mb-6 transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
          >
            DÉVELOPPEUR<br />
            <span
              className={`text-blue-500 transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}
            >
              {roles[roleIndex]}
            </span>
          </h1>

          <p className={`text-lg md:text-xl text-slate-400 font-light tracking-wide max-w-2xl leading-relaxed transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Je conçois des architectures web robustes et des interfaces immersives. Spécialisé en écosystèmes <span className="text-slate-200 font-normal">Symfony</span> & <span className="text-slate-200 font-normal">React</span>.
          </p>

          <div className={`mt-12 flex flex-wrap gap-4 transition-all duration-1000 delay-900 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <a
              href="https://github.com/Wandalf-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-8 py-4 border border-slate-700/50 rounded-lg hover:border-slate-500 transition-colors duration-200"
            >
              <Github size={20} />
              <span className="h-5 overflow-hidden">
                <span className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.215,0.61,0.355,1)] group-hover:-translate-y-5">
                  <span className="h-5 leading-5 font-light tracking-[0.2em]">GITHUB</span>
                  <span className="h-5 leading-5 font-light tracking-[0.2em]">GITHUB</span>
                </span>
              </span>
            </a>
            <button
              onClick={() => scrollTo(contactRef)}
              className="group flex items-center gap-3 px-8 py-4 bg-blue-600 rounded-lg hover:bg-blue-500 text-white transition-colors duration-200"
            >
              <Mail size={20} />
              <span className="h-5 overflow-hidden">
                <span className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.215,0.61,0.355,1)] group-hover:-translate-y-5">
                  <span className="h-5 leading-5 font-light tracking-[0.2em]">ME CONTACTER</span>
                  <span className="h-5 leading-5 font-light tracking-[0.2em]">ME CONTACTER</span>
                </span>
              </span>
            </button>
          </div>
        </div>

        <div className={`absolute bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-all duration-1000 delay-[1200ms] ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <span className="text-xs tracking-[0.2em] text-slate-500 uppercase">Scroll</span>
          <ChevronDown className="animate-bounce text-blue-500" size={24} />
        </div>
      </section>

      {/* Projects Section */}
      <section
        ref={projectsRef}
        className="relative py-32 px-6 md:px-16 lg:px-24 bg-[#0B1120]"
      >
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">

          {/* Left - Sticky */}
          <div className="md:w-[35%]">
            <div className="sticky top-32 h-fit reveal-hidden">
              <div className={`section-title-glow ${projectsVisible ? 'is-visible' : ''}`}>
                <p className="text-blue-400 font-light tracking-[0.3em] text-sm mb-3">PORTFOLIO</p>
                <h2 className="text-4xl md:text-5xl font-light tracking-[0.05em] text-slate-100 mb-6">
                  Projets<span className="text-blue-500">.</span>
                </h2>
                <p className="text-slate-400 text-lg md:text-xl font-light tracking-wide leading-relaxed">
                  Une sélection de projets sur lesquels j'ai travaillé, du e-commerce aux sites web vitrines.
                </p>
              </div>
            </div>
          </div>

          {/* Right - Scrolling Cards with suction effect */}
          <div className="md:w-[65%] space-y-32 md:space-y-96">
            {projects.map((project, index) => (
              <a
                key={project.id}
                ref={el => cardRefs.current[index] = el}
                data-card-id={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`project-card group block cursor-pointer ${index === 0 ? 'reveal-hidden' : ''}`}
              >
                <div
                  className={`relative bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-all duration-500 ${visibleCards[project.id] ? '' : 'opacity-20 scale-[0.98]'}`}
                >
                  {/* Image */}
                  <div className="bg-slate-800">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-xl font-light tracking-[0.05em] text-slate-100 group-hover:text-blue-400 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <span className="text-slate-500 font-mono text-xs shrink-0">{project.year}</span>
                    </div>

                    <p className="text-slate-400 text-base font-light tracking-wide leading-relaxed mb-4">
                      {project.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-4">
                        {project.tech.map(t => {
                          const Icon = techIcons[t];
                          return (
                            <span key={t} className="flex items-center gap-2 text-sm text-slate-500 font-light tracking-wider uppercase">
                              {Icon && <Icon size={16} />}
                              {t}
                            </span>
                          );
                        })}
                      </div>

                      <div className="flex items-center gap-2 text-slate-400 group-hover:text-blue-400 transition-colors duration-300">
                        <span className="text-xs font-light tracking-wide">Voir</span>
                        <ExternalLink size={14} />
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        ref={skillsRef}
        className="py-32 md:pt-64 md:pb-64 relative bg-[#0B1120] overflow-hidden"
      >
        <div className="reveal-hidden px-6 md:px-16 lg:px-24 mb-16">
          <div className={`section-title-glow ${skillsVisible ? 'is-visible' : ''}`}>
            <p className="text-blue-400 font-light tracking-[0.3em] text-sm mb-3">STACK</p>
            <h2 className="text-4xl md:text-5xl font-light tracking-[0.05em] text-slate-100">
              Compétences<span className="text-blue-500">.</span>
            </h2>
          </div>
        </div>

        {/* Marquee */}
        <div className="reveal-hidden relative overflow-hidden">
          <div className={`section-title-glow ${skillsVisible ? 'is-visible' : ''}`}>
            <div className="animate-marquee-infinite">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex items-center shrink-0">
                {[
                    { name: "Symfony", icon: <SiSymfony className="w-6 h-6 md:w-10 md:h-10" />, url: "https://symfony.com" },
                    { name: "React", icon: <SiReact className="w-6 h-6 md:w-10 md:h-10" />, url: "https://react.dev" },
                    { name: "TypeScript", icon: <SiTypescript className="w-6 h-6 md:w-10 md:h-10" />, url: "https://www.typescriptlang.org" },
                    { name: "Tailwind", icon: <SiTailwindcss className="w-6 h-6 md:w-10 md:h-10" />, url: "https://tailwindcss.com" },
                    { name: "MySQL", icon: <SiMysql className="w-6 h-6 md:w-10 md:h-10" />, url: "https://www.mysql.com" },
                    { name: "Docker", icon: <SiDocker className="w-6 h-6 md:w-10 md:h-10" />, url: "https://www.docker.com" },
                    { name: "Git", icon: <SiGit className="w-6 h-6 md:w-10 md:h-10" />, url: "https://git-scm.com" },
                    { name: "Figma", icon: <SiFigma className="w-6 h-6 md:w-10 md:h-10" />, url: "https://www.figma.com" },
                    { name: "API REST", icon: <TbApi className="w-6 h-6 md:w-10 md:h-10" />, url: "https://restfulapi.net" },
                    { name: "WordPress", icon: <SiWordpress className="w-6 h-6 md:w-10 md:h-10" />, url: "https://wordpress.org" }
                  ].map((skill, index) => (
                  <a
                    key={`${skill.name}-${copy}`}
                    href={skill.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mx-4 md:mx-12 cursor-pointer h-[40px] md:h-[60px] overflow-hidden shrink-0"
                  >
                    {/* Mobile: icône + texte côte à côte */}
                    <div className="flex md:hidden items-center gap-2 h-[40px]">
                      <span className="text-blue-400">{skill.icon}</span>
                      <span className={`text-lg font-light tracking-tight whitespace-nowrap ${index % 2 === 0 ? 'text-slate-300' : 'text-outline-marquee'}`}>
                        {skill.name}
                      </span>
                    </div>
                    {/* Desktop: effet hover */}
                    <div className="hidden md:flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.215,0.61,0.355,1)] group-hover:-translate-y-[60px]">
                      <span className={`h-[60px] flex items-center text-4xl font-light tracking-tight whitespace-nowrap ${index % 2 === 0 ? 'text-slate-300' : 'text-outline-marquee'}`}>
                        {skill.name}
                      </span>
                      <span className="h-[60px] flex items-center justify-center text-blue-400">
                        {skill.icon}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        ref={contactRef}
        className="py-32 px-6 md:px-16 lg:px-24 relative overflow-hidden bg-[#0f172a]"
      >
        <div className="reveal-hidden">
          <div className={`section-title-glow ${contactVisible ? 'is-visible' : ''}`}>
            <p className="text-blue-400 font-light tracking-[0.3em] text-sm mb-4">CONTACT</p>
            <h2 className="text-4xl md:text-5xl font-light tracking-[0.05em] mb-8 text-slate-100">
              Travaillons<br className="md:hidden" /> ensemble<span className="text-blue-500">.</span>
            </h2>
            <p className="text-slate-400 text-xl font-light tracking-wide mb-12 max-w-2xl">
              Un projet ambitieux ? Une refonte technique ? <br/>
              Discutons de la manière dont je peux apporter de la valeur à votre projet.
            </p>
          </div>
        </div>

        <div className="reveal-hidden delay-200">
          <div className={`section-title-glow ${contactVisible ? 'is-visible' : ''}`}>
            <a
              href="mailto:contact@freelance-lm.fr"
              className="inline-block relative group"
            >
              <span className="text-3xl md:text-5xl font-light tracking-[0.05em] bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-400 group-hover:to-blue-400 transition-all duration-300">
                contact@freelance-lm.fr
              </span>
              <span className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-slate-100 to-blue-400 scale-x-0 origin-right transition-transform duration-500 ease-[cubic-bezier(0.43,0.195,0.02,1)] group-hover:scale-x-100 group-hover:origin-left" />
            </a>
          </div>
        </div>

        <div className="reveal-hidden delay-300 mt-20 flex gap-12">
          {[
            { name: 'GitHub', icon: <Github />, url: 'https://github.com/Wandalf-dev' },
            { name: 'LinkedIn', icon: <Linkedin />, url: 'https://www.linkedin.com/in/lou-marche-90b988249' },
            { name: 'Malt', icon: <MaltLogo />, url: 'https://www.malt.fr/profile/loumarche' }
          ].map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 text-slate-400 hover:text-white transition-colors duration-300 group"
            >
              <div className="p-4 rounded-full bg-slate-800/50 group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                {link.icon}
              </div>
              <span className="text-sm font-light tracking-[0.2em] uppercase">{link.name}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm font-light tracking-wide bg-[#0B1120]">
        <span>© 2025 Lou Marche Portfolio</span>
        <div className="flex items-center gap-2">
          <span>Crafted with</span>
          <SiReact className="w-4 h-4 text-blue-400" />
          <span>&</span>
          <SiTailwindcss className="w-4 h-4 text-blue-400" />
        </div>
      </footer>
    </div>
  );
}
