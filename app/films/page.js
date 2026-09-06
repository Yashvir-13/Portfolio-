import styles from './films.module.css';
import Link from 'next/link';
import films from '@/content/films.json';

export default function Films() {
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
            <div className={styles.posterPlaceholder} />
            <div className={styles.filmInfo}>
              <h2>{film.title}</h2>
              <div className={styles.meta}>
                <span className="text-mono">{film.year}</span>
                <span className="text-mono">{film.duration}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
