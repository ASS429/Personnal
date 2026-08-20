import { motion, useReducedMotion } from "framer-motion";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme-context";
import type { ChoixTheme } from "@/lib/theme-context";

const OPTIONS: { valeur: ChoixTheme; label: string; Icone: typeof Sun }[] = [
  { valeur: "auto", label: "Thème automatique", Icone: Monitor },
  { valeur: "light", label: "Thème clair", Icone: Sun },
  { valeur: "dark", label: "Thème sombre", Icone: Moon },
];

/**
 * Trois états plutôt que deux : sans "auto", on ne peut plus revenir au
 * réglage du système une fois qu'on a cliqué.
 */
const ThemeToggle = ({ surVideo = false }: { surVideo?: boolean }) => {
  const { choix, setChoix } = useTheme();
  const sansMouvement = useReducedMotion();

  return (
    <div
      role="radiogroup"
      aria-label="Thème de la page"
      className={`inline-flex items-center gap-0.5 rounded-full p-0.5 ${
        surVideo ? "panel-onvideo" : "border border-line bg-surface"
      }`}
    >
      {OPTIONS.map(({ valeur, label, Icone }) => {
        const actif = choix === valeur;
        return (
          <button
            key={valeur}
            type="button"
            role="radio"
            aria-checked={actif}
            aria-label={label}
            title={label}
            onClick={() => setChoix(valeur)}
            className="relative grid h-7 w-7 place-items-center rounded-full transition-colors duration-200"
          >
            {actif && (
              <motion.span
                layoutId="theme-actif"
                transition={
                  sansMouvement
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 420, damping: 34 }
                }
                className="absolute inset-0 rounded-full bg-accent"
              />
            )}
            <Icone
              size={13}
              strokeWidth={2.1}
              className={`relative z-content ${
                actif
                  ? "text-accent-ink"
                  : surVideo
                    ? "text-white/65"
                    : "text-muted"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default ThemeToggle;
