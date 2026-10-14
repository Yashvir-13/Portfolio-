import styles from './page.module.css';
import Link from 'next/link';
import { getPublishedContent } from '@/lib/content.js';

export const metadata = {
  title: 'Work / Living Archive — Yashvir',
  description: 'Selected technical systems, academic inquiries, and computational artifacts by Yashvir.',
};

export default async function Work() {
  const projects = await getPublishedContent('project');

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerMeta}>
          <span className="text-mono">SECTION 01 / LIVING ARCHIVE</span>
          <span className="text-mono">{(projects.length || 0).toString().padStart(2, '0')} ARTIFACTS CATALOGUED</span>
        </div>
        <h1 className={`${styles.title} fade-in`}>Work</h1>
        <p className={`${styles.subtitle} text-mono fade-in`} style={{ animationDelay: '0.15s' }}>
          Selected technical architectures, game-theoretic simulations, multi-agent frameworks, and computational artifacts.
        </p>
      </header>

      <div className={styles.projectList}>
        {projects.map((project, index) => {
          const year = project.date ? new Date(project.date).getFullYear() : '2026';
          const category = project.metadata?.category || 'Computational System';
          const status = project.metadata?.project_status || 'Archived';
          const stack = Array.isArray(project.metadata?.stack) 
            ? project.metadata.stack.slice(0, 5) 
            : typeof project.metadata?.technical === 'string'
              ? project.metadata.technical.split(',').map(s => s.trim()).slice(0, 5)
              : [];
          const isOngoing = status.toLowerCase().includes('development') || status.toLowerCase().includes('ongoing');
          const isPreprint = status.toLowerCase().includes('print') || status.toLowerCase().includes('zenodo');
          const heroImg = project.hero_image || '/images/fathom.png';

          return (
            <Link 
              key={project.slug} 
              href={`/work/${project.slug}`} 
              className={`${styles.projectItem} fade-in`}
              style={{ animationDelay: `${0.2 + index * 0.08}s` }}
            >
              <div className={styles.itemInfo}>
                <div className={styles.metaRow}>
                  <span className={styles.indexNum}>{(index + 1).toString().padStart(2, '0')}</span>
                  <span className="text-mono">{year}</span>
                  <span className={`${styles.category} text-mono`}>{category}</span>
                  <span className={`${styles.statusPill} ${isOngoing || isPreprint ? styles.active : ''}`}>
                    {status}
                  </span>
                </div>

                <h2 className={styles.itemTitle}>{project.title}</h2>
                <p className={styles.statement}>{project.excerpt}</p>

                {stack.length > 0 && (
                  <div className={styles.stackList}>
                    {stack.map((item, idx) => (
                      <span key={idx} className={styles.stackBadge}>{item}</span>
                    ))}
                  </div>
                )}
              </div>

              <div className={styles.previewContainer}>
                {heroImg.match(/\.(mp4|webm|ogg)$/i) ? (
                  <video 
                    src={heroImg} 
                    className={styles.previewImage} 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                  />
                ) : (
                  <img 
                    src={heroImg} 
                    className={styles.previewImage} 
                    alt={project.title} 
                    loading="lazy"
                  />
                )}
                <div className={styles.arrowHint}>VIEW ARTIFACT →</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
