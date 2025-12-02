"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRecruiterMode } from "@/context/RecruiterModeContext";
import {
    NeurosymbolicRune,
    BayesianRune,
    ExplainableRune,
    OntologyRune,
    LLMRune,
    RAGRune,
    NLPRune,
    PythonRune,
    DLFrameworkRune,
    LangChainRune,
    VectorDBRune,
    MediaRune,
    DataLibRune,
    VizRune,
    EmbeddingRune,
    PromptRune,
    HallucinationRune,
    ConcurrencyRune,
    LocalOpsRune,
    EvaluationRune,
    HumanLoopRune,
    PhilOntologyRune,
    PersonaRune,
    CognitiveEvalRune,
    ArcaneRune,
    ToolsRune,
    EngineeringRune,
    ResearchRune,
} from "@/components/SkillRunes";

type Skill = {
    name: string;
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    desc: string;
};

type SkillGroup = {
    group: string;
    items: Skill[];
};

const skillGroups: SkillGroup[] = [
    {
        group: "Arcane Disciplines",
        items: [
            {
                name: "Neurosymbolic AI",
                Icon: NeurosymbolicRune,
                desc: "Hybrid approach combining symbolic structures/ontologies with neural LLM components to enable structured, explainable reasoning.",
            },
            {
                name: "Probabilistic / Bayesian Reasoning",
                Icon: BayesianRune,
                desc: "Combining priors and likelihoods (log-space aggregation, normalization, consistency nudges) to compute confident belief states.",
            },
            {
                name: "Explainable AI (XAI)",
                Icon: ExplainableRune,
                desc: "Producing interpretable outputs, confidence scores and traceable evidence so answers can be audited and explained.",
            },
            {
                name: "Cognitive Modeling & Ontologies",
                Icon: OntologyRune,
                desc: "Translating philosophical concepts into axes/ontologies and modeling concept interactions as belief vectors.",
            },
            {
                name: "Large Language Models (LLMs)",
                Icon: LLMRune,
                desc: "Prompt design, structured JSON enforcement, staged LLM calls and persona-aware synthesis.",
            },
            {
                name: "RAG (Retrieval-Augmented Generation)",
                Icon: RAGRune,
                desc: "Grounding responses by retrieving relevant corpus chunks and using them as evidence for generation and scoring.",
            },
            {
                name: "NLP & Text Processing",
                Icon: NLPRune,
                desc: "Document cleaning, hierarchical splitting, chunk metadata and extraction for reliable retrieval and reasoning.",
            },
        ],
    },
    {
        group: "Forged Tools & Libraries",
        items: [
            {
                name: "Python (primary)",
                Icon: PythonRune,
                desc: "Primary implementation language — glue logic, data pipelines, model calls and orchestration.",
            },
            {
                name: "TensorFlow & PyTorch",
                Icon: DLFrameworkRune,
                desc: "Deep learning frameworks for model training/inference and custom model usage (TensorFlow shown in your stack).",
            },
            {
                name: "LangChain / LLM Orchestration",
                Icon: LangChainRune,
                desc: "Libraries and patterns used to orchestrate LLM calls, chains, memory and retrieval flows.",
            },
            {
                name: "Embeddings & Vector DBs (Chroma)",
                Icon: VectorDBRune,
                desc: "Embedding selection, metadata design and vector-store persistence for fast semantic search.",
            },
            {
                name: "OpenCV / FFmpeg (media)",
                Icon: MediaRune,
                desc: "Image and video processing pipelines for multimodal pre-processing and analysis.",
            },
            {
                name: "NumPy / Pandas / Scikit-Learn",
                Icon: DataLibRune,
                desc: "Data manipulation, feature engineering and classical ML utilities for evaluation and pipelines.",
            },
            {
                name: "Visualization (Matplotlib / Seaborn)",
                Icon: VizRune,
                desc: "Charting and analysis for metrics, evaluation reports and model introspection.",
            },
        ],
    },
    {
        group: "Engineering, MLOps & Safety",
        items: [
            {
                name: "Embedding & Vector-store Engineering",
                Icon: EmbeddingRune,
                desc: "Designing persistent vector stores, metadata fields, and efficient retrieval filters for relevance.",
            },
            {
                name: "Prompt Engineering & Guardrails",
                Icon: PromptRune,
                desc: "Designing prompts to produce structured outputs, reduce hallucinations and enforce persona/axiom constraints.",
            },
            {
                name: "Hallucination Mitigation",
                Icon: HallucinationRune,
                desc: "Answerability checks, subject-presence filters, and structured-json enforcement to lower risk of false claims.",
            },
            {
                name: "Concurrency & Performance",
                Icon: ConcurrencyRune,
                desc: "Parallel evidence scoring and thread-pool patterns to keep retrieval + scoring performant at query time.",
            },
            {
                name: "Local LLM Ops & GPU Awareness",
                Icon: LocalOpsRune,
                desc: "Local LLM integration (e.g., Ollama), CUDA-aware embeddings config and deployment-minded model selection.",
            },
            {
                name: "Evaluation & Confidence Scoring",
                Icon: EvaluationRune,
                desc: "Metrics-driven priors, evidence likelihood scoring, and confidence propagation for explainable outcomes.",
            },
            {
                name: "Human-in-the-loop Design",
                Icon: HumanLoopRune,
                desc: "Patterns to include human oversight, persona constraint corrections, and safe answer escalation.",
            },
        ],
    },
    {
        group: "Research & Philosophy",
        items: [
            {
                name: "Philosophy → Ontology Translation",
                Icon: PhilOntologyRune,
                desc: "Turning philosophical texts and concepts into axes, labels, and structured belief representations.",
            },
            {
                name: "Narrative & Persona Engineering",
                Icon: PersonaRune,
                desc: "Designing controlled persona voice, consistent biography and axioms for faithful conversational agents.",
            },
            {
                name: "Cognitive & Conceptual Evaluation",
                Icon: CognitiveEvalRune,
                desc: "Assessing concept coverage, coherence across axes, and designing experiments for conceptual fidelity.",
            },
        ],
    },
];

export default function SkillsAccordion() {
    const { isRecruiterMode } = useRecruiterMode();
    const [activeIndex, setActiveIndex] = useState<number>(0);

    // Category icon mapping
    const categoryIcons: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
        "Arcane Disciplines": ArcaneRune,
        "Forged Tools & Libraries": ToolsRune,
        "Engineering, MLOps & Safety": EngineeringRune,
        "Research & Philosophy": ResearchRune
    };

    const slug = (s: string) => s.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");

    return (
        <div className="flex flex-col md:flex-row gap-4 h-auto md:h-[600px] w-full transition-all duration-500">
            {skillGroups.map((group, index) => {
                const isActive = activeIndex === index;
                const isPhi = group.group === "Research & Philosophy";
                const glowClass = isPhi ? "shadow-[0_0_30px_rgba(250,204,21,0.15)]" : "shadow-[0_0_30px_rgba(163,230,255,0.15)]";

                return (
                    <motion.div
                        key={group.group}
                        layout
                        onClick={() => setActiveIndex(index)}
                        onHoverStart={() => setActiveIndex(index)}
                        className={`
                            relative overflow-hidden rounded-2xl border border-muted-brass/30 backdrop-blur-xl transition-all duration-500 ease-spring
                            ${isActive ? `flex-[3] bg-deep-forest/60 ${!isRecruiterMode ? glowClass : ''}` : 'flex-1 bg-deep-forest/30 hover:bg-deep-forest/40 cursor-pointer'}
                        `}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        {/* Background Icon Texture REMOVED */}

                        <div className="h-full w-full p-6 relative z-10">
                            {/* Content Container */}
                            {isActive ? (
                                // Active State: Full Grid
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3, delay: 0.2 }}
                                    className="h-full flex flex-col"
                                >
                                    <div className="flex items-center gap-4 mb-6 border-b border-muted-brass/20 pb-4">
                                        <span className="text-4xl">
                                            {(() => {
                                                const Icon = categoryIcons[group.group];
                                                return Icon ? <Icon className="w-10 h-10 text-silver-gleam" /> : null;
                                            })()}
                                        </span>
                                        <h3 className="text-2xl md:text-3xl font-cormorant text-silver-gleam engraved-text">
                                            {group.group}
                                        </h3>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                        {group.items.map((skill) => {
                                            const id = `tooltip-${slug(skill.name)}`;
                                            return (
                                                <div key={skill.name} className="group relative" tabIndex={0} aria-describedby={id}>
                                                    <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-muted-brass/30 transition-all duration-200 h-full">
                                                        <skill.Icon className={`w-5 h-5 flex-shrink-0 mt-1 text-silver-gleam ${!isRecruiterMode && 'group-hover:rune-animate'}`} />
                                                        <div>
                                                            <div className="font-cormorant text-lg text-moonlit-silver leading-tight">{skill.name}</div>
                                                            <div className="text-xs text-silver-gleam/60 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{skill.desc}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            ) : (
                                // Inactive State: Vertical Text (Desktop) / Horizontal Compact (Mobile)
                                <div className="h-full flex flex-row md:flex-col items-center justify-between md:justify-center gap-4">
                                    <span className="text-3xl md:text-4xl opacity-50">
                                        {(() => {
                                            const Icon = categoryIcons[group.group];
                                            return Icon ? <Icon className="w-8 h-8 text-silver-gleam" /> : null;
                                        })()}
                                    </span>
                                    <h3 className="text-lg md:text-xl font-cinzel text-silver-gleam/70 uppercase tracking-widest md:[writing-mode:vertical-rl] md:rotate-180 whitespace-nowrap">
                                        {group.group}
                                    </h3>
                                </div>
                            )}
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
