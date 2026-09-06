import styles from './writing.module.css';
import Link from 'next/link';
import writing from '@/content/writing.json';

export default function Writing() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className="text-title fade-in">Writing</h1>
      </header>

      <div className={styles.writingList}>
        {writing.map((piece, index) => (
          <Link 
            key={piece.slug} 
            href={`/writing/${piece.slug}`} 
            className={`${styles.writingItem} fade-in`}
            style={{ animationDelay: `${0.2 + index * 0.1}s` }}
          >
            <div className={styles.meta}>
              <span className="text-mono">{piece.year}</span>
              <span className="text-mono">{piece.type}</span>
            </div>
            <h2>{piece.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
