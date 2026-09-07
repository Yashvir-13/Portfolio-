import styles from './notes.module.css';
import Link from 'next/link';
import { getPublishedContent } from '@/lib/content.js';

export default async function Notes() {
  const notes = await getPublishedContent('note');
  return (
    <div className={styles.container}>
      <div className={styles.topMeta}>
        <span className="text-mono fade-in">ARCHIVE / NOTES</span>
        <span className="text-mono fade-in">02:17</span>
      </div>

      <div className={styles.notesList}>
        {notes.map((note, index) => (
          <Link 
            key={note.slug} 
            href={`/notes/${note.slug}`} 
            className={styles.noteItem}
          >
            <div className={`${styles.meta} fade-in`} style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
              <span className="text-mono">{note.date ? note.date.toISOString().split('T')[0] : 'Unknown'}</span>
              <span className="text-mono">{note.title}</span>
            </div>
            <p className={`${styles.question} drift-up`} style={{ animationDelay: `${0.4 + index * 0.1}s` }}>
              {note.body ? note.body.split('.')[0] + '.' : ''}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
