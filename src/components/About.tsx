"use client";
import { Parisienne } from "next/font/google";

const signatureFont = Parisienne({
    subsets: ["latin"],
    weight: "400",
});

import { motion } from "framer-motion";
import { useRecruiterMode } from "@/context/RecruiterModeContext";
import Image from "next/image";

export default function About() {
    const { isRecruiterMode } = useRecruiterMode();

    return (
        <section id="about" className="py-24 px-6 relative">
            <div className="container mx-auto max-w-6xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: isRecruiterMode ? 0.3 : 0.8 }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-cormorant font-medium inline-block relative text-moonlit-silver"
                        style={{
                            textShadow: isRecruiterMode
                                ? "none"
                                : "0 0 20px rgba(231, 245, 242, 0.4), 0 0 40px rgba(163, 230, 245, 0.2)",
                        }}
                    >
                        About Me
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

                {/* 2-Column Grid Layout */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: isRecruiterMode ? 0 : 0.3, duration: isRecruiterMode ? 0.3 : 0.8 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                >
                    {/* Column 1: Archway Image */}
                    <motion.div
                        whileHover={isRecruiterMode ? {} : { scale: 1.02 }}
                        className="relative"
                    >
                        <div
                            className="aspect-[3/4] rounded-t-full overflow-hidden border-2 border-muted-brass relative"
                            style={{
                                boxShadow: "0 0 20px rgba(192, 178, 131, 0.3), inset 0 2px 4px rgba(0, 0, 0, 0.1)"
                            }}
                        >
                            {/* Replace 'about-image.jpg' with your actual image filename */}
                            <Image
                                src="/profile-image.png"
                                alt="About Yashvir - Rivendell themed portrait"
                                fill
                                className="object-cover"
                                priority
                            />

                            {/* Shine effect overlay */}
                            {!isRecruiterMode && (
                                <motion.div
                                    initial={{ opacity: 0, x: "-100%" }}
                                    animate={{ opacity: [0, 0.2, 0], x: ["0%", "100%"] }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        repeatDelay: 5,
                                        ease: "easeInOut"
                                    }}
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-silver-gleam/30 to-transparent"
                                />
                            )}
                        </div>
                    </motion.div>

                    {/* Column 2: Bio Text with Drop Cap */}
                    <div className="flex flex-col justify-center p-8 md:p-12 rounded-2xl backdrop-blur-md border elven-card">
                        <div className="prose prose-lg max-w-none">
                            {/* Bio with Drop Cap */}
                            <p className="mb-6 text-lg md:text-xl leading-relaxed font-serif text-elven-mist-white">
                                <span className="float-left text-5xl md:text-6xl font-serif leading-none text-[#C0B283] mr-3 mt-1">L</span>
                                ogic is only the beginning. While I am an engineering student by trade,
                                my approach to AI is deeply influenced by the humanities. I don't just build systems;
                                I try to understand the nature of the intelligence within them.
                            </p>
                            <p className="text-base md:text-lg leading-relaxed font-serif text-elven-mist-white mb-6">
                                My focus is Neurosymbolic AI : bridging the gap between neural intuition and symbolic reasoning.
                                This interest stems from a fascination with the nature of experience itself, whether it's questioning the paradox of free will within deterministic systems,
                                or analyzing how we & the machines we build construct a coherent reality from the chaos of perception
                            </p>
                            <p className="text-base md:text-lg leading-relaxed font-serif text-elven-mist-white mb-6">
                                I view code as a medium to test these philosophical questions. My goal is to contribute to research that makes AI not just faster,
                                but more interpretable, grounded, and aligned with human reasoning.
                            </p>

                            {/* Decorative Signature */}
                            <div className="text-right mt-8">
                                <p className={`${signatureFont.className} italic text-xl text-starlight-gold/80`}>
                                    ~ Yashvir
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
