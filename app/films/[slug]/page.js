import styles from './film.module.css';
import { getContentBySlug, getPublishedContent } from '@/lib/content.js';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const films = await getPublishedContent('film');
  return films.map((f) => ({ slug: f.slug }));
}

export default async function FilmDetail({ params }) {
  const { slug } = await params;
  const film = await getContentBySlug(slug, 'film');

  if (!film) {
    notFound();
  }

  // For dynamic time display
  const now = new Date();
  const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

  let youtubeId = null;
  if (film.source === 'youtube' && film.external_id) {
    // extract from "yt:video:VIDEO_ID" or URL
    const parts = film.external_id.split(':');
    youtubeId = parts[parts.length - 1];
  }

  return (
    <article className={styles.container}>
      <header className={styles.header}>
        <h1 className="text-title fade-in">{film.title}</h1>
      </header>

      <div className={`${styles.cinemaContainer} reveal-image`} style={{ animationDelay: '0.5s' }}>
        {youtubeId ? (
          <iframe 
            width="100%" 
            height="100%" 
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=0&rel=0`} 
            title={film.title} 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          ></iframe>
        ) : (
          <div className={styles.videoPlaceholder}>
            {film.hero_image ? (
              <img src={film.hero_image} alt={film.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span className={`${styles.videoLabel} text-mono fade-in`} style={{ animationDelay: '2s' }}>{timeString}</span>
            )}
          </div>
        )}
      </div>

      <div className={styles.contentContainer}>
        <div className={`${styles.metaRow} fade-in`} style={{ animationDelay: '1s' }}>
          <span className="text-mono">{film.date ? film.date.getFullYear() : 'Unknown'}</span>
          <span className="text-mono">{film.metadata?.duration || ''}</span>
        </div>

        <div className={styles.textColumn}>
          <p className={`${styles.description} drift-up`} style={{ animationDelay: '1.2s' }}>{film.excerpt}</p>
          
          {film.body && (
            <div className={`${styles.directorNote} drift-up`} style={{ animationDelay: '1.4s' }}>
              {film.source === 'native' ? (
                <p>{film.body}</p>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: film.body }} />
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
