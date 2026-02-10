import { create } from "zustand";

const getSystemTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const applyTheme = (theme) => {
    const resolved = theme === "system" ? getSystemTheme() : theme;
    document.documentElement.classList.toggle("dark", resolved === "dark");
};

const useThemeStore = create((set) => {
    const saved = localStorage.getItem("theme") || "system";
    applyTheme(saved);

    window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", () => {
            const current = useThemeStore.getState().theme;
            if (current === "system") applyTheme("system");
        });

    return {
        theme: saved,
        setTheme: (theme) => {
            localStorage.setItem("theme", theme);
            applyTheme(theme);
            set({ theme });
        },
    };
});

export default useThemeStore;
