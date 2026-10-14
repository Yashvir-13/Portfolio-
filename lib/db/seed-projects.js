import { getDb } from './index.js';

export const curatedProjects = [
  {
    title: 'Asteria',
    slug: 'asteria',
    source: 'native',
    type: 'project',
    date: '2026-03-01T00:00:00Z',
    display_order: 1,
    featured: true,
    status: 'published',
    hero_image: '/images/asteria.jpg',
    external_id: 'https://github.com/Yashvir-13/Asteria',
    excerpt: 'The Living Manuscript. A digital literary institution for poetry, philosophy, literature, and human thought.',
    body: 'Asteria is conceived not as a publishing tool or content management system, but as a digital literary institution — a Living Manuscript where philosophy, poetry, and contemplative prose exist in their native spatial architecture. Modern reading interfaces treat text as disposable feed items, scrollable and ephemeral. Asteria returns dignity to the written word through restrained editorial typography, archival structure, and intentional pacing.',
    metadata: {
      category: 'Literary / Digital Architecture',
      project_status: 'In Development',
      stack: ['Next.js 15 (App Router)', 'TypeScript', 'Tailwind CSS v4', 'TanStack Query', 'FastAPI', 'Python 3.12', 'PostgreSQL', 'SQLAlchemy', 'Alembic', 'tsvector Full-Text Search', 'JWT', 'OAuth2'],
      links: [
        { label: 'GitHub Repository', url: 'https://github.com/Yashvir-13/Asteria' },
        { label: 'Video Preview', url: 'https://br-small-cake-aejouazn.storage.c-2.us-east-2.aws.neon.tech/media/uploads/10968d3e-db75-4bc6-8f4c-884ac9ce9e91.mp4' }
      ],
      video_url: 'https://br-small-cake-aejouazn.storage.c-2.us-east-2.aws.neon.tech/media/uploads/10968d3e-db75-4bc6-8f4c-884ac9ce9e91.mp4',
      process: 'The architecture was designed as a cleanly decoupled system: a high-performance FastAPI service managing PostgreSQL relational entities and linguistic full-text indexing, paired with a Next.js 15 App Router frontend. Every typographic scale, margin ratio, and line height was derived from classical book design principles rather than software conventions. We implemented tsvector lexical lexeme dictionaries to enable nuanced search across philosophical fragments without the latency or hallucination risks of dense neural embeddings.',
      technical: '• High-throughput async FastAPI application running Python 3.12 with SQLModel and Alembic migrations.\n• PostgreSQL with native tsvector full-text indexes and GIN indices for sub-10ms lexical retrieval.\n• Next.js 15 App Router with server-side rendering, TanStack Query for declarative client-state caching, and Tailwind CSS v4.\n• Stateless JWT token issuing with OAuth2 Bearer authorization flows, rate limiting, and CORS isolation.',
      lessons: 'Providing infinite navigational freedom in a literary platform often induces cognitive paralysis rather than discovery. The most powerful interface choice was removing conventional dashboard chrome and allowing the editorial manuscript to dictate the visitor\'s attention.'
    }
  },
  {
    title: 'Sonus',
    slug: 'sonus',
    source: 'native',
    type: 'project',
    date: '2026-10-01T00:00:00Z',
    display_order: 2,
    featured: true,
    status: 'published',
    hero_image: '/images/sonus.jpg',
    external_id: 'https://github.com/Yashvir-13/Sonus',
    excerpt: 'An intelligent, open-source polyphonic music practice platform combining sub-30ms in-browser chromagram feedback with neural multipitch transcription.',
    body: 'In musical practice, woodshedding refers to the solitary, obsessive act of working through technical flaws in private until precision becomes instinct. Sonus is an intelligent polyphonic practice companion for guitarists and pianists. By marrying sub-30ms in-browser chromagram tracking with deep neural multipitch transcription, Sonus acts as an objective auditory mirror — detecting subtle transition lags, dropped chord voicings, and rhythmic rushing before bad habits calcify into muscle memory.',
    metadata: {
      category: 'Audio Systems / Machine Learning',
      project_status: 'In Development',
      stack: ['Vite', 'React 19', 'TypeScript', 'Web Audio AudioWorklet', 'Tonal.js', 'FastAPI', 'Python 3.12', 'SQLModel', 'Spotify Basic Pitch (ONNX Runtime)', 'Needleman-Wunsch Dynamic Programming', 'Neon Serverless PostgreSQL', 'Sentry', 'Clerk'],
      links: [
        { label: 'GitHub Repository', url: 'https://github.com/Yashvir-13/Sonus' }
      ],
      process: 'Musicians cannot tolerate audio latency. The core engineering breakthrough in Sonus is its hybrid two-tier pipeline: a dedicated client-side AudioWorklet processor running in a separate audio thread to capture 2048-sample PCM buffers and project energy across 12 pitch classes for instant HUD chord confirmation, combined with asynchronous server-side neural multipitch transcription powered by Spotify\'s Basic Pitch running on ONNX Runtime. Strum clustering groups rolling guitar strums (35-60ms window) separately from simultaneous piano strikes.',
      technical: '• Sub-30ms real-time audio pipeline using Web Audio API AudioWorklet, avoiding main thread garbage collection pauses.\n• Spotify Basic Pitch model executed via ONNX Runtime to produce discrete [pitch, onset, offset, amplitude] note events.\n• Needleman-Wunsch global sequence alignment maps user performance against target score exercises, absorbing extra strums or accidental skips without cascading misalignment.\n• Adaptive Habit Engine detects transition lag (e.g. F to G > 100ms), tempo rushing (< -30ms on downbeats), and voicing omissions, automatically generating targeted 75% BPM remediation drills.\n• Grounded Fact-Bundle Reports compiled strictly from verified mathematical fact bundles (fact_id, category, claim), eliminating speculative advice.',
      lessons: 'A musician\'s ear detects auditory feedback lag instantly. Separating immediate feedback (<30ms chromagram) from deep analytical truth (server-side neural multipitch transcription) allowed us to preserve fluid playing flow while retaining analytical rigor.'
    }
  },
  {
    title: 'Emergent Shifts in Multi-Agent LLM Systems',
    slug: 'emergent-shifts-in-multi-agent-llm-systems',
    source: 'native',
    type: 'project',
    date: '2026-09-15T00:00:00Z',
    display_order: 3,
    featured: true,
    status: 'published',
    hero_image: '/images/multiagent-llm.jpg',
    external_id: 'https://github.com/Yashvir-13/Studying-Multi-LLM-agents-behaviour-in-game-theoretic-environments',
    excerpt: 'Investigating non-linear regime shifts, strategic deception, and trust dynamics in multi-LLM systems across game-theoretic environments.',
    body: 'When autonomous Large Language Models interact in shared environments, do they converge toward cooperative social equilibria, or do they develop asymmetric strategies of exploitation and deception? This research introduces an empirical simulation framework testing LLM agents across repeated game-theoretic environments — specifically Public Goods Games and Asymmetric Signaling Games — across varying network topologies and memory constraints. The accompanying research paper has been released as a preprint on Zenodo.',
    metadata: {
      category: 'AI Research / Game Theory',
      project_status: 'Pre-print Published (Zenodo)',
      doi: '10.5281/zenodo.23187620',
      paper_url: 'https://doi.org/10.5281/zenodo.23187620',
      stack: ['Python 3.8+', 'Ollama', 'Qwen 3.5 (9B)', 'ThreadPoolExecutor', 'NumPy', 'Matplotlib', 'PyYAML', 'Game Theory', 'Statistical Information Theory'],
      links: [
        { label: 'Zenodo Pre-print (DOI: 10.5281/zenodo.23187620)', url: 'https://doi.org/10.5281/zenodo.23187620' },
        { label: 'GitHub Repository', url: 'https://github.com/Yashvir-13/Studying-Multi-LLM-agents-behaviour-in-game-theoretic-environments' }
      ],
      process: 'To eliminate semantic framing biases, agents were presented with strictly neutral information-exchange prompts rather than competitive game-theory terminology. We orchestrated multi-agent rounds with parallel execution via ThreadPoolExecutor against local Ollama Qwen 3.5 9B instances. Sweeps systematically varied memory horizons (3 to 5 rounds) and communication topologies (Ring, Star, Broadcast, Full Mesh). In the Signaling Game, an asymmetric scammer incentive (+10 payoff for deceptive investment vs +2 for honest) tested whether reputation mechanisms could curb emergent deceit.',
      technical: '• Game-Theoretic Frameworks: Public Goods Game (evaluating Nash equilibrium defect vs social optimum cooperation) and Repeated Signaling Game with private quality states and Bayesian algorithmic receivers.\n• Topological Sweeps: Evaluated communication graph structures including Ring (1:1 wraparound), Star (hub-and-spoke), Broadcast (1-to-many), and Full Mesh.\n• Quantitative Metrics: Behavioral Shannon entropy, Gini coefficient of payoff distribution, Deception Rate, Informed Trust, Deception Success, and Rolling Stability Index.\n• Fault-Tolerant Parameter Sweeps: Grid configuration with automatic state checkpointing and recovery for long-running batch experiments.',
      lessons: 'LLMs exhibit sharp, non-linear phase transitions. Under restricted communication topologies (like Star networks), deception rates surge rapidly because reputational consequences fail to propagate across disconnected receivers. Trust is fragile and topologically dependent.'
    }
  },
  {
    title: 'Fathom',
    slug: 'fathom-an-epistemically-constrained-philosophical-conversational-agent',
    source: 'native',
    type: 'project',
    date: '2026-05-15T00:00:00Z',
    display_order: 4,
    featured: true,
    status: 'published',
    hero_image: '/images/fathom.png',
    external_id: 'https://github.com/Yashvir-13/An-Epistemically-Constrained-Philosophical-Conversational-Agent',
    excerpt: 'An Epistemically Constrained Philosophical Conversational Agent exploring cognitive modeling and non-hallucinatory persona synthesis.',
    body: 'Conversational agents frequently collapse into agreeable sycophants or hallucinate anachronistic syntheses when discussing philosophy. Fathom is an epistemically constrained philosophical conversational agent designed to embody genuine intellectual paradigms. Rather than unrestricted generation, Fathom models the epistemic horizon of philosophical systems, maintaining ontological consistency and acknowledging conceptual boundaries.',
    metadata: {
      category: 'Cognitive Modeling / Philosophy',
      project_status: 'Completed / Archived',
      stack: ['Python', 'Ollama', 'LangChain', 'Hugging Face Transformers', 'Bayesian Knowledge Mining', 'Vector Retrieval Fusion'],
      links: [
        { label: 'GitHub Repository', url: 'https://github.com/Yashvir-13/An-Epistemically-Constrained-Philosophical-Conversational-Agent' }
      ],
      process: 'Fathom operates across three distinct phases: an offline corpus preparation pipeline that dissects canonical philosophical treatises; an epistemic knowledge-mining phase that learns statistical dependencies between concepts (epistemology, metaphysics, ethics); and a runtime inference engine combining dense retrieval, probabilistic reasoning, and constrained persona synthesis.',
      technical: '• Offline Knowledge Engine: Statistical relationship extraction across philosophical corpora to establish hard epistemic constraints.\n• Runtime Fusion: Hybrid retrieval combining dense vector similarity with structural ontology graphs to prevent conceptual anachronisms.\n• Epistemic Guardrails: Probabilistic confidence scoring that forces the agent to acknowledge epistemic uncertainty rather than confabulating consensus.',
      lessons: 'Simple RAG plus Bayesian belief networks would never have captured philosophical nuance alone. The true architecture emerged from accepting failures in naive semantic search and forcing strict constraint boundaries over prompt creativity.'
    }
  },
  {
    title: 'Darwin-Swarm',
    slug: 'darwin-swarm',
    source: 'native',
    type: 'project',
    date: '2026-05-01T00:00:00Z',
    display_order: 5,
    featured: false,
    status: 'published',
    hero_image: '/images/darwin-swarm.jpg',
    external_id: 'https://github.com/Yashvir-13/Darwin-Swarm-in-Multi-Agent-Environments',
    excerpt: 'Evolutionary multi-agent sandbox studying whether simple neural controllers discover coordinated collective behavior without gradient descent.',
    body: 'Can intelligent collective coordination emerge purely through evolutionary mechanics without gradient backpropagation? Darwin-Swarm is an artificial life and neuroevolutionary simulation sandbox. A population of lightweight feedforward neural policies undergoes selection, crossover, and mutation inside a shared continuous multi-agent environment, measuring whether random chaotic swarms can naturally organize into structured collective movements.',
    metadata: {
      category: 'Evolutionary Systems / Artificial Life',
      project_status: 'Completed Sandbox',
      stack: ['Python 3.10+', 'NumPy', 'PettingZoo (Simple Spread)', 'Neuroevolution', 'Matplotlib', 'Seeded Reproducibility'],
      links: [
        { label: 'GitHub Repository', url: 'https://github.com/Yashvir-13/Darwin-Swarm-in-Multi-Agent-Environments' }
      ],
      process: 'Rather than standard deep reinforcement learning (PPO/MADDPG), each agent\'s genome is represented by flattened weight vectors of a compact neural controller. In each generation, fixed-lifetime teams are evaluated in PettingZoo\'s simple_spread environment under seeded conditions. Fitness is awarded based on landmark coverage, inter-agent dispersion, and collision minimization.',
      technical: '• Neuroevolutionary Loop: Elitist selection, uniform crossover, and Gaussian weight mutation applied directly to policy parameter space.\n• Multi-Metric Telemetry: Longitudinal tracking of landmark coverage percentage, collision frequencies, spatial variance, and mean Euclidean distance.\n• Baseline Validation: Benchmarked rigorously against stationary zero-action baselines and Brownian random walks to verify genuine behavioral adaptation.',
      lessons: 'Coordination in multi-agent spaces does not require massive parameter counts or gradient calculations. With the right selection pressure, even minimalistic 2-layer policies discover flocking, task distribution, and obstacle avoidance through iterative generational pressure.'
    }
  },
  {
    title: 'Cinematic Frame Interpolation',
    slug: 'frame-interpolation',
    source: 'native',
    type: 'project',
    date: '2025-11-20T00:00:00Z',
    display_order: 6,
    featured: false,
    status: 'published',
    hero_image: '/images/frame-interpolation.jpg',
    external_id: 'https://github.com/Yashvir-13/Cinematic-Frame-Interpolation-Using-Classical-Techniques',
    excerpt: 'Investigating the space between film frames using classical optical flow algorithms and perceptual evaluation.',
    body: 'What occurs in the imperceptible space between two frames of cinema? This experiment dissects the mechanics of synthetic motion by deliberately stripping 80% of film frames from archival footage and attempting to reconstruct the missing temporal fabric using classical optical flow techniques. The synthetic artifacts and ghosted motion trails expose how machines mathematically approximate continuous time.',
    metadata: {
      category: 'Computer Vision / Cinematography',
      project_status: 'Completed Experiment',
      stack: ['Python', 'PyTorch', 'OpenCV', 'Gunnar Farnebäck Optical Flow', 'Lucas-Kanade', 'DeepFlow', 'SimpleFlow', 'Dual TV-L1', 'SSIM', 'LPIPS'],
      links: [
        { label: 'GitHub Repository', url: 'https://github.com/Yashvir-13/Cinematic-Frame-Interpolation-Using-Classical-Techniques' }
      ],
      process: 'We benchmarked five distinct optical flow formulations across high-entropy cinematic scenes (flickering fire, turbulent smoke, organic motion). Rather than evaluating only mathematical pixel MSE, interpolated sequences were subjected to structural similarity (SSIM) and deep perceptual similarity metrics (LPIPS) to measure visual realism.',
      technical: '• Algorithmic Suite: Dense optical flow comparisons across Farnebäck (polynomial expansion), Lucas-Kanade (sparse pyramidal), DeepFlow (descriptor matching), SimpleFlow, and Dual TV-L1 (variational energy minimization).\n• Perceptual Assessment: Quantitative benchmarking utilizing Learned Perceptual Image Patch Similarity (LPIPS) with VGG backbones alongside traditional SSIM.\n• Temporal Synthesis: Bidirectional warping and occlusion handling to mitigate disocclusion ghosting artifacts.',
      lessons: 'The machine does not possess an intuition of physical continuity; it computes pixel displacement vectors. The unexpected visual artifacts produced during rapid deformation are often more evocative and visually startling than the original frames.'
    }
  },
  {
    title: 'NyayaBot',
    slug: 'nyayabot',
    source: 'native',
    type: 'project',
    date: '2026-04-20T00:00:00Z',
    display_order: 7,
    featured: false,
    status: 'published',
    hero_image: '/images/nyayabot.jpg',
    external_id: 'https://github.com/Yashvir-13/Legal-Aid-Conversational-Agent',
    excerpt: 'AI-powered statutory legal aid system for Indian jurisprudence grounded in verified statutes via a structured RAG pipeline.',
    body: 'Navigating legal systems is notoriously opaque, yet generic LLMs frequently hallucinate legal precedents, misquote statutory sections, and conflate jurisdictions with dangerous consequences. NyayaBot was engineered as a disciplined, hallucination-resistant legal assistance system anchored strictly to verified Indian statutory codes (BNSS, IPC, procedural acts).',
    metadata: {
      category: 'Applied AI / Jurisprudence',
      project_status: 'Completed System',
      stack: ['Python', 'Streamlit', 'ChromaDB', 'Sentence Transformers (all-MiniLM-L6-v2)', 'Legal Query Expansion', 'Document Chunking'],
      links: [
        { label: 'GitHub Repository', url: 'https://github.com/Yashvir-13/Legal-Aid-Conversational-Agent' }
      ],
      process: 'NyayaBot enforces a strict Retrieve → Ground → Generate pipeline. Incoming natural language queries are pre-screened with domain classifiers to instantly reject non-legal queries. Legal queries undergo keyword expansion (mapping colloquial terms to statutory nomenclature) before dense vector retrieval in ChromaDB. Only if retrieved passages pass a strict relevance threshold is the LLM authorized to generate a response.',
      technical: '• Domain Filtering: Keyword classifier rejecting non-legal queries with zero LLM inference cost.\n• Query Expansion: Maps vernacular terms (e.g. FIR) to exact statutory codes (Section 173 BNSS police complaint).\n• Vector Retrieval: ChromaDB cosine similarity over 384-dimensional all-MiniLM-L6-v2 embeddings with top-3 relevance gating (score >= 0.35).\n• Statutory Grounding: Prompt architecture that strictly binds answers to indexed statutory text, prohibiting generative speculation.',
      lessons: 'In high-stakes domains like law, the most crucial architectural feature is not how brilliantly the model speaks, but its ability to decisively refuse to answer when the factual evidence is absent.'
    }
  }
];

async function seed() {
  const sql = getDb();
  console.log('Seeding curated projects into content_items...');

  for (const p of curatedProjects) {
    await sql`
      INSERT INTO content_items (
        title, slug, source, type, date, display_order, featured, status,
        hero_image, external_id, excerpt, body, metadata, updated_at
      ) VALUES (
        ${p.title}, ${p.slug}, ${p.source}, ${p.type}, ${p.date}::timestamptz,
        ${p.display_order}, ${p.featured}, ${p.status}, ${p.hero_image},
        ${p.external_id}, ${p.excerpt}, ${p.body}, ${JSON.stringify(p.metadata)}::jsonb,
        NOW()
      )
      ON CONFLICT (slug, type) DO UPDATE SET
        title = EXCLUDED.title,
        source = EXCLUDED.source,
        date = EXCLUDED.date,
        display_order = EXCLUDED.display_order,
        featured = EXCLUDED.featured,
        status = EXCLUDED.status,
        hero_image = EXCLUDED.hero_image,
        external_id = EXCLUDED.external_id,
        excerpt = EXCLUDED.excerpt,
        body = EXCLUDED.body,
        metadata = EXCLUDED.metadata,
        updated_at = NOW();
    `;
    console.log(`✓ Seeded: ${p.title} (${p.slug})`);
  }

  const rows = await sql`
    SELECT id, slug, title, status, hero_image, metadata->>'category' as category, metadata->>'project_status' as project_status 
    FROM content_items 
    WHERE type = 'project'
    ORDER BY display_order ASC
  `;
  console.log('\nCurrent projects in database:');
  console.table(rows);
  process.exit(0);
}

if (process.argv[1] && process.argv[1].endsWith('seed-projects.js')) {
  seed().catch(err => {
    console.error('Seeding error:', err);
    process.exit(1);
  });
}
