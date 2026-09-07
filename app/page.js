import styles from './page.module.css';
import Link from 'next/link';
import { getPublishedContent, getPublishedContentMultiType } from '@/lib/content.js';

export default async function Home() {
  const [
    projects,
    films,
    poetry,
    photos,
    notes,
    notYet
  ] = await Promise.all([
    getPublishedContent('project', { limit: 1 }),
    getPublishedContent('film', { limit: 1 }),
    getPublishedContentMultiType(['poem', 'fragment'], { limit: 1 }),
    getPublishedContent('photograph', { limit: 3 }),
    getPublishedContent('note', { limit: 2 }),
    getPublishedContent('unfinished', { limit: 2 })
  ]);

  const latestProject = projects[0];
  const latestFilm = films[0];
  const latestPoem = poetry[0];
  const latestPhotos = photos;
  const latestNotes = notes;
  const latestNotYet = notYet;

  return (
    <div className={styles.container}>
      {/* SHOT 01 — OPENING ROOM */}
      <section className={styles.shot01}>
        <h1 className="text-hero fade-in">YASHVIR</h1>
      </section>

      {/* SHOT 02 — HUGE PHOTOGRAPH */}
      <section className={styles.shot02}>
        {latestPhotos[0]?.hero_image ? (
          <img src={latestPhotos[0].hero_image} className={`${styles.shot02Image} reveal-image cinematic-image`} alt="Archive" />
        ) : (
          <div className={`${styles.shot02Image} reveal-image`} />
        )}
        <span className={`${styles.shot02Meta} text-mono fade-in`} style={{ animationDelay: '1.5s' }}>
          02:17 AM / UNKNOWN / 2026
        </span>
      </section>

      {/* SHOT 03 — STATEMENT */}
      <section className={styles.shot03}>
        <p className={`${styles.statement} fade-in`}>
          I make things to<br/>understand things.
        </p>
      </section>

      {/* SHOT 04 — SELECTED WORK */}
      {latestProject && (
        <section className={styles.shot04}>
          <Link href={`/work/${latestProject.slug}`} className={styles.workLink}>
            {latestProject.hero_image ? (
              <img src={latestProject.hero_image} className={`${styles.asteriaVisual} reveal-image cinematic-image`} alt={latestProject.title} />
            ) : (
              <div className={`${styles.asteriaVisual} reveal-image`} />
            )}
            <h2 className={`${styles.asteriaTitle} text-hero fade-in`}>{latestProject.title.toUpperCase()}</h2>
            <div className={styles.asteriaMeta}>
              <span className="text-mono">{latestProject.metadata?.category?.toUpperCase() || 'PROJECT'}</span>
              <span className="text-mono">{latestProject.date ? latestProject.date.getFullYear() : '2026'}</span>
            </div>
          </Link>
        </section>
      )}

      {/* SHOT 05 — INTERRUPTION */}
      <section className={styles.shot05}>
        <p className="interruption drift-up">
          Some things are made<br/>because they cannot be explained.
        </p>
      </section>

      {/* SHOT 06 — CINEMA */}
      {latestFilm && (
        <section className={styles.shot06}>
          <Link href={`/films/${latestFilm.slug}`} className={styles.cinemaLink}>
            {latestFilm.hero_image ? (
              <img src={latestFilm.hero_image} className={`${styles.cinemaStill} reveal-image cinematic-image`} alt={latestFilm.title} />
            ) : (
              <div className={`${styles.cinemaStill} reveal-image`} />
            )}
            <div className={styles.cinemaOverlay}>
              <h3 className="text-title">{latestFilm.title.toUpperCase()}</h3>
              <span className="text-meta">FILM / {latestFilm.metadata?.duration || 'UNKNOWN'} / {latestFilm.date ? latestFilm.date.getFullYear() : '2026'}</span>
            </div>
          </Link>
        </section>
      )}

      {/* SHOT 07 — WRITING */}
      {latestPoem && (
        <section className={styles.shot07}>
          <Link href={`/writing/${latestPoem.slug}`} className={styles.poetryBlock}>
            <p className="text-title drift-up">
              {latestPoem.body ? latestPoem.body.substring(0, 80) + '...' : latestPoem.title}
            </p>
            <span className={`${styles.poetryMeta} text-meta`}>WRITING / {latestPoem.type.toUpperCase()} / {latestPoem.date ? latestPoem.date.getFullYear() : '2026'}</span>
          </Link>
        </section>
      )}

      {/* SHOT 08 — PHOTOGRAPHY */}
      {latestPhotos.length > 1 && (
        <section className={styles.shot08}>
          <div className={styles.contactSheet}>
            <div className={styles.photoLeft}>
              {latestPhotos[1]?.hero_image ? (
                <img src={latestPhotos[1].hero_image} className={`${styles.photoPlaceholder} reveal-image cinematic-image`} alt="Archive" />
              ) : (
                <div className={`${styles.photoPlaceholder} reveal-image`} />
              )}
              <span className="text-meta">{latestPhotos[1].metadata?.location?.toUpperCase() || 'ARCHIVE'} / 02:17</span>
            </div>
            {latestPhotos[2] && (
              <div className={styles.photoRight}>
                {latestPhotos[2].hero_image ? (
                  <img src={latestPhotos[2].hero_image} className={`${styles.photoPlaceholderTall} reveal-image cinematic-image`} style={{ animationDelay: '0.2s' }} alt="Archive" />
                ) : (
                  <div className={`${styles.photoPlaceholderTall} reveal-image`} style={{ animationDelay: '0.2s' }} />
                )}
                <span className="text-meta">{latestPhotos[2].metadata?.location?.toUpperCase() || 'ARCHIVE'} / UNKNOWN</span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* SHOT 09 — NOTES */}
      {latestNotes.length > 0 && (
        <section className={styles.shot09}>
          {latestNotes.map((note, idx) => (
            <Link key={note.slug} href={`/notes/${note.slug}`} className={styles.noteItem}>
              <span className="text-meta">NOTE / {note.title.toUpperCase()}</span>
              <p className="text-title drift-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                {note.body || ''}
              </p>
            </Link>
          ))}
        </section>
      )}

      {/* SHOT 10 — NOT YET */}
      {latestNotYet.length > 0 && (
        <section className={styles.shot10}>
          <div className={styles.notYetLabel}>NOT YET</div>
          <div className={styles.notYetList}>
            {latestNotYet.map(item => (
              <div key={item.slug} className={styles.notYetItem}>
                <h4 className="text-title" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>{item.title.toUpperCase()}</h4>
                <span className="text-meta">{item.metadata?.unfinished_type?.toUpperCase() || 'CONCEPT'} / {item.date ? item.date.getFullYear() : '2026'}</span>
                <p className={styles.notYetDesc}>{item.excerpt}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className={styles.footer}>
        <p className={styles.footerStatement}>archive currently open.</p>
        <div className={styles.footerNav}>
          <a href="https://github.com/Yashvir-13" target="_blank" rel="noopener noreferrer" className="text-mono">GitHub</a>
          <a href="https://linkedin.com/in/yashvir" target="_blank" rel="noopener noreferrer" className="text-mono">LinkedIn</a>
          <a href="mailto:hello@example.com" className="text-mono">Contact</a>
        </div>
      </footer>
    </div>
  );
}
