/** localStorage key for persisted color theme */
export const THEME_STORAGE_KEY = "portfolio-theme";

export type ColorTheme = "light" | "dark";

/** Inline script for <Script strategy="beforeInteractive" /> — avoids light flash when user prefers dark. */
export const themeInitScript = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var d=document.documentElement;var t=localStorage.getItem(k);d.classList.remove("light","dark");if(t==="light"||t==="dark"){d.classList.add(t);}else{d.classList.add("dark");}}catch(e){document.documentElement.classList.add("dark");}})();`;
