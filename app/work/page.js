import styles from './page.module.css';
import Link from 'next/link';
import { getPublishedContent } from '@/lib/content.js';

export default async function Work() {
  const projects = await getPublishedContent('project');
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className="text-title fade-in">Work</h1>
        <p className="text-mono fade-in" style={{ animationDelay: '0.2s', color: 'var(--muted)', marginTop: '2rem' }}>
          Selected technical and creative projects.
        </p>
      </header>

      <div className={styles.projectList}>
        {projects.map((project, index) => (
          <Link 
            key={project.slug} 
            href={`/work/${project.slug}`} 
            className={`${styles.projectItem} fade-in`}
            style={{ animationDelay: `${0.3 + index * 0.1}s` }}
          >
            <div className={styles.projectMeta}>
              <span className="text-mono">{project.date ? project.date.getFullYear() : 'Unknown'}</span>
              <span className="text-mono">{project.metadata?.category || ''}</span>
            </div>
            <h2>{project.title}</h2>
            <p className={styles.statement}>{project.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
