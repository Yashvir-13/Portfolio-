// src/components/SkillRunes.tsx
import * as React from "react";

type SvgProps = React.SVGProps<SVGSVGElement>;

const RuneBase: React.FC<SvgProps> = ({ className, children, ...props }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        {...props}
    >
        {children}
    </svg>
);

/* ========== ARCANES ========== */

export const NeurosymbolicRune: React.FC<SvgProps> = (props) => (
    <RuneBase {...props}>
        <circle cx="7" cy="9" r="2.4" />
        <circle cx="17" cy="15" r="2.4" />
        <path d="M7 11.5V17l5 3 5-3v-4" />
        <path d="M9 9h6" />
    </RuneBase>
);

export const BayesianRune: React.FC<SvgProps> = (props) => (
    <RuneBase {...props}>
        <path d="M6 5h5.5c2.2 0 3.5 1.1 3.5 2.8 0 1.2-.7 2.1-1.9 2.5" />
        <path d="M11 10.3c2.3.1 3.8 1.2 3.8 3.1 0 1.9-1.6 3.2-4 3.2H6" />
        <path d="M6 5v14" />
    </RuneBase>
);

export const ExplainableRune: React.FC<SvgProps> = (props) => (
    <RuneBase {...props}>
        <path d="M4 12s2.5-5 8-5 8 5 8 5-2.5 5-8 5-8-5-8-5z" />
        <circle cx="12" cy="12" r="2.4" />
        <path d="M15.5 16.5 18 20" />
    </RuneBase>
);

export const OntologyRune: React.FC<SvgProps> = (props) => (
    <RuneBase {...props}>
        <circle cx="12" cy="7" r="2.1" />
        <circle cx="6" cy="15" r="2.1" />
        <circle cx="18" cy="15" r="2.1" />
        <path d="M10.5 8.5 7.5 13.5" />
        <path d="M13.5 8.5 16.5 13.5" />
        <path d="M6 13v-2.5L12 5l6 5.5V13" />
    </RuneBase>
);

export const LLMRune: React.FC<SvgProps> = (props) => (
    <RuneBase {...props}>
        <rect x="5" y="5" width="14" height="14" rx="2" />
        <path d="M8 9h8" />
        <path d="M8 12h5" />
        <path d="M8 15h3" />
        <path d="M6 5v-1" />
        <path d="M18 5v-1" />
    </RuneBase>
);

export const RAGRune: React.FC<SvgProps> = (props) => (
    <RuneBase {...props}>
        <rect x="4" y="5" width="7" height="6" rx="1.5" />
        <rect x="13" y="9" width="7" height="6" rx="1.5" />
        <path d="M11 8h2" />
        <path d="M11 12h2" />
        <path d="M7.5 17h9" />
    </RuneBase>
);

export const NLPRune: React.FC<SvgProps> = (props) => (
    <RuneBase {...props}>
        <path d="M6 6h10a2 2 0 0 1 2 2v5" />
        <path d="M6 6v7a2 2 0 0 0 2 2h4" />
        <path d="M8 10h6" />
        <path d="M8 13h3" />
        <path d="M10 18 13.5 15 21 21" />
    </RuneBase>
);

/* ========== TOOLS ========== */

export const PythonRune: React.FC<SvgProps> = (props) => (
    <RuneBase {...props}>
        <path d="M10.5 4.5h3A3.5 3.5 0 0 1 17 8v3.5H13" />
        <path d="M13.5 19.5h-3A3.5 3.5 0 0 1 7 16v-3.5h4" />
        <circle cx="10" cy="7" r="0.8" />
        <circle cx="14" cy="17" r="0.8" />
    </RuneBase>
);

export const DLFrameworkRune: React.FC<SvgProps> = (props) => (
    <RuneBase {...props}>
        <rect x="5" y="5" width="6" height="6" rx="1" />
        <rect x="13" y="5" width="6" height="6" rx="1" />
        <rect x="9" y="13" width="6" height="6" rx="1" />
        <path d="M11 11v2" />
        <path d="M13 11v2" />
    </RuneBase>
);

export const LangChainRune: React.FC<SvgProps> = (props) => (
    <RuneBase {...props}>
        <circle cx="8" cy="9" r="2.2" />
        <circle cx="16" cy="15" r="2.2" />
        <path d="M9.5 10.5 14.5 13.5" />
        <path d="M7 15.5A3.5 3.5 0 0 0 11 19h2" />
        <path d="M13 5h-2A3.5 3.5 0 0 0 7 8.5" />
    </RuneBase>
);

export const VectorDBRune: React.FC<SvgProps> = (props) => (
    <RuneBase {...props}>
        <ellipse cx="12" cy="6" rx="5.5" ry="2.5" />
        <path d="M6.5 6v6c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5V6" />
        <path d="M6.5 12v6c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5v-6" />
    </RuneBase>
);

export const MediaRune: React.FC<SvgProps> = (props) => (
    <RuneBase {...props}>
        <rect x="4" y="6" width="10" height="12" rx="1.5" />
        <path d="M14 9.5 19 7v10l-5-2.5" />
        <path d="M8 11.5 11 13l-3 1.5z" />
    </RuneBase>
);

export const DataLibRune: React.FC<SvgProps> = (props) => (
    <RuneBase {...props}>
        <rect x="4" y="5" width="5.5" height="14" rx="1" />
        <rect x="10.25" y="5" width="5.5" height="9" rx="1" />
        <rect x="16.5" y="5" width="3.5" height="6" rx="1" />
        <path d="M6 8.5h1.5" />
        <path d="M12.25 8.5h1.5" />
        <path d="M12.25 11.5h1.5" />
    </RuneBase>
);

export const VizRune: React.FC<SvgProps> = (props) => (
    <RuneBase {...props}>
        <path d="M4 18h16" />
        <path d="M6 16v-5" />
        <path d="M11 16V8" />
        <path d="M16 16v-3" />
        <path d="M6 10.5 11 8l5 3" />
    </RuneBase>
);

/* ========== ENGINEERING / SAFETY ========== */

export const EmbeddingRune: React.FC<SvgProps> = (props) => (
    <RuneBase {...props}>
        <circle cx="7" cy="12" r="2" />
        <circle cx="17" cy="8" r="2" />
        <circle cx="17" cy="16" r="2" />
        <path d="M9 12h6" />
        <path d="M15.4 9.3 8.6 10.7" />
        <path d="M15.4 14.7 8.6 13.3" />
    </RuneBase>
);

export const PromptRune: React.FC<SvgProps> = (props) => (
    <RuneBase {...props}>
        <path d="M5 6h12a2 2 0 0 1 2 2v5" />
        <path d="M5 6v7a2 2 0 0 0 2 2h4" />
        <path d="M7.5 9.5 10 11 7.5 12.5" />
        <path d="M11.5 15.5H15" />
        <path d="M16 18.5 19.5 15 16 11.5" />
    </RuneBase>
);

export const HallucinationRune: React.FC<SvgProps> = (props) => (
    <RuneBase {...props}>
        <path d="M4 12s2.5-5 8-5 8 5 8 5-2.5 5-8 5-8-5-8-5z" />
        <circle cx="12" cy="12" r="2.3" />
        <path d="M3.5 6.5 6 9" />
        <path d="M20.5 6.5 18 9" />
    </RuneBase>
);

export const ConcurrencyRune: React.FC<SvgProps> = (props) => (
    <RuneBase {...props}>
        <circle cx="12" cy="12" r="6.5" />
        <path d="M12 6v3" />
        <path d="M12 15v3" />
        <path d="M9 12H6" />
        <path d="M18 12h-3" />
        <path d="M14.5 9.5 16.5 7.5" />
        <path d="M7.5 16.5 9.5 14.5" />
    </RuneBase>
);

export const LocalOpsRune: React.FC<SvgProps> = (props) => (
    <RuneBase {...props}>
        <rect x="5" y="5" width="14" height="10" rx="2" />
        <path d="M10 19h4" />
        <path d="M9 15v1.5a1.5 1.5 0 0 0 1.5 1.5h3" />
        <path d="M8 9h4" />
        <path d="M8 12h2.5" />
    </RuneBase>
);

export const EvaluationRune: React.FC<SvgProps> = (props) => (
    <RuneBase {...props}>
        <path d="M4 18h16" />
        <path d="M6 15.5 9.5 11 13 13.5 18 7.5" />
        <circle cx="9.5" cy="11" r="0.9" />
        <circle cx="13" cy="13.5" r="0.9" />
        <circle cx="18" cy="7.5" r="0.9" />
    </RuneBase>
);

export const HumanLoopRune: React.FC<SvgProps> = (props) => (
    <RuneBase {...props}>
        <circle cx="9" cy="9" r="2" />
        <circle cx="15" cy="9" r="2" />
        <path d="M6.5 16a3.5 3.5 0 0 1 5-2.9" />
        <path d="M17.5 16a3.5 3.5 0 0 0-5-2.9" />
        <path d="M9 11h6" />
    </RuneBase>
);

/* ========== RESEARCH / PHILOSOPHY ========== */

export const PhilOntologyRune: React.FC<SvgProps> = (props) => (
    <RuneBase {...props}>
        <path d="M7 5.5h8.5" />
        <path d="M7 8.5h6" />
        <path d="M7 5.5v12l4 1.5" />
        <path d="M11 9.5v5" />
        <circle cx="16.5" cy="10.5" r="2" />
        <path d="M16.5 12.5v3.5" />
    </RuneBase>
);

export const PersonaRune: React.FC<SvgProps> = (props) => (
    <RuneBase {...props}>
        <path d="M5 7.5C6 6 7.5 5 10 5c3 0 5 2 5 4.5v9.5l-4-2-4 2z" />
        <path d="M12.5 6.5c1.7 0 3.5.9 4.5 2.5v8" />
        <path d="M8.5 10h1" />
        <path d="M11.5 10h1" />
        <path d="M9.5 13c.5.4 1 .6 1.5.6.5 0 1-.2 1.5-.6" />
    </RuneBase>
);

export const CognitiveEvalRune: React.FC<SvgProps> = (props) => (
    <RuneBase {...props}>
        <circle cx="12" cy="12" r="6.5" />
        <path d="M12 7.5v3" />
        <path d="M12 12l3 2" />
        <circle cx="12" cy="12" r="1.3" />
        <path d="M8 17.5 6.5 20" />
        <path d="M16 17.5 17.5 20" />
    </RuneBase>
);
/* ========== CATEGORY RUNES ========== */

export const ArcaneRune: React.FC<SvgProps> = (props) => (
    <RuneBase {...props}>
        <path d="M12 4a7 7 0 0 1 7 7c0 2-1 3.5-2.5 4.5" />
        <path d="M12 4a7 7 0 0 0-7 7c0 2 1 3.5 2.5 4.5" />
        <path d="M12 16v4" />
        <path d="M9 20h6" />
        <path d="M12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
        <circle cx="12" cy="12" r="0.5" />
    </RuneBase>
);

export const ToolsRune: React.FC<SvgProps> = (props) => (
    <RuneBase {...props}>
        <path d="M3 14h18" />
        <path d="M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" />
        <path d="M12 14v-6" />
        <path d="M8 8h8l-2-4H10z" />
        <circle cx="12" cy="11" r="1" />
    </RuneBase>
);

export const EngineeringRune: React.FC<SvgProps> = (props) => (
    <RuneBase {...props}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M12 8v8" />
        <path d="M8 12h8" />
    </RuneBase>
);

export const ResearchRune: React.FC<SvgProps> = (props) => (
    <RuneBase {...props}>
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
        <path d="M10 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <path d="M13 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2z" />
        <path d="M12 8h.01" />
        <path d="M12 16h.01" />
    </RuneBase>
);
