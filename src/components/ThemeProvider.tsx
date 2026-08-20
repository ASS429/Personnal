import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  CLE_THEME,
  ThemeContext,
  type ChoixTheme,
  type ThemeResolu,
} from "@/lib/theme-context";

const REQUETE_SOMBRE = "(prefers-color-scheme: dark)";

function lireChoixStocke(): ChoixTheme {
  try {
    const v = localStorage.getItem(CLE_THEME);
    return v === "dark" || v === "light" ? v : "auto";
  } catch {
    return "auto";
  }
}

function preferenceSysteme(): ThemeResolu {
  return window.matchMedia(REQUETE_SOMBRE).matches ? "dark" : "light";
}

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [choix, setChoixState] = useState<ChoixTheme>(lireChoixStocke);
  const [systeme, setSysteme] = useState<ThemeResolu>(preferenceSysteme);

  // Suit les changements de thème de l'OS pendant que la page est ouverte.
  useEffect(() => {
    const mq = window.matchMedia(REQUETE_SOMBRE);
    const onChange = (e: MediaQueryListEvent) => setSysteme(e.matches ? "dark" : "light");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const resolu: ThemeResolu = choix === "auto" ? systeme : choix;

  // En "auto" on retire l'attribut : le CSS repasse alors sous prefers-color-scheme.
  useEffect(() => {
    const racine = document.documentElement;
    if (choix === "auto") {
      racine.removeAttribute("data-theme");
    } else {
      racine.setAttribute("data-theme", choix);
    }
    try {
      if (choix === "auto") {
        localStorage.removeItem(CLE_THEME);
      } else {
        localStorage.setItem(CLE_THEME, choix);
      }
    } catch {
      /* mode privé : le choix vaut pour la session seulement */
    }
  }, [choix]);

  const setChoix = useCallback((c: ChoixTheme) => setChoixState(c), []);
  const value = useMemo(() => ({ choix, resolu, setChoix }), [choix, resolu, setChoix]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
