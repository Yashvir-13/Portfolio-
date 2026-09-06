import styles from './project.module.css';
import projects from '@/content/projects.json';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetail({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <article className={styles.container}>
      <div className={styles.topMeta}>
        <span className="text-mono">ARCHIVE / {project.year} / {project.category}</span>
        <span className="text-mono">02:17</span>
      </div>

      <header className={styles.header}>
        <h1 className={`${styles.title} fade-in`}>{project.title}</h1>
        <p className={`${styles.statement} fade-in`} style={{ animationDelay: '0.2s' }}>
          {project.statement}
        </p>
      </header>

      <div className={`${styles.heroVisual} reveal-image cinematic-image`} />

      <div className={styles.content}>
        {project.overview && (
          <section className={styles.chapter}>
            <h2 className="text-serif italic fade-in">Overview</h2>
            <p className="drift-up">{project.overview}</p>
          </section>
        )}

        {project.process && (
          <section className={styles.chapter}>
            <h2 className="text-serif italic fade-in">Process</h2>
            <p className="drift-up">{project.process}</p>
          </section>
        )}

        {project.technical && (
          <section className={styles.chapter}>
            <h2 className="text-serif italic fade-in">Technical</h2>
            <p className="drift-up">{project.technical}</p>
          </section>
        )}

        {project.lessons && (
          <section className={styles.chapter}>
            <h2 className="text-serif italic fade-in">Lessons</h2>
            <p className="drift-up">{project.lessons}</p>
          </section>
        )}
      </div>
    </article>
  );
}
