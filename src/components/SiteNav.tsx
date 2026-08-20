import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";

const LIENS = [
  { href: "#about", label: "À propos" },
  { href: "#skills", label: "Compétences" },
  { href: "#projects", label: "Projets" },
  { href: "#education", label: "Formation" },
];

/**
 * Transparente sur la vidéo, elle devient un panneau opaque dès qu'on quitte
 * le hero — sinon les liens deviennent illisibles sur le fond de la page.
 */
const SiteNav = () => {
  const [posee, setPosee] = useState(false);
  const sansMouvement = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setPosee(window.scrollY > window.innerHeight * 0.72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={sansMouvement ? false : { y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      className="fixed inset-x-0 top-0 z-nav px-4 pt-4 sm:px-6 sm:pt-5"
    >
      <nav
        aria-label="Navigation principale"
        className={`mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-full py-2.5 pl-5 pr-2.5 transition-colors duration-500 ${
          posee ? "panel" : "panel-onvideo"
        }`}
      >
        <div className="flex items-center gap-6">
          <a
            href="#top"
            className={`font-display text-fluid-1 font-semibold leading-none tracking-tight ${
              posee ? "text-ink" : "text-white"
            }`}
          >
            Arfang
          </a>

          <ul className="hidden items-center gap-6 md:flex">
            {LIENS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`text-fluid--1 font-medium transition-colors ${
                    posee
                      ? "text-muted hover:text-ink"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle surVideo={!posee} />
          <a
            href="#contact"
            className={`rounded-full px-4 py-2 text-fluid--1 font-semibold transition-transform duration-300 ease-out-quint hover:scale-[1.04] ${
              posee
                ? "bg-accent text-accent-ink"
                : "bg-accent-onvideo text-accent-onvideo-ink"
            }`}
          >
            Contact
          </a>
        </div>
      </nav>
    </motion.header>
  );
};

export default SiteNav;
