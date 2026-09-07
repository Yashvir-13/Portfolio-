import styles from './project.module.css';
import { getContentBySlug } from '@/lib/content.js';
import { notFound } from 'next/navigation';

export default async function ProjectDetail({ params }) {
  const { slug } = await params;
  const project = await getContentBySlug(slug, 'project');

  if (!project) {
    notFound();
  }

  return (
    <article className={styles.container}>
      <div className={styles.topMeta}>
        <span className="text-mono">ARCHIVE / {project.date ? project.date.getFullYear() : 'Unknown'} / {project.metadata?.category || 'Unknown'}</span>
        <span className="text-mono">02:17</span>
      </div>

      <header className={styles.header}>
        <h1 className={`${styles.title} fade-in`}>{project.title}</h1>
        <p className={`${styles.statement} fade-in`} style={{ animationDelay: '0.2s' }}>
          {project.excerpt}
        </p>
      </header>

      {project.hero_image ? (
        <img src={project.hero_image} className={`${styles.heroVisual} reveal-image cinematic-image`} alt={project.title} />
      ) : (
        <div className={`${styles.heroVisual} reveal-image cinematic-image`} />
      )}

      <div className={styles.content}>
        {project.body && (
          <section className={styles.chapter}>
            <h2 className="text-serif italic fade-in">Overview</h2>
            <p className="drift-up">{project.body}</p>
          </section>
        )}

        {project.metadata?.process && (
          <section className={styles.chapter}>
            <h2 className="text-serif italic fade-in">Process</h2>
            <p className="drift-up">{project.metadata.process}</p>
          </section>
        )}

        {project.metadata?.technical && (
          <section className={styles.chapter}>
            <h2 className="text-serif italic fade-in">Technical</h2>
            <p className="drift-up">{project.metadata.technical}</p>
          </section>
        )}

        {project.metadata?.lessons && (
          <section className={styles.chapter}>
            <h2 className="text-serif italic fade-in">Lessons</h2>
            <p className="drift-up">{project.metadata.lessons}</p>
          </section>
        )}
      </div>
    </article>
  );
}
