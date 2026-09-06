import styles from './notYet.module.css';
import notYet from '@/content/not-yet.json';

export default function NotYet() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className="text-title fade-in">Not Yet</h1>
        <p className={`${styles.subtitle} text-mono fade-in`} style={{ animationDelay: '0.2s' }}>
          Some things are still becoming.
        </p>
      </header>

      <div className={styles.list}>
        {notYet.map((item, index) => (
          <div 
            key={index} 
            className={`${styles.item} fade-in`}
            style={{ animationDelay: `${0.3 + index * 0.1}s` }}
          >
            <div className={styles.meta}>
              <span className="text-mono">{item.year}</span>
              <span className="text-mono">{item.type}</span>
              <span className={styles.statusBadge}>{item.status}</span>
            </div>
            <h2>{item.title}</h2>
            <p className={styles.description}>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
