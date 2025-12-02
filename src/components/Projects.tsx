"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProjectModal from "./ProjectModal";
import { useRecruiterMode } from "@/context/RecruiterModeContext";

const projects = [
    {
        title: "Fathom",
        description: "A Robust Framework for Conversational Agents with Probabilistic Reasoning for Consistent Persona Generation ",
        longDescription: `Reasoning for Consistent Persona Generation \t
                            \t● Innovating a hybrid conversational AI that challenges users’ beliefs, biases, and existential reasoning \n
                            \t● Introduces philosophical inconsistency detection and dialectic questioning to guide deeper thought. \n
                            \t● Uses knowledge graphs to ground responses in historical philosophical doctrines.`,
        tags: ["Python", "LangChains", "Ollama", "RAG", "Bayesian Inference", "Knowledge Graphs", "Philosophical Reasoning", "Neurosymbolic AI", "Explainable AI", "Cognitive Modeling & Ontologies", "Large Language Models", "Philosophy → Ontology Translation", "Prompt Engineering & Guardrails", "Embedding & Vector-store Engineering",
            "Human-in-the-loop Design"],
        teaser: "Probe the mind that probes you →"
    },
    {
        title: "Frame Interpolation & Enhancement Using Classical Optical Flow Techniques",
        description: `An end-to-end workflow in which Gunnar Farnebäck, TV-L1,Brox, Lucas Kanade, SimpleFlow, DeepFlow optical flow algorithms each perform
                    an estimation of dense motion fields followed by multi-scale warping, occlusion handling,
                    flow-based blending, temporal smoothing, and if desired, additional cinematic enhance
                    ments.`,
        longDescription: ` We have put particular emphasis on the following:
 ● Accurate pixel-based estimates of the motion occurring between two frames.
 ● Generation of similar intermediate frames that appear smooth and natural to observers.
 ● Robustness to noise, occlusions, and the effects of motion discontinuities.
 ● Clear explanation of results, including mathematical correctness.
 ● Independence from being trained or needing a training dataset.`,
        tags: ["Python", "OpenCV", "FFMPEG", "MatplotLib/Seaborn", "Concurrency & Performance"],
        teaser: "Inspect the motion hidden between moments →"
    },
    {
        title: "Samvedna ",
        description: "Sign Language - To - English/Regional Languages Translation using AI and Machine Learning",
        longDescription: `●	Designed and implemented a sentence level sign language interpreter that translates sign language to English as 
well 10 other Indian regional languages.
●	Implemented using OpenCV, MediaPipe, Scikit-Learn 
●	Success Rate (Accuracy) of 96.4% 
●	Shortlisted for Smart India Hackathon 2024 (out of 400 teams)
`,
        tags: ["Python", "OpenCV", "MediaPipe", "Scikit-Learn", "Machine Learning", "Computer Vision", "Supervised Learning", "Numpy"],
        teaser: "Watch silence learn to speak →"
    },
];

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
    const { isRecruiterMode } = useRecruiterMode();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: isRecruiterMode ? 0 : 0.15,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: isRecruiterMode ? 0.3 : 0.6,
                ease: "easeOut" as const,
            },
        },
    };

    return (
        <section id="projects" className="py-24 px-6 relative">
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: isRecruiterMode ? 0.3 : 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-cormorant font-medium inline-block relative text-moonlit-silver"
                        style={{
                            textShadow: isRecruiterMode
                                ? "none"
                                : "0 0 20px rgba(231, 245, 242, 0.4), 0 0 40px rgba(163, 230, 245, 0.2)",
                        }}
                    >
                        Forged Works
                        {!isRecruiterMode && (
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-silver-gleam/50 to-transparent"
                                style={{
                                    boxShadow: "0 0 8px rgba(195, 230, 225, 0.4)",
                                }}
                            />
                        )}
                    </h2>
                </motion.div>

                <div className="space-y-20">
                    {projects.map((project, index) => {
                        const isEven = index % 2 === 0;

                        return (
                            <motion.div
                                key={project.title}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}
                            >
                                {/* Project Screenshot - Magical Window */}
                                <motion.div
                                    className="w-full lg:w-3/5 magical-window aspect-video bg-gradient-to-br from-deep-forest/40 to-emerald-leaf/20 flex items-center justify-center relative overflow-hidden cursor-pointer"
                                    whileHover={isRecruiterMode ? {} : { scale: 1.02 }}
                                    onClick={() => setSelectedProject(project)}
                                    role="button"
                                    tabIndex={0}
                                    aria-label={`View ${project.title} screenshot`}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            setSelectedProject(project);
                                        }
                                    }}
                                >
                                    {/* Placeholder Image */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-deep-forest via-deep-river-teal to-emerald-leaf/30" />
                                    <div className="relative z-10 text-center px-6">
                                        <h3 className="text-2xl md:text-3xl font-cinzel font-semibold text-moonlit-silver mb-2">
                                            {project.title}
                                        </h3>
                                        <p className="text-silver-gleam/70 font-cormorant text-lg italic">
                                            {project.teaser}
                                        </p>
                                    </div>

                                    {/* Shimmer effect on hover */}
                                    {!isRecruiterMode && (
                                        <motion.div
                                            initial={{ opacity: 0, x: "-100%" }}
                                            whileHover={{ opacity: [0, 0.3, 0], x: ["0%", "100%"] }}
                                            transition={{ duration: 0.8 }}
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-silver-gleam/30 to-transparent pointer-events-none"
                                        />
                                    )}
                                </motion.div>

                                {/* Project Details */}
                                <div className="w-full lg:w-2/5 space-y-4">
                                    <h3 className="text-3xl md:text-4xl font-cinzel font-bold text-moonlit-silver leading-tight"
                                        style={{
                                            textShadow: isRecruiterMode ? "none" : "0 0 15px rgba(231, 245, 242, 0.3)"
                                        }}
                                    >
                                        {project.title}
                                    </h3>

                                    <p className="font-serif text-base md:text-lg text-elven-mist-white leading-relaxed">
                                        {project.description}
                                    </p>

                                    {/* Tech Stack Tags */}
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {project.tags.slice(0, 8).map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-xs font-cormorant px-3 py-1 rounded-full border backdrop-blur-sm"
                                                style={{
                                                    borderColor: "rgba(214, 196, 139, 0.3)",
                                                    color: "rgba(214, 196, 139, 0.9)",
                                                    background: "rgba(253, 251, 247, 0.1)",
                                                }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                        {project.tags.length > 8 && (
                                            <span
                                                className="text-xs font-cormorant px-3 py-1 rounded-full border backdrop-blur-sm"
                                                style={{
                                                    borderColor: "rgba(214, 196, 139, 0.3)",
                                                    color: "rgba(214, 196, 139, 0.9)",
                                                    background: "rgba(253, 251, 247, 0.1)",
                                                }}
                                            >
                                                +{project.tags.length - 8} more
                                            </span>
                                        )}
                                    </div>

                                    {/* View Details Button */}
                                    <button
                                        onClick={() => setSelectedProject(project)}
                                        className="group relative px-6 py-2 mt-4 overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 border border-emerald-leaf/50 hover:border-emerald-leaf"
                                    >
                                        <div className="absolute inset-0 bg-emerald-leaf/10 group-hover:bg-emerald-leaf/20 transition-all rounded-lg" />
                                        <span className="relative font-cormorant font-semibold text-emerald-leaf tracking-wider">
                                            View Full Details →
                                        </span>
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            <ProjectModal
                project={selectedProject}
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </section>
    );
}
