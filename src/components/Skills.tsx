"use client";

import { useRecruiterMode } from "@/context/RecruiterModeContext";
import SkillsAccordion from "./SkillsAccordion";

export default function Skills() {
    const { isRecruiterMode } = useRecruiterMode();

    return (
        <section id="skills" className="py-24 px-6 relative overflow-hidden min-h-[800px] flex flex-col justify-center">
            {/* Particle drift background */}
            {!isRecruiterMode && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={i}
                            className="particle-drift absolute rounded-full bg-gradient-radial from-silver-gleam/10 to-transparent"
                            style={{
                                width: `${Math.random() * 40 + 20}px`,
                                height: `${Math.random() * 40 + 20}px`,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 8}s`,
                                animationDuration: `${Math.random() * 4 + 6}s`,
                            }}
                        />
                    ))}
                </div>
            )}

            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="text-center mb-16">
                    <h2
                        className="text-4xl md:text-5xl font-cormorant font-medium inline-block relative text-moonlit-silver"
                        style={{
                            textShadow: isRecruiterMode ? "none" : "0 0 20px rgba(231,245,242,0.36),0 0 40px rgba(163,230,245,0.18)",
                        }}
                    >
                        Lore & Craft
                    </h2>
                </div>

                {/* The Hall of Records - Horizontal Accordion */}
                <SkillsAccordion />
            </div>
        </section>
    );
}
