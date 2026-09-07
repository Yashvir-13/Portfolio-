import styles from './piece.module.css';
import { getContentBySlug } from '@/lib/content.js';
import { notFound } from 'next/navigation';

export default async function WritingPiece({ params }) {
  const { slug } = await params;
  const piece = await getContentBySlug(slug);

  if (!piece) {
    notFound();
  }

  let finalBody = piece.body || '';

  // Fix Substack subscription forms to actually post to Substack
  if (piece.source === 'substack') {
    // Strip out the ugly subscription widget entirely and replace it with a clean link
    const cleanLink = piece.canonical_url ? `<a href="${piece.canonical_url}" target="_blank" rel="noopener noreferrer">Read on Substack →</a>` : '';
    finalBody = finalBody.replace(/<div class="subscription-widget-wrap(?:-editor)?[^>]*>[\s\S]*?<\/div>\s*<\/div>/g, cleanLink);
    // As a fallback, strip the form itself if the wrapper isn't matched
    finalBody = finalBody.replace(/<form class="subscription-widget[^>]*>[\s\S]*?<\/form>/g, cleanLink);
  }

  const contentClass = piece.type === 'poem' ? styles.poem : styles.essay;

  return (
    <article className={styles.container}>
      <div className={`${styles.ambientMeta} text-mono fade-in`} style={{ animationDelay: '3s' }}>
        ARCHIVE / {piece.date ? piece.date.getFullYear() : 'Unknown'} / {piece.type}
      </div>

      <header className={styles.header}>
        <h1 className={`${styles.title} fade-in`}>{piece.title}</h1>
      </header>

      <div className={`${styles.content} ${contentClass} fade-in`} style={{ animationDelay: '1s' }}>
        {piece.source === 'native' ? (
          finalBody.split('\n').map((line, i) => (
            <p key={i} className={line.trim() === '' ? styles.emptyLine : ''}>
              {line}
            </p>
          ))
        ) : (
          <div dangerouslySetInnerHTML={{ __html: finalBody }} />
        )}
      </div>
    </article>
  );
}
