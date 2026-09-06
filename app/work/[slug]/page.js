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
      <header className={styles.header}>
        <div className={styles.meta}>
          <span className="text-mono">{project.year}</span>
          <span className="text-mono">{project.category}</span>
          {project.status && <span className="text-mono">{project.status}</span>}
        </div>
        <h1 className="text-hero fade-in">{project.title}</h1>
        <p className={`${styles.statement} fade-in`} style={{ animationDelay: '0.2s' }}>
          {project.statement}
        </p>
      </header>

      <div className={`${styles.heroVisual} fade-in cinematic-image`} style={{ animationDelay: '0.4s' }} />

      <div className={styles.content}>
        {project.overview && (
          <section className={styles.chapter}>
            <h2 className="text-serif italic fade-in">Overview</h2>
            <p className="fade-in">{project.overview}</p>
          </section>
        )}

        {project.process && (
          <section className={styles.chapter}>
            <h2 className="text-serif italic fade-in">Process</h2>
            <p className="fade-in">{project.process}</p>
          </section>
        )}

        {project.technical && (
          <section className={styles.chapter}>
            <h2 className="text-serif italic fade-in">Technical</h2>
            <p className="fade-in">{project.technical}</p>
          </section>
        )}

        {project.lessons && (
          <section className={styles.chapter}>
            <h2 className="text-serif italic fade-in">Lessons</h2>
            <p className="fade-in">{project.lessons}</p>
          </section>
        )}
      </div>
    </article>
  );
}
