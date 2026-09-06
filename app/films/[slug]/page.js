import styles from './film.module.css';
import films from '@/content/films.json';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return films.map((f) => ({ slug: f.slug }));
}

export default async function FilmDetail({ params }) {
  const { slug } = await params;
  const film = films.find((f) => f.slug === slug);

  if (!film) {
    notFound();
  }

  return (
    <article className={styles.container}>
      <div className={styles.cinemaContainer}>
        {/* Placeholder for video player */}
        <div className={styles.videoPlaceholder}>
          <span className="text-mono" style={{ color: 'var(--muted)' }}>Video Player</span>
        </div>
      </div>

      <header className={styles.header}>
        <h1 className="text-hero fade-in">{film.title}</h1>
        <div className={`${styles.meta} fade-in`} style={{ animationDelay: '0.2s' }}>
          <span className="text-mono">{film.year}</span>
          <span className="text-mono">{film.duration}</span>
        </div>
      </header>

      <div className={styles.content}>
        <p className={styles.description}>{film.description}</p>
        
        {film.director_note && (
          <div className={styles.directorNote}>
            <h2 className="text-mono">Director's Note</h2>
            <p>{film.director_note}</p>
          </div>
        )}
      </div>
    </article>
  );
}
