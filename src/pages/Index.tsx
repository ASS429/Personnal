import { useEffect, useRef } from "react";
import { Globe, ArrowRight, Mail, FileText, Download } from "lucide-react";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import EducationSection from "@/components/EducationSection";
import PersonalSection from "@/components/PersonalSection";
import ContactSection from "@/components/ContactSection";

// WhatsApp brand icon (inline SVG — lucide doesn't ship one)
const WhatsAppIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

const animateOpacity = (el: HTMLVideoElement, to: number, duration = 500) => {
  const from = parseFloat(el.style.opacity || "0");
  const start = performance.now();
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    el.style.opacity = String(from + (to - from) * t);
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

const Index = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.style.opacity = "0";

    const onCanPlay = () => {
      v.play().catch(() => {});
      animateOpacity(v, 1, 500);
    };
    const onTimeUpdate = () => {
      if (v.duration && v.duration - v.currentTime <= 0.55) {
        animateOpacity(v, 0, 500);
      }
    };
    const onEnded = () => {
      v.style.opacity = "0";
      setTimeout(() => {
        v.currentTime = 0;
        v.play().catch(() => {});
        animateOpacity(v, 1, 500);
      }, 100);
    };

    v.addEventListener("canplay", onCanPlay, { once: true });
    v.addEventListener("timeupdate", onTimeUpdate);
    v.addEventListener("ended", onEnded);
    return () => {
      v.removeEventListener("timeupdate", onTimeUpdate);
      v.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    <div className="bg-black min-h-screen">
      {/* HERO */}
      <section className="min-h-screen overflow-hidden relative flex flex-col">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover object-bottom"
          muted
          autoPlay
          playsInline
          preload="auto"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
          style={{ opacity: 0 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

        {/* Navbar */}
        <nav className="relative z-20 px-6 py-6">
          <div className="liquid-glass rounded-full max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <Globe size={22} className="text-white" />
                <span className="text-white font-semibold text-lg tracking-tight">Arfang</span>
              </div>
              <div className="hidden md:flex items-center gap-7 ml-8">
                <a href="#about" className="text-white/80 hover:text-white text-sm font-medium">À propos</a>
                <a href="#skills" className="text-white/80 hover:text-white text-sm font-medium">Compétences</a>
                <a href="#projects" className="text-white/80 hover:text-white text-sm font-medium">Projets</a>
                <a href="#education" className="text-white/80 hover:text-white text-sm font-medium">Formation</a>
              </div>
            </div>
            <a
              href="#contact"
              className="liquid-glass rounded-full px-5 py-2 text-white text-sm font-medium"
            >
              Contact
            </a>
          </div>
        </nav>

        {/* Hero content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[10%] gap-8">
          <p className="text-white/60 text-xs md:text-sm tracking-[0.3em] uppercase liquid-glass rounded-full px-5 py-2">
            Arfang Souleymane Sané
          </p>

          <h1
            className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-white tracking-tight leading-[1.02]"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Développeur, <em className="italic text-white/80">Gestionnaire</em> & Designer.
          </h1>

          <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-xl px-4">
            Étudiant en Master MIAGE (Méthodes Informatiques Appliquées à la Gestion des Entreprises)
            à l'UGB. Je pilote des projets numériques, conçois des interfaces et développe des
            solutions qui accompagnent les entreprises et créateurs africains.
          </p>

          <div className="flex items-center gap-3 flex-wrap justify-center">
            <a
              href="#projects"
              className="bg-white rounded-full pl-6 pr-2 py-2 text-black text-sm font-medium flex items-center gap-3 hover:scale-105 transition-transform"
            >
              Voir les projets
              <span className="bg-black rounded-full p-2 text-white">
                <ArrowRight size={16} />
              </span>
            </a>

            {/* CV — split button: view + download */}
            <div className="liquid-glass rounded-full flex items-center overflow-hidden">
              <a
                href="/cv"
                target="_blank"
                rel="noopener noreferrer"
                className="pl-5 pr-4 py-3 text-white text-sm font-medium flex items-center gap-2 hover:bg-white/5 transition-colors"
                aria-label="Voir le CV"
              >
                <FileText size={16} /> Voir mon CV
              </a>
            </div>

            <a
              href="mailto:sanarfang429@gmail.com"
              className="liquid-glass rounded-full px-6 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors flex items-center gap-2"
            >
              <Mail size={16} /> Me contacter
            </a>
          </div>
        </div>

        {/* Social footer */}
        <div className="relative z-10 flex justify-center gap-4 pb-12">
          <a
            href="mailto:sanarfang429@gmail.com"
            className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
          <a
            href="https://wa.me/221781571009"
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all"
            aria-label="WhatsApp"
          >
            <WhatsAppIcon size={18} />
          </a>
          <a
            href="#about"
            className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all"
            aria-label="À propos"
          >
            <Globe size={18} />
          </a>
        </div>
      </section>

      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <EducationSection />
      <PersonalSection />
      <ContactSection />
    </div>
  );
};

export default Index;
