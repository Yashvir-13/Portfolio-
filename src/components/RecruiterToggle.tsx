"use client";

import { useRecruiterMode } from "@/context/RecruiterModeContext";
import { motion } from "framer-motion";
import { Briefcase, Sparkles } from "lucide-react";

export default function RecruiterToggle() {
    const { isRecruiterMode, toggleRecruiterMode } = useRecruiterMode();

    return (
        <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            onClick={toggleRecruiterMode}
            className={`fixed top-24 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 shadow-lg ${isRecruiterMode
                    ? "bg-pale-parchment text-ancient-wood border-2 border-ancient-wood/20"
                    : "glass-card text-autumn-gold border-2 border-autumn-gold/50 hover:border-glow"
                }`}
        >
            {isRecruiterMode ? (
                <>
                    <Sparkles size={16} />
                    <span className="text-sm font-sans font-bold">Elven Mode</span>
                </>
            ) : (
                <>
                    <Briefcase size={16} />
                    <span className="text-sm font-sans font-semibold">Recruiter Mode</span>
                </>
            )}
        </motion.button>
    );
}
