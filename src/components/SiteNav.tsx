import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const LIENS = [
  { href: "#about", label: "À propos" },
  { href: "#skills", label: "Compétences" },
  { href: "#projects", label: "Projets" },
  { href: "#education", label: "Formation" },
  { href: "#contact", label: "Contact" },
];

/**
 * Transparente sur la vidéo, opaque dès qu'on quitte le hero.
 * Sous 768 px les liens passent dans un panneau plein écran : les entasser
 * dans la barre donnait des cibles de 28 px, trop petites au doigt.
 */
const SiteNav = () => {
  const [posee, setPosee] = useState(false);
  const [ouvert, setOuvert] = useState(false);
  const sansMouvement = useReducedMotion();
  const boutonRef = useRef<HTMLButtonElement>(null);
  const panneauRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setPosee(window.scrollY > window.innerHeight * 0.72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menu ouvert : on bloque le défilement et on capte Échap.
  useEffect(() => {
    if (!ouvert) return;
    const overflowInitial = document.body.style.overflow;
    const bouton = boutonRef.current; // capturé ici : le ref peut changer d'ici le nettoyage
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOuvert(false);
    };
    document.addEventListener("keydown", onKey);
    panneauRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();

    return () => {
      document.body.style.overflow = overflowInitial;
      document.removeEventListener("keydown", onKey);
      bouton?.focus();
    };
  }, [ouvert]);

  // Au-delà du seuil mobile, le panneau n'a plus lieu d'être.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => e.matches && setOuvert(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const surVideo = !posee && !ouvert;

  return (
    <>
      <motion.header
        initial={sansMouvement ? false : { y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className="fixed inset-x-0 top-0 z-nav px-3 pt-3 sm:px-6 sm:pt-5"
      >
        <nav
          aria-label="Navigation principale"
          className={`mx-auto flex max-w-5xl items-center justify-between gap-2 rounded-full py-2 pl-4 pr-2 transition-colors duration-500 sm:gap-4 sm:py-2.5 sm:pl-5 sm:pr-2.5 ${
            posee || ouvert ? "panel" : "panel-onvideo"
          }`}
        >
          <div className="flex items-center gap-6">
            <a
              href="#top"
              onClick={() => setOuvert(false)}
              className={`-mx-1 flex min-h-11 items-center px-1 font-display text-fluid-1 font-semibold leading-none tracking-tight ${
                posee || ouvert ? "text-ink" : "text-white"
              }`}
            >
              Arfang
            </a>

            <ul className="hidden items-center gap-6 md:flex">
              {LIENS.slice(0, 4).map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={`flex min-h-11 items-center text-fluid--1 font-medium transition-colors ${
                      posee ? "text-muted hover:text-ink" : "text-white/70 hover:text-white"
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <ThemeToggle surVideo={surVideo} />

            <a
              href="#contact"
              className={`hidden min-h-11 items-center rounded-full px-4 text-fluid--1 font-semibold transition-transform duration-300 ease-out-quint hover:scale-[1.04] md:flex ${
                posee ? "bg-accent text-accent-ink" : "bg-accent-onvideo text-accent-onvideo-ink"
              }`}
            >
              Contact
            </a>

            <button
              ref={boutonRef}
              type="button"
              onClick={() => setOuvert((v) => !v)}
              aria-expanded={ouvert}
              aria-controls="menu-mobile"
              aria-label={ouvert ? "Fermer le menu" : "Ouvrir le menu"}
              className={`grid h-11 w-11 place-items-center rounded-full transition-colors md:hidden ${
                posee || ouvert ? "text-ink hover:bg-raised" : "text-white hover:bg-white/10"
              }`}
            >
              {ouvert ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {ouvert && (
          <motion.div
            id="menu-mobile"
            ref={panneauRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={sansMouvement ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={sansMouvement ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-sticky flex flex-col bg-bg px-5 pb-8 pt-24 md:hidden"
          >
            <ul className="flex flex-col">
              {LIENS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={sansMouvement ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-line"
                >
                  <a
                    href={l.href}
                    onClick={() => setOuvert(false)}
                    className="flex min-h-[60px] items-center font-display text-fluid-2 text-ink"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <a
              href="/cv"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOuvert(false)}
              className="mt-8 flex min-h-[52px] items-center justify-center rounded-full bg-accent px-6 text-fluid-0 font-semibold text-accent-ink"
            >
              Voir mon CV
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SiteNav;
