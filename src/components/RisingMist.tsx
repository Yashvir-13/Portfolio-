"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface MistParticle {
    id: number;
    delay: number;
    duration: number;
    x: number;
    size: number;
    opacity: number;
}

export default function RisingMist() {
    // Generate random mist particles
    const [mistParticles, setMistParticles] = useState<MistParticle[]>([]);

    useEffect(() => {
        setMistParticles(Array.from({ length: 6 }, (_, i) => ({
            id: i,
            delay: Math.random() * 5,
            duration: 12 + Math.random() * 8,
            x: 20 + Math.random() * 60, // Wider spread (20-80%)
            size: 400 + Math.random() * 300,
            opacity: 0.2 + Math.random() * 0.3,
        })));
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Static Dense Fog Layer at Bottom - Performance Friendly */}
            <div
                className="absolute bottom-0 left-0 right-0 h-[40vh] z-0"
                style={{
                    background: "linear-gradient(to top, rgba(231, 245, 242, 0.4) 0%, rgba(231, 245, 242, 0.1) 60%, transparent 100%)",
                    filter: "blur(20px)", // Single static blur is cheaper than many moving ones
                    transform: "translateZ(0)", // Force GPU
                }}
            />

            {/* Moving Mist Particles */}
            {mistParticles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${particle.x}%`,
                        bottom: -150,
                        width: particle.size,
                        height: particle.size,
                        // Use gradient for softness instead of heavy blur filter
                        background: "radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 70%)",
                        willChange: "transform, opacity",
                        transform: "translateZ(0)",
                    }}
                    animate={{
                        y: [-50, -600],
                        scale: [1, 1.5],
                        opacity: [0, particle.opacity, 0],
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}
