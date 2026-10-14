import styles from './project.module.css';
import { getContentBySlug, getPublishedContent } from '@/lib/content.js';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getContentBySlug(slug, 'project');

  if (!project) {
    return {
      title: 'Project Not Found / Living Archive',
    };
  }

  return {
    title: `${project.title} — Yashvir Singh`,
    description: project.excerpt || 'Technical architecture and research project by Yashvir Singh.',
    openGraph: {
      title: `${project.title} — Yashvir Singh`,
      description: project.excerpt,
      images: project.hero_image ? [project.hero_image] : [],
    },
  };
}


// Helper to format multi-line text into structured paragraphs and bullet lists
function FormattedText({ text }) {
  if (!text) return null;

  // Split into blocks by double newlines
  const blocks = text.split(/\n\n+/);

  return (
    <div className={styles.chapterBody}>
      {blocks.map((block, bIdx) => {
        const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
        const isBulletList = lines.every(l => l.startsWith('•') || l.startsWith('-'));

        if (isBulletList) {
          return (
            <ul key={bIdx} className={styles.bulletList}>
              {lines.map((line, lIdx) => {
                const cleanLine = line.replace(/^[•\-]\s*/, '');
                // Check if line has "Title: content" pattern to bold the title
                const colonIdx = cleanLine.indexOf(':');
                if (colonIdx > 0 && colonIdx < 35) {
                  const lead = cleanLine.substring(0, colonIdx);
                  const rest = cleanLine.substring(colonIdx + 1);
                  return (
                    <li key={lIdx} className={styles.bulletItem}>
                      <strong>{lead}:</strong>{rest}
                    </li>
                  );
                }
                return (
                  <li key={lIdx} className={styles.bulletItem}>
                    {cleanLine}
                  </li>
                );
              })}
            </ul>
          );
        }

        return (
          <p key={bIdx} className={styles.chapterParagraph}>
            {block}
          </p>
        );
      })}
    </div>
  );
}

export default async function ProjectDetail({ params }) {
  const { slug } = await params;
  const project = await getContentBySlug(slug, 'project');

  if (!project) {
    notFound();
  }

  // Fetch all projects to calculate next project link
  const allProjects = await getPublishedContent('project');
  const currentIndex = allProjects.findIndex(p => p.slug === slug);
  const nextProject = currentIndex >= 0 && currentIndex < allProjects.length - 1 
    ? allProjects[currentIndex + 1] 
    : allProjects[0] && allProjects[0].slug !== slug 
      ? allProjects[0] 
      : null;

  const year = project.date ? new Date(project.date).getFullYear() : '2026';
  const category = project.metadata?.category || 'Computational System';
  const status = project.metadata?.project_status || 'Archived';
  const isOngoing = status.toLowerCase().includes('development') || status.toLowerCase().includes('ongoing');
  const isPreprint = status.toLowerCase().includes('print') || status.toLowerCase().includes('zenodo');
  
  const stack = Array.isArray(project.metadata?.stack) 
    ? project.metadata.stack 
    : typeof project.metadata?.technical === 'string'
      ? project.metadata.technical.split(',').map(s => s.trim())
      : [];

  const doi = project.metadata?.doi;
  const paperUrl = project.metadata?.paper_url || (doi ? `https://doi.org/${doi}` : null);
  const videoUrl = project.metadata?.video_url;
  const heroVisual = project.hero_image || '/images/fathom.png';
  const isVideoHero = heroVisual.match(/\.(mp4|webm|ogg)$/i);

  return (
    <article className={styles.container}>
      {/* TOP BAR / ARCHIVE CONTEXT */}
      <div className={styles.topMeta}>
        <Link href="/work" className={styles.backLink}>
          ← RETURN TO ARCHIVE
        </Link>
        <div className={styles.topMetaDetails}>
          <span className="text-mono">
            REF: {(currentIndex + 1).toString().padStart(2, '0')} / {year} / {category.toUpperCase()}
          </span>
          <span className="text-mono">02:17 AM</span>
        </div>
      </div>

      {/* EDITORIAL HEADER */}
      <header className={styles.header}>
        <div className={styles.statusRow}>
          <span className={`${styles.statusPill} ${isOngoing || isPreprint ? styles.active : ''}`}>
            {status}
          </span>
          <span className="text-mono" style={{ color: 'var(--muted)' }}>
            LIVING ARCHIVE ARTIFACT
          </span>
        </div>

        <h1 className={`${styles.title} fade-in`}>{project.title}</h1>

        <p className={`${styles.statement} fade-in`} style={{ animationDelay: '0.15s' }}>
          {project.excerpt}
        </p>

        {/* PRIMARY ACTIONS & PAPER / REPO LINKS */}
        <div className={`${styles.actionGroup} fade-in`} style={{ animationDelay: '0.25s' }}>
          {paperUrl && (
            <a 
              href={paperUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`${styles.actionButton} ${styles.primaryAction}`}
            >
              <span>📄</span>
              <span>READ PREPRINT {doi ? `(DOI: ${doi})` : ''}</span>
            </a>
          )}

          {project.external_id && (
            <a 
              href={project.external_id} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.actionButton}
            >
              <span>CODEBASE ON GITHUB</span>
              <span>↗</span>
            </a>
          )}

          {videoUrl && (
            <a 
              href={videoUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.actionButton}
            >
              <span>WATCH VIDEO RECORDING</span>
              <span>▶</span>
            </a>
          )}

          {project.metadata?.links && project.metadata.links.map((link, idx) => {
            // Avoid duplicate links
            if (link.url === paperUrl || link.url === project.external_id || link.url === videoUrl) return null;
            return (
              <a 
                key={idx} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.actionButton}
              >
                <span>{link.label.toUpperCase()}</span>
                <span>↗</span>
              </a>
            );
          })}
        </div>
      </header>

      {/* HERO VISUAL */}
      <div className={styles.heroWrapper}>
        <div className={styles.heroVisual}>
          {isVideoHero ? (
            <video 
              src={heroVisual} 
              className={`${styles.heroImage} reveal-image`} 
              autoPlay 
              muted 
              loop 
              playsInline 
              controls
            />
          ) : (
            <img 
              src={heroVisual} 
              className={`${styles.heroImage} reveal-image`} 
              alt={project.title} 
            />
          )}
        </div>
        <div className={styles.heroCaption}>
          <span className="text-mono">FIGURE 01: VISUAL ARTIFACT COMPOSITION / {project.slug.toUpperCase()}</span>
          <span className="text-mono">ANALOGUE IMPASTO & VECTOR STUDY</span>
        </div>
      </div>

      {/* SYSTEM SPECIFICATION / TECH STACK SHELF */}
      <section className={styles.specShelf}>
        <div className={styles.specGrid}>
          <div className={styles.specItem}>
            <span className={styles.specLabel}>Architecture & Domain</span>
            <span className={styles.specValue}>{category}</span>
          </div>

          <div className={styles.specItem}>
            <span className={styles.specLabel}>Lifecycle State</span>
            <span className={styles.specValue}>{status}</span>
          </div>

          <div className={styles.specItem} style={{ gridColumn: 'span 2' }}>
            <span className={styles.specLabel}>System Stack & Tooling</span>
            <div className={styles.stackChips}>
              {stack.map((item, idx) => (
                <span key={idx} className={styles.stackChip}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STRUCTURED CHAPTERS */}
      <div className={styles.content}>
        {project.body && (
          <section className={styles.chapter}>
            <div className={styles.chapterHeader}>
              <h2 className={styles.chapterTitle}>Overview</h2>
              <span className={styles.chapterIndex}>CHAPTER 01 / INTENT</span>
            </div>
            <FormattedText text={project.body} />
          </section>
        )}

        {project.metadata?.process && (
          <section className={styles.chapter}>
            <div className={styles.chapterHeader}>
              <h2 className={styles.chapterTitle}>Architecture</h2>
              <span className={styles.chapterIndex}>CHAPTER 02 / DESIGN</span>
            </div>
            <FormattedText text={project.metadata.process} />
          </section>
        )}

        {project.metadata?.technical && (
          <section className={styles.chapter}>
            <div className={styles.chapterHeader}>
              <h2 className={styles.chapterTitle}>Technical Execution</h2>
              <span className={styles.chapterIndex}>CHAPTER 03 / SYSTEM</span>
            </div>
            <FormattedText text={project.metadata.technical} />
          </section>
        )}

        {project.metadata?.lessons && (
          <section className={styles.chapter}>
            <div className={styles.chapterHeader}>
              <h2 className={styles.chapterTitle}>Observations</h2>
              <span className={styles.chapterIndex}>CHAPTER 04 / LESSONS</span>
            </div>
            <FormattedText text={project.metadata.lessons} />
          </section>
        )}
      </div>

      {/* CONTINUOUS ARCHIVE NAVIGATION */}
      {nextProject && (
        <footer className={styles.archiveFooterNav}>
          <Link href={`/work/${nextProject.slug}`} className={styles.nextProjectLink}>
            <span className={styles.nextLabel}>CONTINUE EXPLORING ARCHIVE →</span>
            <h3 className={styles.nextTitle}>{nextProject.title}</h3>
          </Link>
          <Link href="/work" className={styles.backLink}>
            BACK TO ALL WORK ↑
          </Link>
        </footer>
      )}
    </article>
  );
}
