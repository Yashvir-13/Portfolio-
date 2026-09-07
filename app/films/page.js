import styles from './films.module.css';
import Link from 'next/link';
import { getPublishedContent } from '@/lib/content.js';

export default async function Films() {
  const films = await getPublishedContent('film');
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className="text-title fade-in">Films</h1>
      </header>

      <div className={styles.filmList}>
        {films.map((film, index) => (
          <Link 
            key={film.slug} 
            href={`/films/${film.slug}`} 
            className={`${styles.filmItem} fade-in`}
            style={{ animationDelay: `${0.2 + index * 0.1}s` }}
          >
            {film.hero_image ? (
              <img src={film.hero_image} className={`${styles.posterPlaceholder} cinematic-image`} alt={film.title} />
            ) : (
              <div className={styles.posterPlaceholder} />
            )}
            <div className={styles.filmInfo}>
              <h2>{film.title}</h2>
              <div className={styles.meta}>
                <span className="text-mono">{film.date ? film.date.getFullYear() : 'Unknown'}</span>
                <span className="text-mono">{film.metadata?.duration || ''}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
