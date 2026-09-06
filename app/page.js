import styles from './page.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.container}>
      {/* SHOT 01 — OPENING ROOM */}
      <section className={styles.shot01}>
        <h1 className="text-hero fade-in">YASHVIR</h1>
      </section>

      {/* SHOT 02 — HUGE PHOTOGRAPH */}
      <section className={styles.shot02}>
        <div className={`${styles.shot02Image} reveal-image`} />
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

      {/* SHOT 04 — SELECTED WORK (ASTERIA) */}
      <section className={styles.shot04}>
        <Link href="/work/asteria" className={styles.workLink}>
          <div className={`${styles.asteriaVisual} reveal-image`} />
          <h2 className={`${styles.asteriaTitle} text-hero fade-in`}>ASTERIA</h2>
          <div className={styles.asteriaMeta}>
            <span className="text-mono">LITERARY PLATFORM</span>
            <span className="text-mono">2026</span>
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
        <Link href="/films/untitled-isolation" className={styles.cinemaLink}>
          <div className={`${styles.cinemaStill} reveal-image`} />
          <div className={styles.cinemaOverlay}>
            <h3 className="text-title">UNTITLED (ISOLATION)</h3>
            <span className="text-meta">FILM / 04:12 / 2026</span>
          </div>
        </Link>
      </section>

      {/* SHOT 07 — WRITING (Poetry) */}
      <section className={styles.shot07}>
        <Link href="/writing/again" className={styles.poetryBlock}>
          <p className="text-title drift-up">
            I was here before,<br/>
            standing along a shore...
          </p>
          <span className={`${styles.poetryMeta} text-meta`}>POETRY / FRAGMENT / 2026</span>
        </Link>
      </section>

      {/* SHOT 08 — PHOTOGRAPHY */}
      <section className={styles.shot08}>
        <div className={styles.contactSheet}>
          <div className={styles.photoLeft}>
            <div className={`${styles.photoPlaceholder} reveal-image`} />
            <span className="text-meta">TOKYO / 02:17</span>
          </div>
          <div className={styles.photoRight}>
            <div className={`${styles.photoPlaceholderTall} reveal-image`} style={{ animationDelay: '0.2s' }} />
            <span className="text-meta">ARCHIVE / UNKNOWN</span>
          </div>
        </div>
      </section>

      {/* SHOT 09 — NOTES */}
      <section className={styles.shot09}>
        <Link href="/notes/on-time" className={styles.noteItem}>
          <span className="text-meta">NOTE / ON TIME</span>
          <p className="text-title drift-up">What if time isn't moving at all?</p>
        </Link>
        <Link href="/notes/on-color" className={styles.noteItem}>
          <span className="text-meta">NOTE / ON COLOR</span>
          <p className="text-title drift-up" style={{ animationDelay: '0.1s' }}>The universe probably doesn't look like anything.</p>
        </Link>
      </section>

      {/* SHOT 10 — NOT YET */}
      <section className={styles.shot10}>
        <div className={styles.notYetLabel}>NOT YET</div>
        <div className={styles.notYetList}>
          <div className={styles.notYetItem}>
            <h4 className="text-title" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>37 LINES</h4>
            <span className="text-meta">POETRY / 2026</span>
            <p className={styles.notYetDesc}>A poem I began twice and never finished.</p>
          </div>
          <div className={styles.notYetItem}>
            <h4 className="text-title" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>UNTITLED FILM</h4>
            <span className="text-meta">FILM / CONCEPT / 2026</span>
            <p className={styles.notYetDesc}>Someone waits for something that may already have happened.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <p className={styles.footerStatement}>archive currently open.</p>
        <div className={styles.footerNav}>
          <a href="#" className="text-mono">CV</a>
          <a href="#" className="text-mono">GitHub</a>
          <a href="#" className="text-mono">LinkedIn</a>
          <a href="mailto:hello@example.com" className="text-mono">Contact</a>
        </div>
      </footer>
    </div>
  );
}
