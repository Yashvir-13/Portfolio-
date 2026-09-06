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
      <header className={styles.header}>
        <h1 className="text-title fade-in">{film.title}</h1>
      </header>

      <div className={`${styles.cinemaContainer} fade-in`} style={{ animationDelay: '0.5s' }}>
        <div className={styles.videoPlaceholder}>
          {/* Subtle placeholder indicating video without UI clutter */}
        </div>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.metaColumn}>
          <span className="text-mono">{film.year}</span>
          <span className="text-mono">{film.duration}</span>
        </div>

        <div className={styles.textColumn}>
          <p className={styles.description}>{film.description}</p>
          
          {film.director_note && (
            <div className={styles.directorNote}>
              <p>{film.director_note}</p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
