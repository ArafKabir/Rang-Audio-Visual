import {useEffect, useState} from "react";

import SunIcon from "/sun.png";
import MoonIcon from "/moon.png";

export function DarkModeToggle(){
    const [theme, setTheme] = useState<"light" | "dark">(() => {
        // initialize from localStorage or OS preference
        if (typeof window === "undefined") return "light";
        const saved = localStorage.getItem("theme");
        if (saved === "dark" || saved === "light") return saved;
        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    });

    useEffect(() => {
        const root = document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggle = () => {
        setTheme((t) => (t === "dark" ? "light" : "dark"));
    };

    return (
        <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="p-2 rounded focus:outline-none"
        >
            {theme === "dark" ? (
                <img src={SunIcon} alt="Switch to light mode" className="w-6 h-6" />
            ) : (
                <img src={MoonIcon} alt="Switch to dark mode" className="w-6 h-6" />
            )}
        </button>
    );
}