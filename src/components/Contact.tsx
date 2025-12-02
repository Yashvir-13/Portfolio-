"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useRecruiterMode } from "@/context/RecruiterModeContext";
import { Github, Linkedin, Send, BookOpen, Loader2, Mail, ExternalLink } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function Contact() {
    const { isRecruiterMode } = useRecruiterMode();
    const formRef = useRef<HTMLFormElement>(null);
    const [isSending, setIsSending] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formRef.current) return;

        setIsSending(true);
        setStatus("idle");

        // ⚠️ IMPORTANT: REPLACE THESE WITH YOUR ACTUAL EMAILJS KEYS ⚠️
        // Sign up at https://www.emailjs.com/ to get these.
        const SERVICE_ID = "service_o9eu1zr";
        const TEMPLATE_ID = "template_kdb8qdc";
        const PUBLIC_KEY = "PY9IHLledKW2O_n8o";

        /*if (SERVICE_ID === "service_o9eu1zr") {
            // Simulate success for demo if keys aren't set
            setTimeout(() => {
                setStatus("success");
                setIsSending(false);
                formRef.current?.reset();
                alert("Please configure your EmailJS keys in src/components/Contact.tsx to actually send emails!");
            }, 1500);
            return;
        }*/


        emailjs
            .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
            .then(
                () => {
                    setStatus("success");
                    setIsSending(false);
                    formRef.current?.reset();
                },
                (error) => {
                    console.error("FAILED...", error);
                    setStatus("error");
                    setIsSending(false);
                }
            );

    };

    const socialLinks = [
        {
            name: "GitHub",
            icon: Github,
            url: "https://github.com/Yashvir-13", // Placeholder
            label: "Code Vault"
        },
        {
            name: "LinkedIn",
            icon: Linkedin,
            url: "https://linkedin.com/in/yashvir-s-71281228a", // Placeholder
            label: "Professional Network"
        },
        {
            name: "Medium",
            icon: BookOpen,
            url: "https://medium.com/@yashvir.126", // Placeholder
            label: "Chronicles"
        }
    ];

    return (
        <section id="contact" className="py-24 px-6 relative overflow-hidden">
            <div className="container mx-auto max-w-6xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className={`text-4xl md:text-5xl font-serif font-bold inline-block relative ${isRecruiterMode ? 'text-ancient-wood' : 'text-ancient-wood text-glow-gold'}`}>
                        The Spire of Communication
                    </h2>
                    <p className="mt-4 text-ancient-wood/70 font-sans text-lg max-w-2xl mx-auto">
                        Whether you seek to discuss ancient lore, propose a quest, or simply exchange pleasantries, the ravens are ready.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-start">
                    {/* Social Links (The Archives) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div className={`p-8 rounded-2xl border ${isRecruiterMode ? 'bg-moonlit-silver/20 border-autumn-gold/20' : 'glass-panel border-autumn-gold/30'}`}>
                            <h3 className="text-2xl font-serif font-bold text-ancient-wood mb-6 flex items-center gap-3">
                                <span className="text-autumn-gold">✦</span> The Archives
                            </h3>
                            <div className="space-y-4">
                                {socialLinks.map((link, index) => (
                                    <a
                                        key={index}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group ${isRecruiterMode
                                            ? "hover:bg-autumn-gold/10"
                                            : "hover:bg-white/5 hover:border-autumn-gold/30 border border-transparent"
                                            }`}
                                    >
                                        <div className={`p-3 rounded-lg ${isRecruiterMode ? 'bg-autumn-gold/10 text-autumn-gold' : 'bg-gradient-to-br from-autumn-gold/20 to-starlight-silver/10 text-autumn-gold group-hover:text-glow-gold'}`}>
                                            <link.icon size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-serif font-bold text-ancient-wood text-lg group-hover:text-autumn-gold transition-colors">
                                                {link.name}
                                            </h4>
                                            <p className="text-sm font-sans text-ancient-wood/60">
                                                {link.label}
                                            </p>
                                        </div>
                                        <ExternalLink className="ml-auto text-ancient-wood/40 group-hover:text-autumn-gold transition-colors opacity-0 group-hover:opacity-100" size={16} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form (Send a Raven) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <div className={`p-8 rounded-2xl border ${isRecruiterMode ? 'bg-moonlit-silver/20 border-autumn-gold/20' : 'glass-panel border-autumn-gold/30'}`}>
                            <h3 className="text-2xl font-serif font-bold text-ancient-wood mb-6 flex items-center gap-3">
                                <Mail className="text-autumn-gold" /> Send a Raven
                            </h3>

                            <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
                                <div>
                                    <label htmlFor="user_name" className="block text-sm font-sans font-semibold text-ancient-wood/80 mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        name="user_name"
                                        id="user_name"
                                        required
                                        className={`w-full px-4 py-3 rounded-lg outline-none transition-all duration-300 ${isRecruiterMode
                                            ? "bg-white/50 border border-autumn-gold/20 focus:border-autumn-gold"
                                            : "bg-white/5 border border-autumn-gold/20 focus:border-autumn-gold/60 focus:bg-white/10 text-ancient-wood placeholder:text-ancient-wood/30"
                                            }`}
                                        placeholder="Traveler's Name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="user_email" className="block text-sm font-sans font-semibold text-ancient-wood/80 mb-2">
                                        Your Email
                                    </label>
                                    <input
                                        type="email"
                                        name="user_email"
                                        id="user_email"
                                        required
                                        className={`w-full px-4 py-3 rounded-lg outline-none transition-all duration-300 ${isRecruiterMode
                                            ? "bg-white/50 border border-autumn-gold/20 focus:border-autumn-gold"
                                            : "bg-white/5 border border-autumn-gold/20 focus:border-autumn-gold/60 focus:bg-white/10 text-ancient-wood placeholder:text-ancient-wood/30"
                                            }`}
                                        placeholder="raven@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-sans font-semibold text-ancient-wood/80 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        id="message"
                                        required
                                        rows={4}
                                        className={`w-full px-4 py-3 rounded-lg outline-none transition-all duration-300 resize-none ${isRecruiterMode
                                            ? "bg-white/50 border border-autumn-gold/20 focus:border-autumn-gold"
                                            : "bg-white/5 border border-autumn-gold/20 focus:border-autumn-gold/60 focus:bg-white/10 text-ancient-wood placeholder:text-ancient-wood/30"
                                            }`}
                                        placeholder="What tidings do you bring?"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSending}
                                    className={`w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 ${isSending ? "opacity-70 cursor-not-allowed" : ""
                                        } ${isRecruiterMode
                                            ? "bg-autumn-gold text-white hover:bg-autumn-gold/90"
                                            : "bg-gradient-to-r from-autumn-gold to-starlight-gold text-deep-forest hover:shadow-[0_0_20px_rgba(214,196,139,0.4)] hover:scale-[1.02]"
                                        }`}
                                >
                                    {isSending ? (
                                        <>
                                            <Loader2 className="animate-spin" /> Dispatching...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={20} /> Dispatch Raven
                                        </>
                                    )}
                                </button>

                                {status === "success" && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-emerald-leaf text-center font-sans font-semibold"
                                    >
                                        The raven has taken flight! Your message has been sent.
                                    </motion.p>
                                )}

                                {status === "error" && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-red-500 text-center font-sans font-semibold"
                                    >
                                        The raven lost its way. Please try again later.
                                    </motion.p>
                                )}
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
