"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface Project {
    title: string;
    description: string;
    tags: string[];
    longDescription?: string;
    image?: string;
}

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    return (
        <AnimatePresence>
            {isOpen && project && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-deep-forest/90 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-2xl bg-deep-forest border border-emerald-green/30 rounded-lg shadow-[0_0_30px_rgba(93,174,139,0.2)] overflow-hidden"
                    >
                        {/* Decorative Border */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-green to-transparent" />

                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-moonlight-silver/60 hover:text-emerald-green transition-colors z-10"
                        >
                            <X size={24} />
                        </button>

                        <div className="p-8">
                            <h3 className="text-3xl font-decorative text-emerald-green mb-4 text-glow">
                                {project.title}
                            </h3>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.tags.map(tag => (
                                    <span key={tag} className="text-xs font-serif px-2 py-1 rounded border border-emerald-green/30 text-emerald-green/80 bg-emerald-green/5">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="prose prose-invert prose-sm font-serif text-moonlight-silver/80">
                                <p className="mb-4">{project.description}</p>
                                <div className="space-y-2">
                                    {(project.longDescription || "More details about this ancient artifact will be revealed soon...")
                                        .split('\n')
                                        .filter(line => line.trim().length > 0)
                                        .map((line, i) => {
                                            const cleanLine = line.trim().replace(/^[●•-]\s*/, '');
                                            return (
                                                <div key={i} className="flex gap-2 items-start">
                                                    <span className="text-emerald-green mt-1.5 text-[10px]">❖</span>
                                                    <span>{cleanLine}</span>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>

                            <div className="mt-8 flex gap-4">
                                <button
                                    onClick={() => window.open('https://github.com', '_blank')}
                                    className="px-6 py-2 bg-emerald-green text-deep-forest rounded hover:bg-emerald-green/90 transition-colors font-serif font-bold text-sm cursor-pointer"
                                >
                                    View Source
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
