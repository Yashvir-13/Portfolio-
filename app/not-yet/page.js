import styles from './notYet.module.css';
import notYet from '@/content/not-yet.json';

export default function NotYet() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className="text-hero fade-in">NOT YET</h1>
        <p className={`${styles.subtitle} text-mono fade-in`} style={{ animationDelay: '0.2s' }}>
          An archive of unfinished thoughts.
        </p>
      </header>

      <ul className={styles.list}>
        {notYet.map((item, index) => (
          <li 
            key={item.id} 
            className={`${styles.item} fade-in`}
            style={{ animationDelay: `${0.4 + index * 0.1}s` }}
          >
            <div className={styles.meta}>
              <span className="text-mono">{item.year}</span>
              <span className="text-mono">{item.type}</span>
            </div>
            <h2 className={styles.title}>{item.title}</h2>
            <p className={styles.description}>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
