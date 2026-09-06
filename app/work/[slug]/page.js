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
          <span className="text-mono">{project.status}</span>
        </div>
        <h1 className="text-hero fade-in">{project.title}</h1>
        <p className={`${styles.statement} fade-in`} style={{ animationDelay: '0.2s' }}>
          {project.statement}
        </p>
      </header>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2 className="text-mono">Overview</h2>
          <p>{project.overview}</p>
        </section>

        <section className={styles.section}>
          <h2 className="text-mono">Process</h2>
          <p>{project.process}</p>
        </section>

        <section className={styles.section}>
          <h2 className="text-mono">Technical</h2>
          <p>{project.technical}</p>
        </section>

        <section className={styles.section}>
          <h2 className="text-mono">Lessons</h2>
          <p>{project.lessons}</p>
        </section>
      </div>
    </article>
  );
}
