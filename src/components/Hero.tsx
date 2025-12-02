"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRecruiterMode } from "@/context/RecruiterModeContext";
import { ChevronDown } from "lucide-react";

export default function Hero() {
    const { isRecruiterMode } = useRecruiterMode();

    // Typewriter effect for cycling taglines
    const taglines = [
        "Bridging Neural & Symbolic Logic",   // The What (Technical)
        "Building Systems That Reason",    // The Goal (Visionary)
        "From Philosophy to Applied AI",
        "Engineering Explainable Intelligence",
    ];
    const [currentTagline, setCurrentTagline] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (isRecruiterMode) {
            setDisplayText(taglines[0]);
            return;
        }

        const targetText = taglines[currentTagline];
        const typingSpeed = isDeleting ? 50 : 100;

        const timer = setTimeout(() => {
            if (!isDeleting && displayText === targetText) {
                // Pause before deleting
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && displayText === "") {
                // Move to next tagline
                setIsDeleting(false);
                setCurrentTagline((prev) => (prev + 1) % taglines.length);
            } else if (isDeleting) {
                // Delete character
                setDisplayText(targetText.substring(0, displayText.length - 1));
            } else {
                // Type character
                setDisplayText(targetText.substring(0, displayText.length + 1));
            }
        }, typingSpeed);

        return () => clearTimeout(timer);
    }, [displayText, isDeleting, currentTagline, isRecruiterMode]);

    return (
        <motion.section
            id="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-20"
        >
            {/* Enhanced Glass Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: isRecruiterMode ? 0.3 : 1.2, ease: "easeOut", delay: 0.2 }}
                className="relative z-10 p-12 md:p-16 max-w-3xl mx-4 text-center glass-card min-w-[485px]"
            >
                {/* Subtle radial gradient behind text */}
                <div className="absolute inset-0 bg-gradient-radial from-moonlit-silver/5 via-transparent to-transparent rounded-3xl" />

                {/* Profile Picture Glow - With Floating Animation */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: isRecruiterMode ? 0 : [0, -10, 0]
                    }}
                    transition={{
                        delay: isRecruiterMode ? 0.1 : 0.5,
                        duration: isRecruiterMode ? 0.3 : 1,
                        y: {
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }
                    }}
                    className="mb-8 flex justify-center relative z-10"
                >
                    <div className="relative group">
                        {!isRecruiterMode && (
                            <div className="absolute inset-0 bg-starlight-gold/40 blur-3xl rounded-full scale-125" />
                        )}

                        <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-starlight-gold to-moonlit-silver border-2 border-moonlit-silver/60 flex items-center justify-center text-4xl font-cinzel text-deep-forest shadow-xl transition-all duration-300 group-hover:shadow-[0_0_40px_rgba(214,196,139,0.8),0_0_80px_rgba(214,196,139,0.5)]">
                            Y
                        </div>
                    </div>
                </motion.div>

                {/* Greeting - Decorative Elvish */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: isRecruiterMode ? 0.2 : 0.7, duration: isRecruiterMode ? 0.3 : 0.8 }}
                    className="text-pale-moon-cyan font-cinzel italic mb-4 text-lg tracking-wider relative z-10"
                >
                    Mae Govannen
                </motion.p>

                {/* Name - Cinzel Semibold with Moonlit Glow */}
                <motion.h1
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: isRecruiterMode ? 0.3 : 0.9, duration: isRecruiterMode ? 0.3 : 1 }}
                    className="text-5xl md:text-7xl font-cinzel font-semibold mb-4 relative z-10 text-moonlit-silver"
                    style={{
                        textShadow: isRecruiterMode
                            ? "none"
                            : "0 0 20px rgba(231, 245, 242, 0.4), 0 0 40px rgba(163, 230, 245, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    YASHVIR
                </motion.h1>

                {/* Divider */}
                <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "100%", opacity: 1 }}
                    transition={{ delay: isRecruiterMode ? 0.4 : 1.1, duration: isRecruiterMode ? 0.3 : 1 }}
                    className="h-px bg-gradient-to-r from-transparent via-silver-gleam/50 to-transparent max-w-md mx-auto mb-6 relative z-10"
                />

                {/* Tagline - Typewriter Effect */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: isRecruiterMode ? 0.5 : 1.3, duration: isRecruiterMode ? 0.3 : 0.8 }}
                    className="text-xl md:text-2xl font-cormorant font-medium mb-10 tracking-wide relative z-10 text-moonlit-silver h-8 md:h-10"
                    style={{
                        textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    {displayText}
                    {!isRecruiterMode && <span className="animate-pulse">|</span>}
                </motion.p>

                {/* Enhanced CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: isRecruiterMode ? 0.6 : 1.5, duration: isRecruiterMode ? 0.3 : 0.6 }}
                    className="flex flex-col md:flex-row gap-4 justify-center items-center relative z-10"
                >
                    {/* Download Resume - Silver Outline */}
                    <a
                        href="/resume.pdf"
                        download="Yashvir_Resume.pdf"
                        className={`group relative px-10 py-3 overflow-hidden rounded-xl transition-all duration-300 hover:scale-105 ${!isRecruiterMode ? 'phial-glow' : ''}`}
                    >
                        <div className="absolute inset-0 border-2 border-silver-gleam/50 rounded-xl group-hover:border-silver-gleam transition-colors" />
                        <div className="absolute inset-0 bg-silver-gleam/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                        {!isRecruiterMode && (
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity blur-xl bg-silver-gleam/30" />
                        )}
                        <span className="relative font-cormorant font-semibold text-silver-gleam tracking-wider text-lg">
                            Download Resume
                        </span>
                    </a>
                </motion.div>
            </motion.div>

            {/* Breathing Scroll Indicator */}
            {!isRecruiterMode && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
                >
                    <motion.div
                        animate={{
                            y: [0, 12, 0],
                            opacity: [0.4, 1, 0.4],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="text-silver-gleam drop-shadow-lg"
                    >
                        <ChevronDown size={32} strokeWidth={2} />
                    </motion.div>
                </motion.div>
            )}
        </motion.section>
    );
}
