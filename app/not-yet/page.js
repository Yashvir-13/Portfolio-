import styles from './notYet.module.css';
import { getPublishedContent } from '@/lib/content.js';

export default async function NotYet() {
  const notYet = await getPublishedContent('unfinished');

  const now = new Date();
  const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

  return (
    <div className={styles.container}>
      <div className={styles.topMeta}>
        <span className="text-mono fade-in">ARCHIVE / NOT YET</span>
        <span className="text-mono fade-in">{timeString}</span>
      </div>

      <header className={styles.header}>
        <h1 className="text-title fade-in">NOT YET</h1>
      </header>

      <ul className={styles.list}>
        {notYet.map((item, index) => (
          <li 
            key={item.slug} 
            className={styles.item}
          >
            <h2 className={`${styles.title} fade-in`} style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
              {item.title}
            </h2>
            <div className={`${styles.meta} fade-in`} style={{ animationDelay: `${0.4 + index * 0.1}s` }}>
              <span className="text-mono">{item.metadata?.unfinished_type || 'Unknown'} / {item.date ? item.date.getFullYear() : 'Unknown'}</span>
            </div>
            <p className={`${styles.description} drift-up`} style={{ animationDelay: `${0.6 + index * 0.1}s` }}>
              {item.excerpt}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
