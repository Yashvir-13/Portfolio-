"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Leaf {
    id: number;
    x: number;
    delay: number;
    duration: number;
    rotation: number;
    size: number;
}

export default function FallingLeaves() {
    const [leaves, setLeaves] = useState<Leaf[]>([]);

    useEffect(() => {
        // Increased count to 80 for denser effect
        const newLeaves: Leaf[] = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            delay: Math.random() * 10, // Spread out start times more
            duration: 15 + Math.random() * 15, // Slower, more varied fall
            rotation: Math.random() * 360,
            size: 0.4 + Math.random() * 0.6, // Varied sizes
        }));
        setLeaves(newLeaves);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {leaves.map((leaf) => (
                <motion.div
                    key={leaf.id}
                    className="absolute"
                    style={{
                        left: `${leaf.x}%`,
                        top: "-10%",
                        willChange: "transform", // Hardware acceleration
                    }}
                    animate={{
                        y: ["0vh", "110vh"],
                        x: [0, (Math.random() - 0.5) * 150], // More horizontal drift
                        rotate: [leaf.rotation, leaf.rotation + 360],
                    }}
                    transition={{
                        duration: leaf.duration,
                        delay: leaf.delay,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    <svg
                        width={20 * leaf.size}
                        height={24 * leaf.size}
                        viewBox="0 0 20 24"
                        fill="none"
                        className="opacity-60" // Slightly more visible
                    >
                        <path
                            d="M10 0C10 0 15 8 15 14C15 17.866 12.866 21 10 21C7.134 21 5 17.866 5 14C5 8 10 0 10 0Z"
                            fill="#C6903D"
                        />
                        <path
                            d="M10 0C10 0 12 6 16 10C18 12 18 14 16 16C14 18 12 18 10 16C8 14 6 10 10 0Z"
                            fill="#C6903D"
                            opacity="0.7"
                        />
                        <line
                            x1="10"
                            y1="0"
                            x2="10"
                            y2="21"
                            stroke="#8B6020"
                            strokeWidth="0.5"
                        />
                    </svg>
                </motion.div>
            ))}
        </div>
    );
}
