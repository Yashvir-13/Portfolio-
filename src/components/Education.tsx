"use client";

import { motion } from "framer-motion";
import { useRecruiterMode } from "@/context/RecruiterModeContext";

const experience = [
    {
        title: "Senior Full-Stack Developer",
        company: "Tech Innovations Inc.",
        year: "2022 - Present",
        description: "Leading development of scalable web applications using React, Next.js, and Node.js. Mentoring junior developers and establishing best practices.",
    },
    {
        title: "Full-Stack Developer",
        company: "Digital Solutions Ltd.",
        year: "2020 - 2022",
        description: "Built and maintained client projects with focus on performance optimization and user experience. Implemented CI/CD pipelines.",
    },
    {
        title: "Frontend Developer",
        company: "Creative Studios",
        year: "2018 - 2020",
        description: "Developed responsive web interfaces and interactive components. Collaborated with designers to bring creative visions to life.",
    },
];

export default function Education() {
    const { isRecruiterMode } = useRecruiterMode();

    return (
        <section id="education" className="py-24 px-6 relative">
            <div className="container mx-auto max-w-4xl relative z-10">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: isRecruiterMode ? 0 : 0.6 }}
                    className={`text-4xl md:text-5xl font-serif font-bold mb-16 text-center ${isRecruiterMode ? 'text-ancient-wood' : 'text-ancient-wood text-glow-gold'
                        }`}
                >
                    The Path
                </motion.h2>

                <div className="relative border-l-2 border-autumn-gold/30 ml-6 md:ml-12 space-y-12">
                    {experience.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                delay: isRecruiterMode ? 0 : index * 0.2,
                                duration: isRecruiterMode ? 0 : 0.6,
                            }}
                            className="relative pl-8 md:pl-16 group"
                        >
                            {/* Diamond Marker (Silmaril) */}
                            <div className="absolute -left-[9px] top-2 group">
                                <motion.div
                                    whileHover={isRecruiterMode ? {} : { scale: 1.3 }}
                                    className={`w-4 h-4 rotate-45 bg-gradient-to-br from-autumn-gold to-starlight-silver border-2 border-autumn-gold transition-all duration-300 ${isRecruiterMode ? '' : 'group-hover:border-glow group-hover:shadow-lg'
                                        }`}
                                >
                                    {/* Inner glow */}
                                    {!isRecruiterMode && (
                                        <div className="absolute inset-0 bg-autumn-gold/50 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                                    )}
                                </motion.div>
                            </div>

                            {/* Glass Card */}
                            <div className="glass-panel p-6">
                                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-3">
                                    <h3 className="text-xl md:text-2xl font-serif font-bold text-ancient-wood">
                                        {item.title}
                                    </h3>
                                    <span className="font-sans text-autumn-gold italic text-sm md:text-base mt-1 md:mt-0">
                                        {item.year}
                                    </span>
                                </div>

                                <h4 className="text-lg font-sans font-semibold text-ancient-wood/80 mb-3">
                                    {item.company}
                                </h4>

                                <p className="text-ancient-wood/70 font-sans leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
