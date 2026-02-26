const THEME_TRANSITION_CLASS = "theme-transitioning";
const THEME_TRANSITION_DURATION_MS = 680;

let cleanupTimeoutId: number | undefined;

type DocumentWithViewTransition = Document & {
  startViewTransition?: (callback: () => void) => {
    finished?: Promise<void>;
  };
};

export function runThemeTransition(updateTheme: () => void) {
  if (typeof window === "undefined") {
    updateTheme();
    return;
  }

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    updateTheme();
    return;
  }

  const root = document.documentElement;
  const documentWithTransition = document as DocumentWithViewTransition;

  if (typeof documentWithTransition.startViewTransition === "function") {
    documentWithTransition.startViewTransition(() => {
      updateTheme();
    });
    return;
  }

  if (cleanupTimeoutId !== undefined) {
    window.clearTimeout(cleanupTimeoutId);
  }

  root.classList.add(THEME_TRANSITION_CLASS);

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      updateTheme();

      cleanupTimeoutId = window.setTimeout(() => {
        root.classList.remove(THEME_TRANSITION_CLASS);
        cleanupTimeoutId = undefined;
      }, THEME_TRANSITION_DURATION_MS);
    });
  });
}