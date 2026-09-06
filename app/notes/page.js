import styles from './notes.module.css';
import Link from 'next/link';
import notes from '@/content/notes.json';

export default function Notes() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className="text-title fade-in">Notes</h1>
        <p className="text-mono fade-in" style={{ animationDelay: '0.2s', color: 'var(--muted)', marginTop: '2rem' }}>
          Questions, observations and philosophical explorations.
        </p>
      </header>

      <div className={styles.notesList}>
        {notes.map((note, index) => (
          <Link 
            key={note.slug} 
            href={`/notes/${note.slug}`} 
            className={`${styles.noteItem} fade-in`}
            style={{ animationDelay: `${0.3 + index * 0.1}s` }}
          >
            <div className={styles.meta}>
              <span className="text-mono">{note.date}</span>
            </div>
            <h2>{note.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
