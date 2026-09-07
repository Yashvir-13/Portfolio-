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
    // The feed_url is something like https://notesfromsomewhere3.substack.com/feed
    // We can extract the base url
    const subscribeUrl = 'https://notesfromsomewhere3.substack.com/subscribe';
    finalBody = finalBody.replace(/action="[^"]*"/, `action="${subscribeUrl}"`);
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
