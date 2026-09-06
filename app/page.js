import styles from './page.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className="text-hero fade-in">YASHVIR</h1>
          <p className={`${styles.subtitle} text-mono fade-in`} style={{ animationDelay: '0.5s' }}>
            I make things to understand things.
          </p>
        </div>
      </section>

      <section className={styles.exhibition}>
        <div className={styles.sectionHeader}>
          <h2 className="text-title">Selected Work</h2>
        </div>
        <div className={styles.workList}>
          <Link href="/work/asteria" className={styles.workItem}>
            <span className="text-meta">2026</span>
            <h3>Asteria</h3>
            <p className="text-mono">Literary / Digital Platform</p>
          </Link>
          <Link href="/work/fathom" className={styles.workItem}>
            <span className="text-meta">2025</span>
            <h3>Fathom</h3>
            <p className="text-mono">Software</p>
          </Link>
        </div>
      </section>

      <section className={styles.exhibition}>
        <div className={styles.sectionHeader}>
          <h2 className="text-title">Cinema</h2>
        </div>
        <div className={styles.filmTeaser}>
          <Link href="/films/untitled-isolation" className={styles.filmLink}>
            <h3>Untitled (Isolation)</h3>
            <p className="text-mono">4 mins · 2026</p>
          </Link>
        </div>
      </section>

      <footer className={styles.footer}>
        <p className="text-meta">© {new Date().getFullYear()} Yashvir. Archive currently open.</p>
        <div className={styles.footerLinks}>
          <a href="#" className="text-meta">CV</a>
          <a href="#" className="text-meta">GitHub</a>
          <a href="#" className="text-meta">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
}
