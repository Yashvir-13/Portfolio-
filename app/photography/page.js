import styles from './photography.module.css';
import photography from '@/content/photography.json';

export default function Photography() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className="text-title fade-in">Photography</h1>
      </header>

      <div className={styles.gallery}>
        {photography.map((photo, index) => (
          <figure 
            key={photo.id} 
            className={`${styles.photoItem} fade-in`}
            style={{ animationDelay: `${0.2 + index * 0.2}s` }}
          >
            <div className={styles.imagePlaceholder} />
            <figcaption className={styles.caption}>
              <p className={styles.captionText}>{photo.caption}</p>
              <div className={styles.meta}>
                <span className="text-mono">{photo.location}</span>
                <span className="text-mono">{photo.date}</span>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
