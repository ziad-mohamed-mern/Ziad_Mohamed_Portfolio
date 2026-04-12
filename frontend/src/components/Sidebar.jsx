import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    Home,
    User,
    Code2,
    Briefcase,
    Mail,
    Moon,
    Sun,
    Github,
    Linkedin,
    Twitter,
    Languages
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "../shared/translations";

const Sidebar = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
    const { language, toggleLanguage } = useLanguage();
    const { t } = useTranslation(language);
    const location = useLocation();

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    const navLinks = [
        { name: t('home'), path: "/", icon: <Home size={20} /> },
        { name: t('about'), path: "/about", icon: <User size={20} /> },
        { name: t('skills'), path: "/skills", icon: <Code2 size={20} /> },
        { name: t('portfolio'), path: "/portfolio", icon: <Briefcase size={20} /> },
        { name: t('contact'), path: "/contact", icon: <Mail size={20} /> },
    ];

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex fixed start-0 top-0 h-screen w-20 lg:w-64 flex-col justify-between border-e border-border bg-secondary/50 backdrop-blur-md z-50 transition-all duration-300">
                <div className="p-6 flex flex-col items-center">
                    <Link to="/" className="text-2xl font-bold text-foreground mb-8 hidden lg:block">
                        Ziad<span className="text-accent">Mohamed</span>
                    </Link>
                    <Link to="/" className="text-2xl font-bold text-accent mb-8 lg:hidden">
                        ZM
                    </Link>

                    <nav className="w-full">
                        <ul className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className={`flex items-center justify-center gap-4 p-3 rounded-xl transition-all duration-300 group ${location.pathname === link.path
                                            ? "bg-accent text-primary shadow-lg shadow-accent/20"
                                            : "text-subtitle hover:text-foreground hover:bg-white/5"
                                            }`}
                                    >
                                        <span className={`${location.pathname === link.path ? "text-primary" : "group-hover:text-accent"}`}>
                                            {link.icon}
                                        </span>
                                        <span className="font-medium hidden lg:block">{link.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <div className="p-6 flex flex-col gap-6 items-center">
                    <div className="flex gap-4 flex-col lg:flex-row lg:w-full justify-center">
                        <a href="https://github.com/pigpis-Curwud-0wikty" target="_blank" rel="noopener noreferrer" className="text-subtitle hover:text-accent transition-colors">
                            <Github size={20} />
                        </a>
                        <a href="https://linkedin.com/in/ziad-mohamed-dev" target="_blank" rel="noopener noreferrer" className="text-subtitle hover:text-accent transition-colors">
                            <Linkedin size={20} />
                        </a>
                    </div>

                    <button
                        onClick={toggleTheme}
                        className="p-3 rounded-xl bg-primary border border-border text-subtitle hover:text-foreground hover:border-accent transition-all w-full flex items-center justify-center gap-3"
                    >
                        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                        <span className="hidden lg:block font-medium">
                            {theme === "dark" ? t('lightMode') : t('darkMode')}
                        </span>
                    </button>

                    <button
                        onClick={toggleLanguage}
                        className="p-3 rounded-xl bg-primary border border-border text-subtitle hover:text-foreground hover:border-accent transition-all w-full flex items-center justify-center gap-3"
                    >
                        <Languages size={20} />
                        <span className="hidden lg:block font-medium">
                            {language === 'en' ? 'العربية' : 'English'}
                        </span>
                    </button>

                    <p className="text-xs text-subtitle text-center lg:text-start hidden lg:block">
                        © {new Date().getFullYear()} Ziad Mohamed
                    </p>
                </div>
            </aside>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 start-0 w-full bg-secondary/90 backdrop-blur-lg border-t border-border z-50 px-6 py-4">
                <ul className="flex justify-between items-center">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <Link
                                to={link.path}
                                className={`flex flex-col items-center gap-1 transition-colors ${location.pathname === link.path
                                    ? "text-accent"
                                    : "text-subtitle"
                                    }`}
                            >
                                {link.icon}
                                <span className="text-[10px] font-medium">{link.name}</span>
                            </Link>
                        </li>
                    ))}
                    <li>
                        <button
                            onClick={toggleLanguage}
                            className="flex flex-col items-center gap-1 text-subtitle"
                        >
                            <Languages size={20} />
                            <span className="text-[10px] font-medium">
                                {language === 'en' ? 'عربي' : 'EN'}
                            </span>
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={toggleTheme}
                            className="flex flex-col items-center gap-1 text-subtitle"
                        >
                            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                            <span className="text-[10px] font-medium">{t('theme')}</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Sidebar;
