import styles from './note.module.css';
import notes from '@/content/notes.json';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return notes.map((n) => ({ slug: n.slug }));
}

export default async function NoteDetail({ params }) {
  const { slug } = await params;
  const note = notes.find((n) => n.slug === slug);

  if (!note) {
    notFound();
  }

  return (
    <article className={styles.container}>
      <header className={styles.header}>
        <div className={styles.meta}>
          <span className="text-mono">{note.date}</span>
        </div>
        <h1 className="text-title fade-in">{note.title}</h1>
      </header>

      <div className={`${styles.content} fade-in`} style={{ animationDelay: '0.2s' }}>
        {note.content.split('\n').map((line, i) => (
          <p key={i} className={line.trim() === '' ? styles.emptyLine : ''}>
            {line}
          </p>
        ))}
      </div>
    </article>
  );
}
