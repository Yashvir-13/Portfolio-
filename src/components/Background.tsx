"use client";

import Image from "next/image";
import FallingLeaves from "./FallingLeaves";
import RisingMist from "./RisingMist";
import { useRecruiterMode } from "@/context/RecruiterModeContext";

export default function Background() {
    const { isRecruiterMode } = useRecruiterMode();

    return (
        <div className="fixed inset-0 -z-10">
            {/* Layer 1: Solid Base Color */}
            <div className="absolute inset-0 bg-[#2F4C58]" />

            {/* Layer 2: Background Image */}
            {!isRecruiterMode && (
                <div className="absolute inset-0">
                    <Image
                        src="/Background.png"
                        alt="Rivendell Waterfall Background"
                        fill
                        className="object-cover object-center opacity-75 mix-blend-overlay"
                        priority
                        quality={90}
                    />
                </div>
            )}

            {/* Layer 3: Rising Waterfall Mist */}
            {!isRecruiterMode && <RisingMist />}

            {/* Layer 4: Falling Leaves */}
            {!isRecruiterMode && <FallingLeaves />}

            {/* Layer 5: Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-deep-river-teal/40" />

            {/* Recruiter Mode: Simple Gradient */}
            {isRecruiterMode && (
                <div className="absolute inset-0 bg-gradient-to-br from-deep-river-teal/30 via-mithril-silver/50 to-autumn-gold/20" />
            )}
        </div>
    );
}
