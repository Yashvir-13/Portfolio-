import styles from './page.module.css';
import Link from 'next/link';
import { getPublishedContent, getPublishedContentMultiType } from '@/lib/content.js';

export default async function Home() {
  let projects = [];
  let films = [];
  let poetry = [];
  let photos = [];
  let notes = [];
  let notYet = [];

  try {
    const results = await Promise.all([
      getPublishedContent('project', { limit: 1 }),
      getPublishedContent('film', { limit: 1 }),
      getPublishedContentMultiType(['poem', 'fragment'], { limit: 1 }),
      getPublishedContent('photograph', { limit: 3 }),
      getPublishedContent('note', { limit: 2 }),
      getPublishedContent('unfinished', { limit: 2 })
    ]);
    projects = results[0] || [];
    films = results[1] || [];
    poetry = results[2] || [];
    photos = results[3] || [];
    notes = results[4] || [];
    notYet = results[5] || [];
  } catch (err) {
    console.warn('Database query fallback activated:', err?.message || err);
  }

  const latestProject = projects[0];
  const latestFilm = films[0];
  const latestPoem = poetry[0];
  const latestPhotos = photos;
  const latestNotes = notes;
  const latestNotYet = notYet;

  // Curated Fallbacks for Unseeded DB or Missing hero_image
  const activeProject = latestProject || {
    title: 'Asteria',
    slug: 'asteria',
    hero_image: '/images/fathom.png',
    metadata: { category: 'Artifact / System' },
    date: new Date('2026-01-01'),
  };
  const projectImage = activeProject.hero_image || '/images/fathom.png';

  const activeFilm = latestFilm || {
    title: 'Untitled (Isolation)',
    slug: 'untitled-isolation',
    hero_image: '/images/fire.jpg',
    metadata: { duration: '14 MIN' },
    date: new Date('2026-01-01'),
  };
  const filmImage = activeFilm.hero_image || '/images/fire.jpg';

  const activePoem = latestPoem || {
    title: 'Again',
    slug: 'again',
    type: 'poem',
    body: 'Again the light fails against the window, leaving only the sound of rain on glass...',
    date: new Date('2026-01-01'),
  };

  const photo0 = latestPhotos[0] || {
    hero_image: '/images/sky.jpg',
    title: 'Archive Sky',
    metadata: { location: 'NORTHERN VOID' },
  };
  const photo0Image = photo0.hero_image || '/images/sky.jpg';

  const photo1 = latestPhotos[1] || {
    hero_image: '/images/tree.jpg',
    title: 'Archive Canopy',
    metadata: { location: 'NORTHERN CANOPY' },
  };
  const photo1Image = photo1.hero_image || '/images/tree.jpg';

  const photo2 = latestPhotos[2] || {
    hero_image: '/images/fire.jpg',
    title: 'Archive Night',
    metadata: { location: 'OBSERVATORY' },
  };
  const photo2Image = photo2.hero_image || '/images/fire.jpg';

  const activeNotes = latestNotes.length > 0 ? latestNotes : [
    { slug: 'on-time', title: 'On Time', body: 'Time inside an archive moves differently than time outside.' },
    { slug: 'on-color', title: 'On Color', body: 'Darkness is not the absence of light, but an atmosphere that holds it.' },
  ];

  const activeNotYet = latestNotYet.length > 0 ? latestNotYet : [
    { slug: 'untitled-film-idea', title: 'Untitled Film Idea', metadata: { unfinished_type: 'EXPERIMENT' }, date: new Date('2026-01-01'), excerpt: 'A sequence of empty corridors recorded over thirty nights.' },
    { slug: 'computer-vision-experiment', title: 'Computer Vision Experiment', metadata: { unfinished_type: 'PROTOTYPE' }, date: new Date('2026-01-01'), excerpt: 'Tracking the motion of dust particles caught in projector beams.' },
  ];

  return (
    <div className={styles.container}>
      {/* SHOT 01 — OPENING ROOM */}
      <section className={styles.shot01}>
        <h1 className={`${styles.heroTitle} text-hero fade-in`}>YASHVIR</h1>
      </section>

      {/* SHOT 02 — HUGE PHOTOGRAPH */}
      <section className={styles.shot02}>
        <img
          src={photo0Image}
          className={`${styles.shot02Image} reveal-image cinematic-image`}
          alt={photo0.title || 'Archive'}
        />
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
      <section className={styles.shot04}>
        <Link href={`/work/${activeProject.slug}`} className={styles.workLink}>
          <img
            src={projectImage}
            className={`${styles.asteriaVisual} reveal-image cinematic-image`}
            alt={activeProject.title}
          />
          <h2 className={`${styles.asteriaTitle} text-hero fade-in`}>{activeProject.title.toUpperCase()}</h2>
          <div className={styles.asteriaMeta}>
            <span className="text-mono">{activeProject.metadata?.category?.toUpperCase() || 'PROJECT'}</span>
            <span className="text-mono">{activeProject.date ? new Date(activeProject.date).getFullYear() : '2026'}</span>
          </div>
        </Link>
      </section>

      {/* SHOT 05 — INTERRUPTION */}
      <section className={styles.shot05}>
        <p className="interruption drift-up">
          Some things are made<br/>because they cannot be explained.
        </p>
      </section>

      {/* SHOT 06 — CINEMA */}
      <section className={styles.shot06}>
        <Link href={`/films/${activeFilm.slug}`} className={styles.cinemaLink}>
          <img
            src={filmImage}
            className={`${styles.cinemaStill} reveal-image cinematic-image`}
            alt={activeFilm.title}
          />
          <div className={styles.cinemaOverlay}>
            <h3 className="text-title">{activeFilm.title.toUpperCase()}</h3>
            <span className="text-meta">FILM / {activeFilm.metadata?.duration || 'UNKNOWN'} / {activeFilm.date ? new Date(activeFilm.date).getFullYear() : '2026'}</span>
          </div>
        </Link>
      </section>

      {/* SHOT 07 — WRITING */}
      <section className={styles.shot07}>
        <Link href={`/writing/${activePoem.slug}`} className={styles.poetryBlock}>
          <p className="text-title drift-up">
            {activePoem.body ? activePoem.body.substring(0, 80) + '...' : activePoem.title}
          </p>
          <span className={`${styles.poetryMeta} text-meta`}>WRITING / {(activePoem.type || 'FRAGMENT').toUpperCase()} / {activePoem.date ? new Date(activePoem.date).getFullYear() : '2026'}</span>
        </Link>
      </section>

      {/* SHOT 08 — PHOTOGRAPHY */}
      <section className={styles.shot08}>
        <div className={styles.contactSheet}>
          <div className={styles.photoLeft}>
            <img
              src={photo1Image}
              className={`${styles.photoPlaceholder} reveal-image cinematic-image`}
              alt={photo1.title || 'Archive Photography'}
            />
            <span className="text-meta">{photo1.metadata?.location?.toUpperCase() || 'ARCHIVE'} / 02:17</span>
          </div>
          <div className={styles.photoRight}>
            <img
              src={photo2Image}
              className={`${styles.photoPlaceholderTall} reveal-image cinematic-image`}
              style={{ animationDelay: '0.2s' }}
              alt={photo2.title || 'Archive Photography'}
            />
            <span className="text-meta">{photo2.metadata?.location?.toUpperCase() || 'ARCHIVE'} / UNKNOWN</span>
          </div>
        </div>
      </section>

      {/* SHOT 09 — NOTES */}
      {activeNotes.length > 0 && (
        <section className={styles.shot09}>
          {activeNotes.map((note, idx) => (
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
      {activeNotYet.length > 0 && (
        <section className={styles.shot10}>
          <div className={styles.notYetLabel}>NOT YET</div>
          <div className={styles.notYetList}>
            {activeNotYet.map(item => (
              <div key={item.slug} className={styles.notYetItem}>
                <h4 className="text-title" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>{item.title.toUpperCase()}</h4>
                <span className="text-meta">{item.metadata?.unfinished_type?.toUpperCase() || 'CONCEPT'} / {item.date ? new Date(item.date).getFullYear() : '2026'}</span>
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
