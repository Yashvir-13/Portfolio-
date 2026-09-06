import styles from './notYet.module.css';
import notYet from '@/content/not-yet.json';

export default function NotYet() {
  return (
    <div className={styles.container}>
      <div className={styles.topMeta}>
        <span className="text-mono fade-in">ARCHIVE / NOT YET</span>
        <span className="text-mono fade-in">02:17</span>
      </div>

      <header className={styles.header}>
        <h1 className="text-title fade-in">NOT YET</h1>
      </header>

      <ul className={styles.list}>
        {notYet.map((item, index) => (
          <li 
            key={item.id} 
            className={styles.item}
          >
            <h2 className={`${styles.title} fade-in`} style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
              {item.title}
            </h2>
            <div className={`${styles.meta} fade-in`} style={{ animationDelay: `${0.4 + index * 0.1}s` }}>
              <span className="text-mono">{item.type} / {item.year}</span>
            </div>
            <p className={`${styles.description} drift-up`} style={{ animationDelay: `${0.6 + index * 0.1}s` }}>
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
