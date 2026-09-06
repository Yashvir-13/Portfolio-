import styles from './piece.module.css';
import writing from '@/content/writing.json';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return writing.map((w) => ({ slug: w.slug }));
}

export default async function WritingPiece({ params }) {
  const { slug } = await params;
  const piece = writing.find((w) => w.slug === slug);

  if (!piece) {
    notFound();
  }

  return (
    <article className={styles.container}>
      <div className={`${styles.ambientMeta} text-mono fade-in`} style={{ animationDelay: '3s' }}>
        ARCHIVE / {piece.year} / {piece.type}
      </div>

      <header className={styles.header}>
        <h1 className={`${styles.title} fade-in`}>{piece.title}</h1>
      </header>

      <div className={`${styles.content} fade-in`} style={{ animationDelay: '1s' }}>
        {piece.content.split('\n').map((line, i) => (
          <p key={i} className={line.trim() === '' ? styles.emptyLine : ''}>
            {line}
          </p>
        ))}
      </div>
    </article>
  );
}
