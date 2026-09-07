import styles from './note.module.css';
import { getContentBySlug, getPublishedContent } from '@/lib/content.js';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const notes = await getPublishedContent('note');
  return notes.map((n) => ({ slug: n.slug }));
}

export default async function NoteDetail({ params }) {
  const { slug } = await params;
  const note = await getContentBySlug(slug, 'note');

  if (!note) {
    notFound();
  }

  return (
    <article className={styles.container}>
      <header className={styles.header}>
        <div className={styles.meta}>
          <span className="text-mono">{note.date ? note.date.toISOString().split('T')[0] : 'Unknown'}</span>
        </div>
        <h1 className="text-title fade-in">{note.title}</h1>
      </header>

      <div className={`${styles.content} fade-in`} style={{ animationDelay: '0.2s' }}>
        {(note.body || '').split('\n').map((line, i) => (
          <p key={i} className={line.trim() === '' ? styles.emptyLine : ''}>
            {line}
          </p>
        ))}
      </div>
    </article>
  );
}
