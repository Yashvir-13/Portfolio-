"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("hero");

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            const sections = ["hero", "about", "skills", "projects", "education", "contact"];
            const current = sections.find((section) => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });
            if (current) setActiveSection(current);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { name: "Home", href: "#hero", id: "hero" },
        { name: "About", href: "#about", id: "about" },
        { name: "Skills", href: "#skills", id: "skills" },
        { name: "Projects", href: "#projects", id: "projects" },
        { name: "Certifications", href: "#certifications", id: "education" },
        { name: "Contact", href: "#contact", id: "contact" },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "py-3 shadow-lg" : "py-6"
                }`}
            style={{
                background: scrolled
                    ? "rgba(255, 255, 255, 0.08)"
                    : "rgba(47, 76, 88, 0.3)",
                backdropFilter: scrolled ? "blur(24px)" : "blur(8px)",
                borderBottom: scrolled ? "1px solid rgba(231, 245, 242, 0.1)" : "none",
            }}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <a
                    href="#hero"
                    className="text-2xl font-cinzel font-bold text-moonlit-silver transition-all duration-300"
                    style={{
                        textShadow: "0 0 10px rgba(231, 245, 242, 0.3)",
                    }}
                >
                    Y
                </a>

                <ul className="hidden md:flex gap-8">
                    {navItems.map((item) => (
                        <li key={item.name} className="relative">
                            <a
                                href={item.href}
                                className="font-cormorant font-medium transition-all duration-300 relative block py-2 text-elven-mist-white hover:text-moonlit-silver"
                                style={{
                                    textShadow: activeSection === item.id
                                        ? "0 0 8px rgba(195, 230, 225, 0.5)"
                                        : "none",
                                    color: activeSection === item.id ? "#C3E6E1" : undefined,
                                }}
                            >
                                {item.name}

                                {activeSection === item.id && (
                                    <motion.div
                                        layoutId="activeSection"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-silver-gleam to-transparent"
                                        style={{
                                            boxShadow: "0 0 8px rgba(195, 230, 225, 0.6)",
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 380,
                                            damping: 30,
                                        }}
                                    />
                                )}
                            </a>
                        </li>
                    ))}
                </ul>

                <button className="md:hidden text-elven-mist-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </motion.nav>
    );
}
