import styles from './page.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.container}>
      {/* 01 — OPENING ROOM */}
      <section className={styles.hero}>
        <h1 className="text-hero fade-in">YASHVIR</h1>
        <p className={`${styles.subtitle} text-mono fade-in`} style={{ animationDelay: '1s' }}>
          I make things to understand things.
        </p>
      </section>

      {/* 02 — A SMALL INTERRUPTION */}
      <section className={styles.interruptionBlock}>
        <p className="interruption fade-in" style={{ animationDelay: '0.2s' }}>
          some things are made<br/>because they cannot be explained.
        </p>
      </section>

      {/* 03 — SELECTED WORK */}
      <section className={styles.workSequence}>
        <div className={styles.workMajor}>
          <Link href="/work/asteria" className={styles.workLink}>
            <div className={styles.workMeta}>
              <span className="text-mono">2026</span>
              <span className="text-mono">Literary / Digital Platform</span>
            </div>
            <h2 className="text-title">ASTERIA</h2>
          </Link>
        </div>
        
        <div className={styles.workMinor}>
          <Link href="/work/fathom" className={styles.workLink}>
            <div className={styles.workMeta}>
              <span className="text-mono">2025</span>
              <span className="text-mono">Software</span>
            </div>
            <h3 className="text-title" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>FATHOM</h3>
          </Link>
        </div>
      </section>

      {/* 04 — CINEMA */}
      <section className={styles.cinemaSequence}>
        <Link href="/films/untitled-isolation" className={styles.cinemaLink}>
          <div className={styles.projectionPlaceholder} />
          <div className={styles.cinemaOverlay}>
            <h3 className="text-title">UNTITLED (ISOLATION)</h3>
            <p className="text-meta">4 mins · 2026</p>
            <p className={styles.cinemaCaption}>the feeling of being the last person awake.</p>
          </div>
        </Link>
      </section>

      {/* 05 — WRITING (Poetry Fragment) */}
      <section className={styles.writingSequence}>
        <Link href="/writing/again" className={styles.poetryFragment}>
          <p>
            I was here before,<br/>
            standing along a shore...
          </p>
          <span className="text-meta" style={{ marginTop: '2rem', display: 'block', opacity: 0.5 }}>Again (2026)</span>
        </Link>
      </section>

      {/* 06 — PHOTOGRAPHY */}
      <section className={styles.photoSequence}>
        <div className={styles.photoLarge}>
          <div className={styles.photoPlaceholder} />
          <p className="text-meta">The sky always looks heavier at night.</p>
        </div>
        <div className={styles.photoEmptySpace} />
        <div className={styles.photoSmall}>
          <div className={styles.photoPlaceholder} />
          <p className="text-meta">Dust caught in the projector beam.</p>
        </div>
      </section>

      {/* 07 — NOTES */}
      <section className={styles.notesSequence}>
        <Link href="/notes/on-time" className={styles.noteItem}>
          <span className="text-meta">ON TIME</span>
          <p className="text-title" style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}>
            What if time isn't moving at all?
          </p>
        </Link>
        
        <Link href="/notes/on-color" className={styles.noteItem}>
          <span className="text-meta">ON COLOR</span>
          <p className="text-title" style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}>
            The universe probably doesn't look like anything.
          </p>
        </Link>

        <Link href="/notes/on-cinema" className={styles.noteItem}>
          <span className="text-meta">ON CINEMA</span>
          <p className="text-title" style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}>
            Why can a three-minute scene stay with you for years?
          </p>
        </Link>
      </section>

      {/* 08 — CURRENTLY */}
      <section className={styles.currentlySequence}>
        <div className={styles.currentlyMeta}>CURRENTLY</div>
        <ul className={styles.currentlyList}>
          <li>Building — Asteria</li>
          <li>Writing — ______</li>
          <li>Making — ______</li>
          <li>Thinking about — Time</li>
        </ul>
      </section>

      {/* 09 — FOOTER */}
      <footer className={styles.footer}>
        <p className={styles.footerStatement}>archive currently open.</p>
        <div className={styles.footerNav}>
          <a href="#" className="text-mono">CV</a>
          <a href="#" className="text-mono">GitHub</a>
          <a href="#" className="text-mono">LinkedIn</a>
          <a href="mailto:hello@example.com" className="text-mono">Contact</a>
        </div>
        <p className="text-meta">© {new Date().getFullYear()} Yashvir</p>
      </footer>
    </div>
  );
}
