"use client";

import { motion } from "framer-motion";
import { useRecruiterMode } from "@/context/RecruiterModeContext";
import { ExternalLink, Scroll } from "lucide-react";
import { useState } from "react";

const certifications = [
    {
        title: "Deep Learning Specialization",
        issuer: "DeepLearning.AI",
        date: "2024",
        description: `Built neural network architectures such as Convolutional Neural Networks, Recurrent Neural Networks, LSTMs, Transformers, and learned how to make them better with strategies such as Dropout, BatchNorm, and Xavier/He initialization.`,
        link: "https://coursera.org/verify/specialization/KDHF8GJOZME7",
    },
    {
        title: "Generative AI with Large Language Models",
        issuer: "DeepLearning.AI and AWS",
        date: "2025",
        description: `Gained foundational knowledge, practical skills, and a functional understanding of how generative AI works. Explored the latest research on GenAI.`,
        link: "https://coursera.org/verify/8CDGU0BSI106",
    },
    {
        title: "Develop Generative AI Applications",
        issuer: "IBM",
        date: "2025",
        description: `Mastered the basics of GenAI and the LangChain framework, focusing on how prompt engineering and in-context learning enhance AI interactions.`,
        link: "https://coursera.org/verify/M4MKQTDSIWZY",
    },
    {
        title: "Build RAG Applications",
        issuer: "IBM",
        date: "2025",
        description: `Developed a practical understanding of Retrieval-Augmented Generation (RAG), building user-friendly interfaces with Gradio and comparing LangChain and LlamaIndex workflows.`,
        link: "https://www.coursera.org/account/accomplishments/certificate/JMTQJFXXA4HY",
    },
    {
        title: "Vector Databases for RAG",
        issuer: "IBM",
        date: "2025",
        description: `Differentiated between vector and traditional databases, executed core operations in ChromaDB, and applied similarity search techniques.`,
        link: "https://www.coursera.org/account/accomplishments/certificate/KI2NCDRSXEXF",
    },
    {
        title: "Databases and SQL for Data Science",
        issuer: "IBM",
        date: "2025",
        description: `Analyzed data in relational databases using SQL and Python. Created schemas, worked with multiple tables via DDL/DML, and used views and stored procedures.`,
        link: "https://www.coursera.org/account/accomplishments/certificate/WS6WL9FHD427",
    },
    {
        title: "Unsupervised Machine Learning",
        issuer: "IBM",
        date: "2025",
        description: `Explored clustering algorithms (K-Means, Hierarchical, DBSCAN), distance metrics, and dimensionality reduction (PCA, NMF) using Scikit-learn.`,
        link: "https://coursera.org/verify/UV9KJOJC4KSI",
    },
    {
        title: "C++ Basics: Selection and Iteration",
        issuer: "Codio",
        date: "2024",
        description: `Learned how to use variables, operators, selection statements, and loops to build basic control flow in C++ programs.`,
        link: "https://www.coursera.org/account/accomplishments/certificate/JXRVBXREEMEV",
    },
    {
        title: "Introduction to Bayesian Statistics",
        issuer: "Databricks",
        date: "2025",
        description: `Learned core probability and Bayesian statistics concepts and applied them using Python for computational modeling and inference.`,
        link: "https://www.coursera.org/account/accomplishments/certificate/4Z66A84ZM1FV",
    },
    {
        title: "Introduction to Java",
        issuer: "LearnQuest",
        date: "2024",
        description: `Covered Java syntax, data types, expressions, operators, branching, and looping constructs to write simple Java applications.`,
        link: "https://www.coursera.org/account/accomplishments/certificate/Q8CLK84SMWDD",
    },
];

export default function Certifications() {
    const { isRecruiterMode } = useRecruiterMode();
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);

    // Split into 2 rows (Unique data)
    const midPoint = Math.ceil(certifications.length / 2);
    const rows = [
        certifications.slice(0, midPoint),
        certifications.slice(midPoint)
    ];

    // Parallax speeds (duration in seconds)
    const speeds = [50, 40];

    return (
        <section
            id="certifications"
            className="py-32 relative overflow-hidden min-h-[800px] flex flex-col justify-center"
            style={{
                maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
            }}
        >
            {/* Inject CSS for marquee animation */}
            <style jsx global>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-25%); }
                }
                .animate-marquee {
                    animation: marquee linear infinite;
                }
            `}</style>

            {/* Mist Wisps Background Animation */}
            {!isRecruiterMode && (
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute h-[2px] bg-moonlit-silver/20 blur-[1px] rounded-full"
                            style={{
                                top: `${10 + Math.random() * 80}%`,
                                left: "-20%",
                                width: `${20 + Math.random() * 30}%`,
                            }}
                            animate={{
                                x: ["0vw", "120vw"],
                                opacity: [0, 0.9, 0]
                            }}
                            transition={{
                                duration: 6 + Math.random() * 8,
                                repeat: Infinity,
                                ease: "linear",
                                delay: Math.random() * 5
                            }}
                        />
                    ))}
                </div>
            )}

            <div className="container mx-auto relative z-10 mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h2 className={`text-4xl md:text-5xl font-serif font-bold inline-block relative ${isRecruiterMode ? 'text-ancient-wood' : 'text-ancient-wood text-glow-gold'}`}>
                        Scrolls of Mastery
                    </h2>
                </motion.div>
            </div>

            {/* Parallax Rows */}
            <div className="flex flex-col gap-20">
                {rows.map((rowItems, rowIndex) => {
                    // Duplicate items for infinite loop (x4)
                    const marqueeItems = [...rowItems, ...rowItems, ...rowItems, ...rowItems];
                    const isRowHovered = hoveredRow === rowIndex;

                    return (
                        <div
                            key={rowIndex}
                            className="flex overflow-hidden relative w-full py-10 -my-10" // Negative margin hack to allow hover expansion without layout shift
                            onMouseEnter={() => setHoveredRow(rowIndex)}
                            onMouseLeave={() => setHoveredRow(null)}
                        >
                            <div
                                className="flex gap-8 pl-8 animate-marquee"
                                style={{
                                    width: "fit-content",
                                    animationDuration: `${speeds[rowIndex]}s`,
                                    animationPlayState: isRowHovered ? 'paused' : 'running'
                                }}
                            >
                                {marqueeItems.map((item, index) => {
                                    // Faster, Dynamic Levitation
                                    const levitationDelay = (index % 5) * 2.5;
                                    const levitationDuration = 2 + Math.random() * 15;

                                    return (
                                        <motion.div
                                            key={`${item.title}-${rowIndex}-${index}`}
                                            className={`
                                                group relative w-[300px] shrink-0 overflow-hidden
                                                backdrop-blur-md transition-all duration-300 ease-out
                                                ${isRecruiterMode
                                                    ? "bg-white/80 border border-gray-200 shadow-lg rounded-xl"
                                                    : "bg-deep-forest/10 border border-white/10 hover:border-autumn-gold/60 hover:bg-deep-forest/40 hover:shadow-[0_0_40px_rgba(214,196,139,0.2)]"
                                                }
                                                /* Organic Shape: Elven Stone / Leaf */
                                                ${!isRecruiterMode && "rounded-[30px_10px_30px_10px]"}
                                                
                                                /* Hover Expansion */
                                                h-[230px] hover:h-[320px] hover:-translate-y-4 hover:z-50
                                            `}
                                            // Dynamic Levitation: Pause on hover
                                            animate={isRecruiterMode || isRowHovered ? { y: 0 } : { y: [-25, 25, -25] }}
                                            transition={{
                                                y: {
                                                    duration: levitationDuration,
                                                    repeat: Infinity,
                                                    ease: "easeInOut",
                                                    delay: levitationDelay
                                                }
                                            }}
                                        >
                                            {/* Glass Reflection */}
                                            {!isRecruiterMode && (
                                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                                            )}

                                            <div className="p-6 flex flex-col h-full relative z-10">
                                                {/* Header */}
                                                <div className="mb-3 border-b border-white/10 pb-2 flex justify-between items-start">
                                                    <Scroll className="w-4 h-4 text-autumn-gold shrink-0 opacity-80 mt-1" />
                                                    <span className="font-sans text-autumn-gold/60 text-[10px] tracking-widest uppercase">
                                                        {item.issuer}
                                                    </span>
                                                </div>

                                                <h3 className={`text-lg font-serif font-bold leading-tight mb-2 ${isRecruiterMode ? 'text-gray-900' : 'text-moonlit-silver'}`}>
                                                    {item.title}
                                                </h3>

                                                {/* Description */}
                                                <div className="flex-grow overflow-hidden relative">
                                                    <p className={`text-xs leading-relaxed ${isRecruiterMode ? 'text-gray-700' : 'text-moonlit-silver/60'} line-clamp-3 group-hover:line-clamp-none transition-all duration-300`}>
                                                        {item.description}
                                                    </p>
                                                </div>

                                                {/* Footer - Reveal on Hover */}
                                                <div className="mt-auto pt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                                                    <a
                                                        href={item.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={`
                                                            flex items-center justify-center gap-2 w-full py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all
                                                            ${isRecruiterMode
                                                                ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                                : "bg-white/10 text-autumn-gold hover:bg-autumn-gold/20 hover:text-autumn-gold border border-autumn-gold/20"
                                                            }
                                                        `}
                                                    >
                                                        <span>Verify Credential</span>
                                                        <ExternalLink size={12} />
                                                    </a>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
