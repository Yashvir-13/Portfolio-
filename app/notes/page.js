import styles from './notes.module.css';
import Link from 'next/link';
import notes from '@/content/notes.json';

export default function Notes() {
  return (
    <div className={styles.container}>
      <div className={styles.notesList}>
        {notes.map((note, index) => (
          <Link 
            key={note.slug} 
            href={`/notes/${note.slug}`} 
            className={`${styles.noteItem} fade-in`}
            style={{ animationDelay: `${0.2 + index * 0.1}s` }}
          >
            <div className={styles.meta}>
              <span className="text-mono">{note.date}</span>
              <span className="text-mono">{note.title}</span>
            </div>
            {/* Find the first thought/question from content for the preview */}
            <p className={styles.question}>
              {note.content.split('.')[0] + '.'}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
