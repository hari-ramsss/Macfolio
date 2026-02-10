import dayjs from "dayjs";

import { navLinks, navIcons } from "#constants";
import useWindowStore from "#store/window";
import useThemeStore from "#store/theme";
import { useState, useRef, useEffect } from "react";
import { Sun, Moon, Monitor, Check } from "lucide-react";

const themeOptions = [
    { key: "light", label: "Light", icon: Sun },
    { key: "dark", label: "Dark", icon: Moon },
    { key: "system", label: "System", icon: Monitor },
];

const Navbar = () => {
    const { openWindow } = useWindowStore();
    const { theme, setTheme } = useThemeStore();
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };
        if (showMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showMenu]);

    return (
        <nav>
            <div>
                <img src="/images/logo.svg" alt="logo" />
                <p className="font-bold dark:text-gray-200">Hari Ram's Portfolio</p>

                <ul>
                    {navLinks.map(({ name, type, id }) => {
                        return (
                            <li key={id} onClick={() => openWindow(type)}><p>{name}</p></li>
                        )
                    })}
                </ul>
            </div>
            <div>
                <ul>
                    {navIcons.map((item) => {
                        if (item.id === 4) {
                            return (
                                <li key={item.id} className="relative" ref={menuRef}>
                                    <img
                                        src={item.img}
                                        alt="theme"
                                        onClick={() => setShowMenu(!showMenu)}
                                        className="cursor-pointer"
                                    />
                                    <div
                                        className={`flex flex-col absolute left-1/2 -translate-x-1/2 top-full mt-2 w-36 bg-white/90 dark:bg-gray-800/95 backdrop-blur-xl rounded-lg border border-black/10 dark:border-white/10 shadow-[0_6px_24px_rgba(0,0,0,0.15)] py-1 px-1 z-9999 transition-all duration-200 origin-top ${showMenu
                                            ? "opacity-100 scale-100 pointer-events-auto"
                                            : "opacity-0 scale-95 pointer-events-none"
                                            }`}
                                    >
                                        <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 px-2 pt-0.5 pb-0.5 uppercase tracking-wider">Theme</p>
                                        {themeOptions.map(({ key, label, icon: Icon }) => (
                                            <button
                                                key={key}
                                                className={`flex items-center gap-1.5 w-full px-2 py-1 border-0 bg-transparent rounded cursor-pointer text-[12px] transition-colors duration-150 ${theme === key
                                                    ? "bg-blue-500/12 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400"
                                                    : "text-gray-700 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/8"
                                                    }`}
                                                onClick={() => {
                                                    setTheme(key);
                                                    setShowMenu(false);
                                                }}
                                            >
                                                <Icon className="w-3.5 h-3.5" />
                                                <span>{label}</span>
                                                {theme === key && <Check className="w-3 h-3 ml-auto" />}
                                            </button>
                                        ))}
                                    </div>
                                </li>
                            );
                        }
                        return (
                            <li key={item.id}><img src={item.img} alt="icon" /></li>
                        )
                    })}
                </ul>
                <time>{dayjs().format("ddd MMM D h:mm A")}</time>
            </div>
        </nav>
    )
}

export default Navbar