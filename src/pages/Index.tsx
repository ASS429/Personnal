import { Suspense, lazy, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, FileText, Mail } from "lucide-react";
import SiteNav from "@/components/SiteNav";
// Three.js part en chunk separe : decoratif, il ne doit pas retarder le hero.
const HeroHalo = lazy(() => import("@/components/HeroHalo"));
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import EducationSection from "@/components/EducationSection";
import PersonalSection from "@/components/PersonalSection";
import ContactSection from "@/components/ContactSection";

const VIDEO_HERO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4";

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

/** Fondu court en fin de boucle : une coupe nette casserait l'ambiance. */
const fondre = (el: HTMLVideoElement, vers: number, duree = 520) => {
  const depart = parseFloat(el.style.opacity || "0");
  const t0 = performance.now();
  const pas = (now: number) => {
    const t = Math.min(1, (now - t0) / duree);
    el.style.opacity = String(depart + (vers - depart) * t);
    if (t < 1) requestAnimationFrame(pas);
  };
  requestAnimationFrame(pas);
};

const Index = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sansMouvement = useReducedMotion();

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.style.opacity = "0";

    const onCanPlay = () => {
      v.play().catch(() => {});
      fondre(v, 1);
    };
    const onTimeUpdate = () => {
      if (v.duration && v.duration - v.currentTime <= 0.55) fondre(v, 0);
    };
    const onEnded = () => {
      v.currentTime = 0;
      v.play().catch(() => {});
      fondre(v, 1);
    };

    v.addEventListener("canplay", onCanPlay, { once: true });
    v.addEventListener("timeupdate", onTimeUpdate);
    v.addEventListener("ended", onEnded);
    return () => {
      v.removeEventListener("timeupdate", onTimeUpdate);
      v.removeEventListener("ended", onEnded);
    };
  }, []);

  // Chorégraphie d'entrée : chaque élément arrive après le précédent.
  const entree = (delai: number) =>
    sansMouvement
      ? { initial: false as const, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const, delay: delai },
        };

  return (
    <div id="top" className="min-h-screen bg-bg text-ink">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-nav focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
      >
        Aller au contenu
      </a>

      <SiteNav />

      <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover object-bottom"
          muted
          autoPlay
          playsInline
          preload="auto"
          src={VIDEO_HERO}
          style={{ opacity: 0 }}
          aria-hidden="true"
        />

        {/* Les étoiles 3D prolongent celles de la vidéo. */}
        <Suspense fallback={null}>
          <HeroHalo className="pointer-events-none absolute inset-0 z-veil" />
        </Suspense>

        {/*
          Le voile fond vers --bg : le hero reste nocturne, mais il se raccorde
          au thème de la page, sombre comme clair.
        */}
        <div
          className="pointer-events-none absolute inset-0 z-veil"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.155 0.032 237 / 0.55) 0%, oklch(0.155 0.032 237 / 0.15) 28%, oklch(0.155 0.032 237 / 0.45) 64%, var(--bg) 100%)",
          }}
        />

        {/*
          Voile radial sous le bloc de texte : sans lui, le champ d'étoiles
          passe derrière le paragraphe et le rend illisible.
        */}
        <div
          className="pointer-events-none absolute inset-0 z-veil"
          style={{
            background:
              "radial-gradient(62% 48% at 50% 47%, oklch(0.13 0.03 237 / 0.62) 0%, oklch(0.13 0.03 237 / 0.28) 55%, transparent 100%)",
          }}
        />

        <div className="relative z-content mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center gap-6 px-6 pb-24 pt-28 text-center">
          <motion.p
            {...entree(0.35)}
            className="text-fluid--1 font-medium tracking-wide text-white/75"
          >
            Arfang Souleymane Sané
          </motion.p>

          <motion.h1
            {...entree(0.45)}
            className="font-display text-fluid-5 font-semibold text-white"
          >
            Développeur,{" "}
            <em className="font-medium italic text-accent-onvideo">Gestionnaire</em> &amp;
            Designer.
          </motion.h1>

          <motion.p
            {...entree(0.6)}
            className="max-w-[52ch] text-fluid-0 leading-relaxed text-white/90"
          >
            Étudiant en Master MIAGE à l'Université Gaston Berger de Saint-Louis. Je
            pilote des projets numériques, conçois des interfaces et développe des
            solutions pour les entreprises et créateurs africains.
          </motion.p>

          <motion.div
            {...entree(0.75)}
            className="flex flex-wrap items-center justify-center gap-3 pt-2"
          >
            <a
              href="#projects"
              className="group flex items-center gap-3 rounded-full bg-accent-onvideo py-2 pl-6 pr-2 text-fluid--1 font-semibold text-accent-onvideo-ink transition-transform duration-300 ease-out-quint hover:scale-[1.04]"
            >
              Voir les projets
              <span className="grid h-8 w-8 place-items-center rounded-full bg-accent-onvideo-ink text-accent-onvideo transition-transform duration-300 ease-out-quint group-hover:translate-x-0.5">
                <ArrowRight size={15} />
              </span>
            </a>

            <a
              href="/cv"
              target="_blank"
              rel="noopener noreferrer"
              className="panel-onvideo flex items-center gap-2 rounded-full px-5 py-3 text-fluid--1 font-medium transition-colors duration-300 hover:bg-white/10"
            >
              <FileText size={15} /> Voir mon CV
            </a>

            <a
              href="mailto:sanarfang429@gmail.com"
              className="panel-onvideo flex items-center gap-2 rounded-full px-5 py-3 text-fluid--1 font-medium transition-colors duration-300 hover:bg-white/10"
            >
              <Mail size={15} /> Me contacter
            </a>

            <a
              href="https://wa.me/221781571009"
              target="_blank"
              rel="noopener noreferrer"
              className="panel-onvideo grid h-11 w-11 place-items-center rounded-full transition-colors duration-300 hover:bg-white/10"
              aria-label="Écrire sur WhatsApp"
            >
              <WhatsAppIcon size={17} />
            </a>
          </motion.div>
        </div>

        <motion.a
          {...entree(1.1)}
          href="#about"
          className="relative z-content mx-auto mb-8 grid h-11 w-11 place-items-center rounded-full text-white/55 transition-colors hover:text-white"
          aria-label="Faire défiler vers À propos"
        >
          <motion.span
            animate={sansMouvement ? undefined : { y: [0, 5, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={18} />
          </motion.span>
        </motion.a>
      </section>

      <main>
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <EducationSection />
        <PersonalSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;
