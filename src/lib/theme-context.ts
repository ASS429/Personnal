import { createContext, useContext } from "react";

/** "auto" suit prefers-color-scheme ; "light"/"dark" sont des choix explicites. */
export type ChoixTheme = "auto" | "light" | "dark";
export type ThemeResolu = "light" | "dark";

export const CLE_THEME = "theme";

export type ThemeContextValue = {
  choix: ChoixTheme;
  /** Ce qui est réellement affiché, une fois "auto" résolu. */
  resolu: ThemeResolu;
  setChoix: (choix: ChoixTheme) => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme doit être appelé à l'intérieur de <ThemeProvider>.");
  }
  return ctx;
}
