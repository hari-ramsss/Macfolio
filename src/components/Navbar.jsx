import dayjs from "dayjs";

import { navLinks, navIcons } from "#constants";
import useWindowStore from "#store/window";
import useThemeStore from "#store/theme";
import { useState, useRef, useEffect } from "react";
import { Sun, Moon, Monitor, Check, MapPin, Mail, ExternalLink } from "lucide-react";
import { Wifi,BatteryFull } from "lucide-react";
const themeOptions = [
    { key: "light", label: "Light", icon: Sun },
    { key: "dark", label: "Dark", icon: Moon },
    { key: "system", label: "System", icon: Monitor },
];

const profileLinks = [
    { label: "GitHub", href: "https://github.com/hari-ramsss", icon: "/icons/github.svg" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/hari-ram-73179b2b5", icon: "/icons/linkedin.svg" },
    { label: "Instagram", href: "https://www.instagram.com/fforfunart/", icon: "/icons/instagram.svg" },
];

const Navbar = () => {
    const { openWindow } = useWindowStore();
    const { theme, setTheme } = useThemeStore();
    const [showMenu, setShowMenu] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const menuRef = useRef(null);
    const profileRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setShowMenu(false);
            }
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setShowProfile(false);
            }
        };
        if (showMenu || showProfile) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showMenu, showProfile]);

    return (
        <nav>
            <div className="max-sm:hidden">
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
            {/* Mobile iOS Status Bar - only visible on small screens */}
<div className="sm:hidden flex justify-between items-center w-full px-5 py-2">
  {/* Left: Time */}
  <time className="text-sm font-semibold text-white">
    {dayjs().format("h:mm A")}
  </time>
  
  {/* Center: Dynamic Island (black pill) */}
  <div className="w-48 h-7 bg-black rounded-full" />
  
  {/* Right: WiFi + Battery icons */}
  <div className="flex items-center gap-1.5">
    <Wifi className="w-4 h-4 text-white" />
    <BatteryFull className="w-5 h-5 text-white" />  {/* or use Battery from lucide-react */}
  </div>
</div>
            <div className="max-sm:hidden">
                <ul>
                    {navIcons.map((item) => {
                        if (item.id === 3) {
                            return (
                                <li key={item.id} className="relative"  ref={profileRef}>
                                    <img
                                        src={item.img}
                                        alt="profile"
                                        onClick={() => setShowProfile(!showProfile)}
                                        className="cursor-pointer"
                                    />
                                    <div
                                        className={`absolute right-0 top-full mt-2 w-64 bg-white/90 dark:bg-gray-800/95 backdrop-blur-xl rounded-xl border border-black/10 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.18)] z-9999 transition-all duration-200 origin-top-right overflow-hidden ${showProfile
                                            ? "opacity-100 scale-100 pointer-events-auto"
                                            : "opacity-0 scale-95 pointer-events-none"
                                            }`}
                                    >
                                        {/* Profile Header */}
                                        <div className="p-4 pb-3 flex items-center gap-3 border-b border-gray-200/60 dark:border-white/10">
                                            <img
                                                src="/images/blog3.png"
                                                alt="Hari Ram"
                                                className="w-11 h-11 rounded-full object-cover ring-2 ring-blue-500/30"
                                            />
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Hari Ram</p>
                                                <p className="text-[11px] text-gray-500 dark:text-gray-400">Full Stack Developer</p>
                                            </div>
                                        </div>

                                        {/* Details */}
                                        <div className="px-4 py-2.5 space-y-2 border-b border-gray-200/60 dark:border-white/10">
                                            <div className="flex items-center gap-2 text-[12px] text-gray-600 dark:text-gray-300">
                                                <Mail className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 flex-none" />
                                                <span className="truncate">hariramsathya2@gmail.com</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-[12px] text-gray-600 dark:text-gray-300">
                                                <MapPin className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 flex-none" />
                                                <span>Chennai, India</span>
                                            </div>
                                        </div>

                                        {/* Social Links */}
                                        <div className="px-2 py-1.5">
                                            {profileLinks.map(({ label, href, icon }) => (
                                                <a
                                                    key={label}
                                                    href={href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-[12px] text-gray-700 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/8 transition-colors no-underline"
                                                >
                                                    <img src={icon} alt={label} className="w-4 h-4 dark:invert dark:brightness-90" />
                                                    <span>{label}</span>
                                                    <ExternalLink className="w-3 h-3 ml-auto text-gray-400 dark:text-gray-500" />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </li>
                            );
                        }
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